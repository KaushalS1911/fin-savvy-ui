import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const recentPosts = [
    {
      id: 1,
      title: 'The Complete Guide to Index Fund Investing',
      date: '2024-01-20'
    },
    {
      id: 2,
      title: 'High-Yield Savings Accounts: Best Options',
      date: '2024-01-18'
    },
    {
      id: 3,
      title: 'Credit Card Churning: Risks and Rewards',
      date: '2024-01-15'
    }
  ];

  const categories = [
    { name: 'Investing', count: 25 },
    { name: 'Personal Finance', count: 18 },
    { name: 'Credit Cards', count: 12 },
    { name: 'Retirement', count: 10 },
    { name: 'Real Estate', count: 8 }
  ];

  return (
    <aside className="space-y-8">
      {/* AdSense Slot */}
      <div className="adsense-slot h-64">
        {/* Google AdSense Sidebar Code Here */}
      </div>

      {/* Newsletter Signup */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Subscribe to Our Newsletter</h3>
        <p className="text-gray-600 mb-4 text-sm">
          Get the latest financial insights delivered to your inbox weekly.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium text-sm"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {recentPosts.map((post) => (
            <div key={post.id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
              <Link 
                to={`/blog/${post.id}`}
                className="text-gray-900 hover:text-primary transition-colors font-medium text-sm leading-tight line-clamp-2"
              >
                {post.title}
              </Link>
              <p className="text-gray-500 text-xs mt-1">{post.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category, index) => (
            <Link
              key={index}
              to={`/category/${category.name.toLowerCase().replace(' ', '-')}`}
              className="flex items-center justify-between py-2 px-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors rounded text-sm"
            >
              <span>{category.name}</span>
              <span className="text-gray-500 text-xs">({category.count})</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Another AdSense Slot */}
      <div className="adsense-slot h-64">
        {/* Google AdSense Sidebar Bottom Code Here */}
      </div>
    </aside>
  );
};

export default Sidebar;
