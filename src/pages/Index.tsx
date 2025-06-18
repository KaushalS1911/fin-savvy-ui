
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';

const Index = () => {
  const featuredPosts = [
    {
      id: 1,
      title: 'The Complete Guide to Index Fund Investing in 2024',
      excerpt: 'Learn how to build wealth through low-cost index funds with our comprehensive beginner-friendly guide.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop',
      category: 'Investing',
      readTime: '8 min read',
      date: '2024-01-20',
      featured: true
    },
    {
      id: 2,
      title: 'High-Yield Savings Accounts: Best Options for 2024',
      excerpt: 'Compare the top high-yield savings accounts offering competitive rates and discover how to maximize your savings.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800&h=400&fit=crop',
      category: 'Saving',
      readTime: '6 min read',
      date: '2024-01-18'
    },
    {
      id: 3,
      title: 'Credit Card Churning: Risks and Rewards Explained',
      excerpt: 'Understanding the strategy of credit card churning, its benefits, risks, and whether it\'s right for your financial goals.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop',
      category: 'Credit Cards',
      readTime: '10 min read',
      date: '2024-01-15'
    }
  ];

  const latestPosts = [
    {
      id: 4,
      title: '529 Education Savings Plans: Tax Benefits and Investment Options',
      excerpt: 'Everything you need to know about 529 plans for education savings, including tax advantages and investment strategies.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop',
      category: 'Education',
      readTime: '7 min read',
      date: '2024-01-17'
    },
    {
      id: 5,
      title: 'Debt Snowball vs. Debt Avalanche: Which Method Works Best?',
      excerpt: 'Compare two popular debt repayment strategies and learn which approach might be more effective for your situation.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
      category: 'Debt Management',
      readTime: '5 min read',
      date: '2024-01-16'
    },
    {
      id: 6,
      title: 'Real Estate Investment Trusts (REITs): A Beginner\'s Guide',
      excerpt: 'Learn how REITs can provide exposure to real estate markets without the hassle of property management.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop',
      category: 'Real Estate',
      readTime: '9 min read',
      date: '2024-01-14'
    },
    {
      id: 7,
      title: 'Building Your First Investment Portfolio: Step-by-Step Guide',
      excerpt: 'A comprehensive guide to creating a diversified investment portfolio tailored to your risk tolerance and goals.',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=250&fit=crop',
      category: 'Investing',
      readTime: '12 min read',
      date: '2024-01-13'
    },
    {
      id: 8,
      title: 'Emergency Fund Calculator: How Much Should You Save?',
      excerpt: 'Use our guide to determine the right emergency fund size for your situation and learn the best places to keep it.',
      image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=400&h=250&fit=crop',
      category: 'Emergency Fund',
      readTime: '6 min read',
      date: '2024-01-12'
    },
    {
      id: 9,
      title: 'Tax-Loss Harvesting: Optimize Your Investment Returns',
      excerpt: 'Learn how to use tax-loss harvesting to minimize your tax liability and improve your after-tax investment returns.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop',
      category: 'Tax Strategy',
      readTime: '8 min read',
      date: '2024-01-11'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Section with Featured Posts */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Featured Post */}
            <div className="lg:col-span-2">
              <Link to={`/blog/${featuredPosts[0].id}`} className="group block">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src={featuredPosts[0].image} 
                    alt={featuredPosts[0].title}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-block px-3 py-1 bg-accent text-white text-sm font-medium rounded-full mb-3">
                      {featuredPosts[0].category}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {featuredPosts[0].title}
                    </h2>
                    <p className="text-gray-200 mb-3">{featuredPosts[0].excerpt}</p>
                    <div className="flex items-center text-sm text-gray-300">
                      <span>{featuredPosts[0].date}</span>
                      <span className="mx-2">•</span>
                      <span>{featuredPosts[0].readTime}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>

            {/* Side Featured Posts */}
            <div className="space-y-6">
              {featuredPosts.slice(1).map((post) => (
                <Link key={post.id} to={`/blog/${post.id}`} className="group block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded mb-2">
                        {post.category}
                      </span>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{post.date}</span>
                        <span className="mx-2">•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Blog Posts */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Latest Financial Insights</h2>
              <Link 
                to="/blog" 
                className="text-primary hover:text-primary/80 font-medium transition-colors"
              >
                View All Posts →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {latestPosts.map((post) => (
                <article key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={`/blog/${post.id}`} className="block">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </Link>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded">
                        {post.category}
                      </span>
                      <span className="text-sm text-gray-500">{post.readTime}</span>
                    </div>
                    <Link to={`/blog/${post.id}`}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h3>
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

            {/* In-content AdSense */}
            <div className="mb-8">
              <div className="adsense-slot h-32">
                {/* Google AdSense In-Content Code Here */}
              </div>
            </div>

            {/* Load More Button */}
            <div className="text-center">
              <Link 
                to="/blog"
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
              >
                View All Articles
              </Link>
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

export default Index;
