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
    <section className="py-20 bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Decorative elements - More prominent */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-100 rounded-2xl opacity-80 transform -rotate-12 -translate-x-24 -translate-y-24"></div>
      <div className="absolute top-1/4 -right-16 w-96 h-96 bg-blue-100 rounded-2xl opacity-80 transform rotate-12"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-cyan-50 rounded-2xl opacity-60 transform rotate-45"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-cyan-100 rounded-full opacity-20 -z-10"></div>
          <h2 className="text-4xl font-bold text-slate-800 mb-4">
            Our Trusted Partners
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-4"></div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            We partner with industry leaders to bring you the best technology solutions
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
          {brands.map((brand, index) => (
            <a
              key={index}
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white rounded-lg p-4 flex items-center justify-center hover:shadow-md transition-all duration-300"
            >
              <div className="relative w-full h-16">
                <Image
                  src={brand.logo}
                  alt={`${brand.name} Logo`}
                  fill
                  unoptimized={true}
                  className="object-contain object-center transition-transform duration-300 group-hover:scale-110"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
      
      {/* Bottom decorative elements - More prominent */}
      <div className="absolute -bottom-16 left-1/4 w-64 h-64 bg-blue-100 rounded-2xl opacity-70 transform rotate-12"></div>
      <div className="absolute -bottom-8 right-1/3 w-48 h-48 bg-cyan-100 rounded-2xl opacity-70 transform -rotate-12"></div>
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-blue-50 rounded-2xl opacity-60 transform rotate-45"></div>
    </section>
  );
};

export default Brands;
