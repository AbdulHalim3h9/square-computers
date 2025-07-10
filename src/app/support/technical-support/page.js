'use client';

import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Phone, Send, Download, Book, Headphones, Mail, MessageSquare } from 'lucide-react';

const TechnicalSupport = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Head>
        <title>Technical Support | Square Computers</title>
        <meta
          name="description"
          content="Get technical support for your Square Computers products and services"
        />
        <style jsx global>{`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&display=swap');
          
          .navbar-brand {
            font-family: 'Poppins', sans-serif;
            font-weight: 700;
          }
          
          .support-text {
            font-family: 'Inter', sans-serif;
            font-weight: 500;
          }
          
          .cyan-glow {
            box-shadow: 0 0 20px rgba(77, 208, 225, 0.3);
          }
          
          .text-gradient {
            background: linear-gradient(135deg, #4DD0E1 0%, #26C6DA 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
          }
          
          @media (max-width: 640px) {
            .mobile-center {
              text-align: center;
            }
            .mobile-text-sm {
              font-size: 0.875rem;
              line-height: 1.25rem;
            }
          }
        `}</style>
      </Head>

      {/* Hero Section */}
      <div
        className="bg-cover bg-center py-12 relative"
        style={{ backgroundImage: "url('/assets/images/background/support-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
        <div className="relative max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl font-bold text-white navbar-brand p-4 rounded-lg cyan-glow">
              Technical Support
            </h1>
          </div>
          <div className="w-full md:w-1/2 text-center md:text-right mt-4 md:mt-0">
            <h2 className="text-xl sm:text-2xl font-semibold text-cyan-400 support-text p-4 rounded-lg bg-black/30">
              <Phone className="inline w-5 h-5 mr-2 text-cyan-400" />
              <Link href="tel:+8801988999916" className="hover:text-cyan-300 transition-colors">
                +880 19889 999 16
              </Link>
            </h2>
          </div>
        </div>
      </div>

      {/* Support Form */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-white p-6 rounded-lg shadow-lg cyan-glow border border-cyan-100/20">
          <form action="/api/technical-support" method="post" encType="multipart/form-data">
            <div className="grid grid-cols-1 gap-4 support-text">
              <div className="form-group">
                <label htmlFor="name" className="text-gray-800 font-semibold text-sm">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 text-sm"
                  id="name"
                  placeholder="Mr. Jhon"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="c_name" className="text-gray-800 font-semibold text-sm">
                  Company Name
                </label>
                <input
                  type="text"
                  name="c_name"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 text-sm"
                  id="c_name"
                  placeholder="Square Computers"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="m_number" className="text-gray-800 font-semibold text-sm">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="m_number"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 text-sm"
                  id="m_number"
                  placeholder="018xxxxxxx"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="text-gray-800 font-semibold text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 text-sm"
                  id="email"
                  placeholder="info@squarecomputers.com"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="address" className="text-gray-800 font-semibold text-sm">
                  Share Your Technical Issue
                </label>
                <textarea
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 text-sm"
                  id="address"
                  name="address"
                  rows="3"
                  placeholder="Describe your issue"
                ></textarea>
              </div>
              <div className="form-group">
                <label htmlFor="support_type" className="text-gray-800 font-semibold text-sm">
                  Type of Support
                </label>
                <select
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-500 text-sm"
                  id="support_type"
                  name="support_type"
                >
                  <option value="">Select option</option>
                  <option value="Software installation">Software Installation</option>
                  <option value="Warranty Issue">Warranty Issue</option>
                  <option value="Product Query">Product Query</option>
                </select>
              </div>
              <div className="form-group text-right">
                <button
                  type="submit"
                  name="submit"
                  className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all duration-200 text-sm"
                >
                  Apply <Send className="inline w-4 h-4 ml-1" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Support Options */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold navbar-brand text-center text-gray-800 mb-8">
          How Can We Help You?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg cyan-glow border border-cyan-100/20 text-center support-text">
            <Download className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Downloads</h3>
            <p className="text-gray-600 text-sm mb-4">
              Get the latest drivers, software, and firmware updates for your devices.
            </p>
            <Link
              href="/support/downloads"
              className="inline-block bg-gradient-to-r from-cyan-500 to-cyan-600 text-white py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-cyan-700 transition-all duration-200 text-sm"
            >
              View Downloads
            </Link>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg cyan-glow border border-cyan-100/20 text-center support-text">
            <Book className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Knowledge Base</h3>
            <p className="text-gray-600 text-sm mb-4">
              Find answers to common questions and troubleshooting guides.
            </p>
            <Button href="/support/knowledge-base" className="text-sm">
              Browse Articles
            </Button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg cyan-glow border border-cyan-100/20 text-center support-text">
            <Headphones className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Contact Support</h3>
            <p className="text-gray-600 text-sm mb-4">
              Can&apos;t find what you&apos;re looking for? Our support team is here to help.
            </p>
            <Button href="/contact" className="text-sm">
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl sm:text-3xl font-bold navbar-brand text-center text-gray-800 mb-8">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 support-text">
          <div className="bg-white p-5 rounded-lg shadow-lg cyan-glow border border-cyan-100/20">
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              How do I download drivers for my device?
            </h3>
            <p className="text-gray-600 text-sm">
              Visit our{' '}
              <Link href="/support/downloads" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Downloads
              </Link>{' '}
              page and select your product model to find the appropriate drivers and software.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-lg cyan-glow border border-cyan-100/20">
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              What should I do if my device won&#39;t turn on?
            </h3>
            <p className="text-gray-600 text-sm">
              Check the power connection, try a different power outlet, and ensure the battery is
              properly inserted if applicable. If the issue persists, please {' '}
              <Link href="/contact" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                contact our support team
              </Link>
              .
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-lg cyan-glow border border-cyan-100/20">
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              How can I check my warranty status?
            </h3>
            <p className="text-gray-600 text-sm">
              You can check your warranty status by entering your product&#39;s serial number on our {' '}
              <Link href="/warranty" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Warranty Check
              </Link>{' '}
              page.
            </p>
          </div>
          <div className="bg-white p-5 rounded-lg shadow-lg cyan-glow border border-cyan-100/20">
            <h3 className="text-base font-semibold text-gray-800 mb-2">
              Where can I find the user manual for my product?
            </h3>
            <p className="text-gray-600 text-sm">
              User manuals are available in the{' '}
              <Link href="/support/downloads" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Downloads
              </Link>{' '}
              section under the documentation category for your specific product model.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Banner */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 p-8 rounded-lg text-center border border-cyan-500/20 cyan-glow support-text">
          <h2 className="text-2xl sm:text-3xl font-bold navbar-brand text-gray-800 mb-4">
            Still Need Help?
          </h2>
          <p className="text-gray-600 text-sm mb-6">
            Our technical support team is available to assist you with any questions or issues you may
            have.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button href="/contact" variant="secondary" className="text-sm">
              Contact Support
            </Button>
            <Button 
              href="tel:+8801988999916" 
              variant="secondary" 
              className="text-sm bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900"
            >
              <Phone className="inline w-4 h-4 mr-2" /> Call Now: +880 19889 999 16
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TechnicalSupport;