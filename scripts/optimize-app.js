#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const { optimizeImages } = require('./optimize-images');

// Configuration
const CONFIG = {
  // Directories to optimize
  directories: {
    public: path.join(__dirname, '../public'),
    src: path.join(__dirname, '../src'),
  },
  
  // Performance budgets in KB
  performanceBudgets: {
    js: 200,   // 200KB per JS file
    css: 50,   // 50KB per CSS file
    image: 100, // 100KB per image (before optimization)
  },
  
  // Enable/disable features
  features: {
    optimizeImages: true,
    analyzeBundle: true,
    checkDependencies: true,
  },
};

// Utility functions
const exec = (command) => {
  try {
    return execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`❌ Command failed: ${command}`);
    process.exit(1);
  }
};

// Check for large files
async function checkLargeFiles() {
  if (!CONFIG.features.optimizeImages) return;
  
  console.log('\n🔍 Checking for large files...');
  
  const checkDirectory = async (dir, maxSizeKB) => {
    const files = await readdir(dir, { withFileTypes: true });
    let hasLargeFiles = false;
    
    for (const file of files) {
      const fullPath = path.join(dir, file.name);
      
      if (file.isDirectory()) {
        await checkDirectory(fullPath, maxSizeKB);
        continue;
      }
      
      const stats = await stat(fullPath);
      const sizeKB = Math.round(stats.size / 1024);
      
      if (sizeKB > maxSizeKB) {
        console.log(`⚠️  Large file detected: ${path.relative(process.cwd(), fullPath)} (${sizeKB}KB)`);
        hasLargeFiles = true;
      }
    }
    
    return hasLargeFiles;
  };
  
  const hasLargeFiles = await checkDirectory(CONFIG.directories.public, CONFIG.performanceBudgets.image);
  
  if (hasLargeFiles) {
    console.log('\n💡 Tip: Consider optimizing large images using the image optimization script.');
  } else {
    console.log('✅ No excessively large files found.');
  }
}

// Analyze bundle size
function analyzeBundle() {
  if (!CONFIG.features.analyzeBundle) return;
  
  console.log('\n📊 Analyzing bundle size...');
  
  try {
    console.log('Running bundle analysis...');
    exec('npm run analyze:bundles');
    
    // Check for large dependencies
    if (CONFIG.features.checkDependencies) {
      console.log('\n🔍 Checking for large dependencies...');
      console.log('💡 Tip: Run `npm run check:bundles` after build to view the bundle analysis report');
    }
  } catch (error) {
    console.error('❌ Bundle analysis failed:', error);
  }
}

// Main optimization function
async function optimizeApp() {
  console.log('🚀 Starting Next.js App Optimization');
  console.log('='.repeat(50));
  
  try {
    // Step 1: Optimize images
    if (CONFIG.features.optimizeImages) {
      console.log('\n🖼️  Optimizing images...');
      await optimizeImages(CONFIG.directories.public);
    }
    
    // Step 2: Check for large files
    await checkLargeFiles();
    
    // Step 3: Analyze bundle size
    analyzeBundle();
    
    console.log('\n✨ Optimization complete!');
    console.log('='.repeat(50));
    console.log('💡 Next steps:');
    console.log('1. Run `npm run analyze:bundles` to analyze bundle sizes');
    console.log('2. Run `npm run check:bundles` to view the bundle analysis report');
    console.log('3. Optimize any remaining large assets');
    console.log('4. Run tests to ensure everything works as expected');
    
  } catch (error) {
    console.error('❌ Optimization failed:', error);
    process.exit(1);
  }
}

// Run the optimization
if (require.main === module) {
  optimizeApp().catch(console.error);
}

// Export for programmatic usage
module.exports = {
  optimizeApp,
  checkLargeFiles,
  analyzeBundle,
  CONFIG,
};
