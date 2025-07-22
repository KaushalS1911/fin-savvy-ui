
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import sarah from '../../public/images/ChatGPT Image Jul 11, 2025, 03_22_42 PM.png';
import michel from '../../public/images/photo-1472099645785-5658abf4ff4e.png';
import emily from '../../public/images/photo-1438761681033-6461ffad8d80.png';
import { User, Award, Users, ShieldCheck } from 'lucide-react';

const About = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "About Us | How to Earning Money";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Learn more about How to Earning Money, our mission, team, and commitment to providing expert financial advice and insights.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Learn more about How to Earning Money, our mission, team, and commitment to providing expert financial advice and insights.';
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

    // Add Organization/AboutPage schema
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "name": "How to Earning Money",
          "url": window.location.origin,
          "logo": {
            "@type": "ImageObject",
            "url": "https://financeblog.com/logo.png"
          },
          "sameAs": [
            "https://www.facebook.com/financeblog",
            "https://twitter.com/financeblog"
          ],
          "contactPoint": {
            "@type": "ContactPoint",
            "contactType": "Customer Support",
            "email": "support@financeblog.com"
          }
        },
        {
          "@type": "AboutPage",
          "name": "About Us | How to Earning Money",
          "description": 'Learn more about How to Earning Money, our mission, team, and commitment to providing expert financial advice and insights.',
          "url": canonicalUrl
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

  const values = [
    {
      icon: <ShieldCheck className="w-8 h-8 text-accent mx-auto mb-2" />, title: 'Integrity', desc: 'We provide honest, unbiased advice and always put our readers first.'
    },
    {
      icon: <Award className="w-8 h-8 text-primary mx-auto mb-2" />, title: 'Expertise', desc: 'Our team consists of certified professionals with years of experience.'
    },
    {
      icon: <Users className="w-8 h-8 text-accent mx-auto mb-2" />, title: 'Community', desc: 'We foster a supportive environment for everyone to learn and grow.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-white">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-16 px-4 text-center rounded-b-3xl shadow-lg mb-12">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">About Us</h1>
        <p className="text-xl max-w-2xl mx-auto mb-6 opacity-90">
          Your trusted source for financial insights, investment strategies, and money management tips. We're dedicated to empowering you with the knowledge to make informed financial decisions.
        </p>
        <button
          onClick={() => navigate('/contact')}
          className="mt-4 px-8 py-3 bg-accent text-white rounded-lg font-semibold shadow-lg hover:bg-accent/90 transition"
        >
          Contact Us
        </button>
        <div className="absolute left-0 right-0 bottom-0 h-2 bg-accent rounded-b-3xl" />
      </section>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <div className="bg-white rounded-xl shadow-md p-8 flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-primary mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-3">
              At HowToEarningMoney.com, we believe that financial literacy is the foundation of personal freedom. Our mission is to make complex financial concepts accessible to everyone, regardless of their background.
            </p>
            <ul className="text-gray-700 space-y-2 list-disc pl-5">
              <li>Build and manage a diversified investment portfolio</li>
              <li>Create effective budgeting and saving strategies</li>
              <li>Optimize your tax situation and maximize returns</li>
              <li>Plan for major life events and retirement</li>
            </ul>
          </div>
          <img
            src="https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=400&fit=crop"
            alt="Financial planning workspace"
            className="w-full max-w-xs h-64 object-cover rounded-lg shadow-lg"
            width="400"
            height="256"
            loading="lazy"
          />
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl mx-auto mb-16 px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center hover:shadow-2xl transition">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 object-cover rounded-full border-4 border-accent mb-4 shadow-md"
                width="128"
                height="128"
                loading="lazy"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-primary font-medium mb-1">{member.role}</p>
              <p className="text-xs text-gray-500 mb-2">{member.credentials}</p>
              <p className="text-gray-600 text-center text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-5xl mx-auto mb-16 px-4">
        <h2 className="text-3xl font-bold text-center text-primary mb-10">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((val, idx) => (
            <div key={idx} className="bg-primary/5 rounded-xl p-8 text-center shadow hover:shadow-lg transition">
              {val.icon}
              <h3 className="text-lg font-semibold text-primary mb-2">{val.title}</h3>
              <p className="text-gray-700 text-sm">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto mb-20 px-4 text-center">
        <div className="bg-accent text-white rounded-xl shadow-lg p-10">
          <h2 className="text-2xl font-bold mb-4">Ready to take control of your financial future?</h2>
          <p className="mb-6">Explore our articles or reach out to our team for personalized advice and support.</p>
          <button
            onClick={() => navigate('/contact')}
            className="px-8 py-3 bg-white text-accent font-semibold rounded-lg shadow hover:bg-gray-100 transition"
          >
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default About;
