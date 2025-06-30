import Link from 'next/link';
import Image from 'next/image';

export const metadata = {
  title: "Life at Square Computers - Our Culture & Team",
  description: "Discover what it's like to work at Square Computers. Explore our vibrant company culture, team activities, and the values that make us a great place to work."
};

export default function LifeAtSquareComputers() {
  const cultureHighlights = [
    {
      title: 'Collaborative Environment',
      description: 'We believe in the power of teamwork and open communication to drive innovation and success.',
      icon: '🤝'
    },
    {
      title: 'Continuous Learning',
      description: 'We invest in our team&apos;s growth through training programs, workshops, and professional development opportunities.',
      icon: '📚'
    },
    {
      title: 'Work-Life Balance',
      description: 'We understand the importance of balancing professional and personal life for overall well-being and productivity.',
      icon: '⚖️'
    },
    {
      title: 'Innovation Focus',
      description: 'We encourage creative thinking and provide the resources to turn innovative ideas into reality.',
      icon: '💡'
    },
    {
      title: 'Diversity & Inclusion',
      description: 'We celebrate diversity and foster an inclusive environment where everyone feels valued and respected.',
      icon: '🌍'
    },
    {
      title: 'Fun & Engagement',
      description: 'Regular team-building activities and social events keep our team connected and motivated.',
      icon: '🎉'
    }
  ];

  const teamPhotos = [
    { src: '/images/team/team-1.jpg', alt: 'Team collaboration session' },
    { src: '/images/team/team-2.jpg', alt: 'Team celebration' },
    { src: '/images/team/team-3.jpg', alt: 'Workshop session' },
    { src: '/images/team/team-4.jpg', alt: 'Team building activity' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-cyan-600 to-cyan-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Life at Square Computers</h1>
            <p className="text-xl text-cyan-100">
              Where innovation meets collaboration, and every team member is valued
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Culture Section */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Culture</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              At Square Computers, we&apos;ve built a culture that fosters creativity, encourages professional growth, and celebrates success together. Our team is our greatest asset, and we&apos;re committed to creating an environment where everyone can thrive.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cultureHighlights.map((item, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Gallery */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Our Team in Action</h2>
            <div className="w-20 h-1 bg-cyan-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-3xl mx-auto">
              Get a glimpse of our vibrant workplace and the amazing people who make Square Computers a great place to work.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {teamPhotos.map((photo, index) => (
              <div key={index} className="aspect-square rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                  <span className="text-sm">Team Photo {index + 1}</span>
                </div>
                {/* Uncomment and replace with actual Image component when you have the images
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover"
                />
                */}
              </div>
            ))}
          </div>
        </section>

        {/* Testimonial */}
        <section className="bg-gradient-to-r from-cyan-600 to-cyan-700 text-white rounded-2xl p-8 md:p-12 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <div className="text-5xl mb-6">{"\""}</div>
            <p className="text-xl md:text-2xl leading-relaxed mb-8">
              Working at Square Computers has been an incredible journey. The supportive environment, challenging projects, and amazing colleagues make every day rewarding. It&apos;s more than just a workplace; it&apos;s a family that grows together.
            </p>
            <div className="font-medium">
              <p>Michael Chen</p>
              <p className="text-cyan-200">Senior Software Engineer, 4 years at Square Computers</p>
            </div>
          </div>
        </section>

        {/* Join Our Team CTA */}
        <section className="bg-white rounded-xl shadow-md p-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Join Our Growing Team</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Are you passionate about technology and looking for an exciting career opportunity? Explore our open positions and become part of the Square Computers family.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/careers" 
              className="px-6 py-3 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
            >
              View Open Positions
            </Link>
            <Link 
              href="/contact" 
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Contact HR
            </Link>
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
