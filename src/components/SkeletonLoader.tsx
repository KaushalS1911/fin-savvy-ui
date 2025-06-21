import React from 'react';

export const PostCardSkeleton = () => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
    <div className="p-6">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-3 animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
    </div>
  </div>
);

export const CategoryCardSkeleton = () => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
        <div className="p-6">
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </div>
    </div>
);

export const BlogPostSkeleton = () => (
  <div className="max-w-4xl mx-auto px-4 py-8">
    <div className="mb-8">
      <div className="h-4 bg-gray-200 rounded w-1/4 mb-6 animate-pulse"></div>
      <div className="h-6 bg-gray-200 rounded w-1/2 mb-4 animate-pulse"></div>
      <div className="h-10 bg-gray-200 rounded w-3/4 mb-6 animate-pulse"></div>
      <div className="w-full h-96 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>
    <div className="prose prose-lg max-w-none">
      <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6 mb-4 animate-pulse"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-4 animate-pulse"></div>
    </div>
  </div>
); 