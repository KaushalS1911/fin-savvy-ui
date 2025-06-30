import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { getBlogBySlug, getBlogById, getBlogs } from '../lib/api';
import { BlogPostSkeleton } from '../components/SkeletonLoader';
import { isValidObjectId, generateSlug } from '../lib/utils';

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
      
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Article Header */}
        <header className="mb-8">
          <div className="mb-4">
            <Link to="/blog" className="text-primary hover:text-primary/80 text-sm font-medium">
              ← Back to Blog
            </Link>
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
          <div className="lg:col-span-3">
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{__html: post.content}}/>


            {/* In-article AdSense */}
            <div className="my-8">
              <div className="adsense-slot h-32">
                {/* Google AdSense In-Article Code Here */}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags && post.tags.map((tag) => (
                    <Link
                        key={tag}
                        to={`/tags/${tag.toLowerCase().replace(' ', '-')}`}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      {tag}
                    </Link>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-8 p-6 bg-white rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold mb-4">About the Author</h3>
              <div className="flex items-start space-x-4">
                <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{post.author.name}</h4>
                  <p className="text-gray-600 mt-2">{post.author.bio}</p>
                </div>
              </div>
            </div>

            {/* Related Articles */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
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
            </div>

            {/* Comments Section */}
            <div className="mt-12 p-6 bg-white rounded-lg border shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Comments</h3>
              <div className="text-center py-8 text-gray-500">
                <p>Comments section will be integrated with Disqus or similar service.</p>
                <p className="text-sm mt-2">{/* Disqus Comments Code Here */}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            {/* Sticky AdSense */}
            <div className="sticky top-8 space-y-6">
              <div className="adsense-slot h-64">
                {/* Google AdSense Sticky Sidebar Code Here */}
              </div>
              
              {/* Share Buttons */}
              <div className="bg-white p-4 rounded-lg border shadow-sm">
                <h4 className="font-semibold mb-3">Share this article</h4>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                    Facebook
                  </button>
                  <button className="flex-1 bg-blue-400 text-white py-2 px-3 rounded text-sm hover:bg-blue-500 transition-colors">
                    Twitter
                  </button>

                </div>
              </div>
            </div>
          </aside>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
