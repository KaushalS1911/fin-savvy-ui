import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { getBlogBySlug, getBlogById, getBlogs } from '../lib/api';
import { BlogPostSkeleton } from '../components/SkeletonLoader';
import { isValidObjectId, generateSlug } from '../lib/utils';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '../components/ui/dialog';
import { Share2, MessageCircle, Facebook, Twitter, Linkedin, Copy, Check } from 'lucide-react';

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
  slug?: string;
  author: {
    name: string;
    bio: string;
    avatar: string;
  };
  tags: string[];
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

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

        // Fetch related posts (e.g., all posts and filter by category)
        const allPostsData = await getBlogs();
        const related = allPostsData
            .filter((p: Post) => p.category.name === postData.category.name && p._id !== postData._id)
            .slice(0, 3);
        setRelatedPosts(related);

        setLoading(false);
      } catch (err) {
        console.error('Failed to fetch blog post:', err);
        setError('Failed to fetch blog post.');
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  // Function to get the URL for a post (slug or generated from title)
  const getPostUrl = (post: Post) => {
    return post.slug ? `/${post.slug}` : `/${post._id}`;
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
                  src={post.image}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              />
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Article Content */}
              <div className="col-span-1 lg:col-span-4">
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{__html: post.content}}/>

                {/* Tags */}
                {/*<div className="mt-8 pt-8 border-t border-gray-200">*/}
                {/*  <h3 className="text-lg font-semibold mb-4">Tags</h3>*/}
                {/*  <div className="flex flex-wrap gap-2">*/}
                {/*    {post.tags && post.tags.map((tag) => (*/}
                {/*        <Link*/}
                {/*            key={tag}*/}
                {/*            to={`/tags/${tag.toLowerCase().replace(' ', '-')}`}*/}
                {/*            className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-primary hover:text-white transition-colors"*/}
                {/*        >*/}
                {/*          {tag}*/}
                {/*        </Link>*/}
                {/*    ))}*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/* Author Bio */}
                {/*<div className="mt-8 p-6 bg-white rounded-lg border shadow-sm">*/}
                {/*  <h3 className="text-lg font-semibold mb-4">About the Author</h3>*/}
                {/*  <div className="flex items-start space-x-4">*/}
                {/*    <img*/}
                {/*        src={post.author.avatar}*/}
                {/*        alt={post.author.name}*/}
                {/*        className="w-16 h-16 rounded-full object-cover"*/}
                {/*    />*/}
                {/*    <div>*/}
                {/*      <h4 className="font-semibold text-gray-900">{post.author.name}</h4>*/}
                {/*      <p className="text-gray-600 mt-2">{post.author.bio}</p>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}

                {/* Related Articles */}
                <div className="mt-12">
                  <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                  {relatedPosts.length === 0 ? (
                      <div className="text-gray-500 text-center py-8">No related articles found.</div>
                  ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {relatedPosts.map((relatedPost) => (
                            <Link
                                key={relatedPost._id}
                                to={getPostUrl(relatedPost)}
                                className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                            >
                              <img
                                  src={relatedPost.image}
                                  alt={relatedPost.title}
                                  className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="p-4">
                          <span
                              className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded mb-2">
                            {relatedPost.category.name}
                          </span>
                                <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-sm line-clamp-2">
                                  {relatedPost.title}
                                </h4>
                              </div>
                            </Link>
                        ))}
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