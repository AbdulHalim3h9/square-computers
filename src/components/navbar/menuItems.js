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
        category: 'Access Control and Time Attendance',
        items: [
          { name: 'Fingerprint Time Attendance', href: '/collections/fingerprint' },
          { name: 'Face Recognition', href: '/collections/face-recognition-device' },
          { name: 'RFID Card', href: '/collections/rfid-card' },
          { name: 'Palm Recognition', href: '/collections/palm-recognition' },
          { name: 'IRIS', href: '/collections/iris' },
          { name: 'Readers & Accessories', href: '/collections/readers-and-accessories' },
          { name: 'Software', href: '/collections/software' },
          { name: 'Fingerprint Scanner', href: '/collections/fingerprint-scanner' },
          { name: 'Exit Button', href: '/collections/exit-button' },
          { name: 'Controller', href: '/collections/control-terminal' },
          { name: 'EM Lock', href: '/collections/door-em-lock' },
          { name: 'View All', href: '/collections/access-control-time-attendance', isViewAll: true }
        ]
      },
      {
        category: 'Security Surveillance',
        items: [
          { name: 'IP Camera', href: '/collections/ip-camera' },
          { name: 'HD Camera', href: '/collections/hd-camera' },
          { name: 'Wifi Camera', href: '/collections/wifi-camera' },
          { name: 'DVR', href: '/collections/dvr' },
          { name: 'NVR', href: '/collections/nvr' },
          { name: 'Accessories', href: '/collections/security-surveillance-accessories' },
          { name: 'Power Adapter', href: '/collections/power-adapter' },
          { name: 'View All', href: '/collections/cctv-surveillance', isViewAll: true }
        ]
      },
      {
        category: 'Smart Lock',
        items: [
          { name: 'Hotel Door Lock', href: '/collections/hotel-door-lock' },
          { name: 'Home Door Lock', href: '/collections/home-door-lock' },
          { name: 'View All', href: '/collections/smart-lock', isViewAll: true }
        ]
      },
      {
        category: 'Networking Components',
        items: [
          { name: 'Router', href: '/collections/router' },
          { name: 'Switch', href: '/collections/network-switch' },
          { name: 'Accessories', href: '/collections/network-accessories' },
          { name: 'Server PC', href: '/collections/server-pc' },
          { name: 'UTP Cable', href: '/collections/utp-cable' },
          { name: 'View All', href: '/collections/networking-components', isViewAll: true }
        ]
      },
      {
        category: 'Security & Vehicle Scanner',
        items: [
          { name: 'Archway Metal Detector', href: '/collections/archway-metal-detector-gate' },
          { name: 'Hand Held Metal Detector', href: '/collections/hand-held-metal-detector' },
          { name: 'X-ray Baggage Scanner', href: '/collections/xray-baggage-scanner' },
          { name: 'Vehicle Inspection', href: '/collections/vehicle-inspection' },
          { name: 'EAS System', href: '/collections/eas-system' },
          { name: 'Liquid Detector', href: '/collections/liquid-detector' },
          { name: 'Accessories', href: '/collections/vehicle-accessories' },
          { name: 'View All', href: '/collections/security-and-vehicle-scanner', isViewAll: true }
        ]
      },
      {
        category: 'Point Of Sale - POS',
        items: [
          { name: 'POS Terminal', href: '/collections/pos-terminal' },
          { name: 'Barcode Scanner', href: '/collections/barcode-scanner' },
          { name: 'Thermal Printer', href: '/collections/thermal-printer' },
          { name: 'Cash Drawer', href: '/collections/cash-drawer' },
          { name: 'Handheld POS', href: '/collections/handheld-pos' },
          { name: 'View All', href: '/collections/point-of-sale-pos', isViewAll: true }
        ]
      },
      {
        category: 'Display Solutions',
        items: [
          { name: 'Monitor', href: '/collections/monitor' },
          { name: 'Interactive Display', href: '/collections/interactive-display-price-in-bd' },
          { name: 'Accessories', href: '/collections/accessories' },
          { name: 'View All', href: '/collections/display-solutions', isViewAll: true }
        ]
      },
      {
        category: 'Gadgets and Accessories',
        items: [
          { name: 'Speaker', href: '/collections/speaker' },
          { name: 'Power Bank', href: '/collections/power-bank' },
          { name: 'Data Cable', href: '/collections/data-cable' },
          { name: 'Earphone', href: '/collections/earphone' },
          { name: 'Charger', href: '/collections/charger' },
          { name: 'Battery', href: '/collections/battery' },
          { name: 'Power Socket', href: '/collections/power-socket' },
          { name: 'View All', href: '/collections/gadgets-and-accessories', isViewAll: true }
        ]
      },
      {
        category: 'ID-Card Solution',
        items: [
          { name: 'Card Printer', href: '/collections/card-printer' },
          { name: 'Accessories', href: '/collections/id-card-accessories' },
          { name: 'View All', href: '/collections/id-card-solution', isViewAll: true }
        ]
      },
      {
        category: 'PA & Conference System',
        items: [
          { name: 'Microphone', href: '/collections/microphone' },
          { name: 'Amplifier', href: '/collections/amplifier' },
          { name: 'Speaker', href: '/collections/speaker-system' },
          { name: 'Conference Camera', href: '/collections/conference-camera' },
          { name: 'IP PA System', href: '/collections/ip-pa-system' },
          { name: 'PA Conference System', href: '/collections/pa-conference' },
          { name: 'View All', href: '/collections/pa-conference-system', isViewAll: true }
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
    title: 'Our Clients',
    href: '/clients'
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
