import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "স্কয়ার কম্পিউটার্সে কর্মজীবন - আমাদের সংস্কৃতি ও পরিবেশ",
  description: "স্কয়ার কম্পিউটার্সে কাজের পরিবেশ, সুযোগ-সুবিধা ও ক্যারিয়ার নিয়ে বিস্তারিত জানুন। আমাদের সাথে যুক্ত হয়ে গড়ে তুলুন উজ্জ্বল ভবিষ্যত।"
};

export default function LifeAtSquareComputers() {
  const benefits = [
    {
      title: "পেশাগত উন্নয়ন",
      description: "প্রশিক্ষণ, সার্টিফিকেশন ও ক্যারিয়ার উন্নয়নের মাধ্যমে আমরা আমাদের টিমকে এগিয়ে নিয়ে যাই।",
      icon: "📈"
    },
    {
      title: "আধুনিক পরিবেশ",
      description: "সর্বাধুনিক প্রযুক্তি নিয়ে কাজের সুযোগ এবং সৃজনশীল সমাধান তৈরির পরিবেশ।",
      icon: "💡"
    },
    {
      title: "কর্ম ও ব্যক্তিগত জীবনের ভারসাম্য",
      description: "ফ্লেক্সিবল ওয়ার্কিং আওয়ার এবং রিমোট ওয়ার্কের সুবিধা সহ কর্মজীবনের ভারসাম্য বজায় রাখা।",
      icon: "⚖️"
    },
    {
      title: "আকর্ষণীয় সুবিধা",
      description: "স্বাস্থ্য বীমা, পারফরম্যান্স বোনাস ও বেতন বৃদ্ধিসহ নানা ধরনের সুবিধা।",
      icon: "🏆"
    }
  ];

  const teamActivities = [
    {
      title: "টিম বিল্ডিং",
      description: "নিয়মিত দলগত কার্যক্রম ও আউটিংয়ের মাধ্যমে দলগত সম্পর্ক ও সহযোগিতা বৃদ্ধি।",
      image: "/images/team-building.jpg"
    },
    {
      title: "প্রশিক্ষণ ও উন্নয়ন",
      description: "কর্মশালা, সম্মেলন ও প্রশিক্ষণের মাধ্যমে পেশাগত দক্ষতা বৃদ্ধির সুযোগ।",
      image: "/images/learning.jpg"
    },
    {
      title: "সমাজসেবা",
      description: "বিভিন্ন স্বেচ্ছাসেবী কার্যক্রমের মাধ্যমে সমাজের প্রতি দায়িত্ব পালন।",
      image: "/images/community.jpg"
    }
  ];

  const teamPhotos = [
    { src: '/images/team/team-1.jpg', alt: 'Team collaboration session' },
    { src: '/images/team/team-2.jpg', alt: 'Team celebration' },
    { src: '/images/team/team-3.jpg', alt: 'Workshop session' },
    { src: '/images/team/team-4.jpg', alt: 'Team building activity' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-100 rounded-2xl opacity-80 transform -rotate-12 -translate-x-24 -translate-y-24"></div>
      <div className="absolute top-1/4 -right-16 w-96 h-96 bg-blue-100 rounded-2xl opacity-80 transform rotate-12"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-cyan-50 rounded-2xl opacity-60 transform rotate-45"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-cyan-100 rounded-full opacity-20 -z-10"></div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-slate-800">স্কয়ার কম্পিউটার্সে </span>
            <span className="text-cyan-600">কর্মজীবন</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6"></div>
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-cyan-600">
              হোম
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500">কর্মজীবন</span>
          </nav>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          
          <div className="grid md:grid-cols-2 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden h-full border border-gray-100 hover:shadow-xl transition-all">
                <div className="p-8">
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Activities */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">আমাদের কর্মপরিবেশ</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-2"></div>
            <p className="text-gray-600">কীভাবে আমরা একসাথে কাজ করি এবং আনন্দ করি</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {teamActivities.map((activity, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all">
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <Image 
                    src={activity.image} 
                    alt={activity.title}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{activity.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Gallery */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">আমাদের টিম</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              আমাদের টিমের কিছু ছবি
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teamPhotos.map((photo, index) => (
              <div key={index} className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <Image 
                  src={photo.src} 
                  alt={photo.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Back to About Link */}
        <div className="mt-12 text-center">
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
