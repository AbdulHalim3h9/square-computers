import Link from 'next/link';
import Image from 'next/image';
import BackgroundPattern from '@/components/common/BackgroundPattern';

export const metadata = {
  title: 'About Us - Square Computers',
  description: 'Learn about Square Computers - Our mission, vision, leadership, and what makes us unique in the technology industry.'
};

export default function AboutPage() {
  const aboutLinks = [
    {
      title: "চেয়ারম্যানের বাণী",
      href: "/about/chairman-speech",
      description: "আমাদের চেয়ারম্যানের কাছ থেকে জানুন আমাদের যাত্রা এবং ভবিষ্যৎ পরিকল্পনা সম্পর্কে।",
      icon: "🎤"
    },
    {
      title: "ব্যবস্থাপনা পরিচালকের বাণী",
      href: "/about/md-speech",
      description: "আমাদের ব্যবস্থাপনা পরিচালকের কাছ থেকে কোম্পানির দিকনির্দেশনা সম্পর্কে জানুন।",
      icon: "💼"
    },
    {
      title: "Mission & Vision",
      href: "/about/mission-vision",
      description: "Our core values, mission statement, and vision for the future.",
      icon: "🎯"
    },
    {
      title: "Why Choose Us",
      href: "/about/why-us",
      description: "Discover what sets Square Computers apart from the competition.",
      icon: "🏆"
    },
    {
      title: "Life at Square Computers",
      href: "/about/life",
      description: "Experience our company culture and what it's like to be part of our team.",
      icon: "✨"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <BackgroundPattern includeCircular={true} circularPosition="top" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-12 relative">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-slate-800">আমাদের </span>
            <span className="text-cyan-600">সম্পর্কে</span>
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-600">
            Leading the digital transformation with innovative technology solutions since our inception.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {aboutLinks.map((link, index) => (
            <Link 
              href={link.href} 
              key={index}
              className="block bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1"
            >
              <div className="p-6">
                <div className="text-4xl mb-4">{link.icon}</div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">{link.title}</h2>
                <p className="text-gray-600">{link.description}</p>
                <div className="mt-4 text-cyan-600 font-medium inline-flex items-center">
                  Learn more
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
