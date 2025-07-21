import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../lib/api';
import { PostCardSkeleton } from './SkeletonLoader';
import { generateSlug } from '../lib/utils';

interface Post {
    _id: string;
    title: string;
    image: string;
    category: {
        name: string;
    };
    slug?: string;
    image_small?: string;
    image_medium?: string;
    image_large?: string;
    author?: {
        name: string;
    };
    createdAt?: string;
    date: string;
    excerpt?: string;
    image_alt?: string;
}

interface RelatedArticlesProps {
    currentPostId: string;
    categoryName: string;
}

const RelatedArticles: React.FC<RelatedArticlesProps> = ({ currentPostId, categoryName }) => {
    const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRelatedPosts = async () => {
            try {
                const allPosts = await getBlogs();
                const related = allPosts
                    .filter((p: Post) => p.category.name === categoryName && p._id !== currentPostId)
                    .slice(0, 3);
                setRelatedPosts(related);
            } catch (error) {
                console.error('Failed to fetch related posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRelatedPosts();
    }, [categoryName, currentPostId]);

    const getPostUrl = (post: Post) => {
        if (post.slug) return `/blog/${post.slug}`;
        if (post.title) return `/blog/${generateSlug(post.title)}`;
        return `/blog/${post._id}`;
    };

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <PostCardSkeleton />
                <PostCardSkeleton />
                <PostCardSkeleton />
            </div>
        );
    }

    if (relatedPosts.length === 0) {
        return <div className="text-gray-500 text-center py-8">No related articles found.</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((relatedPost) => (
                <Link
                    key={relatedPost._id}
                    to={getPostUrl(relatedPost)}
                    className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                    <img
                        src={relatedPost.image_medium || relatedPost.image}
                        srcSet={[
                            relatedPost.image_small ? `${relatedPost.image_small} 400w` : '',
                            relatedPost.image_medium ? `${relatedPost.image_medium} 768w` : '',
                            relatedPost.image_large ? `${relatedPost.image_large} 1200w` : '',
                        ].filter(Boolean).join(', ')}
                        sizes="(max-width: 640px) 100vw, 300px"
                        alt={relatedPost.image_alt || relatedPost.title}
                        className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        width="240"
                        height="128"
                        loading="lazy"
                    />
                    <div className="p-4">
                        <span className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded mb-2">
                            {relatedPost.category.name}
                        </span>
                        <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors text-sm line-clamp-2">
                            {relatedPost.title}
                        </h4>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default RelatedArticles; 