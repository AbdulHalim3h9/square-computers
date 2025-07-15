import Link from 'next/link';

export const metadata = {
  title: "আমাদের সম্পর্কে - স্কয়ার কম্পিউটার্স",
  description: "কেন স্কয়ার কম্পিউটার্সকে বেছে নেবেন? আমাদের অভিজ্ঞতা, দক্ষতা ও আন্তরিক সেবা সম্পর্কে জানুন।"
};

export default function WhyUs() {
  const features = [
    {
      icon: '🏆',
      title: 'অভিজ্ঞতা',
      description: '১৫ বছরেরও বেশি অভিজ্ঞতা নিয়ে আমরা প্রযুক্তি খাতে একটি নির্ভরযোগ্য নাম।'
    },
    {
      icon: '🔧',
      title: 'সব ধরনের সমাধান',
      description: 'হার্ডওয়্যার থেকে সফটওয়্যার, নেটওয়ার্কিং থেকে সিকিউরিটি - সব ধরনের প্রযুক্তি সেবা।'
    },
    {
      icon: '👨‍💻',
      title: 'দক্ষ টিম',
      description: 'সার্টিফাইড পেশাদারদের নিয়ে গঠিত আমাদের টিম সবসময় প্রস্তুত আপনার সেবায়।'
    },
    {
      icon: '⚡',
      title: 'আধুনিক প্রযুক্তি',
      description: 'সর্বশেষ প্রযুক্তি নিয়ে আমরা সবসময় এগিয়ে।'
    },
    {
      icon: '🤝',
      title: 'গ্রাহক সেবা',
      description: 'আপনার সাফল্যই আমাদের সাফল্য। আপনার চাহিদা বুঝে সেবা দেই।'
    },
    {
      icon: '🌐',
      title: 'স্থানীয় সেবা, বৈশ্বিক মান',
      description: 'আন্তর্জাতিক মানের সেবা স্থানীয় বাজার বুঝে।'
    }
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
            <span className="text-slate-800">কেন বেছে নিবেন </span>
            <span className="text-cyan-600">আমাদের?</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6"></div>
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-cyan-600">
              হোম
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500">আমাদের সম্পর্কে</span>
          </nav>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden h-full hover:shadow-xl transition-all border border-gray-100">
              <div className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden mb-12 border border-gray-100">
          <div className="p-8">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">আমাদের গ্রাহকদের মতামত</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-2"></div>
              <p className="text-gray-600">আমাদের সেবা সম্পর্কে গ্রাহকদের মূল্যবান মতামত</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  quote: "স্কয়ার কম্পিউটার্সের সেবা সত্যিই অসাধারণ। তারা আমাদের ব্যবসার জন্য নিখুঁত আইটি সমাধান দিয়েছে।",
                  author: "আহমেদ হোসেন",
                  position: "সিইও, টেকনোভা সলিউশন্স"
                },
                {
                  quote: "তাদের সাপোর্ট টিমের দক্ষতা ও আন্তরিকতা প্রশংসনীয়। যে কোন সমস্যায় তারা দ্রুত সমাধান দেয়।",
                  author: "নুসরাত জাহান",
                  position: "আইটি ম্যানেজার, গ্লোবাল এন্টারপ্রাইজ"
                }
              ].map((testimonial, index) => (
                <div key={index} className="bg-gray-50/80 p-6 rounded-lg hover:bg-white transition-colors">
                  <p className="text-gray-600 mb-4 leading-relaxed">&ldquo;{testimonial.quote}&rdquo;</p>
                  <div className="font-semibold text-gray-800">{testimonial.author}</div>
                  <div className="text-sm text-gray-500">{testimonial.position}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center relative z-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">আমাদের সেবা নিতে চান?</h2>
          <Link 
            href="/contact" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200"
          >
            যোগাযোগ করুন
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Bottom decorative elements */}
      <div className="absolute -bottom-16 left-1/4 w-64 h-64 bg-blue-100 rounded-2xl opacity-70 transform rotate-12 -z-10"></div>
      <div className="absolute -bottom-8 right-1/3 w-48 h-48 bg-cyan-100 rounded-2xl opacity-70 transform -rotate-12 -z-10"></div>
    </div>
  );
}
