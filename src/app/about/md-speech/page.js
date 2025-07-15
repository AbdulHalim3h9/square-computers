import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "ব্যবস্থাপনা পরিচালকের বক্তব্য - স্কয়ার কম্পিউটার্স",
  description: "স্কয়ার কম্পিউটার্সের ব্যবস্থাপনা পরিচালকের পক্ষ থেকে একটি বক্তব্য - প্রযুক্তি খাতে আমাদের ভিশন, অর্জন এবং ভবিষ্যৎ পরিকল্পনা সম্পর্কে।"
};

export default function MDSpeech() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white relative overflow-hidden">
      {/* Top decorative elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-br from-cyan-100 to-transparent opacity-50"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100 rounded-full opacity-30 transform translate-x-32 -translate-y-32"></div>
      
      {/* Content */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-12 relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-cyan-100 rounded-full opacity-20 -z-10"></div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-slate-800">ব্যবস্থাপনা পরিচালকের </span>
            <span className="text-cyan-600">বক্তব্য</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6"></div>
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-cyan-600">
              হোম
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500">ব্যবস্থাপনা পরিচালকের বক্তব্য</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto">
          
          <div className="flex flex-col md:flex-row items-start">
            <div className="w-48 h-64 md:w-56 md:h-80 rounded-2xl overflow-hidden mb-6 md:mb-0 md:mr-8">
              <Image
                src="/images/members/shahin.jpeg"
                alt="শাহিন আলম"
                width={300}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">মোঃ শাহিন আলম</h2>
              <p className="text-cyan-600 font-medium mb-4">ব্যবস্থাপনা পরিচালক, স্কয়ার কম্পিউটার্স</p>
              
              <div className="prose text-gray-600 text-justify space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  প্রিয় গ্রাহক ও সহযোগীবৃন্দ,<br/>
                  আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহু।
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  প্রযুক্তির এই যুগে স্কয়ার কম্পিউটার্সের পক্ষ থেকে আপনাদের সেবায় নিয়োজিত থাকতে পেরে আমি অত্যন্ত গর্বিত। আমরা সবসময় চেষ্টা করি আধুনিক প্রযুক্তি সেবা নিশ্চিত করতে এবং গ্রাহকদের চাহিদা অনুযায়ী সেবা প্রদান করতে।
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  আমাদের লক্ষ্য শুধু ব্যবসায়িক সফলতা নয়, বরং দেশের ডিজিটালাইজেশন প্রক্রিয়ায় গুরুত্বপূর্ণ ভূমিকা রাখা। আমরা বিশ্বাস করি যে, সঠিক প্রযুক্তি ব্যবহার করে আমরা আমাদের সমাজকে আরও এগিয়ে নিয়ে যেতে পারি।
                </p>
                
                <p className="text-gray-700 leading-relaxed">
                  আপনার মূল্যবান পরামর্শ এবং সহযোগিতা আমাদেরকে আরও এগিয়ে যেতে সহায়তা করবে।
                </p>
                
                <p className="font-medium text-right">
                  ধন্যবাদান্তে,<br/>
                  মোঃ শাহিন আলম<br/>
                  ব্যবস্থাপনা পরিচালক<br/>
                  স্কয়ার কম্পিউটার্স
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Back to About Link */}
        <div className="mt-12 text-center">
          <Link 
            href="/about" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            ফিরে যান
          </Link>
        </div>
      </div>
      
      {/* Bottom decorative elements */}
      <div className="absolute -bottom-16 left-1/4 w-64 h-64 bg-blue-100 rounded-2xl opacity-70 transform rotate-12 -z-10"></div>
      <div className="absolute -bottom-8 right-1/3 w-48 h-48 bg-cyan-100 rounded-2xl opacity-70 transform -rotate-12 -z-10"></div>
    </div>
  );
}
