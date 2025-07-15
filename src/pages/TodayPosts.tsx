import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
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
  createdAt?: string;
  slug?: string;
  author: {
    name: string;
  };
}

const TodayPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodayPosts = async () => {
      try {
        const allPosts = await getBlogs();
        const today = new Date();
        const isToday = (dateStr: string) => {
          const d = new Date(dateStr);
          return d.getFullYear() === today.getFullYear() &&
            d.getMonth() === today.getMonth() &&
            d.getDate() === today.getDate();
        };
        const todayPosts = allPosts.filter((post: Post) =>
          (post.createdAt && isToday(post.createdAt)) || isToday(post.date)
        );
        setPosts(todayPosts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch today\'s posts.');
        setLoading(false);
      }
    };
    fetchTodayPosts();
  }, []);

  const getPostUrl = (post: Post) => {
    if (post.slug) return `/${post.slug}`;
    if (post.title) return `/${generateSlug(post.title)}`;
    return `/${post._id}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Today's Posts</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See all posts published today.
          </p>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {Array.from({ length: 6 }).map((_, idx) => <PostCardSkeleton key={idx} />)}
          </div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-500 text-lg py-32">No posts published today.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {posts.map((post) => (
              <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
                <Link to={getPostUrl(post)} className="block">
                  <div className="relative w-full h-56 bg-gray-100">
                    {post.image ? (
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover rounded-t-lg transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                    )}
                    <span className="absolute top-4 left-4 px-3 py-1 bg-primary text-white text-xs font-bold rounded shadow">
                      {post.category.name}
                    </span>
                  </div>
                </Link>
                <div className="p-6 flex flex-col flex-1">
                  <Link to={getPostUrl(post)}>
                    <h2 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors mb-3 line-clamp-2">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-600 mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-gray-500">{new Date(post.createdAt || post.date).toDateString()}</span>
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
        )}
      </main>
      <Footer />
    </div>
  );
};

export default TodayPosts; 