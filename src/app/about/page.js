import Link from 'next/link';
import Image from 'next/image';

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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Square Computers</h1>
          <p className="text-xl md:text-2xl text-cyan-100 max-w-3xl">
            Leading the digital transformation with innovative technology solutions since our inception.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-0 sm:py-16">
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
