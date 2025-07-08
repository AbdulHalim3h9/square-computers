export const products = [
  // ===== Computer & Laptop =====
  // Desktop Computers
  {
    id: 1,
    slug: 'elite-pro-desktop',
    name: 'Elite Pro Desktop',
    category: 'desktop-computers',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed',
    images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'High-performance desktop computer for professionals',
    details: [
      'Intel Core i9-13900K (24-Core)',
      'NVIDIA RTX 4080 16GB',
      '32GB DDR5 RAM',
      '2TB NVMe SSD + 4TB HDD',
      'Windows 11 Pro',
      'Wi-Fi 6E & Bluetooth 5.3',
      'Liquid Cooling System'
    ],
    specifications: {
      processor: 'Intel Core i9-13900K',
      graphics: 'NVIDIA RTX 4080 16GB',
      memory: '32GB DDR5',
      storage: '2TB NVMe + 4TB HDD',
      warranty: '3 Years Limited'
    }
  },
  {
    id: 47,
    slug: 'gamer-x-desktop',
    name: 'Gamer X Desktop',
    category: 'desktop-computers',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1593642702821-c0d9b8e2e6e8',
    images: ['https://images.unsplash.com/photo-1593642702821-c0d9b8e2e6e8', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed'],
    description: 'Affordable gaming desktop with solid performance',
    details: [
      'AMD Ryzen 5 5600X',
      'NVIDIA GTX 1660 Super',
      '16GB DDR4 RAM',
      '1TB NVMe SSD',
      'Windows 11 Home',
      'RGB Lighting',
      'Air Cooling'
    ],
    specifications: {
      processor: 'AMD Ryzen 5 5600X',
      graphics: 'NVIDIA GTX 1660 Super',
      memory: '16GB DDR4',
      storage: '1TB NVMe SSD',
      warranty: '2 Years Limited'
    }
  },

  // Laptops
  {
    id: 2,
    slug: 'ultrabook-pro',
    name: 'UltraBook Pro',
    category: 'laptops',
    price: 1499.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c'],
    description: 'Premium ultrabook with 4K display',
    details: [
      '14" 4K UHD Touch Display',
      'Intel Core i7-1360P',
      '32GB LPDDR5 RAM',
      '1TB PCIe Gen4 SSD',
      'Windows 11 Pro',
      'Up to 14 hours battery',
      'Thunderbolt 4'
    ],
    specifications: {
      display: '14" 4K UHD Touch',
      processor: 'Intel Core i7-1360P',
      memory: '32GB LPDDR5',
      storage: '1TB PCIe Gen4 SSD',
      warranty: '2 Years Premium'
    }
  },
  {
    id: 48,
    slug: 'slimbook-lite',
    name: 'SlimBook Lite',
    category: 'laptops',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c',
    images: ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Lightweight laptop for everyday use',
    details: [
      '13.3" FHD Display',
      'Intel Core i5-1235U',
      '16GB DDR4 RAM',
      '512GB SSD',
      'Windows 11 Home',
      'Up to 10 hours battery',
      'USB-C Charging'
    ],
    specifications: {
      display: '13.3" FHD',
      processor: 'Intel Core i5-1235U',
      memory: '16GB DDR4',
      storage: '512GB SSD',
      warranty: '1 Year Limited'
    }
  },

  // Workstations
  {
    id: 3,
    slug: 'pro-workstation-z6',
    name: 'Pro Workstation Z6',
    category: 'workstations',
    price: 3499.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed'],
    description: 'Professional workstation for CAD and 3D modeling',
    details: [
      'Dual Xeon Silver 4314 (32-Core)',
      'NVIDIA RTX A6000 48GB',
      '128GB DDR4 ECC RAM',
      '2TB NVMe SSD + 8TB HDD',
      'Windows 11 Pro for Workstations',
      '2000W 80+ Platinum PSU',
      'Liquid Cooling System'
    ],
    specifications: {
      processor: 'Dual Xeon Silver 4314',
      graphics: 'NVIDIA RTX A6000 48GB',
      memory: '128GB DDR4 ECC',
      storage: '2TB NVMe + 8TB HDD',
      warranty: '5 Years Onsite'
    }
  },
  {
    id: 49,
    slug: 'workstation-z4',
    name: 'Workstation Z4',
    category: 'workstations',
    price: 2499.99,
    image: 'https://images.unsplash.com/photo-1593642702821-c0d9b8e2e6e8',
    images: ['https://images.unsplash.com/photo-1593642702821-c0d9b8e2e6e8', 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed'],
    description: 'Mid-range workstation for professional tasks',
    details: [
      'Intel Xeon W-1250',
      'NVIDIA Quadro P4000',
      '64GB DDR4 ECC RAM',
      '1TB NVMe SSD',
      'Windows 11 Pro',
      '800W PSU',
      'Air Cooling'
    ],
    specifications: {
      processor: 'Intel Xeon W-1250',
      graphics: 'NVIDIA Quadro P4000',
      memory: '64GB DDR4 ECC',
      storage: '1TB NVMe SSD',
      warranty: '3 Years Onsite'
    }
  },

  // Servers
  {
    id: 4,
    slug: 'enterprise-server-x10',
    name: 'Enterprise Server X10',
    category: 'servers',
    price: 8999.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'High-density enterprise server for data centers',
    details: [
      'Dual AMD EPYC 7763 (128-Core)',
      '1TB DDR4 ECC RAM',
      '8TB NVMe + 100TB HDD',
      'Dual 2000W Hot-Swap PSU',
      '4x 25GbE Network Ports',
      'Redundant Cooling',
      '2U Rackmount'
    ],
    specifications: {
      processor: 'Dual AMD EPYC 7763',
      memory: '1TB DDR4 ECC',
      storage: '8TB NVMe + 100TB HDD',
      network: '4x 25GbE',
      warranty: '5 Years 24/7 Support'
    }
  },
  {
    id: 50,
    slug: 'blade-server-x5',
    name: 'Blade Server X5',
    category: 'servers',
    price: 5999.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Compact blade server for high-performance computing',
    details: [
      'Single AMD EPYC 7502',
      '512GB DDR4 ECC RAM',
      '4TB NVMe SSD',
      'Dual 1600W PSU',
      '2x 10GbE Ports',
      'Active Cooling',
      '1U Blade'
    ],
    specifications: {
      processor: 'AMD EPYC 7502',
      memory: '512GB DDR4 ECC',
      storage: '4TB NVMe SSD',
      network: '2x 10GbE',
      warranty: '3 Years 24/7 Support'
    }
  },

  // ===== Computer & IT Accessories =====
  // Keyboards
  {
    id: 5,
    slug: 'mechanical-keyboard-pro',
    name: 'Mechanical Keyboard Pro',
    category: 'keyboards',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1597696929736-6d3b6b9e8c8e',
    images: ['https://images.unsplash.com/photo-1597696929736-6d3b6b9e8c8e', 'https://images.unsplash.com/photo-1618383676856-65a5d9d5e741'],
    description: 'Professional mechanical keyboard with RGB lighting',
    details: [
      'Cherry MX Red Switches',
      'RGB Backlit',
      'Aluminum Frame',
      'USB-C Connectivity',
      'N-Key Rollover',
      'Detachable Wrist Rest',
      'Mac & Windows Compatible'
    ],
    specifications: {
      switchType: 'Cherry MX Red',
      backlight: 'RGB',
      connectivity: 'USB-C',
      layout: 'Full-size',
      warranty: '2 Years Limited'
    }
  },
  {
    id: 51,
    slug: 'compact-mechanical-keyboard',
    name: 'Compact Mechanical Keyboard',
    category: 'keyboards',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1618383676856-65a5d9d5e741',
    images: ['https://images.unsplash.com/photo-1618383676856-65a5d9d5e741', 'https://images.unsplash.com/photo-1597696929736-6d3b6b9e8c8e'],
    description: 'Portable mechanical keyboard with wireless connectivity',
    details: [
      'Cherry MX Blue Switches',
      'White Backlit',
      'Bluetooth 5.0',
      '60% Layout',
      'Rechargeable Battery',
      'Mac & Windows Compatible',
      'Carrying Case'
    ],
    specifications: {
      switchType: 'Cherry MX Blue',
      backlight: 'White',
      connectivity: 'Bluetooth/USB-C',
      layout: '60%',
      warranty: '1 Year Limited'
    }
  },

  // Mice
  {
    id: 6,
    slug: 'gaming-mouse-pro',
    name: 'Gaming Mouse Pro',
    category: 'mice',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46',
    images: ['https://images.unsplash.com/photo-1527864550417-7fd91fc51a46', 'https://images.unsplash.com/photo-1618383676856-65a5d9d5e741'],
    description: 'High-precision gaming mouse with customizable buttons',
    details: [
      '25600 DPI Optical Sensor',
      '11 Programmable Buttons',
      'RGB Lighting',
      '1ms Response Time',
      'Ergonomic Design',
      'Adjustable Weight System',
      'Omron Switches'
    ],
    specifications: {
      sensor: 'Optical 25600 DPI',
      buttons: '11 Programmable',
      pollingRate: '1000Hz',
      weight: '110g (adjustable)',
      warranty: '2 Years Limited'
    }
  },
  {
    id: 52,
    slug: 'wireless-office-mouse',
    name: 'Wireless Office Mouse',
    category: 'mice',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1618383676856-65a5d9d5e741',
    images: ['https://images.unsplash.com/photo-1618383676856-65a5d9d5e741', 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46'],
    description: 'Ergonomic wireless mouse for office productivity',
    details: [
      '16000 DPI Optical Sensor',
      '6 Programmable Buttons',
      '2.4GHz Wireless',
      'Rechargeable Battery',
      'Silent Clicks',
      'Ergonomic Design',
      'USB Receiver'
    ],
    specifications: {
      sensor: 'Optical 16000 DPI',
      buttons: '6 Programmable',
      connectivity: '2.4GHz Wireless',
      weight: '90g',
      warranty: '1 Year Limited'
    }
  },

  // Monitors
  {
    id: 7,
    slug: 'ultrawide-gaming-monitor',
    name: 'UltraWide Gaming Monitor',
    category: 'monitors',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1587829748821-7735f4a1e7d1',
    images: ['https://images.unsplash.com/photo-1587829748821-7735f4a1e7d1', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Immersive ultrawide gaming monitor with high refresh rate',
    details: [
      '34" 3440x1440 QHD',
      '200Hz Refresh Rate',
      '1ms Response Time',
      'HDR 1000',
      'NVIDIA G-SYNC Ultimate',
      'Curved VA Panel',
      'USB-C with 90W Power Delivery'
    ],
    specifications: {
      size: '34"',
      resolution: '3440x1440 QHD',
      refreshRate: '200Hz',
      responseTime: '1ms',
      warranty: '3 Years Limited'
    }
  },

  // Printers
  {
    id: 8,
    slug: 'laser-printer-pro',
    name: 'Laser Printer Pro',
    category: 'printers',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1612817288484-6f916006741a',
    images: ['https://images.unsplash.com/photo-1612817288484-6f916006741a', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'High-speed monochrome laser printer for office use',
    details: [
      'Up to 40ppm Print Speed',
      '1200 x 1200 dpi',
      '250-Sheet Input Tray',
      'Duplex Printing',
      'Wi-Fi & Ethernet',
      'Mobile Printing',
      'Compact Design'
    ],
    specifications: {
      type: 'Laser',
      speed: '40ppm',
      resolution: '1200 x 1200 dpi',
      connectivity: 'Wi-Fi, Ethernet, USB',
      warranty: '1 Year Limited'
    }
  },
  {
    id: 54,
    slug: 'color-inkjet-printer',
    name: 'Color Inkjet Printer',
    category: 'printers',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1612817288484-6f916006741a'],
    description: 'Versatile color inkjet printer for home and small offices',
    details: [
      'Up to 20ppm Color',
      '4800 x 1200 dpi',
      '100-Sheet Input Tray',
      'Borderless Printing',
      'Wi-Fi & USB',
      'Photo Printing',
      'Compact Design'
    ],
    specifications: {
      type: 'Inkjet',
      speed: '20ppm Color',
      resolution: '4800 x 1200 dpi',
      connectivity: 'Wi-Fi, USB',
      warranty: '1 Year Limited'
    }
  },

  // ===== Access Control and Time Attendance =====
  // Fingerprint Devices
  {
    id: 9,
    slug: 'fingerprint-scanner-pro',
    name: 'Fingerprint Scanner Pro',
    category: 'fingerprint',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'High-precision fingerprint scanner for access control',
    details: [
      'Optical Sensor',
      '1000+ Fingerprint Capacity',
      'TCP/IP, USB, Wiegand',
      '2.4" Color Screen',
      'Anti-Spoofing',
      'Weatherproof',
      'Access Control Integration'
    ],
    specifications: {
      sensor: 'Optical',
      capacity: '1000+ fingerprints',
      interfaces: 'TCP/IP, USB, Wiegand',
      display: '2.4" Color',
      warranty: '2 Years Limited'
    }
  },
  {
    id: 55,
    slug: 'fingerprint-time-clock',
    name: 'Fingerprint Time Clock',
    category: 'fingerprint',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Biometric time clock for employee attendance tracking',
    details: [
      'Capacitive Sensor',
      '2000 Fingerprint Capacity',
      'Wi-Fi & USB',
      '3.5" Touch Screen',
      'Time Tracking Software',
      'Battery Backup',
      'Cloud Integration'
    ],
    specifications: {
      sensor: 'Capacitive',
      capacity: '2000 fingerprints',
      interfaces: 'Wi-Fi, USB',
      display: '3.5" Touch',
      warranty: '2 Years Limited'
    }
  },

  // Face Recognition
  {
    id: 10,
    slug: 'face-recognition-terminal',
    name: 'Face Recognition Terminal',
    category: 'face-recognition',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Advanced face recognition terminal with temperature screening',
    details: [
      'Dual Camera System',
      'Face Recognition + Temperature',
      '5000 Face Capacity',
      '0.3s Recognition Speed',
      'IP65 Weatherproof',
      'Access Control Integration',
      'Anti-Spoofing'
    ],
    specifications: {
      recognitionSpeed: '0.3s',
      capacity: '5000 faces',
      temperatureRange: '30°C to 45°C',
      protection: 'IP65',
      warranty: '2 Years Limited'
    }
  },
  {
    id: 56,
    slug: 'face-id-access-panel',
    name: 'Face ID Access Panel',
    category: 'face-recognition',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Compact face recognition panel for secure access',
    details: [
      'Single Camera System',
      '3000 Face Capacity',
      '0.5s Recognition Speed',
      'IP54 Protection',
      'Wiegand Support',
      'Cloud Management',
      'Anti-Spoofing'
    ],
    specifications: {
      recognitionSpeed: '0.5s',
      capacity: '3000 faces',
      protection: 'IP54',
      interfaces: 'Wiegand, TCP/IP',
      warranty: '2 Years Limited'
    }
  },

  // RFID Systems
  {
    id: 11,
    slug: 'rfid-access-system',
    name: 'RFID Access System',
    category: 'rfid',
    price: 349.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Complete RFID access control system',
    details: [
      '125KHz & 13.56MHz Support',
      '1000 User Capacity',
      'Wiegand Output',
      'Built-in Keypad',
      'TCP/IP Communication',
      'Anti-Passback',
      'Multi-Door Support'
    ],
    specifications: {
      frequency: '125KHz & 13.56MHz',
      capacity: '1000 users',
      interfaces: 'TCP/IP, Wiegand',
      power: '12V DC',
      warranty: '2 Years Limited'
    }
  },
  {
    id: 57,
    slug: 'rfid-card-reader',
    name: 'RFID Card Reader',
    category: 'rfid',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Compact RFID reader for access control',
    details: [
      '13.56MHz Support',
      '500 User Capacity',
      'Wiegand Output',
      'IP65 Weatherproof',
      'USB Connectivity',
      'Proximity Detection',
      'LED Indicators'
    ],
    specifications: {
      frequency: '13.56MHz',
      capacity: '500 users',
      interfaces: 'Wiegand, USB',
      protection: 'IP65',
      warranty: '1 Year Limited'
    }
  },

  // Turnstiles
  {
    id: 12,
    slug: 'tripod-turnstile',
    name: 'Tripod Turnstile',
    category: 'turnstiles',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Heavy-duty tripod turnstile for high-security areas',
    details: [
      'Stainless Steel Construction',
      '120° Rotation',
      'Emergency Free Exit',
      'Access Control Integration',
      'LED Indicators',
      'Weatherproof',
      'Anti-Tailgating'
    ],
    specifications: {
      material: 'Stainless Steel',
      rotation: '120°',
      power: '24V DC',
      operatingTemp: '-20°C to 60°C',
      warranty: '2 Years Limited'
    }
  },
  {
    id: 58,
    slug: 'swing-gate-turnstile',
    name: 'Swing Gate Turnstile',
    category: 'turnstiles',
    price: 1999.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Elegant swing gate turnstile for premium access control',
    details: [
      'Glass & Steel Construction',
      'Bi-Directional Access',
      'Emergency Release',
      'RFID Integration',
      'LED Indicators',
      'IP54 Protection',
      'Anti-Collision'
    ],
    specifications: {
      material: 'Glass & Stainless Steel',
      operation: 'Bi-Directional',
      power: '24V DC',
      protection: 'IP54',
      warranty: '2 Years Limited'
    }
  },

  // ===== Security Surveillance =====
  // IP Cameras
  {
    id: 13,
    slug: '4k-ip-camera',
    name: '4K IP Camera',
    category: 'ip-cameras',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: '4K Ultra HD outdoor IP camera with night vision',
    details: [
      '4K Resolution (3840x2160)',
      'Night Vision up to 100ft',
      'Weatherproof IP67',
      'Power over Ethernet (PoE)',
      'Motion Detection',
      'Two-Way Audio',
      'AI Person/Vehicle Detection'
    ],
    specifications: {
      resolution: '4K (3840x2160)',
      nightVision: '100ft',
      protection: 'IP67',
      power: 'PoE',
      warranty: '3 Years Limited'
    }
  },
  {
    id: 59,
    slug: '2mp-ip-camera',
    name: '2MP IP Camera',
    category: 'ip-cameras',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Affordable 2MP IP camera for indoor surveillance',
    details: [
      '1080p Resolution',
      'Night Vision up to 50ft',
      'IP65 Weatherproof',
      'PoE Support',
      'Motion Detection',
      'Mobile App Access',
      'H.265 Compression'
    ],
    specifications: {
      resolution: '1080p (1920x1080)',
      nightVision: '50ft',
      protection: 'IP65',
      power: 'PoE',
      warranty: '2 Years Limited'
    }
  },

  // CCTV Cameras
  {
    id: 14,
    slug: 'hd-cctv-camera',
    name: 'HD CCTV Camera',
    category: 'cctv',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'HD CCTV camera for 24/7 surveillance',
    details: [
      '1080p Full HD',
      'Night Vision up to 65ft',
      'Weatherproof',
      '2.8mm Lens',
      'Wide Dynamic Range',
      'Motion Detection',
      'DVR Required'
    ],
    specifications: {
      resolution: '1080p',
      nightVision: '65ft',
      lens: '2.8mm',
      power: '12V DC',
      warranty: '2 Years Limited'
    }
  },
  {
    id: 60,
    slug: '4mp-cctv-camera',
    name: '4MP CCTV Camera',
    category: 'cctv',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'High-resolution CCTV camera for enhanced security',
    details: [
      '4MP Resolution',
      'Night Vision up to 80ft',
      'IP66 Weatherproof',
      '3.6mm Lens',
      'Smart IR',
      'Motion Detection',
      'DVR Compatible'
    ],
    specifications: {
      resolution: '4MP (2560x1440)',
      nightVision: '80ft',
      lens: '3.6mm',
      power: '12V DC',
      warranty: '2 Years Limited'
    }
  },

  // DVR/NVR Systems
  {
    id: 15,
    slug: '8-channel-nvr',
    name: '8-Channel NVR System',
    category: 'dvr-nvr',
    price: 449.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: '8-channel network video recorder with PoE',
    details: [
      '8-Port PoE NVR',
      '4K Resolution Support',
      '8TB HDD Included',
      'Remote Viewing',
      'H.265+ Compression',
      'HDMI & VGA Output',
      'Mobile App Support'
    ],
    specifications: {
      channels: '8',
      resolution: '4K',
      storage: '8TB HDD',
      compression: 'H.265+',
      warranty: '2 Years Limited'
    }
  },
  {
    id: 61,
    slug: '16-channel-nvr',
    name: '16-Channel NVR System',
    category: 'dvr-nvr',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'High-capacity NVR for large surveillance setups',
    details: [
      '16-Port PoE NVR',
      '4K Resolution Support',
      '16TB HDD Included',
      'Cloud Backup',
      'H.265+ Compression',
      'Dual HDMI Output',
      'Mobile App Support'
    ],
    specifications: {
      channels: '16',
      resolution: '4K',
      storage: '16TB HDD',
      compression: 'H.265+',
      warranty: '2 Years Limited'
    }
  },

  // Video Door Phones
  {
    id: 16,
    slug: 'video-door-phone',
    name: 'Video Door Phone System',
    category: 'door-phones',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Wireless video door phone with smartphone integration',
    details: [
      '720p HD Video',
      'Two-Way Audio',
      'Night Vision',
      'Smartphone App',
      'Wireless Connection',
      'Motion Detection',
      'Cloud Storage'
    ],
    specifications: {
      resolution: '720p HD',
      connection: 'Wireless',
      power: 'Battery/Power Adapter',
      storage: 'Cloud/Local',
      warranty: '2 Years Limited'
    }
  },
  {
    id: 62,
    slug: '4k-video-door-phone',
    name: '4K Video Door Phone',
    category: 'door-phones',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'High-resolution video door phone with advanced features',
    details: [
      '4K UHD Video',
      'Two-Way Audio',
      'Night Vision 50ft',
      'Smartphone App',
      'Wi-Fi & PoE',
      'Motion Detection',
      'Local & Cloud Storage'
    ],
    specifications: {
      resolution: '4K UHD',
      connection: 'Wi-Fi/PoE',
      power: 'Battery/Wired',
      storage: 'Cloud/SD Card',
      warranty: '2 Years Limited'
    }
  },

  // ===== Networking Components =====
  // Routers
  {
    id: 17,
    slug: 'wifi-6-router',
    name: 'WiFi 6 Router',
    category: 'routers',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Next-generation WiFi 6 router with advanced features',
    details: [
      'AX6000 Dual-Band',
      '8 High-Gain Antennas',
      'OFDMA & MU-MIMO',
      '2.5G WAN Port',
      '8 Gigabit LAN Ports',
      'Advanced QoS',
      'Parental Controls'
    ],
    specifications: {
      standard: 'WiFi 6 (802.11ax)',
      speed: 'AX6000 (574 + 4804 + 600 Mbps)',
      ports: '1x 2.5G WAN, 8x Gigabit LAN',
      antennas: '8 External',
      warranty: '2 Years Limited'
    }
  },
  {
    id: 63,
    slug: 'wifi-6e-router',
    name: 'WiFi 6E Router',
    category: 'routers',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Cutting-edge WiFi 6E router with tri-band support',
    details: [
      'AXE11000 Tri-Band',
      '12 High-Gain Antennas',
      'OFDMA & MU-MIMO',
      '2.5G WAN/LAN Port',
      'Advanced Security',
      'Smart Home Integration',
      'Mesh Compatible'
    ],
    specifications: {
      standard: 'WiFi 6E (802.11axe)',
      speed: 'AXE11000 (1200 + 4800 + 5400 Mbps)',
      ports: '1x 2.5G WAN, 4x Gigabit LAN',
      antennas: '12 External',
      warranty: '2 Years Limited'
    }
  },

  // Switches
  {
    id: 18,
    slug: '24-port-poe-switch',
    name: '24-Port PoE+ Switch',
    category: 'switches',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Managed PoE+ switch with 24 ports',
    details: [
      '24x 10/100/1000Mbps Ports',
      '24x PoE+ Ports (30W/Port)',
      '4x SFP Uplink Ports',
      '190W PoE Budget',
      'Layer 2+ Features',
      'VLAN Support',
      'Rack-Mountable'
    ],
    specifications: {
      ports: '24x 10/100/1000Mbps PoE+',
      poeBudget: '190W',
      uplink: '4x SFP',
      management: 'Web/CLI/SNMP',
      warranty: 'Lifetime Limited'
    }
  },
  {
    id: 64,
    slug: '8-port-poe-switch',
    name: '8-Port PoE+ Switch',
    category: 'switches',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Compact PoE+ switch for small networks',
    details: [
      '8x 10/100/1000Mbps Ports',
      '8x PoE+ Ports (30W/Port)',
      '2x SFP Uplink Ports',
      '120W PoE Budget',
      'VLAN Support',
      'Fanless Design',
      'Desktop/Rack-Mountable'
    ],
    specifications: {
      ports: '8x 10/100/1000Mbps PoE+',
      poeBudget: '120W',
      uplink: '2x SFP',
      management: 'Web/SNMP',
      warranty: '2 Years Limited'
    }
  },

  // Access Points
  {
    id: 19,
    slug: 'wifi-6-access-point',
    name: 'WiFi 6 Access Point',
    category: 'access-points',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Enterprise-grade WiFi 6 access point',
    details: [
      'WiFi 6 (802.11ax)',
      'Dual-Band AX3000',
      '2.5G Ethernet Uplink',
      'MU-MIMO & OFDMA',
      'Seamless Roaming',
      'PoE+ Powered',
      'Cloud Management'
    ],
    specifications: {
      standard: 'WiFi 6 (802.11ax)',
      speed: 'AX3000',
      maxClients: '300+',
      power: '802.3at PoE+',
      warranty: '2 Years Limited'
    }
  },
  {
    id: 65,
    slug: 'wifi-6e-access-point',
    name: 'WiFi 6E Access Point',
    category: 'access-points',
    price: 399.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'High-performance WiFi 6E access point for large networks',
    details: [
      'WiFi 6E (802.11axe)',
      'Tri-Band AXE5400',
      '2.5G Ethernet Uplink',
      'MU-MIMO & OFDMA',
      'Seamless Roaming',
      'PoE++ Powered',
      'Cloud Management'
    ],
    specifications: {
      standard: 'WiFi 6E (802.11axe)',
      speed: 'AXE5400',
      maxClients: '500+',
      power: '802.3bt PoE++',
      warranty: '2 Years Limited'
    }
  },

  // Network Cables
  {
    id: 20,
    slug: 'cat6a-ethernet-cable',
    name: 'Cat6a Ethernet Cable',
    category: 'cables',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Shielded Cat6a Ethernet cable for high-speed networks',
    details: [
      '10Gbps up to 100m',
      'Shielded (STP)',
      'Gold-Plated Connectors',
      'Snagless Design',
      'CMR Rated',
      '100% Copper',
      '25ft Length'
    ],
    specifications: {
      category: 'Cat6a',
      speed: '10Gbps',
      length: '25ft',
      shielding: 'F/UTP',
      warranty: 'Lifetime Limited'
    }
  },
  {
    id: 66,
    slug: 'cat7-ethernet-cable',
    name: 'Cat7 Ethernet Cable',
    category: 'cables',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'High-speed Cat7 Ethernet cable for advanced networks',
    details: [
      '40Gbps up to 50m',
      'Double Shielded (S/FTP)',
      'Gold-Plated Connectors',
      'Snagless Design',
      'CMR Rated',
      '100% Copper',
      '50ft Length'
    ],
    specifications: {
      category: 'Cat7',
      speed: '40Gbps',
      length: '50ft',
      shielding: 'S/FTP',
      warranty: 'Lifetime Limited'
    }
  },

  // ===== Point of Sale (POS) =====
  // POS Systems
  {
    id: 21,
    slug: 'all-in-one-pos',
    name: 'All-in-One POS System',
    category: 'pos-systems',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Complete all-in-one POS system for retail',
    details: [
      '15.6" Touchscreen',
      'Intel Core i5',
      '8GB RAM, 256GB SSD',
      'Built-in Receipt Printer',
      'Cash Drawer',
      'Barcode Scanner',
      'Customer Display'
    ],
    specifications: {
      display: '15.6" Touch',
      processor: 'Intel Core i5',
      memory: '8GB',
      storage: '256GB SSD',
      warranty: '1 Year Limited'
    }
  },
  {
    id: 67,
    slug: 'compact-pos-system',
    name: 'Compact POS System',
    category: 'pos-systems',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Portable POS system for small businesses',
    details: [
      '10.1" Touchscreen',
      'Intel Celeron',
      '4GB RAM, 128GB SSD',
      'Built-in Receipt Printer',
      'Wi-Fi & Bluetooth',
      'Customer Display',
      'POS Software Included'
    ],
    specifications: {
      display: '10.1" Touch',
      processor: 'Intel Celeron',
      memory: '4GB',
      storage: '128GB SSD',
      warranty: '1 Year Limited'
    }
  },

  // Barcode Scanners
  {
    id: 22,
    slug: 'wireless-barcode-scanner',
    name: 'Wireless Barcode Scanner',
    category: 'barcode-scanners',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: '2D wireless barcode scanner with charging cradle',
    details: [
      '2D Imager',
      'Bluetooth & USB Connectivity',
      '50ft Wireless Range',
      'Rechargeable Battery',
      'Omni-Directional Scanning',
      'Supports All Barcode Types',
      'Includes Charging Cradle'
    ],
    specifications: {
      type: '2D Imager',
      connection: 'Bluetooth/USB',
      range: '50ft',
      battery: 'Rechargeable',
      warranty: '2 Years Limited'
    }
  },
  {
    id: 68,
    slug: 'handheld-barcode-scanner',
    name: 'Handheld Barcode Scanner',
    category: 'barcode-scanners',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Wired handheld barcode scanner for retail',
    details: [
      '1D/2D Scanner',
      'USB Connectivity',
      'High-Speed Scanning',
      'Ergonomic Design',
      'Drop Resistant',
      'Plug & Play',
      'Supports Common Barcodes'
    ],
    specifications: {
      type: '1D/2D',
      connection: 'USB',
      speed: '300 scans/s',
      durability: '1.5m Drop',
      warranty: '1 Year Limited'
    }
  },

  // Receipt Printers
  {
    id: 23,
    slug: 'thermal-receipt-printer',
    name: 'Thermal Receipt Printer',
    category: 'receipt-printers',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'High-speed thermal receipt printer for POS',
    details: [
      '80mm Paper Width',
      '250mm/s Print Speed',
      'USB/Ethernet/Serial',
      'Auto Cutter',
      'Compact Design',
      'Easy Paper Loading',
      'Energy Efficient'
    ],
    specifications: {
      type: 'Thermal',
      speed: '250mm/s',
      width: '80mm',
      interfaces: 'USB/Ethernet/Serial',
      warranty: '1 Year Limited'
    }
  },
  {
    id: 69,
    slug: 'mobile-receipt-printer',
    name: 'Mobile Receipt Printer',
    category: 'receipt-printers',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Portable thermal receipt printer for mobile POS',
    details: [
      '58mm Paper Width',
      '100mm/s Print Speed',
      'Bluetooth & USB',
      'Rechargeable Battery',
      'Belt Clip',
      'Compact & Lightweight',
      'POS Compatible'
    ],
    specifications: {
      type: 'Thermal',
      speed: '100mm/s',
      width: '58mm',
      interfaces: 'Bluetooth/USB',
      warranty: '1 Year Limited'
    }
  },

  // Cash Drawers
  {
    id: 24,
    slug: 'heavy-duty-cash-drawer',
    name: 'Heavy-Duty Cash Drawer',
    category: 'cash-drawers',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Secure cash drawer for POS systems',
    details: [
      '5 Bill Compartments',
      '6 Coin Trays',
      'Manual Lock & Key',
      'RJ11 & USB Connectivity',
      'Durable Metal Construction',
      'Universal Compatibility',
      'Under-Counter Mountable'
    ],
    specifications: {
      material: 'Metal',
      compartments: '5 + 6',
      connection: 'RJ11/USB',
      size: 'Standard 16"',
      warranty: '1 Year Limited'
    }
  },
  {
    id: 70,
    slug: 'compact-cash-drawer',
    name: 'Compact Cash Drawer',
    category: 'cash-drawers',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Small-footprint cash drawer for retail',
    details: [
      '4 Bill Compartments',
      '5 Coin Trays',
      'Manual Lock & Key',
      'RJ11 Connectivity',
      'Steel Construction',
      'POS Compatible',
      'Space-Saving Design'
    ],
    specifications: {
      material: 'Steel',
      compartments: '4 + 5',
      connection: 'RJ11',
      size: 'Compact 13"',
      warranty: '1 Year Limited'
    }
  },

  // ===== Display Solutions =====
  // Digital Signage
  {
    id: 25,
    slug: 'digital-signage-display',
    name: '55" 4K Digital Signage Display',
    category: 'digital-signage',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Commercial-grade digital signage display for advertising',
    details: [
      '55" 4K UHD Display',
      '24/7 Operation Ready',
      'High Brightness 700 nits',
      'Built-in Media Player',
      'LAN/WiFi Connectivity',
      'Remote Management',
      'VESA Mount Compatible'
    ],
    specifications: {
      size: '55"',
      resolution: '4K UHD (3840x2160)',
      brightness: '700 nits',
      operation: '24/7',
      warranty: '3 Years Commercial'
    }
  },
  {
    id: 71,
    slug: '43-digital-signage',
    name: '43" Digital Signage Display',
    category: 'digital-signage',
    price: 799.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Compact digital signage for retail and restaurants',
    details: [
      '43" 4K UHD Display',
      '24/7 Operation',
      '500 nits Brightness',
      'Built-in Media Player',
      'Wi-Fi & USB',
      'Cloud Management',
      'Wall Mountable'
    ],
    specifications: {
      size: '43"',
      resolution: '4K UHD (3840x2160)',
      brightness: '500 nits',
      operation: '24/7',
      warranty: '2 Years Commercial'
    }
  },

  // Video Walls
  {
    id: 26,
    slug: 'video-wall-display',
    name: 'Video Wall Display System',
    category: 'video-walls',
    price: 4999.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Seamless video wall solution for control rooms and digital signage',
    details: [
      '4x 55" Displays',
      'Ultra-Narrow Bezel (1.7mm)',
      '4K Resolution Per Panel',
      'Video Wall Processor Included',
      '24/7 Operation',
      'Multi-Content Display',
      'Professional Mounting System'
    ],
    specifications: {
      configuration: '2x2 Video Wall',
      panelSize: '55" each',
      bezelWidth: '1.7mm',
      resolution: '8K Total (4x 4K)',
      warranty: '3 Years Commercial'
    }
  },
  {
    id: 72,
    slug: '3x3-video-wall',
    name: '3x3 Video Wall System',
    category: 'video-walls',
    price: 7999.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Large-scale video wall for immersive displays',
    details: [
      '9x 55" Displays',
      'Ultra-Narrow Bezel (1.7mm)',
      '4K Resolution Per Panel',
      'Video Wall Controller',
      '24/7 Operation',
      'Content Management Software',
      'Mounting System'
    ],
    specifications: {
      configuration: '3x3 Video Wall',
      panelSize: '55" each',
      bezelWidth: '1.7mm',
      resolution: '12K Total (9x 4K)',
      warranty: '3 Years Commercial'
    }
  },

  // Interactive Displays
  {
    id: 27,
    slug: 'interactive-flat-panel',
    name: '86" 4K Interactive Flat Panel',
    category: 'interactive-displays',
    price: 4499.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Interactive touch display for education and business collaboration',
    details: [
      '86" 4K UHD Touch Display',
      '20-Point Multi-Touch',
      'Anti-Glare & Anti-Fingerprint',
      'Built-in Android & Windows',
      '4K Camera & Mic Array',
      'Wireless Screen Sharing',
      'Whiteboard Software'
    ],
    specifications: {
      size: '86"',
      resolution: '4K UHD',
      touchPoints: '20-Point',
      os: 'Android 11 + Windows 10',
      warranty: '3 Years Onsite'
    }
  },
  {
    id: 73,
    slug: '65-interactive-panel',
    name: '65" Interactive Flat Panel',
    category: 'interactive-displays',
    price: 2999.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Compact interactive display for classrooms and meeting rooms',
    details: [
      '65" 4K UHD Touch Display',
      '10-Point Multi-Touch',
      'Anti-Glare Coating',
      'Built-in Android',
      'HD Camera & Mic',
      'Screen Sharing',
      'Whiteboard Software'
    ],
    specifications: {
      size: '65"',
      resolution: '4K UHD',
      touchPoints: '10-Point',
      os: 'Android 11',
      warranty: '2 Years Onsite'
    }
  },

  // Commercial TVs
  {
    id: 28,
    slug: 'commercial-led-tv',
    name: 'Professional LED Commercial TV',
    category: 'commercial-tvs',
    price: 1299.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Commercial-grade LED TV for business and hospitality',
    details: [
      '65" 4K UHD Display',
      '24/7 Operation',
      'Anti-Burn-in Technology',
      'LAN/WiFi Connectivity',
      'Multi-Screen Support',
      'Energy Efficient',
      'VESA Mount Compatible'
    ],
    specifications: {
      size: '65"',
      resolution: '4K UHD',
      operation: '24/7',
      ports: '4x HDMI, 2x USB',
      warranty: '3 Years Commercial'
    }
  },
  {
    id: 74,
    slug: '55-commercial-tv',
    name: '55" Commercial LED TV',
    category: 'commercial-tvs',
    price: 999.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Mid-size commercial TV for retail and hospitality',
    details: [
      '55" 4K UHD Display',
      '24/7 Operation',
      '500 nits Brightness',
      'LAN/WiFi Connectivity',
      'Content Management',
      'Energy Saving',
      'VESA Mount'
    ],
    specifications: {
      size: '55"',
      resolution: '4K UHD',
      operation: '24/7',
      ports: '3x HDMI, 2x USB',
      warranty: '2 Years Commercial'
    }
  },

  // ===== Gadgets and Accessories =====
  // Smart Watches
  {
    id: 29,
    slug: 'pro-smart-watch',
    name: 'Pro Smart Watch',
    category: 'smart-watches',
    price: 249.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Advanced smartwatch with health and fitness tracking',
    details: [
      '1.78" AMOLED Display',
      'Blood Oxygen & Heart Rate',
      '100+ Sports Modes',
      '14 Days Battery Life',
      'Waterproof 5ATM',
      'GPS & GLONASS',
      'Smart Notifications'
    ],
    specifications: {
      display: '1.78" AMOLED',
      battery: '14 Days',
      waterResistance: '5ATM',
      connectivity: 'Bluetooth 5.2',
      warranty: '1 Year Limited'
    }
  },
  {
    id: 75,
    slug: 'fitness-smart-watch',
    name: 'Fitness Smart Watch',
    category: 'smart-watches',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Budget-friendly smartwatch for fitness enthusiasts',
    details: [
      '1.4" TFT Display',
      'Heart Rate Monitor',
      '50+ Sports Modes',
      '7 Days Battery Life',
      'Waterproof 3ATM',
      'Bluetooth 5.0',
      'Call & Message Alerts'
    ],
    specifications: {
      display: '1.4" TFT',
      battery: '7 Days',
      waterResistance: '3ATM',
      connectivity: 'Bluetooth 5.0',
      warranty: '1 Year Limited'
    }
  },

  // Wireless Earbuds
  {
    id: 30,
    slug: 'true-wireless-earbuds',
    name: 'True Wireless Earbuds Pro',
    category: 'earbuds',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Premium wireless earbuds with active noise cancellation',
    details: [
      'Active Noise Cancellation',
      '30 Hours Playtime',
      'Wireless Charging',
      'IPX5 Waterproof',
      'Bluetooth 5.2',
      'Touch Controls',
      'Built-in Microphone'
    ],
    specifications: {
      battery: '30 Hours',
      noiseCancellation: 'Active',
      waterResistance: 'IPX5',
      bluetooth: '5.2',
      warranty: '1 Year Limited'
    }
  },
  {
    id: 76,
    slug: 'budget-wireless-earbuds',
    name: 'Budget Wireless Earbuds',
    category: 'earbuds',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Affordable wireless earbuds for daily use',
    details: [
      'Passive Noise Isolation',
      '20 Hours Playtime',
      'USB-C Charging',
      'IPX4 Splashproof',
      'Bluetooth 5.0',
      'Touch Controls',
      'Built-in Mic'
    ],
    specifications: {
      battery: '20 Hours',
      noiseCancellation: 'Passive',
      waterResistance: 'IPX4',
      bluetooth: '5.0',
      warranty: '1 Year Limited'
    }
  },

  // Power Banks
  {
    id: 31,
    slug: '20000mah-power-bank',
    name: '20000mAh Power Bank',
    category: 'power-banks',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'High-capacity power bank with fast charging',
    details: [
      '20000mAh Capacity',
      '30W Fast Charging',
      'Triple Output Ports',
      'Dual Input Ports',
      'LED Power Indicator',
      'Universal Compatibility',
      'Premium Aluminum Shell'
    ],
    specifications: {
      capacity: '20000mAh',
      output: '30W Max',
      ports: '3x USB, 1x USB-C',
      input: 'Micro-USB/USB-C',
      warranty: '18 Months'
    }
  },
  {
    id: 77,
    slug: '10000mah-power-bank',
    name: '10000mAh Power Bank',
    category: 'power-banks',
    price: 29.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Compact power bank for on-the-go charging',
    details: [
      '10000mAh Capacity',
      '20W Fast Charging',
      'Dual Output Ports',
      'USB-C Input/Output',
      'LED Indicator',
      'Universal Compatibility',
      'Slim Design'
    ],
    specifications: {
      capacity: '10000mAh',
      output: '20W Max',
      ports: '2x USB, 1x USB-C',
      input: 'USB-C',
      warranty: '1 Year'
    }
  },

  // Mobile Accessories
  {
    id: 32,
    slug: 'premium-phone-stand',
    name: 'Premium Phone Stand',
    category: 'mobile-accessories',
    price: 19.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Adjustable phone stand for work and entertainment',
    details: [
      '360° Rotation',
      'Adjustable Viewing Angle',
      'Universal Phone Holder',
      'Anti-Slip Base',
      'Foldable & Portable',
      'Durable Aluminum Alloy',
      'Works with All Smartphones'
    ],
    specifications: {
      material: 'Aluminum Alloy',
      compatibility: 'Universal',
      rotation: '360°',
      weight: '150g',
      warranty: '1 Year'
    }
  },
  {
    id: 78,
    slug: 'wireless-charging-stand',
    name: 'Wireless Charging Stand',
    category: 'mobile-accessories',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4', 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564'],
    description: 'Fast wireless charging stand for smartphones',
    details: [
      '15W Fast Charging',
      'Qi-Compatible',
      'Adjustable Angle',
      'Non-Slip Base',
      'USB-C Powered',
      'Universal Compatibility',
      'LED Indicator'
    ],
    specifications: {
      output: '15W',
      compatibility: 'Qi-Enabled Devices',
      material: 'Plastic & Aluminum',
      weight: '200g',
      warranty: '1 Year'
    }
  },

  // ===== IPS and Battery =====
  // Home IPS
  {
    id: 33,
    slug: 'home-ips-system',
    name: 'Home IPS System 2KVA',
    category: 'home-ips',
    price: 499.99,
    image: 'https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564',
    images: ['https://images.unsplash.com/photo-1516321310769-4b6f4b7e1564', 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4'],
    description: 'Home uninterrupted power supply system',
    details: [
      '2000VA/1600W',
      'Pure Sine Wave',
      '2x 100Ah Batteries',
      '8-10 Hours Backup',
      'LCD Display',
      'Automatic Voltage Regulation',
      'Surge Protection'
    ],
    specifications: {
      capacity: '2000VA/1600W',
      waveType: 'Pure Sine Wave',
      battery: '2x 100Ah',
      backupTime: '8-10 Hours',
      warranty: '2 Years'
    }
  },
  {
    id: 79,
    slug: 'mini-home-ips',
    name: 'Mini Home IPS 1KVA',
    category: 'home-ips',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1593642532973-d31b97d1e6b4',
    images: ['/images/ips/mini-home-ips-1.jpg'],
    description: 'Compact home IPS system for basic power backup needs',
    details: [
      '1000VA/800W',
      'Pure Sine Wave Output',
      '12V 100Ah Battery (Included)',
      'LED Display',
      '4-6 Hours Backup Time',
      'Surge Protection',
      'Silent Operation'
    ],
    specifications: {
      capacity: '1000VA/800W',
      battery: '12V 100Ah',
      output: 'Pure Sine Wave',
      backupTime: '4-6 Hours',
      warranty: '2 Years'
    }
  }
];

// Helper functions
export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug) {
  return products.filter((product) => product.category === categorySlug);
}

export function getAllProductSlugs() {
  return products.map((product) => ({
    params: {
      slug: product.slug,
    },
  }));
}

// The products array is already exported at the top of the file