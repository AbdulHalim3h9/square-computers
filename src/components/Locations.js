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
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <div
              key={location.id}
              className={`p-6 rounded-xl transition-all duration-300 ${
                hoveredLocation === location.id
                  ? 'bg-white border-cyan-400 transform -translate-y-1 shadow-md'
                  : 'bg-white border border-gray-200 shadow-sm hover:shadow-md'
              }`}
              onMouseEnter={() => setHoveredLocation(location.id)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center">
                <svg className="w-5 h-5 mr-2 text-cyan-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                {location.name}
              </h3>
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">{location.address}</p>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <span className="font-medium text-gray-800">Phone:</span> {location.phone}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium text-gray-800">Email:</span> {location.email}
                </p>
                <div className="pt-3 mt-3 border-t border-gray-100 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-green-600 text-sm font-medium">{location.status}</span>
                    <span className="text-red-500 text-sm">{location.closed}</span>
                  </div>
                  <a 
                    href={location.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-cyan-600 hover:text-cyan-700 text-sm font-medium transition-colors"
                  >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
