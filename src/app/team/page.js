import React from 'react';

const TeamPage = () => {
  const teamMembers = [
    {
      name: 'Md. Ruhul Amin Sarkar',
      role: 'Chairman',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      description: 'Leading Square Computers with strategic vision and innovative technology solutions. With over 15 years of experience in the IT industry, driving digital transformation for businesses.',
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    },
    {
      name: 'Md. Shahin Alam',
      role: 'Managing Director',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      description: 'Overseeing daily operations and spearheading business development initiatives. Expert in project management and client relationship building.',
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    },
    {
      name: 'Md. Reswan Islam',
      role: 'Director',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      description: 'Managing strategic partnerships and overseeing technical excellence across all projects. Specialized in enterprise solutions and system architecture.',
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    },
    {
      name: 'Md. Abdul Halim',
      role: 'Senior Web Designer',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      description: 'Creating cutting-edge web experiences with modern design principles. Expert in responsive design, UX/UI, and front-end technologies.',
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    },
    {
      name: 'Md. Hamim Sarkar',
      role: 'Creative Director',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80',
      description: 'Leading visual design and brand identity projects. Specializing in corporate branding, digital marketing materials, and creative solutions.',
      social: {
        linkedin: "#",
        twitter: "#",
        email: "#"
      }
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-16 px-4">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center mb-16">
        <div className="relative">
          {/* Decorative elements */}
          <div className="absolute -top-8 -left-16 w-32 h-32 bg-cyan-400 rounded-xl opacity-10"></div>
          <div className="absolute -top-4 -right-20 w-40 h-40 bg-blue-500 rounded-xl opacity-10"></div>
          
          <h1 className="text-5xl md:text-6xl font-light text-slate-800 mb-4">
            Meet
            <span className="block text-6xl md:text-7xl font-bold text-slate-900 mt-2">Our</span>
            <span className="block text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent -mt-2">
              Team
            </span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mt-6 rounded-xl"></div>
        </div>
      </div>

      {/* Team Members Section */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-2 lg:gap-1">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl transition-all duration-500 ease-out hover:flex-grow"
              style={{
                width: '240px',
                height: '480px',
                flexShrink: 0
              }}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{
                  backgroundImage: `url(${member.image})`,
                }}
              ></div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              
              {/* Accent Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-1 transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                  {member.name}
                </h3>
                <p className="text-xs md:text-sm font-medium uppercase tracking-wider text-cyan-300 transform transition-all duration-500 group-hover:translate-y-0 translate-y-4 group-hover:opacity-100">
                  {member.role}
                </p>
                
                {/* Expanded content that appears on hover */}
                <div className="mt-3 opacity-0 transform translate-y-6 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  <div className="w-10 h-0.5 bg-cyan-400 mb-3"></div>
                  <p className="text-xs md:text-sm leading-relaxed text-slate-200">
                    {member.description}
                  </p>
                </div>
              </div>
              
              {/* Hover Border Effect */}
              <div className="absolute inset-0 border-2 border-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Decorative Elements */}
      <div className="relative mt-16">
        <div className="absolute bottom-0 left-1/4 w-24 h-24 bg-cyan-400 rounded-xl opacity-10"></div>
        <div className="absolute bottom-8 right-1/3 w-16 h-16 bg-blue-500 rounded-xl opacity-15"></div>
      </div>
    </div>
  );
};

export default TeamPage;