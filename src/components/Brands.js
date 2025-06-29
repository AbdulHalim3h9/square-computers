'use client';

import Image from 'next/image';

const brands = [
  {
    name: 'Zkteco',
    description: 'Global leader in security and time attendance solutions',
    logo: 'https://logovectorseek.com/wp-content/uploads/2020/04/zkteco-logo-vector.png',
    website: 'https://www.zkteco.com',
    category: 'Security',
    featured: true
  },
  {
    name: 'HIKVISION',
    description: 'World\'s leading provider of innovative video surveillance products',
    logo: 'https://brandlogos.net/wp-content/uploads/2022/01/hikvision-brandlogo.net_-512x512.png',
    website: 'https://www.hikvision.com',
    category: 'Security',
    featured: true
  },
  {
    name: 'Ezviz',
    description: 'Smart home security and automation solutions',
    logo: 'https://brandlogos.net/wp-content/uploads/2025/06/ezviz-logo_brandlogos.net_z9wlt-512x131.png',
    website: 'https://www.ezviz.com',
    category: 'Security',
    featured: true
  },
  {
    name: 'Dell',
    description: 'Innovative computing solutions for businesses and individuals',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
    website: 'https://www.dell.com',
    category: 'Computers',
    featured: true
  },
  {
    name: 'LG',
    description: 'Global leader in consumer electronics and home appliances',
    logo: 'https://www.lg.com/lg5-common/images/common/header/logo-b2c.jpg',
    website: 'https://www.lg.com',
    category: 'Electronics',
    featured: true
  },
  {
    name: 'Samsung',
    description: 'Global leader in technology, offering a wide range of consumer electronics',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1280px-Samsung_Logo.svg.png',
    website: 'https://www.samsung.com',
    category: 'Electronics',
    featured: true
  },
  {
    name: 'HP',
    description: 'Global leader in personal systems and printing solutions',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1200px-HP_logo_2012.svg.png',
    website: 'https://www.hp.com',
    category: 'Computers',
    featured: true
  }
];

const Brands = () => {
  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mb-4">
            Our Trusted Partners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We partner with industry leaders to bring you the best technology solutions
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {brands.map((brand, index) => (
            <a
              key={index}
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center hover:shadow-md transition-shadow duration-300 border border-gray-100"
            >
              <div className="relative w-full h-20 mb-4">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  fill
                  unoptimized={true}
                  className="object-contain object-center transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;
