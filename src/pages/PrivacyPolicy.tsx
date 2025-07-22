import React from 'react';
import Navigation from '../components/Navigation';

const PrivacyPolicy: React.FC = () => (
  <>
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
      {/*<p className="mb-4 text-gray-700">Last updated: [Insert Date]</p>*/}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
      <p className="mb-4 text-gray-700">
        Welcome to HowToEarningMoney.com ("we", "us", or "our"). We are committed to protecting your privacy and ensuring your experience on our website is safe and secure. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li><strong>Personal Information:</strong> such as your name and email address when you contact us.</li>
        <li><strong>Usage Data:</strong> information about how you use our site, including IP address, browser type, device information, and pages visited.</li>
        <li><strong>Cookies and Tracking Technologies:</strong> we use cookies and similar technologies to enhance your experience, analyze site usage, and deliver personalized content and ads.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>To provide, operate, and maintain our website and services.</li>
        <li>To improve, personalize, and expand our website and services.</li>
        <li>To understand and analyze how you use our website.</li>
        <li>To communicate with you, including responding to your inquiries and sending newsletters.</li>
        <li>To process your requests and manage your account.</li>
        <li>To comply with legal obligations and protect our rights.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Cookies</h2>
      <p className="mb-4 text-gray-700">
        We use cookies and similar tracking technologies to track activity on our website and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, some parts of our website may not function properly.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Services</h2>
      <p className="mb-4 text-gray-700">
        We use third-party services such as Google Analytics and Google AdSense. These services may collect information sent by your browser as part of a web page request, such as cookies or your IP address. Google AdSense and other ad partners use cookies to serve ads based on your prior visits to our website or other websites.
      </p>
      <p className="mb-4 text-gray-700">
        Third-party vendors, including Google, may use cookies to serve ads based on your prior visits to our site. You may opt out of personalized advertising by visiting <a href="https://www.aboutads.info/choices" className="text-primary underline">AdChoices</a>.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">User Rights</h2>
      <ul className="list-disc pl-6 mb-4 text-gray-700">
        <li>You may request access to, correction of, or deletion of your personal information.</li>
        <li>You can opt out of personalized advertising as described above.</li>
        <li>You may disable cookies in your browser settings, but this may affect your experience on our site.</li>
      </ul>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
      <p className="mb-4 text-gray-700">
        We implement reasonable security measures to protect your information. However, please remember that no method of transmission over the Internet or method of electronic storage is 100% secure.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Children's Privacy</h2>
      <p className="mb-4 text-gray-700">
        Our website is not intended for children under 13. We do not knowingly collect personal information from children. If you believe your child has provided us with personal information, please contact us so we can remove it.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Changes to This Policy</h2>
      <p className="mb-4 text-gray-700">
        We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date.
      </p>
      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
      <p className="mb-4 text-gray-700">
        If you have any questions about this Privacy Policy, please <a href="/contact" className="text-primary underline">contact us</a> or email us at <a href="mailto:info@howtoearningmoney.com" className="text-primary underline">info@howtoearningmoney.com</a>.
      </p>
    </div>
  </>
);

export default PrivacyPolicy; 