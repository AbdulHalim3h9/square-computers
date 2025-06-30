import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "Chairman's Speech - Square Computers",
  description: "Hear from our Chairman about Square Computers' journey, vision, and commitment to excellence in the technology industry."
};

export default function ChairmanSpeech() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Chairman's Speech</h1>
            <nav className="text-sm text-cyan-100" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3 justify-center">
                <li className="inline-flex items-center">
                  <Link href="/" className="inline-flex items-center hover:text-white">
                    Home
                  </Link>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mx-2 text-cyan-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="text-white font-medium">Chairman's Speech</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="md:mr-8 mb-6 md:mb-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-cyan-100 to-cyan-200 flex items-center justify-center text-5xl">
                  👨‍💼
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">John Doe</h2>
                <p className="text-cyan-600 font-medium mb-2">Chairman, Square Computers</p>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-500 hover:text-cyan-600">
                    <span className="sr-only">LinkedIn</span>
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="prose max-w-none text-gray-600">
              <p className="text-lg mb-6">
                Dear Valued Stakeholders,
              </p>
              
              <p className="mb-4">
                It is with great pleasure and pride that I welcome you to Square Computers. Since our inception, we have been driven by a singular vision: to be at the forefront of technological innovation while maintaining the highest standards of integrity and customer service.
              </p>
              
              <p className="mb-4">
                Our journey began with a simple yet powerful idea - to make cutting-edge technology accessible to businesses and individuals alike. Over the years, we have grown from a small startup to a trusted name in the industry, thanks to the unwavering support of our customers, partners, and dedicated team members.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Our Commitment to Excellence</h3>
              
              <p className="mb-4">
                At Square Computers, we believe that technology should be an enabler, not a barrier. That's why we are committed to providing solutions that are not only innovative but also intuitive and reliable. Our team of experts works tirelessly to stay ahead of industry trends and deliver products and services that meet the evolving needs of our clients.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Looking Ahead</h3>
              
              <p className="mb-4">
                As we look to the future, we remain steadfast in our commitment to excellence, innovation, and customer satisfaction. We are excited about the opportunities that lie ahead and are confident that with our dedicated team and valued partners, we will continue to set new benchmarks in the technology sector.
              </p>
              
              <p className="mt-8 mb-4 font-medium">
                Thank you for your continued trust and support.
              </p>
              
              <p className="font-medium">
                Warm regards,
              </p>
              
              <p className="font-medium">
                John Doe<br />
                Chairman<br />
                Square Computers
              </p>
            </div>
          </div>
        </div>

        {/* Back to About Link */}
        <div className="mt-8 text-center">
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
