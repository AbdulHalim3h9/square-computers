export const menuItems = [
  {
    title: 'About',
    submenu: [
      { name: 'Chairman Speech', href: '/about/chairman-speech' },
      { name: 'MD Speech', href: '/about/md-speech' },
      { name: 'Mission & Vision', href: '/about/mission-vision' },
      { name: 'Why Us', href: '/about/why-us' },
      { name: 'Our Team', href: '/team' },
      { name: 'Life at Square Computers', href: '/about/life' },
    ],
  },
  {
    title: 'Products',
    isMegaMenu: true,
    submenu: [
      {
        category: 'Computer & Laptop',
        items: [
          { name: 'Desktop Computers', href: '/collections/desktop-computers' },
          { name: 'Laptops', href: '/collections/laptops' },
          { name: 'Workstations', href: '/collections/workstations' },
          { name: 'Servers', href: '/collections/servers' },
          { name: 'View All', href: '/collections/computers-laptops', isViewAll: true },
        ],
      },
      {
        category: 'Computer & IT Accessories',
        items: [
          { name: 'Keyboards', href: '/collections/keyboards' },
          { name: 'Mice', href: '/collections/mice' },
          { name: 'Monitors', href: '/collections/monitors' },
          { name: 'Printers', href: '/collections/printers' },
          { name: 'Storage Devices', href: '/collections/storage' },
          { name: 'View All', href: '/collections/it-accessories', isViewAll: true },
        ],
      },
      {
        category: 'Access Control and Time Attendance',
        items: [
          { name: 'Fingerprint Devices', href: '/collections/fingerprint' },
          { name: 'Face Recognition', href: '/collections/face-recognition' },
          { name: 'RFID Systems', href: '/collections/rfid' },
          { name: 'Turnstiles', href: '/collections/turnstiles' },
          { name: 'Access Control Kits', href: '/collections/access-control-kits' },
          { name: 'View All', href: '/collections/access-control', isViewAll: true },
        ],
      },
      {
        category: 'Security Surveillance',
        items: [
          { name: 'IP Cameras', href: '/collections/ip-cameras' },
          { name: 'CCTV Cameras', href: '/collections/cctv' },
          { name: 'DVR/NVR Systems', href: '/collections/dvr-nvr' },
          { name: 'Video Door Phones', href: '/collections/door-phones' },
          { name: 'View All', href: '/collections/security', isViewAll: true },
        ],
      },
      {
        category: 'Networking Components',
        items: [
          { name: 'Routers', href: '/collections/routers' },
          { name: 'Switches', href: '/collections/switches' },
          { name: 'Access Points', href: '/collections/access-points' },
          { name: 'Network Cables', href: '/collections/cables' },
          { name: 'View All', href: '/collections/networking', isViewAll: true },
        ],
      },
      {
        category: 'Point Of Sale - POS',
        items: [
          { name: 'POS Systems', href: '/collections/pos-systems' },
          { name: 'Barcode Scanners', href: '/collections/barcode-scanners' },
          { name: 'Receipt Printers', href: '/collections/receipt-printers' },
          { name: 'Cash Drawers', href: '/collections/cash-drawers' },
          { name: 'View All', href: '/collections/pos', isViewAll: true },
        ],
      },
      {
        category: 'Display Solutions',
        items: [
          { name: 'Digital Signage', href: '/collections/digital-signage' },
          { name: 'Video Walls', href: '/collections/video-walls' },
          { name: 'Interactive Displays', href: '/collections/interactive-displays' },
          { name: 'Commercial TVs', href: '/collections/commercial-tvs' },
          { name: 'View All', href: '/collections/displays', isViewAll: true },
        ],
      },
      {
        category: 'Gadgets and Accessories',
        items: [
          { name: 'Smart Watches', href: '/collections/smart-watches' },
          { name: 'Wireless Earbuds', href: '/collections/earbuds' },
          { name: 'Power Banks', href: '/collections/power-banks' },
          { name: 'Mobile Accessories', href: '/collections/mobile-accessories' },
          { name: 'View All', href: '/collections/gadgets', isViewAll: true },
        ],
      },
      {
        category: 'IPS and Battery',
        items: [
          { name: 'Home IPS', href: '/collections/home-ips' },
          { name: 'Commercial IPS', href: '/collections/commercial-ips' },
          { name: 'Batteries', href: '/collections/batteries' },
          { name: 'Solar Solutions', href: '/collections/solar-solutions' },
          { name: 'View All', href: '/collections/ips-battery', isViewAll: true },
        ],
      },
      {
        category: 'Sound System',
        items: [
          { name: 'PA Systems', href: '/collections/pa-systems' },
          { name: 'Speakers', href: '/collections/speakers' },
          { name: 'Microphones', href: '/collections/microphones' },
          { name: 'Amplifiers', href: '/collections/amplifiers' },
          { name: 'View All', href: '/collections/sound-system', isViewAll: true },
        ],
      },
      {
        category: 'Home & Office Automation',
        items: [
          { name: 'P2P Camera', href: '/collections/p2p-camera' },
          { name: 'Video Doorbell', href: '/collections/video-doorbell' },
          { name: 'Burglar Alarm', href: '/collections/burglar-alarm' },
          { name: 'Webcam', href: '/collections/webcam' },
          { name: 'Accessories', href: '/collections/home-automation-accessories' },
          { name: 'Software', href: '/collections/software-home-office-automation' },
          { name: 'Restaurant Calling System', href: '/collections/restaurant-calling-system' },
          { name: 'Server Rack', href: '/collections/server-rack' },
          { name: 'Passport Scanner', href: '/collections/passport-scanner' },
          { name: 'View All', href: '/collections/home-office-automation', isViewAll: true },
        ],
      },
    ],
  },
  {
    title: 'Services',
    href: '/services',
    submenu: [
      { name: 'All Services', href: '/services' },
      { name: 'Networking & IT Support', href: '/services/networking' },
      { name: 'Domain & Hosting Service', href: '/services/hosting' },
      { name: 'Web Design & Development', href: '/services/web-design' },
      { name: 'Software & Bulk SMS', href: '/services/software-sms' },
      { name: 'Social Media Marketing', href: '/services/social-media' },
      { name: 'Printing & Graphic Design', href: '/services/printing' },
      { name: 'Visa Service', href: '/services/visa' },
      { name: 'Air & Bus Ticket', href: '/services/tickets' },
    ],
  },
  {
    title: 'Brands',
    href: '/brands',
    submenu: [
      { name: 'All Brands', href: '/brands' },
      { name: 'Zkteco', href: '/brands/zkteco' },
      { name: 'HIKVISION', href: '/brands/hikvision' },
      { name: 'Ezviz', href: '/brands/ezviz' },
      { name: 'Dell', href: '/brands/dell' },
      { name: 'LG', href: '/brands/lg' },
      { name: 'Samsung', href: '/brands/samsung' },
      { name: 'HP', href: '/brands/hp' },
    ],
  },
  {
    title: 'Build Solution',
    href: '/build-solution',
  },
  {
    title: 'Support',
    submenu: [
      { name: 'Technical Support', href: '/support/technical-support' },
      { name: 'ZKTeco Product Verification', href: 'https://www.zkteco.com/en/anti_counterfeiting_enquiry', external: true },
      { name: 'Software Download Center', href: '/support/downloads' },
      { name: 'PR', href: '/support/pr' },
    ],
  },
  {
    title: 'Admin Panel',
    href: '/admin/dashboard',
    requiresAuth: true,
    specialClass: 'bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:from-blue-700 hover:to-blue-900',
    icon: (
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" 
        />
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth="2" 
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
        />
      </svg>
    ),
  },
  {
    title: 'Login',
    href: '/login',
    icon: (
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
];