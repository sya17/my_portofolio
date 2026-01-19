'use client';

import HeaderSection from '../components/headerSection';
import FooterSection from '../components/footerSection';
import Link from 'next/link';
import { useState } from 'react';
import { PERSONAL_INFO, SOCIAL_LINKS } from '@/lib/constants';
import { AiOutlineMail, AiOutlinePhone, AiOutlineEnvironment } from 'react-icons/ai';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      // Reset status after 3 seconds
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex min-h-screen flex-col bg-black font-mono">
      <HeaderSection />
      <main className="flex-1 px-6 py-4">
        {/* Hero Section */}
        <section className="flex min-h-[40vh] flex-col items-center justify-center space-y-4 text-white">
          <h1 className="text-5xl font-bold md:text-7xl">CONTACT</h1>
          <div className="flex space-x-2">
            <Link href="/">
              <span className="hover:underline">Home</span>
            </Link>
            <span>/</span>
            <span>Contact</span>
          </div>
          <p className="max-w-2xl text-center text-gray-400">
            Let&apos;s work together on your next project
          </p>
        </section>

        {/* Contact Content */}
        <section className="mx-auto max-w-6xl pb-12">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="mb-6 text-2xl font-bold text-white">Get in Touch</h2>
                <p className="text-gray-400">
                  Feel free to reach out for collaborations, opportunities, or just a friendly chat.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <AiOutlineMail className="mt-1 h-6 w-6 text-white" />
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <a
                      href={`mailto:${PERSONAL_INFO.email}`}
                      className="text-gray-400 hover:text-white"
                    >
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <AiOutlineEnvironment className="mt-1 h-6 w-6 text-white" />
                  <div>
                    <h3 className="font-semibold text-white">Location</h3>
                    <p className="text-gray-400">
                      {PERSONAL_INFO.location.city}, {PERSONAL_INFO.location.country}
                    </p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="mb-4 font-semibold text-white">Connect with me</h3>
                <div className="flex gap-4">
                  <a
                    href={SOCIAL_LINKS.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-white"
                    aria-label="GitHub"
                  >
                    GitHub
                  </a>
                  <a
                    href={SOCIAL_LINKS.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-white"
                    aria-label="LinkedIn"
                  >
                    LinkedIn
                  </a>
                  <a
                    href={SOCIAL_LINKS.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 transition-colors hover:text-white"
                    aria-label="Instagram"
                  >
                    Instagram
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-lg border border-gray-800 bg-gray-900 p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm text-white">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-white focus:outline-none"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm text-white">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-white focus:outline-none"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="mb-2 block text-sm text-white">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-white focus:outline-none"
                    placeholder="What is this about?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-sm text-white">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white placeholder-gray-500 focus:border-white focus:outline-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full rounded-lg bg-white px-6 py-3 font-semibold text-black transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {status === 'sending'
                    ? 'Sending...'
                    : status === 'success'
                      ? 'Message Sent!'
                      : 'Send Message'}
                </button>

                {status === 'success' && (
                  <p className="text-center text-sm text-green-400">
                    Thank you! Your message has been sent successfully.
                  </p>
                )}

                {status === 'error' && (
                  <p className="text-center text-sm text-red-400">
                    Oops! Something went wrong. Please try again.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  );
};

export default Contact;
