import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { getBlogs, getCategories } from '../lib/api';
import { PostCardSkeleton } from '../components/SkeletonLoader';
import { generateSlug } from '../lib/utils';
import { Search as SearchIcon } from 'lucide-react';

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
  image_small?: string;
  image_medium?: string;
  image_large?: string;
  image_alt?: string;
}

interface Category {
    _id: string;
    name: string;
    description: string;
}

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
        console.log(currentCategory,"000000000")
        
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

  useEffect(() => {
    if (category) {
      const canonicalUrl = window.location.origin + window.location.pathname;
      const title = `${category.name} Articles | How to Earning Money`;
      const description = category.description || `Read financial blog posts about ${category.name} on How to Earning Money.`;

      // Helper to set meta tags
      const setMetaTag = (attr: 'name' | 'property', value: string, content: string) => {
        let element = document.querySelector(`meta[${attr}="${value}"]`) as HTMLMetaElement;
        if (!element) {
          element = document.createElement('meta');
          element.setAttribute(attr, value);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      };

      // Update standard meta tags
      document.title = title;
      setMetaTag('name', 'description', description);

      // Update Open Graph meta tags
      setMetaTag('property', 'og:title', title);
      setMetaTag('property', 'og:description', description);
      setMetaTag('property', 'og:image', 'https://financeblog.com/og-image.jpg'); // Consider a category-specific image
      setMetaTag('property', 'og:url', canonicalUrl);
      setMetaTag('property', 'og:type', 'website');

      // Update Twitter Card meta tags
      setMetaTag('name', 'twitter:card', 'summary_large_image');
      setMetaTag('name', 'twitter:title', title);
      setMetaTag('name', 'twitter:description', description);
      setMetaTag('name', 'twitter:image', 'https://financeblog.com/twitter-image.jpg'); // Consider a category-specific image

      // Canonical Link
      let link = document.querySelector("link[rel='canonical']");
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalUrl);
    }
  }, [category]);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Function to get the URL for a post (slug or generated from title)
  const getPostUrl = (post: Post) => {
    if (post.slug) return `/blog/${post.slug}`;
    const titleSlug = generateSlug(post.title);
    return `/blog/${titleSlug}`;
  };

  if (loading) {
    return (
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
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      
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
              {posts.length === 0 ? (
                <div className="col-span-full flex flex-col items-center justify-center py-20">
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-6">
                    <SearchIcon size={40} className="text-gray-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">No articles found</h2>
                  <p className="text-gray-500 mb-6 text-center max-w-md">
                    We couldn't find any articles in this category. Try browsing all articles or explore other categories.
                  </p>
                  <div className="flex gap-4">
                    <Link to="/blog" className="px-6 py-2 rounded-md bg-primary text-white font-medium hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                      Browse All Articles
                    </Link>
                    <Link to="/categories" className="px-6 py-2 rounded-md border border-primary text-primary font-medium hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                      View Categories
                    </Link>
                  </div>
                </div>
              ) : (
                currentPosts.map((post) => (
                  <article key={post._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
                    <Link to={getPostUrl(post)} className="block">
                      <div className="relative overflow-hidden">
                        <img 
                          src={post.image_medium || post.image}
                          srcSet={[
                            post.image_small ? `${post.image_small} 400w` : '',
                            post.image_medium ? `${post.image_medium} 768w` : '',
                            post.image_large ? `${post.image_large} 1200w` : ''
                          ].filter(Boolean).join(', ')}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 1200px"
                          alt={post.image_alt || post.title}
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
                      {/*<div className="flex items-center justify-between mb-3">*/}
                      {/*  /!*<span className="text-sm text-gray-500">By {post.author.name}</span>*!/*/}
                      {/*  /!*<span className="text-sm text-gray-500">{post.readTime} min read</span>*!/*/}
                      {/*</div>*/}
                      <Link to={getPostUrl(post)}>
                        <h2 className="text-xl font-semibold text-gray-900 hover:text-primary transition-colors mb-3 line-clamp-2">
                          {post.title}
                        </h2>
                      </Link>
                      <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">{new Date(post.date).toLocaleDateString()}</span>
                        <Link 
                          to={getPostUrl(post)}
                          className="text-primary hover:text-primary/80 font-medium text-sm transition-colors"
                        >
                          Read More →
                        </Link>
                      </div>
                    </div>
                  </article>
                ))
              )}
            </div>

            {posts.length > 0 && (
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
                        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                          currentPage === item
                            ? 'bg-primary text-white'
                            : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
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

    </div>
  );
};

export default CategoryPosts; 