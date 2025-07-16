
import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import sarah from '../../public/images/ChatGPT Image Jul 11, 2025, 03_22_42 PM.png'
import michel from '../../public/images/photo-1472099645785-5658abf4ff4e.png'
import emily from '../../public/images/photo-1438761681033-6461ffad8d80.png'


const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Editor-in-Chief & Financial Planner',
      bio: 'CFP with 10+ years of experience helping individuals build wealth through smart investing strategies.',
      image: sarah,
      credentials: 'CFP®, CFA'
    },
    {
      name: 'Michael Chen',
      role: 'Investment Analyst',
      bio: 'Former Wall Street analyst specializing in market research and portfolio optimization strategies.',
      image: michel,
      credentials: 'CFA, MBA'
    },
    {
      name: 'Emily Davis',
      role: 'Personal Finance Expert',
      bio: 'Passionate about helping families achieve financial independence through budgeting and smart saving.',
      image: emily,
      credentials: 'AFC®, MS Finance'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Monthly Readers' },
    { number: '500+', label: 'Articles Published' },
    { number: '5+', label: 'Years of Experience' },
    { number: '95%', label: 'Reader Satisfaction' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About Us
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Your trusted source for financial insights, investment strategies, and money management tips. 
            We're dedicated to empowering you with the knowledge to make informed financial decisions.
          </p>
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=400&fit=crop" 
            alt="Financial planning and analysis"
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </section>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-4">
                At FinanceBlog, we believe that financial literacy is the foundation of personal freedom. 
                Our mission is to make complex financial concepts accessible to everyone, regardless of 
                their current knowledge level or financial situation.
              </p>
              <p className="text-gray-600 mb-4">
                We provide actionable insights, practical strategies, and expert guidance to help you:
              </p>
              <ul className="text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  Build and manage a diversified investment portfolio
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  Create effective budgeting and saving strategies
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  Optimize your tax situation and maximize returns
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">✓</span>
                  Plan for major life events and retirement
                </li>
              </ul>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=400&fit=crop" 
                alt="Financial planning workspace"
                className="w-full h-80 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-16 bg-primary text-white rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-primary font-medium mb-2">{member.role}</p>
                  <p className="text-sm text-gray-600 mb-3">{member.credentials}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">T</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Transparency</h3>
              <p className="text-gray-600">
                We believe in clear, honest communication about financial products, risks, and opportunities.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">E</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Education</h3>
              <p className="text-gray-600">
                Our content is designed to educate and empower, not to promote specific products or services.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl font-bold">A</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                Financial knowledge should be available to everyone, regardless of their background or income level.
              </p>
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="bg-gray-100 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Get in Touch</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Have questions about our content or suggestions for future articles? 
            We'd love to hear from you and help you on your financial journey.
          </p>
          <a 
            href="/contact"
            className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
          >
            Contact Us
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
