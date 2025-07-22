import React, { useState, useEffect } from 'react';
import { Mail, User, MessageSquare, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  useEffect(() => {
    document.title = "Contact Us | How to Earning Money";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Contact How to Earning Money for questions, feedback, or partnership opportunities. We are here to help you on your financial journey.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Contact How to Earning Money for questions, feedback, or partnership opportunities. We are here to help you on your financial journey.';
      document.head.appendChild(meta);
    }
    // Canonical Link
    const canonicalUrl = window.location.origin + window.location.pathname;
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    // Add ContactPage/ContactPoint schema
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ContactPage",
          "name": "Contact Us | How to Earning Money",
          "description": 'Contact How to Earning Money for questions, feedback, or partnership opportunities. We are here to help you on your financial journey.',
          "url": canonicalUrl
        },
        {
          "@type": "ContactPoint",
          "contactType": "Customer Support",
          "email": "support@financeblog.com",
          "url": canonicalUrl,
          "availableLanguage": ["English"],
          "areaServed": "Worldwide"
        }
      ]
    };
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);
    return () => {
      const script = document.querySelector('script[type="application/ld+json"]');
      if (script) document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Contact Info Panel */}
        <div className="md:w-1/2 bg-primary text-white flex flex-col justify-center p-10">
          <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
          <p className="mb-6 opacity-90">Have a question, feedback, or partnership idea? Fill out the form or reach us directly:</p>
          <div className="space-y-4 text-base">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-accent" />
              <a href="mailto:info@howtoearningmoney.com" className="underline hover:text-accent transition">info@howtoearningmoney.com</a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-accent" />
              <span>+1 (555) 123-4567</span>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="font-semibold mb-2">Business Hours</h3>
            <p className="opacity-80">Mon-Fri: 9am - 6pm<br />Sat-Sun: Closed</p>
          </div>
        </div>
        {/* Form Panel */}
        <div className="md:w-1/2 p-8 md:p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-primary mb-6">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={20} />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-primary" size={20} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <select
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="">Select a subject</option>
                <option value="general">General Inquiry</option>
                <option value="article-suggestion">Article Suggestion</option>
                <option value="financial-question">Financial Question</option>
                <option value="partnership">Partnership Opportunity</option>
                <option value="technical">Technical Issue</option>
                <option value="feedback">Feedback</option>
              </select>
            </div>
            <div className="relative">
              <MessageSquare className="absolute left-3 top-4 text-primary" size={20} />
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Your message..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors shadow"
            >
              Send Message
            </button>
          </form>
          <div className="mt-6 text-center text-gray-500 text-sm">
            <span>Prefer email? </span>
            <a href="mailto:info@howtoearningmoney.com" className="text-primary underline hover:text-accent">info@howtoearningmoney.com</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
