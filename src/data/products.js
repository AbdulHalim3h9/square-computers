export const products = [
  {
    id: 1,
    slug: 'gaming-pc-pro',
    name: 'Gaming PC Pro',
    category: 'Gaming Desktops',
    price: 1299.99,
    image: '/images/gaming-pc.jpg',
    images: [
      '/images/gaming-pc-1.jpg',
      '/images/gaming-pc-2.jpg',
      '/images/gaming-pc-3.jpg',
    ],
    description: 'High-performance gaming PC with RTX 4070 and Ryzen 7 5800X',
    details: [
      'NVIDIA GeForce RTX 4070 12GB',
      'AMD Ryzen 7 5800X (8-Core, 16-Thread)',
      '16GB DDR4 3200MHz RAM',
      '1TB NVMe SSD',
      '750W 80+ Gold PSU',
      'Liquid CPU Cooler',
      'Windows 11 Pro',
      'Wi-Fi 6 & Bluetooth 5.2'
    ],
    specifications: {
      processor: 'AMD Ryzen 7 5800X',
      graphics: 'NVIDIA GeForce RTX 4070 12GB',
      memory: '16GB DDR4 3200MHz',
      storage: '1TB NVMe SSD',
      powerSupply: '750W 80+ Gold',
      operatingSystem: 'Windows 11 Pro',
      warranty: '3 Years Limited'
    }
  },
  {
    id: 2,
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
    id: 3,
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
