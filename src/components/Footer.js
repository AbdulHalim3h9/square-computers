'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  const services = [
    'Computer Sales & Service',
    'Laptop Repair & Maintenance',
    'Network Solutions',
    'Data Recovery',
    'IT Consultancy',
    'Software Development'
  ];

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Products', href: '/products' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: '/blog' }
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
        
        .footer-gradient {
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%);
        }
        
        .cyan-glow {
          box-shadow: 0 0 20px rgba(77, 208, 225, 0.3);
        }
        
        .text-gradient {
          background: linear-gradient(135deg, #4DD0E1 0%, #26C6DA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
        /* Mobile-specific improvements */
        @media (max-width: 640px) {
          .mobile-center {
            text-align: center;
          }
          
          .mobile-text-sm {
            font-size: 0.875rem;
            line-height: 1.25rem;
          }
          
          .mobile-break-words {
            word-break: break-words;
            hyphens: auto;
          }
        }
      `}</style>

      <footer className="footer-gradient text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234DD0E1' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}></div>
        </div>

        <div className="relative z-10">
          <div className="border-b border-gray-700 bg-black/20 backdrop-blur-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                <div className="lg:col-span-2 text-left">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4 mb-6">
                    <div className="relative h-12 w-12 sm:h-16 sm:w-16 flex-shrink-0">
                      <Image 
                        src="/images/logo.png" 
                        alt="Square Computers Logo" 
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                    <div className="text-left col-span-1">
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-['Poppins'] leading-tight">
                        <span className="text-cyan-400">Square</span>{' '}
                        <span className="text-white">Computers</span>
                      </h2>
                      <p className="text-cyan-300 font-medium mt-1 text-sm sm:text-base whitespace-nowrap">
                        Your Technology Partner Since 1996
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-200 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  ১৯৯৬ সাল থেকে আমরা গর্বের সঙ্গে কাজ করে যাচ্ছি—উন্নত কম্পিউটার হার্ডওয়্যার, সফটওয়্যার এবং আইটি সেবা দিয়ে। ব্যক্তিগত ব্যবহারকারী হোক বা বড় কোনো প্রতিষ্ঠান, সবার জন্যই আমরা নির্ভরযোগ্য ও মানসম্পন্ন প্রযুক্তি সমাধান পৌঁছে দিচ্ছি।
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
              {/* Services */}
              <div className="text-left">
                <h4 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-4 sm:mb-6 flex items-center justify-start">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Our Services
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {services.map((service, index) => (
                    <li key={index} className="text-gray-200 hover:text-cyan-300 transition-colors duration-200 flex items-center justify-start text-sm sm:text-base">
                      <svg className="w-3 h-3 mr-2 sm:mr-3 text-cyan-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      <span className="mobile-break-words">{service}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick Links */}
              <div className="text-left">
                <h4 className="text-lg sm:text-xl font-semibold text-cyan-300 mb-4 sm:mb-6 flex items-center justify-start">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                  Quick Links
                </h4>
                <ul className="space-y-2 sm:space-y-3">
                  {quickLinks.map((link, index) => (
                    <li key={index}>
                      <Link 
                        href={link.href} 
                        className="text-gray-200 hover:text-cyan-300 transition-all duration-200 flex items-center justify-start group text-sm sm:text-base"
                      >
                        <svg className="w-3 h-3 mr-2 sm:mr-3 text-cyan-400 group-hover:translate-x-1 transition-transform duration-200 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        <span className="whitespace-nowrap">{link.name}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social & Newsletter */}
              <div className="col-span-2 text-left">
                
                {/* Contact Us */}
                <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 p-4 sm:p-6 rounded-xl border border-cyan-500/20 flex-1 mx-auto sm:mx-0">
                    <h5 className="text-cyan-300 font-medium mb-3 text-center sm:text-left text-base sm:text-lg">
                      Leave a message
                    </h5>
                    <div className="flex flex-col">
                      <textarea 
                        placeholder="Your message"
                        className="w-full px-3 py-2 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 text-sm resize-none"
                        rows={3}
                      />
                      <input 
                        type="email" 
                        placeholder="Your email"
                        className="mt-2 px-3 py-2 bg-black/30 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-cyan-500 text-sm max-w-sm"
                      />
                    </div>
                    <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all duration-200 text-sm whitespace-nowrap mt-4 sm:mt-6">
                        Send Message
                      </button>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          {/* Social Links */}
          <div className="flex justify-center space-x-4 mb-4">
            {[
              { name: 'Facebook', icon: 'M18.77 7.46H15.5v-1.9c0-.9.6-1.1 1-1.1h2.2V2.5H15.5c-2.8 0-5 2.2-5 5v1.96h-2v1.9h2V17h4v-5.64h2.77l.5-1.9z' },
              { name: 'Twitter', icon: 'M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z' },
              { name: 'LinkedIn', icon: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z' },
              { name: 'Instagram', icon: 'M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 2.25h11a4.25 4.25 0 014.25 4.25v11a4.25 4.25 0 01-4.25 4.25h-11A4.25 4.25 0 012.25 17.5v-11A4.25 4.25 0 016.5 2.25z' }
            ].map((social) => (
              <a
                key={social.name}
                href="#"
                className="w-10 h-10 bg-gradient-to-br from-cyan-500/20 to-cyan-600/10 rounded-lg flex items-center justify-center hover:from-cyan-500/30 hover:to-cyan-600/20 transition-all duration-300 border border-cyan-500/20 hover:border-cyan-500/40"
                aria-label={social.name}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={social.icon} />
                </svg>
              </a>
            ))}
          </div>
          
          <div className="">
            <div className="text-gray-200 text-sm sm:text-base lg:text-lg text-center">
              &copy; 2025 <span className="text-cyan-400 font-medium whitespace-nowrap">Square Computers</span>. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}