import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs, getCategories } from '../lib/api';
import { generateSlug } from '../lib/utils';

interface Post {
  _id: string;
  title: string;
  date: string;
  slug?: string;
}

interface Category {
  _id: string;
  name: string;
}

const Sidebar = () => {
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, categoriesData] = await Promise.all([
          getBlogs(),
          getCategories(),
        ]);
        setRecentPosts(postsData.slice(0, 3));
        setCategories(categoriesData.slice(0, 5));
        // Count posts per category
        const counts: { [key: string]: number } = {};
        postsData.forEach((post) => {
          if (post.category && post.category.name) {
            counts[post.category.name] = (counts[post.category.name] || 0) + 1;
          }
        });
        setCategoryCounts(counts);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch sidebar data.');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const generateSlugFromName = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  // Function to get the URL for a post (slug or generated from title)
  const getPostUrl = (post: Post) => {
    if (post.slug) return `/blog/${post.slug}`;
    if (post.title) return `/blog/${generateSlug(post.title)}`;
    return `/blog/${post._id}`;
  };

  return (
    <aside className="space-y-8">
      {/* Newsletter Signup */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Subscribe to Our Newsletter</h3>
        <p className="text-gray-600 mb-4 text-sm">
          Get the latest financial insights delivered to your inbox weekly.
        </p>
        <form className="space-y-3">
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 transition-colors font-medium text-sm"
          >
            Subscribe
          </button>
        </form>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Posts</h3>
        <div className="space-y-4">
          {loading && <p>Loading posts...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && recentPosts.map((post) => (
            <div key={post._id} className="border-b border-gray-200 pb-3 last:border-b-0 last:pb-0">
              <Link 
                to={getPostUrl(post)}
                className="text-gray-900 hover:text-primary transition-colors font-medium text-sm leading-tight line-clamp-2"
              >
                {post.title}
              </Link>
              <p className="text-gray-500 text-xs mt-1">{new Date(post.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Most Popular Categories</h3>
        <div className="space-y-2 mb-6">
          {loading && <p>Loading popular categories...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error &&
            Object.entries(categoryCounts)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 3)
              .map(([name, count]) => (
                <Link
                  key={name}
                  to={`/category/${generateSlugFromName(name)}`}
                  className="flex items-center justify-between py-2 px-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors rounded text-sm font-medium"
                >
                  <span>{name}</span>
                  <span className="ml-2 text-xs text-gray-400">{count} posts</span>
                </Link>
              ))}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Categories</h3>
        <div className="space-y-2">
          {loading && <p>Loading categories...</p>}
          {error && <p className="text-red-500">{error}</p>}
          {!loading && !error && categories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${generateSlugFromName(category.name)}`}
              className="flex items-center justify-between py-2 px-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors rounded text-sm"
            >
              <span>{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
