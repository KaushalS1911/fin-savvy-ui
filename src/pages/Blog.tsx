import React, { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import Sidebar from '../components/Sidebar';
import { Link } from 'react-router-dom';
import { getBlogs } from '../lib/api';
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

// This component fetches and renders the blog posts. It will "suspend" while loading.
const BlogContent = () => {
  const { data: allPosts } = useQuery<Post[]>({
    queryKey: ['blogs'],
    queryFn: getBlogs,
  });

  const [currentPage, setCurrentPage] = React.useState(1);
  const postsPerPage = 6;
  const totalPages = Math.ceil((allPosts || []).length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = (allPosts || []).slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const getPostUrl = (post: Post) => {
    if (post.slug) return `/blog/${post.slug}`;
    if (post.title) return `/blog/${generateSlug(post.title)}`;
    return `/blog/${post._id}`;
  };

  function getResponsivePaginationRange(current: number, total: number) {
    let maxButtons = 5;
    if (total <= maxButtons) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }
    const range: (number | string)[] = [];
    range.push(1);
    if (current > 2) range.push('...');
    if (current > 1 && current < total) range.push(current);
    if (current < total - 1) range.push('...');
    range.push(total);
    return Array.from(new Set(range));
  }
  
  return (
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
                      width="378"
                      height="192"
                      loading="lazy"
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
  );
};

// This is the main component exported by the page.
// It provides the Suspense boundary and the skeleton loader fallback.
const BlogPage = () => {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
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
      </div>
    }>
      <BlogContent />
    </Suspense>
  );
};

export default BlogPage;
