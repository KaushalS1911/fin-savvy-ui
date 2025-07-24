import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  image_small?: string;
  image_medium?: string;
  image_large?: string;
  image_alt?: string;
  author?: {
    name: string;
    bio?: string;
  };
}

const Index = () => {
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const canonicalUrl = window.location.origin + window.location.pathname;
    const title = "Finance News, Insights & Market Updates | How to Earning Money";
    const description = 'Get the latest finance news, market updates, and expert insights to help you make smarter money decisions.';

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
    setMetaTag('property', 'og:image', 'https://financeblog.com/og-image.jpg'); // Add a default image
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', 'website');

    // Update Twitter Card meta tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', 'https://financeblog.com/twitter-image.jpg'); // Add a default image

    // Add comprehensive schema markup for homepage
    const schema = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": window.location.origin + "/#website",
          "url": window.location.origin,
          "name": "How to Earning Money",
          "description": description,
          "publisher": {
            "@type": "Organization",
            "name": "How to Earning Money",
            "logo": {
              "@type": "ImageObject",
              "url": "https://financeblog.com/logo.png"
            }
          },
          "potentialAction": [
            {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": `${window.location.origin}/search?q={search_term_string}`
              },
              "query-input": "required name=search_term_string"
            }
          ]
        },
        {
          "@type": "ItemList",
          "@id": window.location.origin + "/#featuredPosts",
          "name": "Featured Financial Articles",
          "itemListElement": featuredPosts.map((post, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "item": {
              "@type": "Article",
              "headline": post.title,
              "description": post.excerpt,
              "image": post.image_large || post.image,
              "url": `${window.location.origin}${getPostUrl(post)}`,
              "datePublished": post.createdAt || post.date,
              "author": {
                "@type": "Person",
                "name": post.author?.name || "FinanceBlog"
              },
              "publisher": {
                "@type": "Organization",
                "name": "How to Earning Money",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://financeblog.com/logo.png"
                }
              }
            }
          }))
        }
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    document.head.appendChild(script);

    // Canonical Link
    let link = document.querySelector("link[rel='canonical']");
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonicalUrl);

    return () => {
      const script = document.querySelector('script[type="application/ld+json"]');
      if (script) {
        document.head.removeChild(script);
      }
    };
  }, [featuredPosts]);

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
    if (post.slug) return `/blog/${post.slug}`;
    if (post.title) return `/blog/${generateSlug(post.title)}`;
    return `/blog/${post._id}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
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
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="sr-only">
          Finance News, Insights & Market Updates
        </h1>
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Featured Post */}
            {featuredPosts.length > 0 && (
            <div className="lg:col-span-2">
              <Link to={getPostUrl(featuredPosts[0])} className="group block">
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <img 
                    src={featuredPosts[0].image_medium || featuredPosts[0].image}
                    srcSet={[
                      featuredPosts[0].image_small ? `${featuredPosts[0].image_small} 400w` : '',
                      featuredPosts[0].image_medium ? `${featuredPosts[0].image_medium} 768w` : '',
                      featuredPosts[0].image_large ? `${featuredPosts[0].image_large} 1200w` : ''
                    ].filter(Boolean).join(', ')}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 1200px"
                    alt={featuredPosts[0].image_alt || featuredPosts[0].title}
                    className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-300"
                    width="784"
                    height="384"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <span className="inline-block px-3 py-1 bg-accent text-white text-sm font-medium rounded-full mb-3">
                      {featuredPosts[0].category.name}
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold mb-2 group-hover:text-accent transition-colors">
                      {featuredPosts[0].title}
                    </h2>
                    <p className="text-gray-200 mb-3 line-clamp-2">{featuredPosts[0].excerpt}</p>
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
                      src={post.image_medium || post.image}
                      srcSet={[
                        post.image_small ? `${post.image_small} 400w` : '',
                        post.image_medium ? `${post.image_medium} 768w` : '',
                        post.image_large ? `${post.image_large} 1200w` : ''
                      ].filter(Boolean).join(', ')}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 1200px"
                      alt={post.image_alt || post.title}
                      className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      width="378"
                      height="192"
                      loading="lazy"
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

    </div>
  );
};

export default Index;
