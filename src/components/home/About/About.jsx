import LocalizedText from '../../common/LocalizedText';

// Using direct text for English heading
// LocalizedText is used for Bangla content

const About = () => (
  <section id="about" className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
    {/* Decorative elements - Grid of rotated squares */}
    <div className="absolute inset-0 overflow-hidden">
      {/* Large background squares */}
      <div className="absolute top-1/4 -left-24 w-48 h-48 bg-cyan-50 opacity-30 transform rotate-12 rounded-lg"></div>
      <div className="absolute top-1/3 -right-32 w-64 h-64 bg-blue-50 opacity-30 transform -rotate-6 rounded-lg"></div>
      <div className="absolute bottom-1/4 -left-16 w-40 h-40 bg-cyan-100 opacity-20 transform rotate-45 rounded-lg"></div>
      <div className="absolute bottom-1/3 -right-24 w-56 h-56 bg-blue-100 opacity-20 transform -rotate-12 rounded-lg"></div>
      
      {/* Medium squares */}
      <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-cyan-50 opacity-20 transform rotate-45 rounded-md"></div>
      <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-blue-50 opacity-25 transform -rotate-12 rounded-md"></div>
      <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-cyan-100 opacity-20 transform rotate-6 rounded-md"></div>
      
      {/* Small squares */}
      <div className="absolute top-1/5 left-1/5 w-12 h-12 bg-blue-50 opacity-15 transform rotate-12 rounded-sm"></div>
      <div className="absolute bottom-1/4 right-1/4 w-10 h-10 bg-cyan-50 opacity-20 transform -rotate-6 rounded-sm"></div>
      <div className="absolute top-3/4 left-1/2 w-8 h-8 bg-blue-100 opacity-15 transform rotate-45 rounded-sm"></div>
      <div className="absolute top-1/3 right-1/3 w-6 h-6 bg-cyan-100 opacity-20 transform -rotate-12 rounded-sm"></div>
    </div>
    
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-extrabold text-slate-800 mb-6 tracking-tight">
          About Us
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8 rounded-full"></div>
        
        <div className="bg-white p-8 rounded-lg">
          <p className="text-xl text-gray-800 leading-relaxed">
            <LocalizedText style={{ 
              fontSize: '1.15rem',
              color: '#1f2937'
            }}>
              স্কয়ার কম্পিউটার্স টেকনোলজি সলিউশনে একটি বিশ্বস্ত নাম। বছরের পর বছর ধরে আমরা নির্ভরযোগ্য কম্পিউটার সেল, এক্সপার্ট রিপেয়ার সার্ভিস এবং কাস্টমাইজড IT সমাধান দিয়ে আসছি। আমরা ব্যক্তিগত এবং ব্যবসায়িক সব ধরনের চাহিদা পূরণে সচেষ্ট।
            </LocalizedText>
          </p>
          <p className="text-xl text-gray-800 mt-8 leading-relaxed">
            <LocalizedText style={{ 
              fontSize: '1.15rem',
              color: '#1f2937'
            }}>
              আমাদের অভিজ্ঞ টিম সর্বদাই আপনাকে সেরা সেবা প্রদানের জন্য প্রস্তুত। আমরা শুধু পণ্য বিক্রয়ই করি না, বরং আপনার ব্যবসার জন্য সঠিক সমাধান প্রদান করি।
            </LocalizedText>
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default About;
