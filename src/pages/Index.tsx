import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
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
  featured?: boolean;
}

const Index = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await getBlogs();
        const featured = posts.filter((p: Post) => p.featured).slice(0, 3);
        const latest = posts.sort((a: Post, b: Post) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 6);
        setFeaturedPosts(featured.length > 0 ? featured : latest.slice(0,3));
        setLatestPosts(latest);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch posts.');
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Function to get the URL for a post (slug or generated from title)
  const getPostUrl = (post: Post) => {
    if (post.slug) {
      return `/blog/${post.slug}`;
    }
    // Generate slug from title if no slug exists
    const titleSlug = generateSlug(post.title);
    return `/blog/${titleSlug}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />
        <main className="max-w-7xl mx-auto px-4 py-8">
          <section className="mb-12">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="relative overflow-hidden rounded-xl shadow-lg bg-white h-[480px] animate-pulse">
                  <div className="w-full h-full bg-gray-200"></div>
                </div>
              </div>
              <div className="space-y-6">
                <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
                  <div className="w-full h-48 bg-gray-200"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-full mb-3"></div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-8">
                <div className="h-8 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-6 w-1/6 bg-gray-200 rounded animate-pulse"></div>
              </div>
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
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Featured Post */}
            {featuredPosts.length > 0 && (
            <div className="lg:col-span-2">
              <Link to={getPostUrl(featuredPosts[0])} className="group block">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src={featuredPosts[0].image} 
                    alt={featuredPosts[0].title}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-block px-3 py-1 bg-accent text-white text-sm font-medium rounded-full mb-3">
                      {featuredPosts[0].category.name}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {featuredPosts[0].title}
                    </h2>
                    <p className="text-gray-200 mb-3">{featuredPosts[0].excerpt}</p>
                    <div className="flex items-center text-sm text-gray-300">
                      <span>{new Date(featuredPosts[0].createdAt).toDateString()}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
            )}

            {/* Side Featured Posts */}
            <div className="space-y-6">
              {featuredPosts.slice(1).map((post) => (
                <Link key={post._id} to={getPostUrl(post)} className="group block">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <img 
                      src={post.image} 
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="p-4">
                      <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded mb-2">
                        {post.category.name}
                      </span>
                      <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{post.excerpt}</p>
                      <div className="flex items-center text-xs text-gray-500">
                        <span>{new Date(post.createdAt).toDateString()}</span>
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
                <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <Link to={getPostUrl(post)} className="block">
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
                    </div>
                    <Link to={getPostUrl(post)}>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-primary transition-colors mb-2">
                        {post.title}
                      </h3>
                    </Link>
                    <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{new Date(post.createdAt).toDateString()}</span>
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
