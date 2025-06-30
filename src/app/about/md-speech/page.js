import Link from 'next/link';

export const metadata = {
  title: "MD's Speech - Square Computers",
  description: "Message from our Managing Director about Square Computers' strategic direction, achievements, and future goals in the technology sector."
};

export default function MDSpeech() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Managing Director's Message</h1>
            <nav className="text-sm text-cyan-100" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3 justify-center">
                <li className="inline-flex items-center">
                  <Link href="/" className="inline-flex items-center hover:text-white">
                    Home
                  </Link>
                </li>
                <li className="inline-flex items-center">
                  <svg className="w-3 h-3 mx-2 text-cyan-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                  </svg>
                  <Link href="/about" className="inline-flex items-center hover:text-white">
                    About
                  </Link>
                </li>
                <li aria-current="page">
                  <div className="flex items-center">
                    <svg className="w-3 h-3 mx-2 text-cyan-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                    </svg>
                    <span className="text-white font-medium">MD's Message</span>
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
                  👔
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">Sarah Johnson</h2>
                <p className="text-cyan-600 font-medium mb-2">Managing Director, Square Computers</p>
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
                Dear Valued Partners and Clients,
              </p>
              
              <p className="mb-4">
                As the Managing Director of Square Computers, it gives me immense pleasure to share our journey, achievements, and vision for the future. Our commitment to excellence and innovation has been the cornerstone of our success in the ever-evolving technology landscape.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Our Journey So Far</h3>
              
              <p className="mb-4">
                Over the years, Square Computers has transformed from a modest technology provider to a market leader, consistently delivering cutting-edge solutions to our clients. Our growth has been fueled by our dedicated team, whose expertise and commitment to quality have set us apart in this competitive industry.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Innovation at Our Core</h3>
              
              <p className="mb-4">
                At Square Computers, we believe in pushing the boundaries of what's possible. Our investment in research and development has enabled us to introduce innovative products and services that address the unique challenges faced by our clients. We are committed to staying ahead of technological trends and continuously improving our offerings.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-8 mb-4">Our Commitment to You</h3>
              
              <p className="mb-4">
                Our clients are at the heart of everything we do. We are dedicated to building long-term relationships based on trust, transparency, and mutual success. Your feedback and support have been instrumental in shaping our journey, and we remain committed to exceeding your expectations.
              </p>
              
              <p className="mt-8 mb-4 font-medium">
                Thank you for your continued trust and partnership.
              </p>
              
              <p className="font-medium">
                Best regards,
              </p>
              
              <p className="font-medium">
                Sarah Johnson<br />
                Managing Director<br />
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
