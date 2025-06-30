import Link from 'next/link';

export const metadata = {
  title: "Mission & Vision - Square Computers",
  description: "Discover the core values, mission statement, and vision that drive Square Computers to be a leader in technology solutions."
};

export default function MissionVision() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Mission & Vision</h1>
            <p className="text-xl text-cyan-100">
              Guiding principles that shape our journey and define our future
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Mission Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
            <div className="p-8">
              <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center text-3xl text-cyan-600 mb-6">
                🎯
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Mission</h2>
              <div className="prose text-gray-600">
                <p className="mb-4">
                  At Square Computers, our mission is to empower businesses and individuals through innovative technology solutions that drive growth, efficiency, and success. We are committed to:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Delivering cutting-edge technology solutions tailored to our clients' unique needs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Providing exceptional customer service and technical support</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Fostering a culture of innovation and continuous improvement</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">✓</span>
                    <span>Building long-term partnerships based on trust and mutual success</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
            <div className="p-8">
              <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center text-3xl text-cyan-600 mb-6">
                🔭
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Our Vision</h2>
              <div className="prose text-gray-600">
                <p className="mb-4">
                  Our vision is to be the most trusted and innovative technology partner, transforming the way businesses operate and people interact with technology. We aspire to:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">•</span>
                    <span>Pioneer breakthrough technologies that shape the future of the digital landscape</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">•</span>
                    <span>Create sustainable value for our stakeholders through ethical business practices</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">•</span>
                    <span>Build a diverse and inclusive workplace that fosters creativity and excellence</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-cyan-600 mr-2">•</span>
                    <span>Empower communities through technology education and digital inclusion initiatives</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-12">
          <div className="p-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Core Values</h2>
              <div className="w-20 h-1 bg-cyan-500 mx-auto"></div>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: '💡',
                  title: 'Innovation',
                  description: 'We embrace creativity and forward-thinking to develop groundbreaking solutions.'
                },
                {
                  icon: '🤝',
                  title: 'Integrity',
                  description: 'We conduct our business with honesty, transparency, and ethical practices.'
                },
                {
                  icon: '🎯',
                  title: 'Excellence',
                  description: 'We are committed to delivering superior quality in everything we do.'
                },
                {
                  icon: '❤️',
                  title: 'Customer Focus',
                  description: 'We prioritize our customers\' needs and strive to exceed their expectations.'
                }
              ].map((value, index) => (
                <div key={index} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back to About Link */}
        <div className="text-center">
          <Link 
            href="/about" 
            className="inline-flex items-center text-cyan-600 hover:text-cyan-800 font-medium"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to About Us
          </Link>
        </div>
      </div>
    </div>
  );
}
