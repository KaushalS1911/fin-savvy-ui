
import React, { useState } from 'react';
import { Edit, Trash2, Eye, Plus } from 'lucide-react';

interface BlogListProps {
  onEditPost: (post: any) => void;
  onNewPost: () => void;
}

const BlogList = ({ onEditPost, onNewPost }: BlogListProps) => {
  const [posts] = useState([
    {
      id: 1,
      title: 'The Complete Guide to Index Fund Investing in 2024',
      category: 'Investing',
      status: 'Published',
      author: 'Sarah Johnson',
      date: '2024-01-20',
      views: 1250
    },
    {
      id: 2,
      title: 'High-Yield Savings Accounts: Best Options for 2024',
      category: 'Saving',
      status: 'Draft',
      author: 'Michael Chen',
      date: '2024-01-18',
      views: 890
    },
    {
      id: 3,
      title: 'Credit Card Churning: Risks and Rewards Explained',
      category: 'Credit Cards',
      status: 'Published',
      author: 'David Rodriguez',
      date: '2024-01-15',
      views: 2100
    }
  ]);

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      // API call to delete post
      console.log('Deleting post:', id);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Blog Posts</h1>
        <button
          onClick={onNewPost}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors flex items-center"
        >
          <Plus size={20} className="mr-2" />
          New Post
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post) => (
                <tr key={post.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                      {post.title}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">
                      {post.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      post.status === 'Published' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {post.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {post.views}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => onEditPost(post)}
                        className="text-indigo-600 hover:text-indigo-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BlogList;
