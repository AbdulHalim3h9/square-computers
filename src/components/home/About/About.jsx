import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BackgroundPattern from '@/components/common/BackgroundPattern';
import LocalizedText from '../../common/LocalizedText';

// Using direct text for English heading
// LocalizedText is used for Bangla content

const About = () => (
  <section id="about" className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-50 to-slate-100">
    <BackgroundPattern />
    
    <div className="sm:container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
          <span className="text-slate-800">About </span>
          <span className="text-cyan-600">Us</span>
        </h2>
        <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8 rounded-full"></div>
        
        <div className="bg-white bg-opacity-30 p-8 rounded-lg">
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
