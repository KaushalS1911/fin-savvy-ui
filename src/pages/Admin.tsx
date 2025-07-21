
import React, { useState, useEffect } from 'react';
import AdminNavigation from '../components/admin/AdminNavigation';
import BlogList from '../components/admin/BlogList';
import BlogEditor from '../components/admin/BlogEditor';
import Dashboard from '../components/admin/Dashboard';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [editingPost, setEditingPost] = useState(null);

  const handleEditPost = (post: any) => {
    setEditingPost(post);
    setActiveTab('editor');
  };

  const handleNewPost = () => {
    setEditingPost(null);
    setActiveTab('editor');
  };

  useEffect(() => {
    document.title = "Admin Dashboard | How to Earning Money";
    const metaDesc = document.querySelector('meta[name=\"description\"]');
    if (metaDesc) {
      metaDesc.setAttribute('content', 'Admin dashboard for How to Earning Money. Manage posts, categories, and site settings.');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = 'Admin dashboard for How to Earning Money. Manage posts, categories, and site settings.';
      document.head.appendChild(meta);
    }
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'posts':
        return <BlogList onEditPost={handleEditPost} onNewPost={handleNewPost} />;
      case 'editor':
        return <BlogEditor post={editingPost} onBack={() => setActiveTab('posts')} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="ml-64 p-6">
        {renderContent()}
      </main>
    </div>
  );
};

export default Admin;
