
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const [email, setEmail] = useState('');

  const recentPosts = [
    { id: 1, title: '10 Best Investment Apps for Beginners', date: '2024-01-15' },
    { id: 2, title: 'How to Build an Emergency Fund Fast', date: '2024-01-12' },
    { id: 3, title: 'Credit Card Rewards: Maximize Your Benefits', date: '2024-01-10' },
    { id: 4, title: 'Real Estate Investment Trusts Explained', date: '2024-01-08' },
  ];

  const categories = [
    { name: 'Investing', count: 25 },
    { name: 'Personal Finance', count: 18 },
    { name: 'Credit Cards', count: 12 },
    { name: 'Loans', count: 15 },
    { name: 'Saving Tips', count: 20 },
    { name: 'Retirement', count: 10 },
  ];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Newsletter signup:', email);
    setEmail('');
    // Add your newsletter signup logic here
  };

  return (
    <aside className="w-full lg:w-80 space-y-8">
      {/* Top AdSense Slot */}
      <div className="adsense-slot h-64">
        <!-- Google AdSense Sidebar Top Code Here -->
      </div>

      {/* Newsletter Signup */}
      <div className="bg-accent/10 p-6 rounded-lg border">
        <h3 className="text-lg font-semibold text-primary mb-4">
          💰 Financial Newsletter
        </h3>
        <p className="text-gray-600 mb-4 text-sm">
          Get weekly insights on investing, saving, and building wealth delivered to your inbox.
        </p>
        <form onSubmit={handleNewsletterSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            Subscribe Free
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          No spam. Unsubscribe anytime.
        </p>
      </div>

      {/* Categories */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold text-primary mb-4">Categories</h3>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.name}>
              <Link
                to={`/categories/${category.name.toLowerCase().replace(' ', '-')}`}
                className="flex justify-between items-center py-1 text-gray-700 hover:text-primary transition-colors"
              >
                <span>{category.name}</span>
                <span className="text-sm text-gray-500">({category.count})</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Recent Posts */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold text-primary mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="border-b border-gray-100 pb-3 last:border-b-0">
              <Link
                to={`/blog/${post.id}`}
                className="block hover:text-primary transition-colors"
              >
                <h4 className="font-medium text-sm mb-1 line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-xs text-gray-500">{post.date}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Middle AdSense Slot */}
      <div className="adsense-slot h-64">
        <!-- Google AdSense Sidebar Middle Code Here -->
      </div>

      {/* Tags Cloud */}
      <div className="bg-white p-6 rounded-lg border shadow-sm">
        <h3 className="text-lg font-semibold text-primary mb-4">Popular Tags</h3>
        <div className="flex flex-wrap gap-2">
          {['Investing', 'Stocks', 'ETFs', 'Budgeting', 'Retirement', 'Credit Score', 'Real Estate', 'Cryptocurrency'].map((tag) => (
            <Link
              key={tag}
              to={`/tags/${tag.toLowerCase()}`}
              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              {tag}
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
