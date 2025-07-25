import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getBlogs } from '../lib/api';
import { CategoryCardSkeleton } from '../components/SkeletonLoader';

interface Category {
  _id: string;
  name: string;
  description: string;
  image?: string;
  image_alt?: string;
  image_small?: string;
  image_medium?: string;
  image_large?: string;
}

interface Post {
  _id: string;
  title: string;
  category: {
    name: string;
  };
}

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});
  const [popularCategories, setPopularCategories] = useState<Category[]>([]);

  useEffect(() => {
    const canonicalUrl = window.location.origin + window.location.pathname;
    const title = "Categories | How to Earning Money";
    const description = "Explore all financial blog categories and find expert insights tailored to your interests and money goals.";

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
    setMetaTag('property', 'og:image', 'https://financeblog.com/og-image.jpg');
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', 'website');

    // Update Twitter Card meta tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', 'https://financeblog.com/twitter-image.jpg');

    // Add schema markup for categories page
    const schema = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "name": title,
      "description": description,
      "url": canonicalUrl,
      "publisher": {
        "@type": "Organization",
        "name": "How to Earning Money",
        "logo": {
          "@type": "ImageObject",
          "url": "https://financeblog.com/logo.png"
        }
      },
      "mainEntity": {
        "@type": "ItemList",
        "itemListElement": categories.map((category, index) => ({
          "@type": "ListItem",
          "position": index + 1,
          "item": {
            "@type": "Thing",
            "name": category.name,
            "description": category.description,
            "url": `${window.location.origin}/category/${generateSlug(category.name)}`,
            "image": category.image
          }
        }))
      },
      "breadcrumb": {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": window.location.origin
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Categories",
            "item": canonicalUrl
          }
        ]
      }
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
  }, [categories]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriesData, postsData] = await Promise.all([
          getCategories(),
          getBlogs(),
        ]);
        setCategories(categoriesData);
        // Count posts per category
        const counts: { [key: string]: number } = {};
        postsData.forEach((post: Post) => {
          if (post.category && post.category.name) {
            counts[post.category.name] = (counts[post.category.name] || 0) + 1;
          }
        });
        setCategoryCounts(counts);
        // Find top 3 categories by post count
        const sorted = [...categoriesData]
          .sort((a, b) => (counts[b.name] || 0) - (counts[a.name] || 0))
          .slice(0, 3);
        setPopularCategories(sorted);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch categories or posts.');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-');
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50">
            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="text-center mb-12">
                    <div className="h-10 bg-gray-200 rounded w-1/2 mx-auto mb-4 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <CategoryCardSkeleton key={index} />
                    ))}
                </div>
            </main>
        </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  const totalArticles = categories.length; // Simplified for now

  return (
    <div className="min-h-screen bg-gray-50">
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Categories</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-6">
            Explore our comprehensive collection of financial articles organized by topic. 
            Find expert insights tailored to your specific interests and financial goals.
          </p>
          <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-lg">
            <span className="font-semibold">{totalArticles}</span>
            <span className="ml-1">total articles across all categories</span>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={`/category/${generateSlug(category.name)}`}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative">
                <img
                  src={category.image_medium || category.image}
                  srcSet={[
                    category.image_small ? `${category.image_small} 400w` : '',
                    category.image_medium ? `${category.image_medium} 768w` : '',
                    category.image_large ? `${category.image_large} 1200w` : ''
                  ].filter(Boolean).join(', ')}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 1200px"
                  alt={category.image_alt || category.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  width="378"
                  height="192"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white text-xl font-bold group-hover:text-accent transition-colors">
                    {category.name}
                  </h3>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center text-primary font-medium text-sm">
                  <span>Explore articles</span>
                  <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Popular Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Most Popular Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {popularCategories.map((category) => (
              <Link
                key={category._id}
                to={`/category/${generateSlug(category.name)}`}
                className="group flex items-center p-4 bg-white rounded-lg border hover:border-primary transition-colors"
              >
                <div className={`w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center mr-4`}>
                  <span className="text-gray-500 font-bold text-lg">
                    {category.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <span className="text-xs text-gray-400">{categoryCounts[category.name] || 0} posts</span>
                </div>
                <span className="text-gray-400 group-hover:text-primary transition-colors">→</span>
              </Link>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="bg-primary text-white rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Get the latest financial insights delivered to your inbox. No spam, just valuable content 
            to help you make better financial decisions.
          </p>
          <div className="max-w-md mx-auto flex flex-col md:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-accent w-full md:w-auto"
            />
            <button className="bg-accent text-white px-6 py-2 rounded-md hover:bg-accent/90 transition-colors font-medium w-full md:w-auto">
              Subscribe
            </button>
          </div>
        </section>
      </main>

    </div>
  );
};

export default Categories;
