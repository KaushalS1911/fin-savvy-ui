import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Search as SearchIcon } from 'lucide-react';
import {getBlogs} from "@/lib/api.ts";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [allPosts, setAllPosts] = useState<any[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setAllPosts(data);
      } catch (err) {
        setAllPosts([]);
      }
    };
    fetchBlogs();
  }, []);

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
        post.category.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
                          {post.category.name}
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
