const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const { gzip } = require('zlib');
const { promisify: p } = require('util');
const gzipPromise = p(gzip);

// Configuration
const CONFIG = {
  // Image formats to process
  imageExtensions: ['.jpg', '.jpeg', '.png', '.webp'],
  
  // Output format (webp or avif)
  outputFormat: 'webp',
  
  // Quality settings (1-100)
  quality: 80,
  
  // Maximum width (maintains aspect ratio)
  maxWidth: 1920,
  
  // Whether to create responsive sizes
  responsiveSizes: [640, 768, 1024, 1280, 1536],
  
  // Whether to generate blur placeholders
  generateBlurPlaceholders: true,
  
  // Whether to generate AVIF versions
  generateAvif: true,
  
  // Whether to generate WebP versions
  generateWebp: true,
  
  // Whether to compress the output
  compressOutput: true,
};

// Generate a blur placeholder for an image
async function generateBlurPlaceholder(imagePath) {
  try {
    const image = sharp(imagePath);
    const { width, height } = await image.metadata();
    const resizedWidth = 20;
    const resizedHeight = Math.round((height / width) * resizedWidth);
    
    const buffer = await image
      .resize(resizedWidth, resizedHeight, { fit: 'inside' })
      .jpeg({ quality: 50 })
      .toBuffer();
    
    const base64 = `data:image/jpeg;base64,${buffer.toString('base64')}`;
    return base64;
  } catch (error) {
    console.error(`Error generating blur placeholder for ${imagePath}:`, error);
    return null;
  }
}

// Process a single image file
async function processImage(filePath) {
  try {
    const ext = path.extname(filePath).toLowerCase();
    const baseName = path.basename(filePath, ext);
    const dirName = path.dirname(filePath);
    
    // Skip if not an image we want to process
    if (!CONFIG.imageExtensions.includes(ext)) {
      return;
    }
    
    const stats = await stat(filePath);
    const image = sharp(filePath);
    const metadata = await image.metadata();
    
    // Skip if the image is smaller than the smallest responsive size
    const minSize = Math.min(...CONFIG.responsiveSizes);
    if (metadata.width < minSize && metadata.height < minSize) {
      console.log(`Skipping small image: ${filePath}`);
      return;
    }
    
    // Create output directory if it doesn't exist
    const outputDir = path.join(dirName, 'optimized');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    // Generate responsive sizes
    const sizes = [...new Set([...CONFIG.responsiveSizes, CONFIG.maxWidth])].sort((a, b) => a - b);
    const results = [];
    
    for (const size of sizes) {
      if (size > metadata.width) continue;
      
      const outputPath = path.join(outputDir, `${baseName}-${size}w.${CONFIG.outputFormat}`);
      
      // Skip if already optimized and source hasn't changed
      if (fs.existsSync(outputPath)) {
        const outputStats = await stat(outputPath).catch(() => null);
        if (outputStats && outputStats.mtime > stats.mtime) {
          console.log(`Skipping already optimized: ${outputPath}`);
          results.push({ path: outputPath, width: size });
          continue;
        }
      }
      
      // Process the image
      const output = image.clone()
        .resize({ width: size, withoutEnlargement: true });
      
      // Apply format-specific settings
      if (CONFIG.outputFormat === 'webp') {
        await output.webp({ quality: CONFIG.quality });
      } else if (CONFIG.outputFormat === 'avif') {
        await output.avif({ quality: CONFIG.quality });
      } else {
        await output.jpeg({ quality: CONFIG.quality });
      }
      
      // Write the optimized image
      await output.toFile(outputPath);
      
      // Generate AVIF version if enabled
      if (CONFIG.generateAvif && CONFIG.outputFormat !== 'avif') {
        const avifPath = outputPath.replace(/\.\w+$/, '.avif');
        await image
          .resize({ width: size, withoutEnlargement: true })
          .avif({ quality: CONFIG.quality })
          .toFile(avifPath);
      }
      
      // Generate WebP version if enabled
      if (CONFIG.generateWebp && CONFIG.outputFormat !== 'webp') {
        const webpPath = outputPath.replace(/\.\w+$/, '.webp');
        await image
          .resize({ width: size, withoutEnlargement: true })
          .webp({ quality: CONFIG.quality })
          .toFile(webpPath);
      }
      
      results.push({ path: outputPath, width: size });
      console.log(`Generated: ${outputPath}`);
    }
    
    // Generate blur placeholder if enabled
    if (CONFIG.generateBlurPlaceholders) {
      const placeholder = await generateBlurPlaceholder(filePath);
      if (placeholder) {
        const placeholderPath = path.join(outputDir, `${baseName}-placeholder.json`);
        fs.writeFileSync(placeholderPath, JSON.stringify({ placeholder }));
        console.log(`Generated placeholder: ${placeholderPath}`);
      }
    }
    
    return results;
    
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
    return [];
  }
}

// Recursively process all images in a directory
async function optimizeImages(dir) {
  try {
    // Skip optimized directories to prevent recursion
    if (dir.includes('optimized') && dir !== path.join(__dirname, '../public/images')) {
      return;
    }
    
    const files = await readdir(dir);
    
    for (const file of files) {
      const filePath = path.join(dir, file);
      const fileStat = await stat(filePath);

      if (fileStat.isDirectory()) {
        // Skip node_modules, .git, and optimized directories
        if (['node_modules', '.git', '.next', 'optimized'].includes(file)) {
          continue;
        }
        await optimizeImages(filePath);
      } else if (CONFIG.imageExtensions.includes(path.extname(file).toLowerCase())) {
        // Skip already processed files
        if (!filePath.includes('optimized') && !filePath.includes('placeholder')) {
          await processImage(filePath);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }
}

// Main function to run the optimization
async function main() {
  const startTime = Date.now();
  const publicDir = path.join(__dirname, '../public');
  
  console.log('🚀 Starting image optimization...');
  console.log(`📁 Processing directory: ${publicDir}`);
  
  try {
    await optimizeImages(publicDir);
    
    const endTime = Date.now();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    
    console.log(`\n✅ Image optimization complete in ${duration}s!`);
    console.log('✨ All images have been optimized and resized.');
    
  } catch (error) {
    console.error('❌ Error during optimization:', error);
    process.exit(1);
  }
}

// Run the optimization
if (require.main === module) {
  main().catch(console.error);
}

// Export for programmatic usage
module.exports = {
  optimizeImages,
  processImage,
  generateBlurPlaceholder,
  CONFIG
};
