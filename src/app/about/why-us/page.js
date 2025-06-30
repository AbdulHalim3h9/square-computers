import Link from 'next/link';

export const metadata = {
  title: "Why Choose Us - Square Computers",
  description: "Discover why leading businesses trust Square Computers for their technology needs. Experience the difference of working with a partner committed to your success."
};

export default function WhyUs() {
  const features = [
    {
      icon: '🏆',
      title: 'Industry Leadership',
      description: 'With over 15 years of experience, we are a trusted name in the technology industry, known for our expertise and reliability.'
    },
    {
      icon: '🔧',
      title: 'Comprehensive Solutions',
      description: 'From hardware to software, networking to security, we offer end-to-end technology solutions tailored to your specific requirements.'
    },
    {
      icon: '👨‍💻',
      title: 'Expert Team',
      description: 'Our team of certified professionals brings extensive knowledge and experience to every project, ensuring top-notch service and support.'
    },
    {
      icon: '⚡',
      title: 'Cutting-Edge Technology',
      description: 'We stay ahead of the curve by continuously updating our offerings with the latest technological advancements.'
    },
    {
      icon: '🤝',
      title: 'Customer-Centric Approach',
      description: 'Your success is our priority. We work closely with you to understand your needs and deliver solutions that drive real business value.'
    },
    {
      icon: '🛡️',
      title: 'Reliable Support',
      description: 'Our dedicated support team is available 24/7 to ensure your systems run smoothly and efficiently.'
    }
  ];

  const stats = [
    { value: '15+', label: 'Years of Experience' },
    { value: '5000+', label: 'Satisfied Clients' },
    { value: '100+', label: 'Certified Professionals' },
    { value: '24/7', label: 'Customer Support' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Why Choose Square Computers?</h1>
            <p className="text-xl text-cyan-100">
              Partner with a technology solutions provider that truly understands your business needs
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-16">
          <div className="grid md:grid-cols-4 divide-x divide-gray-100">
            {stats.map((stat, index) => (
              <div key={index} className="p-6 text-center">
                <div className="text-4xl font-bold text-cyan-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-gradient-to-r from-cyan-50 to-white rounded-xl shadow-md overflow-hidden mb-16">
          <div className="p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <div className="text-5xl mb-4">&quot;</div>
              <p className="text-xl text-gray-700 italic mb-6">
                Square Computers has been an invaluable partner in our digital transformation journey. Their expertise and commitment to excellence have helped us streamline our operations and achieve remarkable results.
              </p>
              <div className="font-medium text-gray-800">
                <p>Alex Johnson</p>
                <p className="text-sm text-cyan-600">CTO, TechNova Solutions</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Ready to experience the difference?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied clients who trust Square Computers for their technology needs. Contact us today to discuss how we can help your business grow.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/contact" 
              className="px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
            >
              Contact Us
            </Link>
            <Link 
              href="/services" 
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>

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
