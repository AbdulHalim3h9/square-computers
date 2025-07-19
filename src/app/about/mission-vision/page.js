import Link from 'next/link';
import Image from 'next/image';
import BackgroundPattern from '@/components/common/BackgroundPattern';

export const metadata = {
  title: "মিশন ও ভিশন - স্কয়ার কম্পিউটার্স",
  description: "স্কয়ার কম্পিউটার্সের মিশন, ভিশন ও মূল্যবোধ - প্রযুক্তির মাধ্যমে সমৃদ্ধির পথে অগ্রযাত্রা।"
};

export default function MissionVision() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <BackgroundPattern includeCircular={true} circularPosition="top" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* Title Section */}
        <div className="text-center mb-12 relative">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-slate-800">মিশন ও </span>
            <span className="text-cyan-600">ভিশন</span>
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-6"></div>
          <nav className="text-sm text-gray-600">
            <Link href="/" className="hover:text-cyan-600">
              হোম
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-500">মিশন ও ভিশন</span>
          </nav>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Mission Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden h-full p-8 border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center text-3xl text-cyan-600 mb-6">
              🎯
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">আমাদের মিশন</h2>
            <div className="prose text-gray-600">
              <p className="mb-4 leading-relaxed">
                আধুনিক প্রযুক্তির মাধ্যমে ব্যবসা ও ব্যক্তিগত জীবনে গতি সৃষ্টি করা আমাদের লক্ষ্য।
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-2">✓</span>
                  <span className="leading-relaxed">সাশ্রয়ী মূল্যে মানসম্মত প্রযুক্তি সেবা প্রদান</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-2">✓</span>
                  <span className="leading-relaxed">গ্রাহকদের চাহিদা অনুযায়ী কাস্টমাইজড সমাধান</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-2">✓</span>
                  <span className="leading-relaxed">নিরযোগ্য ও টেকসই প্রযুক্তি সহায়তা</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Vision Card */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden h-full p-8 border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-cyan-100 flex items-center justify-center text-3xl text-cyan-600 mb-6">
              🔭
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">আমাদের ভিশন</h2>
            <div className="prose text-gray-600">
              <p className="mb-4 leading-relaxed">
                ডিজিটাল বাংলাদেশ গঠনে অগ্রণী ভূমিকা পালন করা।
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-2">✓</span>
                  <span className="leading-relaxed">দেশের শীর্ষস্থানীয় প্রযুক্তি সেবাদাতা প্রতিষ্ঠান হওয়া</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-2">✓</span>
                  <span className="leading-relaxed">প্রযুক্তির মাধ্যমে সমাজের প্রতিটি স্তরে পরিবর্তন আনা</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-600 mr-2">✓</span>
                  <span className="leading-relaxed">তরুণ প্রজন্মকে প্রযুক্তিতে উদ্বুদ্ধকরণ</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Core Values */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden p-8 border border-gray-100">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-3">আমাদের মূল্যবোধ</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto rounded-full mb-2"></div>
            <p className="text-gray-600">যে মূল্যবোধগুলো আমাদের পরিচালিত করে</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: '🤝',
                title: 'সততা',
                description: 'আমরা সততা ও ন্যায়পরায়ণতাকে সর্বোচ্চ গুরুত্ব দেই।'
              },
              {
                icon: '🚀',
                title: 'নবায়ন',
                description: 'নিত্যনতুন প্রযুক্তি নিয়ে আমরা সবসময় এগিয়ে।'
              },
              {
                icon: '🎯',
                title: 'সুক্ষ্মতা',
                description: 'প্রতিটি কাজে আমরা রেখে যাই পারফেকশনের ছোঁয়া।'
              },
              {
                icon: '👥',
                title: 'দলগত কাজ',
                description: 'একসাথে মিলে কাজ করাই আমাদের শক্তি।'
              },
              {
                icon: '💡',
                title: 'সৃজনশীলতা',
                description: 'নতুন চিন্তা ও ধারণাকে আমরা স্বাগত জানাই।'
              },
              {
                icon: '🌱',
                title: 'টেকসই উন্নয়ন',
                description: 'পরিবেশবান্ধব প্রযুক্তি ব্যবহারে আমরা সচেষ্ট।'
              }
            ].map((value, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="text-3xl">{value.icon}</div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-1">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Back to About Link */}
        <div className="mt-12 text-center relative z-10">
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

    </div>
  );
}
