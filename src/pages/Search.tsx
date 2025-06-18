
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Search as SearchIcon } from 'lucide-react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  // Sample search data - in real app, this would come from API
  const allPosts = [
    {
      id: 1,
      title: 'The Complete Guide to Index Fund Investing in 2024',
      excerpt: 'Learn how to build wealth through low-cost index funds with our comprehensive beginner-friendly guide.',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
      category: 'Investing',
      date: '2024-01-20',
      tags: ['investing', 'index funds', 'etfs', 'portfolio']
    },
    {
      id: 2,
      title: 'High-Yield Savings Accounts: Best Options for 2024',
      excerpt: 'Compare the top high-yield savings accounts offering competitive rates and discover how to maximize your savings.',
      image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=400&h=250&fit=crop',
      category: 'Saving',
      date: '2024-01-18',
      tags: ['savings', 'banking', 'interest rates', 'emergency fund']
    },
    {
      id: 3,
      title: 'Credit Card Churning: Risks and Rewards Explained',
      excerpt: 'Understanding the strategy of credit card churning, its benefits, risks, and whether it\'s right for your financial goals.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop',
      category: 'Credit Cards',
      date: '2024-01-15',
      tags: ['credit cards', 'rewards', 'churning', 'credit score']
    },
    {
      id: 4,
      title: 'Emergency Fund Calculator: How Much Should You Save?',
      excerpt: 'Use our guide to determine the right emergency fund size for your situation and learn the best places to keep it.',
      image: 'https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?w=400&h=250&fit=crop',
      category: 'Emergency Fund',
      date: '2024-01-12',
      tags: ['emergency fund', 'savings', 'financial planning', 'budgeting']
    },
    {
      id: 5,
      title: 'Real Estate Investment Trusts (REITs): A Beginner\'s Guide',
      excerpt: 'Learn how REITs can provide exposure to real estate markets without the hassle of property management.',
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop',
      category: 'Real Estate',
      date: '2024-01-14',
      tags: ['reits', 'real estate', 'investing', 'dividends']
    }
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setHasSearched(true);

    // Simulate API call
    setTimeout(() => {
      const results = allPosts.filter(post => 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      
      setSearchResults(results);
      setIsLoading(false);
    }, 800);
  };

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200">$1</mark>');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Search Articles</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Find expert financial insights, investment strategies, and money management tips 
            from our comprehensive library of articles.
          </p>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={handleQueryChange}
                placeholder="Search for investing, budgeting, credit cards..."
                className="w-full pl-12 pr-4 py-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={24} />
              <button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors font-medium"
                disabled={isLoading}
              >
                {isLoading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </form>
        </div>

        {/* Top AdSense */}
        <div className="mb-8">
          <div className="adsense-slot h-24">
            {/* Google AdSense Search Top Code Here */}
          </div>
        </div>

        {/* Popular Searches */}
        {!hasSearched && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Searches</h2>
            <div className="flex flex-wrap gap-3">
              {['Index Funds', 'Emergency Fund', 'Credit Score', 'Retirement Planning', 'Real Estate', 'Tax Strategy', 'Budgeting', 'Debt Management'].map((term) => (
                <button
                  key={term}
                  onClick={() => {
                    setSearchQuery(term);
                    handleSearch({ preventDefault: () => {} } as React.FormEvent);
                  }}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-full hover:border-primary hover:text-primary transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="mt-4 text-gray-600">Searching articles...</p>
          </div>
        )}

        {/* Search Results */}
        {hasSearched && !isLoading && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Search Results
                {searchResults.length > 0 && (
                  <span className="text-lg font-normal text-gray-600 ml-2">
                    ({searchResults.length} articles found for "{searchQuery}")
                  </span>
                )}
              </h2>
            </div>

            {searchResults.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SearchIcon size={48} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any articles matching "{searchQuery}". Try different keywords or browse our categories.
                </p>
                <div className="space-x-4">
                  <Link 
                    to="/blog"
                    className="inline-block bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
                  >
                    Browse All Articles
                  </Link>
                  <Link 
                    to="/categories"
                    className="inline-block border border-primary text-primary px-6 py-2 rounded-md hover:bg-primary hover:text-white transition-colors"
                  >
                    View Categories
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {searchResults.map((post) => (
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
                        <span className="text-sm text-gray-500">{post.date}</span>
                      </div>
                      <Link to={`/blog/${post.id}`}>
                        <h3 
                          className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors mb-2 line-clamp-2"
                          dangerouslySetInnerHTML={{ __html: highlightText(post.title, searchQuery) }}
                        />
                      </Link>
                      <p 
                        className="text-gray-600 mb-4 line-clamp-3"
                        dangerouslySetInnerHTML={{ __html: highlightText(post.excerpt, searchQuery) }}
                      />
                      <Link 
                        to={`/blog/${post.id}`}
                        className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Mid-content AdSense */}
        {hasSearched && searchResults.length > 0 && (
          <div className="my-12">
            <div className="adsense-slot h-32">
              {/* Google AdSense Search Results Code Here */}
            </div>
          </div>
        )}

        {/* Search Tips */}
        {!hasSearched && (
          <section className="bg-white rounded-lg p-8 border shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Search Tips</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">💡 Get Better Results</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Use specific keywords like "index funds" or "emergency fund"</li>
                  <li>• Try different variations of your search terms</li>
                  <li>• Use quotes for exact phrases: "debt snowball method"</li>
                  <li>• Search by category names like "investing" or "credit cards"</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">📚 Popular Topics</h3>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Investment strategies and portfolio building</li>
                  <li>• Budgeting and money management tips</li>
                  <li>• Credit score improvement and credit cards</li>
                  <li>• Retirement planning and tax strategies</li>
                </ul>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Search;
