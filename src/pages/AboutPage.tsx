import React from 'react';

const AboutPage: React.FC = () => (
  <div className="max-w-3xl mx-auto px-4 py-12">
    <h1 className="text-4xl font-bold mb-6">About Us</h1>
    <p className="mb-4 text-gray-700">
      Welcome to HowToEarningMoney.com! Our mission is to provide high-quality, well-researched advice and resources to help you earn money online. We are dedicated to empowering individuals with the knowledge and tools they need to succeed in the digital economy.
    </p>
    <p className="mb-4 text-gray-700">
      Our team of experienced writers and financial experts carefully curates content to ensure accuracy, reliability, and actionable value. Whether you are looking for side hustles, investment opportunities, or ways to grow your online business, we are here to guide you every step of the way.
    </p>
    <p className="mb-4 text-gray-700">
      We believe in transparency, integrity, and putting our readers first. Thank you for trusting us as your go-to resource for earning money online.
    </p>
    <h2 className="text-2xl font-semibold mt-8 mb-4">Our Commitment</h2>
    <ul className="list-disc pl-6 mb-4 text-gray-700">
      <li>Delivering up-to-date, actionable advice</li>
      <li>Maintaining editorial independence and integrity</li>
      <li>Protecting your privacy and data</li>
      <li>Fostering a supportive community</li>
    </ul>
    <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
    <p className="mb-4 text-gray-700">
      Have questions or suggestions? <a href="/contact" className="text-primary underline">Contact us here</a>.
    </p>
  </div>
);

export default AboutPage; 