const fs = require('fs');
const path = require('path');

// Files to update with their respective icon mappings
const filesToUpdate = [
  {
    path: 'src/app/admin/content-management/page.js',
    // Will be updated to use direct imports
  },
  {
    path: 'src/components/navbar/AdminActions.jsx',
    // Will be updated to use direct imports
  },
  {
    path: 'src/app/admin/customers/components/CustomersTable.jsx',
    // Will be updated to use direct imports
  },
  {
    path: 'src/app/admin/components/DashboardStats.jsx',
    // Will be updated to use direct imports
  },
  {
    path: 'src/app/admin/components/AdminHeader.jsx',
    // Will be updated to use direct imports
  },
  {
    path: 'src/app/admin/components/Toast.jsx',
    // Will be updated to use direct imports
  },
  {
    path: 'src/app/admin/components/RecentActivity.jsx',
    // Will be updated to use direct imports
  }
];

// Update the imports in each file
filesToUpdate.forEach(fileInfo => {
  const filePath = path.join(process.cwd(), fileInfo.path);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update the import statements to remove Fi prefix and use direct imports
    content = content.replace(
      /import\s*\{([^}]*)\}\s*from\s*['"]lucide-react['"]/g,
      (match, icons) => {
        // Process each icon in the import
        const updatedIcons = icons.split(',').map(icon => {
          const trimmed = icon.trim();
          if (trimmed.startsWith('Fi')) {
            // Remove 'Fi' prefix and return the PascalCase name
            const newName = trimmed.substring(2);
            return ` ${newName} as ${trimmed}`;
          }
          return ` ${trimmed}`;
        }).join(',');
        
        return `import {${updatedIcons}} from 'lucide-react'`;
      }
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${filePath}`);
  } else {
    console.warn(`⚠️  File not found: ${filePath}`);
  }
});

console.log('\n🎉 Lucide icon imports updated!');
