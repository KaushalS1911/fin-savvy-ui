import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import { getBlogs, getCategories } from '../lib/api';
import { PostCardSkeleton } from '../components/SkeletonLoader';

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
  author: {
    name: string;
  };
}

interface Category {
    _id: string;
    name: string;
    description: string;
}

const CategoryPosts = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<Post[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const postsPerPage = 6;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const allPosts = await getBlogs();
        const allCategories = await getCategories();
        
        const currentCategory = allCategories.find(
          (cat: Category) => cat.name.toLowerCase().replace(/\s+/g, '-') === categorySlug
        );
        
        if (currentCategory) {
          setCategory(currentCategory);
          const categoryPosts = allPosts.filter(
            (post: Post) => post.category.name === currentCategory.name
          );
          setPosts(categoryPosts);
        } else {
          setError('Category not found.');
        }

        setLoading(false);
      } catch (err) {
        setError('Failed to fetch data.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, [categorySlug]);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Category: {category?.name}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {category?.description}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {currentPosts.map((post) => (
                <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                  <Link to={`/blog/${post._id}`} className="block">
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
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-gray-500">By {post.author.name}</span>
                      <span className="text-sm text-gray-500">{post.readTime} min read</span>
                    </div>
                    <Link to={`/blog/${post._id}`}>
                      <h2 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                      <Link 
                        to={`/blog/${post._id}`}
                        className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                      >
                        Read More →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

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
          </div>
          <Sidebar />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CategoryPosts; 