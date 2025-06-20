import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const BlogPost = () => {
  const { id } = useParams();

  // Sample blog post data - in real app, this would come from API/CMS
  const post = {
    id: parseInt(id || '1'),
    title: 'The Complete Guide to Index Fund Investing in 2024',
    content: `
      <p>Index fund investing has become one of the most popular and effective ways to build long-term wealth. In this comprehensive guide, we'll explore everything you need to know about index funds, from the basics to advanced strategies.</p>

      <h2>What Are Index Funds?</h2>
      <p>Index funds are a type of mutual fund or exchange-traded fund (ETF) designed to track the performance of a specific market index, such as the S&P 500. Instead of trying to beat the market, index funds aim to match its performance by holding the same securities in the same proportions as the index they track.</p>

      <blockquote>
        <p>"The best investment strategy is to buy a low-cost index fund and hold it for decades." - Warren Buffett</p>
      </blockquote>

      <h2>Why Choose Index Funds?</h2>
      <ul>
        <li><strong>Low Costs:</strong> Index funds typically have expense ratios of 0.03% to 0.20%, much lower than actively managed funds.</li>
        <li><strong>Diversification:</strong> A single index fund can provide exposure to hundreds or thousands of stocks.</li>
        <li><strong>Consistent Performance:</strong> While they won't beat the market, they also won't underperform by much.</li>
        <li><strong>Simplicity:</strong> No need to research fund managers or investment strategies.</li>
      </ul>

      <h2>Getting Started with Index Fund Investing</h2>
      <p>Starting your index fund investment journey is straightforward. Here's a step-by-step approach:</p>

      <ol>
        <li>Determine your investment goals and risk tolerance</li>
        <li>Choose a brokerage account</li>
        <li>Select appropriate index funds</li>
        <li>Decide on your asset allocation</li>
        <li>Set up automatic investments</li>
      </ol>

      <h2>Best Index Funds for Beginners</h2>
      <p>Here are some popular index fund options for new investors:</p>

      <ul>
        <li><strong>Total Stock Market Index Funds:</strong> Provide exposure to the entire U.S. stock market</li>
        <li><strong>S&P 500 Index Funds:</strong> Track the 500 largest U.S. companies</li>
        <li><strong>International Index Funds:</strong> Add global diversification to your portfolio</li>
        <li><strong>Bond Index Funds:</strong> Provide stability and income</li>
      </ul>

      <h2>Common Mistakes to Avoid</h2>
      <p>While index fund investing is relatively simple, there are some common pitfalls to avoid:</p>

      <ul>
        <li>Trying to time the market</li>
        <li>Checking your portfolio too frequently</li>
        <li>Choosing funds based solely on past performance</li>
        <li>Ignoring expense ratios</li>
        <li>Not maintaining proper asset allocation</li>
      </ul>

      <h2>Conclusion</h2>
      <p>Index fund investing offers a simple, low-cost way to build wealth over time. By following the principles outlined in this guide and staying disciplined with your investment approach, you can harness the power of compound growth and market returns to achieve your financial goals.</p>

      <p>Remember, investing is a long-term game. Start early, invest regularly, and let time and compound interest work in your favor.</p>
    `,
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&h=600&fit=crop',
    category: 'Investing',
    readTime: '8 min read',
    date: '2024-01-20',
    author: {
      name: 'Sarah Johnson',
      bio: 'Sarah is a certified financial planner with over 10 years of experience helping individuals build wealth through smart investing strategies.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=150&h=150&fit=crop&crop=face'
    },
    tags: ['Investing', 'Index Funds', 'ETFs', 'Long-term Investing', 'Portfolio']
  };

  const relatedPosts = [
    {
      id: 7,
      title: 'Building Your First Investment Portfolio: Step-by-Step Guide',
      image: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=300&h=200&fit=crop',
      category: 'Investing'
    },
    {
      id: 9,
      title: 'Tax-Loss Harvesting: Optimize Your Investment Returns',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=300&h=200&fit=crop',
      category: 'Tax Strategy'
    },
    {
      id: 6,
      title: 'Real Estate Investment Trusts (REITs): A Beginner\'s Guide',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=300&h=200&fit=crop',
      category: 'Real Estate'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <Link to="/blog" className="text-primary hover:text-primary/80 text-sm font-medium">
              ← Back to Blog
            </Link>
          </div>
          
          <div className="mb-6">
            <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {post.title}
            </h1>
            <div className="flex items-center text-gray-600 text-sm">
              <span>By {post.author.name}</span>
              <span className="mx-2">•</span>
              <span>{post.date}</span>
              <span className="mx-2">•</span>
              <span>{post.readTime}</span>
            </div>
          </div>

          <img 
            src={post.image} 
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
          />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Article Content */}
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            {/* In-article AdSense */}
            <div className="my-8">
              <div className="adsense-slot h-32">
                {/* Google AdSense In-Article Code Here */}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    to={`/tags/${tag.toLowerCase().replace(' ', '-')}`}
                    className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-8 p-6 bg-white rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold mb-4">About the Author</h3>
              <div className="flex items-start space-x-4">
                <img 
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                  <p className="text-gray-600 mt-2">{post.author.bio}</p>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.id}
                    to={`/blog/${relatedPost.id}`}
                    className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <img 
                      src={relatedPost.image}
                      alt={relatedPost.title}
                      className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded mb-2">
                        {relatedPost.category}
                      </span>
                      <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-sm line-clamp-2">
                        {relatedPost.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Comments Section */}
            <div className="mt-12 p-6 bg-white rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Comments</h3>
              <div className="text-center py-8 text-gray-500">
                <p>Comments section will be integrated with Disqus or similar service.</p>
                <p className="text-sm mt-2">{/* Disqus Comments Code Here */}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Sticky AdSense */}
            <div className="sticky top-8 space-y-6">
              <div className="adsense-slot h-64">
                {/* Google AdSense Sticky Sidebar Code Here */}
              </div>
              
              {/* Share Buttons */}
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-semibold mb-3">Share this article</h4>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                    Facebook
                  </button>
                  <button className="flex-1 bg-blue-400 text-white py-2 px-3 rounded text-sm hover:bg-blue-500 transition-colors">
                    Twitter
                  </button>

                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
