'use client';

import { useState, useEffect } from 'react';

const brands = [
  {
    name: 'Zkteco',
    logo: 'https://images.seeklogo.com/logo-png/29/1/zkteco-logo-png_seeklogo-297954.png',
    url: '/brands/zkteco'
  },
  {
    name: 'HIKVISION',
    logo: 'https://brandlogos.net/wp-content/uploads/2022/01/hikvision-brandlogo.net_-512x512.png',
    url: '/brands/hikvision'
  },
  {
    name: 'Ezviz',
    logo: 'https://brandlogos.net/wp-content/uploads/2025/06/ezviz-logo_brandlogos.net_z9wlt-512x131.png',
    url: '/brands/ezviz'
  },
  {
    name: 'Dell',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg',
    url: '/brands/dell'
  },
  {
    name: 'LG',
    logo: 'https://www.lg.com/lg5-common/images/common/header/logo-b2c.jpg',
    url: '/brands/lg'
  },
  {
    name: 'Samsung',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/1280px-Samsung_Logo.svg.png',
    url: '/brands/samsung'
  },
  {
    name: 'HP',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/HP_logo_2012.svg/1200px-HP_logo_2012.svg.png',
    url: '/brands/hp'
  }
];

const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'IT Support and Network Solutions',
    title: 'Professional IT Support',
    subtitle: 'Expert networking and IT support services for businesses of all sizes',
    service: 'Networking & IT Support'
  },
  {
    url: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Domain and Hosting Services',
    title: 'Domain & Hosting',
    subtitle: 'Reliable domain registration and web hosting solutions',
    service: 'Domain & Hosting Service'
  },
  {
    url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Web Development Services',
    title: 'Web Development',
    subtitle: 'Custom websites and web applications that drive results',
    service: 'Web Design & Development'
  },
  {
    url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Software and SMS Solutions',
    title: 'Software & SMS',
    subtitle: 'Custom software and bulk SMS solutions for your business',
    service: 'Software & Bulk SMS'
  },
  {
    url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Social Media Marketing',
    title: 'Social Media',
    subtitle: 'Boost your online presence with our marketing expertise',
    service: 'Social Media Marketing'
  },
  {
    url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Printing and Graphic Design',
    title: 'Printing & Design',
    subtitle: 'Professional printing and graphic design services',
    service: 'Printing & Graphic Design'
  },
  {
    url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Visa Services',
    title: 'Visa Services',
    subtitle: 'Comprehensive visa application assistance',
    service: 'Visa Service'
  },
  {
    url: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    alt: 'Travel and Ticket Services',
    title: 'Travel & Tickets',
    subtitle: 'Air and bus ticket booking services',
    service: 'Air & Bus Ticket'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentImage = heroImages[currentSlide];

  return (
    <main>
      <section id="home" className="relative h-[80vh] overflow-hidden">
        {/* Background Slides */}
        <div className="absolute inset-0 transition-opacity duration-1000 ease-in-out" 
             style={{ opacity: 1 }}>
          <div 
            className="absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out"
            style={{
              backgroundImage: `url(${currentImage.url})`,
              transform: 'scale(1.05)'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex items-center h-full">
          <div className="container mx-auto px-4 text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fadeIn">{currentImage.title}</h1>
            <p className="text-xl mb-8 max-w-2xl">{currentImage.subtitle}</p>
            <div className="flex space-x-4">
              <a 
                href="#services" 
                className="bg-cyan-600 hover:bg-cyan-700 text-white px-8 py-3 rounded-full font-medium transition duration-300"
              >
                Our Services
              </a>
              <a 
                href="#contact" 
                className="bg-transparent hover:bg-white hover:text-gray-900 text-white border-2 border-white px-8 py-3 rounded-full font-medium transition duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-0 right-0">
          <div className="flex justify-center space-x-2">
            {heroImages.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? 'bg-white w-8' : 'bg-white bg-opacity-50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
            <div className="w-24 h-1 bg-cyan-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="service-card bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Networking & IT Support</h3>
              <p className="text-gray-600">Expert IT support for businesses, including networking and cybersecurity.</p>
            </div>
            
            <div className="service-card bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Domain & Hosting</h3>
              <p className="text-gray-600">Reliable domain registration and hosting services for your online presence.</p>
            </div>
            
            <div className="service-card bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Web Development</h3>
              <p className="text-gray-600">Custom web design and development services for businesses and individuals.</p>
            </div>
            
            <div className="service-card bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Software & SMS</h3>
              <p className="text-gray-600">Software development services and bulk SMS solutions for businesses.</p>
            </div>
            
            <div className="service-card bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Social Media</h3>
              <p className="text-gray-600">Social media marketing services to boost your online presence.</p>
            </div>
            
            <div className="service-card bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Printing & Design</h3>
              <p className="text-gray-600">Professional printing and graphic design services for all your needs.</p>
            </div>
            
            <div className="service-card bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Visa Service</h3>
              <p className="text-gray-600">Visa application and processing services for individuals and businesses.</p>
            </div>
            
            <div className="service-card bg-white p-6 rounded-xl hover:shadow-lg transition-all duration-300">
              <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">Travel Tickets</h3>
              <p className="text-gray-600">Air and bus ticket booking services for your travel needs.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="section">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">About Us</h2>
          <p className="text-lg text-center max-w-2xl mx-auto">
            Square Computers is dedicated to providing top-notch technology solutions. With years of experience, we offer reliable computer sales, expert repair services, and customized IT solutions to meet the needs of individuals and businesses alike.
          </p>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Trusted Brands</h2>
            <div className="w-24 h-1 bg-cyan-500 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-8 items-center">
            {brands.map((brand, index) => (
              <div key={index} className="flex justify-center">
                <a 
                  href={brand.url}
                  className="flex items-center justify-center p-6 bg-white rounded-xl hover:bg-gray-50 transition-all duration-300 w-full h-full"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="h-14 w-full object-contain"
                    title={brand.name}
                    style={{
                      maxWidth: '120px',
                      height: 'auto',
                      objectFit: 'contain',
                      padding: '8px'
                    }}
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}