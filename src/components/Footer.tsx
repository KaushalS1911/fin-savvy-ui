import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/images/footer-logo.png'

const Footer = () => {
  return (
    <footer className="bg-primary text-white">
      {/* Pre-footer AdSense */}

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="mb-4">
              <img src={logo} alt="FinanceBlog Logo" className="h-32 w-auto object-cover" />
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Your trusted source for financial insights, investment strategies, and money management tips. 
              Empowering you to make informed financial decisions.
            </p>
            {/* Social Media Links */}
            {/*<div className="flex space-x-4">*/}
            {/*  <a href="#" className="text-gray-300 hover:text-white transition-colors">*/}
            {/*    <span className="sr-only">Facebook</span>*/}
            {/*    <div className="w-6 h-6 bg-gray-300 rounded"></div>*/}
            {/*  </a>*/}
            {/*  <a href="#" className="text-gray-300 hover:text-white transition-colors">*/}
            {/*    <span className="sr-only">Twitter</span>*/}
            {/*    <div className="w-6 h-6 bg-gray-300 rounded"></div>*/}
            {/*  </a>*/}
            {/*  <a href="#" className="text-gray-300 hover:text-white transition-colors">*/}
            {/*    <span className="sr-only">LinkedIn</span>*/}
            {/*    <div className="w-6 h-6 bg-gray-300 rounded"></div>*/}
            {/*  </a>*/}
            {/*</div>*/}
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-300 hover:text-white transition-colors">Blog</Link></li>
              <li><Link to="/categories" className="text-gray-300 hover:text-white transition-colors">Categories</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terms of Use</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Disclaimer</a></li>
            </ul>
          </div>
        </div>

        {/*
        <div className="border-t border-gray-600 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © 2024 FinanceBlog. All rights reserved.
          </p>
        </div>
        */}
      </div>
    </footer>
  );
};

export default Footer;
