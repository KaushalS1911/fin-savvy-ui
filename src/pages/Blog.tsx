import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import { getBlogs, testEndpoints } from '../lib/api';
import { PostCardSkeleton } from '../components/SkeletonLoader';
import { generateSlug } from '../lib/utils';

interface Post {
  _id: string;
  title: string;
  excerpt: string;
  image: string;
  category: {
    name: string;
  };
  readTime: string;
  date: string;
  slug?: string;
  author: {
    name: string;
  };
}

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const postsPerPage = 6;

  useEffect(() => {
    document.title = "All Blog Posts | How to Earning Money";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Browse all financial blog posts, tips, and insights to help you make smarter money decisions.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Browse all financial blog posts, tips, and insights to help you make smarter money decisions.';
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        // Test endpoints first
        await testEndpoints();
        
        const data = await getBlogs();
        setAllPosts(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch blog posts.');
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(allPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Function to get the URL for a post (slug or generated from title)
  const getPostUrl = (post: Post) => {
    if (post.slug) return `/blog/${post.slug}`;
    if (post.title) return `/blog/${generateSlug(post.title)}`;
    return `/blog/${post._id}`;
  };

  // Utility to generate pagination range with ellipsis (compact pattern)
  function getPaginationRange(current, total) {
    const range = [];
    if (total <= 5) {
      for (let i = 1; i <= total; i++) range.push(i);
      return range;
    }
    if (current <= 3) {
      range.push(1, 2, 3, 4, '...', total);
    } else if (current >= total - 2) {
      range.push(1, '...', total - 3, total - 2, total - 1, total);
    } else {
      range.push(1, '...', current - 1, current, current + 1, '...', total);
    }
    return range;
  }

  // Responsive pagination range utility (no duplicates)
  function getResponsivePaginationRange(current, total) {
    let maxButtons = 7;
    if (typeof window !== 'undefined' && window.innerWidth <= 640) {
      maxButtons = 5;
    }
    if (total <= maxButtons) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    const range = [];
    const sideCount = Math.floor((maxButtons - 3) / 2);
    let left = Math.max(current - sideCount, 2);
    let right = Math.min(current + sideCount, total - 1);

    // Adjust if close to start or end
    if (current - 1 <= sideCount) {
      left = 2;
      right = maxButtons - 2;
    } else if (total - current <= sideCount) {
      left = total - (maxButtons - 2);
      right = total - 1;
    }

    // Always add first page
    range.push(1);

    // Add left ellipsis if needed
    if (left > 2) range.push('ellipsis');

    // Add middle pages, but only if not already included
    for (let i = left; i <= right; i++) {
      if (i !== 1 && i !== total && !range.includes(i)) {
        range.push(i);
      }
    }

    // Add right ellipsis if needed
    if (right < total - 1) range.push('ellipsis');

    // Add last page if not already included
    if (total !== 1 && !range.includes(total)) range.push(total);

    return range;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {Array.from({ length: 6 }).map((_, index) => (
                  <PostCardSkeleton key={index} />
                ))}
              </div>
            </div>
            <Sidebar />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blogs</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover insights, tips, and strategies to help you make better financial decisions and achieve your money goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {currentPosts.map((post) => (
                <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                  <Link to={getPostUrl(post)} className="block">
                    <div className="relative overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded">
                          {post.category.name}
                        </span>
                      </div>
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <Link to={getPostUrl(post)}>
                      <h2 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{new Date(post.date).toDateString()}</span>
                      <Link 
                        to={getPostUrl(post)}
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
            {totalPages > 1 && (
              <div className="pagination-responsive flex justify-center items-center gap-2 mb-8 flex-wrap">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {'<'}
                </button>
                {getResponsivePaginationRange(currentPage, totalPages).map((item, idx) =>
                  item === 'ellipsis'
                    ? (
                      <span key={`ellipsis-${idx}`} className="px-4 py-2 text-sm font-medium text-gray-500">...</span>
                    ) : (
                      <button
                        key={item}
                        onClick={() => paginate(Number(item))}
                        className={`px-4 py-2 text-sm font-medium rounded-md ${
                          currentPage === item
                            ? 'bg-primary text-white'
                            : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        {item}
                      </button>
                    )
                )}
                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {'>'}
                </button>
              </div>
            )}
          </div>

          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
