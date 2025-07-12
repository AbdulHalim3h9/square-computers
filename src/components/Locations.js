'use client';

import { useState } from 'react';

export default function Locations() {
  const [hoveredLocation, setHoveredLocation] = useState(null);

  const locations = [
    {
      id: 'bogura',
      name: 'Bogura Branch',
      address: 'R.C Tower, Uposhor Bazar, Bogura',
      phone: '01979-234342',
      email: 'sales.bogura@squarecomputers.com',
      status: 'Open till 8:00 PM',
      closed: 'Closed Friday',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=24.86596617429913,89.35931179896441&query=Square+Computers'
    },
    {
      id: 'thanamore',
      name: 'Thanamore Branch',
      address: 'Thanamore 2no Railgate, Dhaka',
      phone: '01979-234343',
      email: 'sales.thanamore@squarecomputers.com',
      status: 'Open till 8:00 PM',
      closed: 'Closed Tuesday',
      mapLink: 'https://www.google.com/maps/search/?api=1&query=23.8103,90.4125&query=Square+Computers'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-50 rounded-2xl opacity-40 transform rotate-6 -translate-y-1/4 translate-x-1/4"></div>
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-50 rounded-2xl opacity-40 transform -rotate-6 translate-y-1/6 -translate-x-1/6"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-cyan-100 rounded-full opacity-20 -z-10"></div>
          <h2 className="text-4xl font-bold text-slate-800 relative">
            Our <span className="text-cyan-600">Locations</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {locations.map((location) => (
            <div
              key={location.id}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-slate-200 shadow-sm h-full transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden group"
              onMouseEnter={() => setHoveredLocation(location.id)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              {/* Hover effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 to-blue-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-800 mb-6 relative inline-block">
                  {location.name}
                  <span className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></span>
                </h3>
                <div className="space-y-4">
                  <p className="flex items-center space-x-2 text-gray-700">
                    <svg className="w-5 h-5 text-cyan-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    <span>{location.address}</span>
                  </p>
                  <p className="flex items-center space-x-2 text-gray-700">
                    <svg className="w-5 h-5 text-cyan-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>{location.phone}</span>
                  </p>
                  <p className="flex items-center space-x-2 text-gray-700">
                    <svg className="w-5 h-5 text-cyan-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    <span>{location.email}</span>
                  </p>
                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <p className="flex items-center space-x-2 text-slate-700">
                      <svg className="w-5 h-5 text-cyan-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span>{location.status} • <span className="text-amber-500">{location.closed}</span></span>
                    </p>
                    <a 
                      href={location.mapLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center mt-3 text-cyan-600 hover:text-cyan-700 text-sm font-medium transition-all duration-300 group"
                    >
                      <span className="relative">
                        <svg className="w-5 h-5 mr-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 group-hover:w-full transition-all duration-300"></span>
                      </span>
                      View on Map
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
