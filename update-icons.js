const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Files to update with their respective icon mappings
const filesToUpdate = [
  {
    path: 'src/app/admin/customers/components/CustomersTable.jsx',
    // No changes needed as lucide-react exports the same icon names
  },
  {
    path: 'src/app/admin/content-management/page.js',
    // No changes needed as lucide-react exports the same icon names
  },
  {
    path: 'src/app/admin/components/AdminHeader.jsx',
    // No changes needed as lucide-react exports the same icon names
  },
  {
    path: 'src/app/admin/components/DashboardStats.jsx',
    // No changes needed as lucide-react exports the same icon names
  },
  {
    path: 'src/app/admin/components/Toast.jsx',
    // No changes needed as lucide-react exports the same icon names
  },
  {
    path: 'src/app/admin/components/RecentActivity.jsx',
    // No changes needed as lucide-react exports the same icon names
  },
  {
    path: 'src/app/admin/components/AdminSidebar.jsx',
    // No changes needed as lucide-react exports the same icon names
  },
  {
    path: 'src/components/navbar/AdminActions.jsx',
    // No changes needed as lucide-react exports the same icon names
  }
];

// Update the imports in each file
filesToUpdate.forEach(fileInfo => {
  const filePath = path.join(process.cwd(), fileInfo.path);
  
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update the import statement
    content = content.replace(
      /from ['"]react-icons\/fi['"]/g,
      "from 'lucide-react'"
    );
    
    // Write the updated content back to the file
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ Updated ${filePath}`);
  } else {
    console.warn(`⚠️  File not found: ${filePath}`);
  }
});

console.log('\n🎉 Icon migration completed!');
