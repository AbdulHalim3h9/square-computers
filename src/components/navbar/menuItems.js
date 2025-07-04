export const menuItems = [
  {
    title: 'About',
    submenu: [
      { name: 'Chairman Speech', href: '/about/chairman-speech' },
      { name: 'MD Speech', href: '/about/md-speech' },
      { name: 'Mission & Vision', href: '/about/mission-vision' },
      { name: 'Why Us', href: '/about/why-us' },
      { name: 'Our Team', href: '/team' },
      { name: 'Life at Square Computer\'s', href: '/about/life' }
    ]
  },
  {
    title: 'Products',
    isMegaMenu: true,
    submenu: [
      {
        category: 'Computer & Laptop',
        items: [
          { name: 'Desktop Computers', href: '/products?category=desktops' },
          { name: 'Laptops', href: '/products?category=laptops' },
          { name: 'Workstations', href: '/products?category=workstations' },
          { name: 'Servers', href: '/products?category=servers' },
          { name: 'View All', href: '/products?category=computers', isViewAll: true }
        ]
      },
      {
        category: 'Computer & IT Accessories',
        items: [
          { name: 'Keyboards & Mice', href: '/products?category=keyboards-mice' },
          { name: 'Monitors', href: '/products?category=monitors' },
          { name: 'Printers & Scanners', href: '/products?category=printers' },
          { name: 'Networking Devices', href: '/products?category=networking' },
          { name: 'Storage Devices', href: '/products?category=storage' },
          { name: 'View All', href: '/products?category=it-accessories', isViewAll: true }
        ]
      },
      {
        category: 'Access Control and Time Attendance',
        items: [
          { name: 'Fingerprint Devices', href: '/products?category=fingerprint' },
          { name: 'Face Recognition', href: '/products?category=face-recognition' },
          { name: 'RFID Systems', href: '/products?category=rfid' },
          { name: 'Turnstiles', href: '/products?category=turnstiles' },
          { name: 'Access Control Kits', href: '/products?category=access-control-kits' },
          { name: 'View All', href: '/products?category=access-control', isViewAll: true }
        ]
      },
      {
        category: 'Security Surveillance',
        items: [
          { name: 'IP Cameras', href: '/products?category=ip-cameras' },
          { name: 'CCTV Cameras', href: '/products?category=cctv' },
          { name: 'DVR/NVR Systems', href: '/products?category=dvr-nvr' },
          { name: 'Video Door Phones', href: '/products?category=door-phones' },
          { name: 'View All', href: '/products?category=security', isViewAll: true }
        ]
      },
      {
        category: 'Networking Components',
        items: [
          { name: 'Routers', href: '/products?category=routers' },
          { name: 'Switches', href: '/products?category=switches' },
          { name: 'Access Points', href: '/products?category=access-points' },
          { name: 'Network Cables', href: '/products?category=cables' },
          { name: 'View All', href: '/products?category=networking', isViewAll: true }
        ]
      },
      {
        category: 'Point Of Sale - POS',
        items: [
          { name: 'POS Systems', href: '/products?category=pos-systems' },
          { name: 'Barcode Scanners', href: '/products?category=barcode-scanners' },
          { name: 'Receipt Printers', href: '/products?category=receipt-printers' },
          { name: 'Cash Drawers', href: '/products?category=cash-drawers' },
          { name: 'View All', href: '/products?category=pos', isViewAll: true }
        ]
      },
      {
        category: 'Display Solutions',
        items: [
          { name: 'Digital Signage', href: '/products?category=digital-signage' },
          { name: 'Video Walls', href: '/products?category=video-walls' },
          { name: 'Interactive Displays', href: '/products?category=interactive-displays' },
          { name: 'Commercial TVs', href: '/products?category=commercial-tvs' },
          { name: 'View All', href: '/products?category=displays', isViewAll: true }
        ]
      },
      {
        category: 'Gadgets and Accessories',
        items: [
          { name: 'Smart Watches', href: '/products?category=smart-watches' },
          { name: 'Wireless Earbuds', href: '/products?category=earbuds' },
          { name: 'Power Banks', href: '/products?category=power-banks' },
          { name: 'Mobile Accessories', href: '/products?category=mobile-accessories' },
          { name: 'View All', href: '/products?category=gadgets', isViewAll: true }
        ]
      },
      {
        category: 'IPS and Battery',
        items: [
          { name: 'Home IPS', href: '/products?category=home-ips' },
          { name: 'Commercial IPS', href: '/products?category=commercial-ips' },
          { name: 'Batteries', href: '/products?category=batteries' },
          { name: 'Stabilizers', href: '/products?category=stabilizers' },
          { name: 'View All', href: '/products?category=ips', isViewAll: true }
        ]
      },
      {
        category: 'Sound System',
        items: [
          { name: 'PA Systems', href: '/products?category=pa-systems' },
          { name: 'Speakers', href: '/products?category=speakers' },
          { name: 'Microphones', href: '/products?category=microphones' },
          { name: 'Amplifiers', href: '/products?category=amplifiers' },
          { name: 'View All', href: '/products?category=sound-systems', isViewAll: true }
        ]
      },
      {
        category: 'Home & Office Automation',
        items: [
          { name: 'P2P Camera', href: '/collections/p2p-camera' },
          { name: 'Video Doorbell', href: '/collections/video-doorbell-best-price-in-bangladesh' },
          { name: 'Burglar Alarm', href: '/collections/burglar-alarm' },
          { name: 'Webcam', href: '/collections/webcam' },
          { name: 'Accessories', href: '/collections/home-automation-accessories' },
          { name: 'Software', href: '/collections/software-home-office-automation' },
          { name: 'Restaurant Calling System', href: '/collections/restaurant-calling-system' },
          { name: 'Server Rack', href: '/collections/server-rack' },
          { name: 'Passport Scanner', href: '/collections/passport-scanner' },
          { name: 'View All', href: '/collections/home-office-automation', isViewAll: true }
        ]
      },
      {
        category: 'Computer & Laptop',
        items: [
          { name: 'Desktop Computers', href: '/collections/desktop-computers' },
          { name: 'Laptops', href: '/collections/laptops' },
          { name: 'Workstations', href: '/collections/workstations' },
          { name: 'Servers', href: '/collections/servers' },
          { name: 'View All', href: '/products/computers-laptops', isViewAll: true }
        ]
      },
      {
        category: 'Computer & IT Accessories',
        items: [
          { name: 'Keyboards', href: '/collections/keyboards' },
          { name: 'Mice', href: '/collections/mice' },
          { name: 'Monitors', href: '/collections/monitors' },
          { name: 'Printers', href: '/collections/printers' },
          { name: 'View All', href: '/products/it-accessories', isViewAll: true }
        ]
      },
      {
        category: 'IPS and Battery',
        items: [
          { name: 'IPS', href: '/collections/ips' },
          { name: 'Battery', href: '/collections/batteries' },
          { name: 'Solar Solutions', href: '/collections/solar-solutions' },
          { name: 'View All', href: '/products/ips-battery', isViewAll: true }
        ]
      },
      {
        category: 'Sound System',
        items: [
          { name: 'Speakers', href: '/collections/speakers' },
          { name: 'Amplifiers', href: '/collections/amplifiers' },
          { name: 'Mixers', href: '/collections/mixers' },
          { name: 'Microphones', href: '/collections/microphones' },
          { name: 'View All', href: '/products/sound-system', isViewAll: true }
        ]
      }
    ]
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
      { name: 'Air & Bus Ticket', href: '/services/tickets' }
    ]
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
      { name: 'HP', href: '/brands/hp' }
    ]
  },

  {
    title: 'Build Solution',
    href: '/build-solution'
  },
  {
    title: 'Support',
    submenu: [
      { name: 'Technical Support', href: '/support/technical-support' },
      { name: 'ZKTeco Product Verification', href: 'https://www.zkteco.com/en/anti_counterfeiting_enquiry', external: true },
      { name: 'Software Download Center', href: '/support/downloads' },
      { name: 'PR', href: '/support/pr' }
    ]
  },
  {
    title: 'Login',
    href: '/login',
    icon: (
      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    )
  }
];
