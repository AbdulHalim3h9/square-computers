import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "চেয়ারম্যানের বাণী - স্কয়ার কম্পিউটার্স",
  description: "স্কয়ার কম্পিউটার্সের চেয়ারম্যানের কাছ থেকে জানুন আমাদের যাত্রা, লক্ষ্য এবং প্রযুক্তি খাতে আমাদের অঙ্গীকার সম্পর্কে।"
};

export default function ChairmanSpeech() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Decorative elements - Matching the trusted partners section */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-cyan-100 rounded-2xl opacity-80 transform -rotate-12 -translate-x-24 -translate-y-24"></div>
      <div className="absolute top-1/4 -right-16 w-96 h-96 bg-blue-100 rounded-2xl opacity-80 transform rotate-12"></div>
      <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-cyan-50 rounded-2xl opacity-60 transform rotate-45"></div>
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="text-center mb-12 relative">
          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 w-48 h-48 bg-cyan-100 rounded-full opacity-20 -z-10"></div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-slate-800">চেয়ারম্যানের </span>
            <span className="text-cyan-600">বাণী</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6"></div>
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-cyan-600">
              হোম
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500">চেয়ারম্যানের বাণী</span>
          </nav>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-start">
            <div className="w-48 h-64 md:w-56 md:h-80 rounded-2xl overflow-hidden mb-6 md:mb-0 md:mr-8">
              <Image
                src="/images/members/ruhul.jpeg"
                alt="মোঃ রুহুল আমিন"
                width={300}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            
            <div className="text-center md:text-left">
              <h2 className="text-2xl font-bold text-gray-800 mb-1">মোঃ রুহুল আমিন</h2>
              <p className="text-cyan-600 font-medium mb-4">চেয়ারম্যান, স্কয়ার কম্পিউটার্স</p>
              
              <div className="prose text-gray-600 text-justify space-y-4">
                <p className="text-gray-700">
                  প্রিয় ভাই ও বোনেরা,<br/>
                  আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহি ওয়া বারাকাতুহু।
                </p>
                
                <p className="text-gray-700">
                  প্রযুক্তির এই যুগে স্কয়ার কম্পিউটার্স নিয়ে আপনাদের মাঝে উপস্থিত হতে পেরে আমি অত্যন্ত আনন্দিত। আমরা দীর্ঘদিন ধরে বিশ্বস্ততা, গুণগত মান এবং সেবার মাধ্যমে গ্রাহকদের আস্থা অর্জন করে আসছি।
                </p>
                
                <p className="text-gray-700">
                  আমাদের লক্ষ্য শুধু ব্যবসায় সফল হওয়া নয়, বরং সমাজের প্রতিটি স্তরে মানসম্মত প্রযুক্তি সেবা পৌঁছে দেওয়া। আমরা বিশ্বাস করি যে, সঠিক প্রযুক্তি ব্যবহার করে আমরা আমাদের সমাজকে এগিয়ে নিয়ে যেতে পারি।
                </p>
                
                <p className="text-gray-700">
                  আপনার মূল্যবান পরামর্শ এবং সহযোগিতা আমাদেরকে আরও এগিয়ে যেতে সহায়তা করবে।
                </p>
                
                <p className="font-medium text-right">
                  ধন্যবাদান্তে,<br/>
                  মোঃ রুহুল আমিন<br/>
                  চেয়ারম্যান<br/>
                  স্কয়ার কম্পিউটার্স
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <Link 
            href="/about" 
            className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-full text-cyan-700 bg-cyan-100 hover:bg-cyan-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-colors duration-200"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            আমাদের সম্পর্কে
          </Link>
        </div>
      </div>
      
      {/* Bottom decorative elements */}
      <div className="absolute -bottom-16 left-1/4 w-64 h-64 bg-blue-100 rounded-2xl opacity-70 transform rotate-12"></div>
      <div className="absolute -bottom-8 right-1/3 w-48 h-48 bg-cyan-100 rounded-2xl opacity-70 transform -rotate-12"></div>
    </div>
  );
}
