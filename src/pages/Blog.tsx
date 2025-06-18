
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const allPosts = [
    {
      id: 1,
      title: 'The Complete Guide to Index Fund Investing in 2024',
      excerpt: 'Learn how to build wealth through low-cost index funds with our comprehensive beginner-friendly guide covering everything from basics to advanced strategies.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      category: 'Investing',
      readTime: '8 min read',
      date: '2024-01-20',
      author: 'Sarah Johnson'
    },
    {
      id: 2,
      title: 'High-Yield Savings Accounts: Best Options for 2024',
      excerpt: 'Compare the top high-yield savings accounts offering competitive rates and discover how to maximize your savings potential in today\'s market.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=600&h=400&fit=crop',
      category: 'Saving',
      readTime: '6 min read',
      date: '2024-01-18',
      author: 'Michael Chen'
    },
    {
      id: 3,
      title: 'Credit Card Churning: Risks and Rewards Explained',
      excerpt: 'Understanding the strategy of credit card churning, its benefits, risks, and whether it\'s right for your financial goals and lifestyle.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      category: 'Credit Cards',
      readTime: '10 min read',
      date: '2024-01-15',
      author: 'David Rodriguez'
    },
    {
      id: 4,
      title: '529 Education Savings Plans: Tax Benefits and Investment Options',
      excerpt: 'Everything you need to know about 529 plans for education savings, including tax advantages, investment strategies, and state-specific benefits.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
      category: 'Education',
      readTime: '7 min read',
      date: '2024-01-17',
      author: 'Emily Davis'
    },
    {
      id: 5,
      title: 'Debt Snowball vs. Debt Avalanche: Which Method Works Best?',
      excerpt: 'Compare two popular debt repayment strategies and learn which approach might be more effective for your specific financial situation.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
      category: 'Debt Management',
      readTime: '5 min read',
      date: '2024-01-16',
      author: 'James Wilson'
    },
    {
      id: 6,
      title: 'Real Estate Investment Trusts (REITs): A Beginner\'s Guide',
      excerpt: 'Learn how REITs can provide exposure to real estate markets without the hassle of property management, including types and investment strategies.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop',
      category: 'Real Estate',
      readTime: '9 min read',
      date: '2024-01-14',
      author: 'Lisa Thompson'
    },
    {
      id: 7,
      title: 'Building Your First Investment Portfolio: Step-by-Step Guide',
      excerpt: 'A comprehensive guide to creating a diversified investment portfolio tailored to your risk tolerance, time horizon, and financial goals.',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=600&h=400&fit=crop',
      category: 'Investing',
      readTime: '12 min read',
      date: '2024-01-13',
      author: 'Robert Kim'
    },
    {
      id: 8,
      title: 'Emergency Fund Calculator: How Much Should You Save?',
      excerpt: 'Use our guide to determine the right emergency fund size for your situation and learn the best places to keep your emergency savings.',
      image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=600&h=400&fit=crop',
      category: 'Emergency Fund',
      readTime: '6 min read',
      date: '2024-01-12',
      author: 'Amanda Foster'
    },
    {
      id: 9,
      title: 'Tax-Loss Harvesting: Optimize Your Investment Returns',
      excerpt: 'Learn how to use tax-loss harvesting to minimize your tax liability and improve your after-tax investment returns through strategic selling.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
      category: 'Tax Strategy',
      readTime: '8 min read',
      date: '2024-01-11',
      author: 'Kevin Lee'
    }
  ];

  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Financial Blog</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover expert insights on investing, personal finance, and wealth building strategies 
            to help you achieve your financial goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {currentPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                  <Link to={`/blog/${post.id}`} className="block">
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded">
                          {post.category}
                        </span>
                      </div>
                    </div>
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">By {post.author}</span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <h2 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.date}</span>
                      <Link 
                        to={`/blog/${post.id}`}
                        className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center space-x-2 mb-8">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                    currentPage === number
                      ? 'bg-primary text-white'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {number}
                </button>
              ))}
              
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>

            {/* Mid-content AdSense */}
            <div className="mb-8">
              <div className="adsense-slot h-32">
                <!-- Google AdSense Mid-Content Code Here -->
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
