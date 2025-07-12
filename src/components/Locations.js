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
    <section className="bg-gray-50 py-16 relative overflow-hidden border-t border-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          <span className="text-gray-800">Our </span>
          <span className="text-cyan-600">Locations</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 group">
          {locations.map((location) => (
            <div
              key={location.id}
              className={`bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 p-6 rounded-2xl border border-cyan-500/20 h-full transform transition-all duration-300 ease-in-out
                ${hoveredLocation === null ? 'hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/10' : ''}
                ${hoveredLocation === location.id ? 'scale-[1.03] shadow-lg shadow-cyan-500/20 z-10' : 'scale-[0.98] opacity-90'}
              `}
              onMouseEnter={() => setHoveredLocation(location.id)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              <h3 className="text-xl font-semibold text-cyan-600 mb-4 truncate" title={location.name}>
                {location.name}
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <svg className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-700 break-words">{location.address}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-cyan-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="text-gray-700 break-all">{location.phone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-cyan-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="text-gray-700 break-all">{location.email}</span>
                </div>
                <div className="pt-3 mt-3 border-t border-cyan-500/20">
                  <div className="flex items-start space-x-2">
                    <svg className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                    </svg>
                    <span className="text-green-600">
                      <span>{location.status} • <span className="text-amber-500">{location.closed}</span></span>
                    </span>
                  </div>
                  <a 
                    href={location.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center mt-2 text-cyan-600 hover:text-cyan-700 text-sm font-medium transition-colors group"
                  >
                    <svg className="w-4 h-4 mr-1 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    View on Map
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
