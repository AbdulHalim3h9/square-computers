'use client';

import Link from 'next/link';

const ServiceCard = ({ icon, title, description, gradient }) => (
  <div className="group relative overflow-hidden bg-white rounded-xl p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full flex flex-col">
    <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center bg-gradient-to-r ${gradient} text-white mx-auto`}>
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed mb-4 text-center">
      {description}
    </p>
    <div className="mt-auto text-center">
      <span className="text-xs font-medium text-cyan-600 group-hover:text-cyan-700 transition-colors inline-flex items-center justify-center">
        বিস্তারিত জানুন
        <svg className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </div>
  </div>
);

export default ServiceCard;
