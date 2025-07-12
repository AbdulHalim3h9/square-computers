import Link from 'next/link';
import React from 'react';

const ServiceCard = ({ icon, title, description, gradient }) => (
  <div className="group relative overflow-hidden bg-white rounded-xl p-3 sm:p-4 md:p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col items-center text-center">
    <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-full mb-2 sm:mb-4 flex items-center justify-center bg-gradient-to-r ${gradient} text-white`}>
      {React.cloneElement(icon, { className: 'w-5 h-5 sm:w-6 sm:h-6' })}
    </div>
    <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">{title}</h3>
    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
      {description}
    </p>
    <div className="mt-3">
      <Link 
        href="/services" 
        className="text-xs font-medium text-cyan-600 group-hover:text-cyan-700 transition-colors inline-flex items-center"
      >
        বিস্তারিত জানুন
        <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </div>
);

export default ServiceCard;
