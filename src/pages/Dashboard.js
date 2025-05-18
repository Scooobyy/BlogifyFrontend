import React, { useContext } from 'react';
import { BlogContext } from '../context/BlogContext';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import './Dashboard.css';

const Dashboard = () => {
  const { getPublishedBlogs, loading } = useContext(BlogContext);
  const blogs = getPublishedBlogs();
  const navigate = useNavigate();

  if (loading) return <p style={{ textAlign: 'center' }}>Loading blogs...</p>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title"> Published Blogs</h2>
      <div className="blog-grid">
        {blogs.length > 0 ? (
          blogs.map(blog => (
            <BlogCard key={blog._id} blog={blog} />
          ))
        ) : (
          <p style={{ textAlign: 'center' }}>No published blogs found.</p>
        )}
      </div>

      <button
        onClick={() => navigate('/create-blog')}
        className="floating-button"
        title="Create Blog"
      >
        +
      </button>
    </div>
  );
};

export default Dashboard;
