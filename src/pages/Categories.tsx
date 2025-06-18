
import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Categories = () => {
  const categories = [
    {
      name: 'Investing',
      description: 'Learn about stocks, bonds, ETFs, mutual funds, and building a diversified investment portfolio.',
      count: 25,
      color: 'bg-blue-500',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
      slug: 'investing'
    },
    {
      name: 'Personal Finance',
      description: 'Master budgeting, expense tracking, and money management strategies for everyday life.',
      count: 18,
      color: 'bg-green-500',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop',
      slug: 'personal-finance'
    },
    {
      name: 'Credit Cards',
      description: 'Navigate credit card rewards, improve your credit score, and avoid common pitfalls.',
      count: 12,
      color: 'bg-purple-500',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
      slug: 'credit-cards'
    },
    {
      name: 'Loans',
      description: 'Understand mortgages, student loans, personal loans, and debt management strategies.',
      count: 15,
      color: 'bg-red-500',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop',
      slug: 'loans'
    },
    {
      name: 'Saving Tips',
      description: 'Discover practical ways to save money, build emergency funds, and reach your goals faster.',
      count: 20,
      color: 'bg-yellow-500',
      image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=400&h=250&fit=crop',
      slug: 'saving-tips'
    },
    {
      name: 'Retirement',
      description: 'Plan for your future with 401(k) strategies, IRA guidance, and retirement planning tips.',
      count: 10,
      color: 'bg-indigo-500',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop',
      slug: 'retirement'
    },
    {
      name: 'Real Estate',
      description: 'Explore home buying, real estate investing, REITs, and property market insights.',
      count: 14,
      color: 'bg-teal-500',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop',
      slug: 'real-estate'
    },
    {
      name: 'Tax Strategy',
      description: 'Optimize your taxes with smart strategies, deductions, and tax-advantaged accounts.',
      count: 8,
      color: 'bg-orange-500',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop',
      slug: 'tax-strategy'
    },
    {
      name: 'Business Finance',
      description: 'Small business financial management, startup funding, and entrepreneurial money tips.',
      count: 11,
      color: 'bg-pink-500',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=250&fit=crop',
      slug: 'business-finance'
    }
  ];

  const totalArticles = categories.reduce((sum, category) => sum + category.count, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse by Category</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Explore our comprehensive collection of financial articles organized by topic. 
            Find expert insights tailored to your specific interests and financial goals.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-lg">
            <span className="font-semibold">{totalArticles}</span>
            <span className="ml-1">total articles across all categories</span>
          </div>
        </div>

        {/* Top AdSense */}
        <div className="mb-8">
          <div className="adsense-slot h-24">
            <!-- Google AdSense Categories Top Code Here -->
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img 
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className={`inline-block px-3 py-1 ${category.color} text-white text-sm font-medium rounded mb-2`}>
                    {category.count} articles
                  </div>
                  <h3 className="text-white text-xl font-bold group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center text-primary font-medium text-sm">
                  <span>Explore articles</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mid-content AdSense */}
        <div className="mb-12">
          <div className="adsense-slot h-32">
            <!-- Google AdSense Categories Middle Code Here -->
          </div>
        </div>

        {/* Popular Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Most Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories
              .sort((a, b) => b.count - a.count)
              .slice(0, 3)
              .map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="group flex items-center p-4 bg-white rounded-lg border hover:border-primary transition-colors"
                >
                  <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mr-4`}>
                    <span className="text-white font-bold text-lg">
                      {category.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-gray-500">{category.count} articles</p>
                  </div>
                  <span className="text-gray-400 group-hover:text-primary transition-colors">→</span>
                </Link>
              ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Get the latest financial insights delivered to your inbox. No spam, just valuable content 
            to help you make better financial decisions.
          </p>
          <div className="max-w-md mx-auto flex gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button className="bg-accent text-white px-6 py-2 rounded-md hover:bg-accent/90 transition-colors font-medium">
              Subscribe
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Categories;
