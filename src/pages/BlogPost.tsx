import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { getBlogBySlug, getBlogById, getBlogs } from '../lib/api';
import { BlogPostSkeleton } from '../components/SkeletonLoader';
import { isValidObjectId, generateSlug } from '../lib/utils';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '../components/ui/dialog';
import { Share2, MessageCircle, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';
import RelatedArticles from '../components/RelatedArticles';

interface Post {
  _id: string;
  title: string;
  content: string;
  image: string;
  category: {
    name: string;
  };
  readTime: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  slug?: string;
  author: {
    name: string;
    bio: string;
    avatar: string;
  };
  tags: string[];
  excerpt?: string; // Added excerpt to the interface
  image_alt?: string; // For descriptive alt text
  image_small?: string;
  image_medium?: string;
  image_large?: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const relatedArticlesRef = useRef<HTMLDivElement>(null);
  const [showRelatedArticles, setShowRelatedArticles] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) return;

      console.log('Attempting to fetch post with slug/id:', slug);

      try {
        setLoading(true);

        let postData;

        // If it looks like an ObjectId, try ID-based fetching first
        if (isValidObjectId(slug)) {
          console.log('Detected ObjectId, trying ID-based fetch...');
          try {
            postData = await getBlogById(slug);
            console.log('Successfully fetched by ID');
          } catch (idError) {
            console.log('ID-based fetch failed, trying slug-based...');
            postData = await getBlogBySlug(slug);
            console.log('Successfully fetched by slug');
          }
        } else {
          // Try slug-based fetching first
          console.log('Trying slug-based fetch...');
          try {
            postData = await getBlogBySlug(slug);
            console.log('Successfully fetched by slug');
          } catch (slugError) {
            console.log('Slug-based fetch failed');
            throw slugError;
          }
        }

        setPost(postData);

        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
        setError('Failed to fetch blog post.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  useEffect(() => {
    const observer = new IntersectionObserver(
        (entries) => {
            if (entries[0].isIntersecting) {
                setShowRelatedArticles(true);
                if (relatedArticlesRef.current) {
                    observer.unobserve(relatedArticlesRef.current);
                }
            }
        },
        { threshold: 0.1 }
    );

    if (relatedArticlesRef.current) {
        observer.observe(relatedArticlesRef.current);
    }

    return () => {
        if (relatedArticlesRef.current) {
            observer.unobserve(relatedArticlesRef.current);
        }
    };
  }, []);

  useEffect(() => {
    if (post) {
      const canonicalUrl = window.location.origin + window.location.pathname;
      const desc = post.excerpt || post.content?.replace(/<[^>]+>/g, '').slice(0, 150) || 'Read this financial blog post on How to Earning Money.';

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
      document.title = `${post.title} | How to Earning Money`;
      setMetaTag('name', 'description', desc);

      // Update Open Graph meta tags
      setMetaTag('property', 'og:title', post.title);
      setMetaTag('property', 'og:description', desc);
      setMetaTag('property', 'og:image', post.image);
      setMetaTag('property', 'og:url', canonicalUrl);
      setMetaTag('property', 'og:type', 'article');
      
      // Update Twitter Card meta tags
      setMetaTag('name', 'twitter:card', 'summary_large_image');
      setMetaTag('name', 'twitter:title', post.title);
      setMetaTag('name', 'twitter:description', desc);
      setMetaTag('name', 'twitter:image', post.image);

      // Canonical Link
      let link = document.querySelector("link[rel='canonical']");
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'canonical');
        document.head.appendChild(link);
      }
      link.setAttribute('href', canonicalUrl);
      
      // Preload the main image for better LCP
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = post.image;
      document.head.appendChild(preloadLink);

      // JSON-LD Structured Data
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": post.title,
        "description": desc,
        "image": [
          post.image_large || post.image,
          post.image_medium || post.image,
          post.image_small || post.image
        ].filter((img, index, self) => img && self.indexOf(img) === index),
        "author": {
          "@type": "Person",
          "name": post.author?.name || "FinanceBlog",
          "url": `https://financeblog.com/author/${post.author?.name?.toLowerCase().replace(/\s+/g, '-')}`,
          "jobTitle": "Financial Writer",
          "description": post.author?.bio || "Expert financial writer at How to Earning Money"
        },
        "publisher": {
          "@type": "Organization",
          "name": "How to Earning Money",
          "logo": {
            "@type": "ImageObject",
            "url": "https://financeblog.com/logo.png"
          }
        },
        "datePublished": post.createdAt || post.date,
        "dateModified": post.updatedAt || post.createdAt || post.date,
        "mainEntityOfPage": {
          "@type": "WebPage",
          "@id": window.location.href
        },
        "keywords": post.tags?.join(", ") || `${post.category.name}, finance, money management`,
        "articleSection": post.category.name,
        "wordCount": post.content?.split(/\s+/).length || 0
      });
      document.head.appendChild(script);

      // Add breadcrumb schema
      const breadcrumbScript = document.createElement('script');
      breadcrumbScript.type = 'application/ld+json';
      breadcrumbScript.innerHTML = JSON.stringify({
        "@context": "https://schema.org",
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
            "name": post.category.name,
            "item": `${window.location.origin}/category/${post.category.name.toLowerCase().replace(/\s+/g, '-')}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": post.title,
            "item": window.location.href
          }
        ]
      });
      document.head.appendChild(breadcrumbScript);
      
      return () => {
        const scripts = document.querySelectorAll('script[type="application/ld+json"]');
        scripts.forEach(script => {
          document.head.removeChild(script);
        });
        // Clean up preload link
        const preloadLinkToRemove = document.querySelector(`link[rel="preload"][href="${post.image}"]`);
        if (preloadLinkToRemove) {
          document.head.removeChild(preloadLinkToRemove);
        }
      };
    }
  }, [post]);

  // Function to get the URL for a post (slug or generated from title)
  const getPostUrl = (post: Post) => {
    return post.slug ? `/blog/${post.slug}` : `/blog/${post._id}`;
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(blogUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link');
    }
  };

  const blogUrl = typeof window !== 'undefined' ? window.location.href : '';

  if (loading) {
    return (
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <BlogPostSkeleton />
          <Footer />
        </div>
    );
  }

  if (error || !post) {
    return (
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <div className="max-w-4xl mx-auto px-4 py-8 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Post Not Found</h1>
            <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
            <Link
                to="/blog"
                className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
            >
              Back to Blog
            </Link>
          </div>
          <Footer />
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        <main className="max-w-4xl mx-auto px-4 py-8">

          <article className="max-w-4xl mx-auto px-4 py-8">
            {/* Article Header */}
            <header className="mb-8">
              <div className="mb-4 flex items-center justify-between">
                <Link to="/blog" className="text-primary hover:text-primary/80 text-sm font-medium">
                  ← Back to Blog
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="group relative overflow-hidden bg-[#003066] text-white px-6 py-3 rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <div className="relative flex items-center gap-2">
                        <Share2 size={18} className="transition-transform group-hover:rotate-12" />
                        <span className="font-semibold">Share</span>
                      </div>
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-white rounded-xl shadow-2xl w-full max-w-md transform transition-all duration-300 p-0 border border-gray-200">
                    <div className="p-6 border-b border-gray-100">
                      <DialogTitle className="text-xl font-bold text-gray-900">Share this article</DialogTitle>
                      <p className="text-sm text-gray-500 mt-1">Choose your preferred platform</p>
                    </div>
                    <div className="p-6 space-y-3">
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + blogUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 w-full p-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-102 shadow-md hover:shadow-lg"
                      >
                        <MessageCircle size={22} className="flex-shrink-0 transition-transform group-hover:scale-110" />
                        <span className="font-medium">Share on WhatsApp</span>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                      </a>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(blogUrl)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 w-full p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:scale-102 shadow-md hover:shadow-lg"
                      >
                        <Facebook size={22} className="flex-shrink-0 transition-transform group-hover:scale-110" />
                        <span className="font-medium">Share on Facebook</span>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}&text=${encodeURIComponent(post.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 w-full p-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-xl hover:from-sky-600 hover:to-sky-700 transition-all duration-300 transform hover:scale-102 shadow-md hover:shadow-lg"
                      >
                        <Twitter size={22} className="flex-shrink-0 transition-transform group-hover:scale-110" />
                        <span className="font-medium">Share on Twitter</span>
                        <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                      </a>
                      <button
                        onClick={handleCopyLink}
                        className="group flex items-center gap-3 w-full p-4 bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-300 transform hover:scale-102 shadow-md hover:shadow-lg"
                      >
                        {copied ? (
                          <Check size={22} className="flex-shrink-0 text-green-300" />
                        ) : (
                          <Copy size={22} className="flex-shrink-0 transition-transform group-hover:scale-110" />
                        )}
                        <span className="font-medium">
                          {copied ? 'Link copied!' : 'Copy link'}
                        </span>
                        {!copied && (
                          <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">→</div>
                        )}
                      </button>
                    </div>
                    <div className="px-6 pb-6">
                      <div className="text-xs text-gray-400 text-center">
                        Spread the word and help others discover great content
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <div className="mb-6">
              <span className="inline-block px-3 py-1 bg-primary text-white text-sm font-medium rounded mb-4">
                {post.category.name}
              </span>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {post.title}
                </h1>
                <div className="flex items-center text-gray-600 text-sm">
                  {/*<span>By {post.author.name}</span>*/}
                  {/*<span className="mx-2">•</span>*/}
                  <span>{new Date(post.createdAt || post.createdAt).toDateString()}</span>
                  {/*<span className="mx-2">•</span>*/}
                  {/*<span>{post.readTime} min read</span>*/}
                </div>
              </div>

              <img
                  src={post.image_medium || post.image}
                  srcSet={[
                    post.image_small ? `${post.image_small} 400w` : '',
                    post.image_medium ? `${post.image_medium} 768w` : '',
                    post.image_large ? `${post.image_large} 1200w` : ''
                  ].filter(Boolean).join(', ')}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 768px, 1200px"
                  alt={post.image_alt || post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
                  width="768"
                  height="384"
              />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Article Content */}
              <div className="col-span-1 lg:col-span-4">
                <div className="w-full overflow-x-auto">
                  <div ref={contentRef} className="prose prose-lg max-w-none blog-content" dangerouslySetInnerHTML={{__html: post.content}}/>
                </div>

                {/* Related Articles */}
                <div ref={relatedArticlesRef} className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                  {showRelatedArticles && post && (
                      <RelatedArticles
                          currentPostId={post._id}
                          categoryName={post.category.name}
                      />
                  )}
                  {!showRelatedArticles && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
                      </div>
                  )}
                </div>

                {/* Comments Section */}
                {/*<div className="mt-12 p-6 bg-white rounded-lg border shadow-sm">*/}
                {/*  <h3 className="text-lg font-semibold mb-4">Comments</h3>*/}
                {/*  <div className="text-center py-8 text-gray-500">*/}
                {/*    <p>Comments section will be integrated with Disqus or similar service.</p>*/}
                {/*    <p className="text-sm mt-2">/!* Disqus Comments Code Here *!/</p>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
          </article>
        </main>

        <Footer />
      </div>
  );
};

export default BlogPost;