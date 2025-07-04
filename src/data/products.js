export const products = [
  {
    id: 1,
    slug: 'fingerprint-time-attendance',
    name: 'ZKteco F18 Fingerprint Time Attendance',
    category: 'Access Control',
    price: 199.99,
    image: '/images/fingerprint-time-attendance.jpg',
    images: [
      '/images/fingerprint-time-attendance-1.jpg',
      '/images/fingerprint-time-attendance-2.jpg',
    ],
    description: 'ZKteco F18 Fingerprint Time Attendance Device with 3000 fingerprints capacity',
    details: [
      '3000 fingerprints capacity',
      '100,000 verification records',
      '3.0-inch color screen',
      'WiFi/Ethernet communication',
      'Support USB flash disk download',
      'Real-time monitoring',
      'Multi-verification modes',
      'Anti-passback function'
    ],
    specifications: {
      brand: 'ZKteco',
      model: 'F18',
      fingerprintCapacity: '3000',
      recordCapacity: '100,000',
      display: '3.0-inch color screen',
      communication: 'WiFi/Ethernet/USB',
      powerSupply: '12V DC',
      warranty: '1 Year Limited'
    }
  },
  {
    id: 2,
    slug: 'face-recognition-device',
    name: 'Hikvision DS-K1T672 Face Recognition Terminal',
    category: 'Access Control',
    price: 499.99,
    image: '/images/face-recognition-device.jpg',
    images: [
      '/images/face-recognition-device-1.jpg',
      '/images/face-recognition-device-2.jpg',
    ],
    description: 'Hikvision Face Recognition Terminal with temperature screening',
    details: [
      'Dual-lens wide-angle camera',
      'Face recognition distance: 0.3m to 3m',
      'Temperature measurement accuracy: ±0.5°C',
      'Supports mask detection',
      'Anti-spoofing with live detection',
      '5000 face capacity',
      '100,000 recognition records',
      'IP65 rated weatherproof'
    ],
    specifications: {
      brand: 'Hikvision',
      model: 'DS-K1T672',
      faceCapacity: '5000',
      recordCapacity: '100,000',
      recognitionDistance: '0.3m - 3m',
      temperatureRange: '30°C - 45°C',
      communication: 'WiFi/Ethernet',
      powerSupply: '12V DC',
      warranty: '2 Years Limited'
    }
  },
  {
    id: 3,
    slug: 'ip-camera',
    name: 'Dahua 4MP IP Camera',
    category: 'Security Surveillance',
    price: 129.99,
    image: '/images/ip-camera.jpg',
    images: [
      '/images/ip-camera-1.jpg',
      '/images/ip-camera-2.jpg',
    ],
    description: 'Dahua 4MP IP Camera with Starlight Technology',
    details: [
      '4MP resolution (2688 × 1520)',
      'Starlight technology for color night vision',
      '3.6mm fixed lens',
      'IP67 weatherproof rating',
      'Built-in microphone',
      'H.265+ compression',
      'Wide dynamic range',
      'Supports microSD card up to 256GB'
    ],
    specifications: {
      brand: 'Dahua',
      model: 'IPC-HDW2431T-AS-S2',
      resolution: '4MP (2688 × 1520)',
      lens: '3.6mm fixed',
      nightVision: '30m IR distance',
      storage: 'MicroSD up to 256GB',
      powerSupply: '12V DC / PoE',
      warranty: '3 Years Limited'
    }
  },
  {
    id: 4,
    slug: 'ultrabook-pro',
    name: 'UltraBook Pro',
    category: 'Laptops',
    price: 999.99,
    image: '/images/laptop.jpg',
    images: [
      '/images/laptop-1.jpg',
      '/images/laptop-2.jpg',
      '/images/laptop-3.jpg',
    ],
    description: 'Sleek and powerful laptop with 16GB RAM and 1TB SSD',
    details: [
      '15.6" 4K UHD Touch Display',
      'Intel Core i7-1260P (12-Core)',
      '16GB LPDDR5 RAM',
      '1TB PCIe Gen4 SSD',
      'Intel Iris Xe Graphics',
      'Thunderbolt 4',
      'Backlit Keyboard',
      'Windows 11 Pro',
      'Up to 10 hours battery life'
    ],
    specifications: {
      display: '15.6" 4K UHD (3840 x 2160) Touch',
      processor: 'Intel Core i7-1260P',
      graphics: 'Intel Iris Xe Graphics',
      memory: '16GB LPDDR5',
      storage: '1TB PCIe Gen4 SSD',
      operatingSystem: 'Windows 11 Pro',
      battery: '76Wh (Up to 10 hours)',
      weight: '3.5 lbs (1.59 kg)',
      warranty: '2 Years Limited'
    }
  },
  {
    id: 5,
    slug: 'office-workstation',
    name: 'Office Workstation',
    category: 'Business Desktops',
    price: 799.99,
    image: '/images/desktop.jpg',
    images: [
      '/images/desktop-1.jpg',
      '/images/desktop-2.jpg',
    ],
    description: 'Reliable desktop computer for office and productivity',
    details: [
      'Intel Core i5-12400',
      '16GB DDR4 RAM',
      '512GB NVMe SSD',
      'Intel UHD Graphics 730',
      'Wi-Fi 6 & Bluetooth 5.2',
      'Windows 11 Pro',
      'USB-C, USB 3.2, HDMI, DisplayPort',
      'Compact Design',
      'Dual Monitor Support'
    ],
    specifications: {
      processor: 'Intel Core i5-12400 (6-Core, 12-Thread)',
      graphics: 'Intel UHD Graphics 730',
      memory: '16GB DDR4 3200MHz',
      storage: '512GB NVMe SSD',
      expansion: '2 x M.2, 2 x 3.5" HDD Bays',
      ports: 'USB-C, USB 3.2, HDMI, DisplayPort',
      operatingSystem: 'Windows 11 Pro',
      warranty: '3 Years Onsite'
    }
  }
];

export function getProductBySlug(slug) {
  return products.find((product) => product.slug === slug);
}

export function getAllProductSlugs() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}
