import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BlogCard.css';

const BlogCard = ({ blog }) => {
  const navigate = useNavigate();

  return (
    <div className="blog-card">
      <h3 className="blog-title">{blog.title}</h3>
      <p className="blog-snippet">
        {blog.content.length > 100 ? blog.content.slice(0, 100) + '...' : blog.content}
      </p>
      <button
        className="read-more-button"
        onClick={() => navigate(`/view-blog/${blog._id}`)}
      >
        Read More
      </button>
    </div>
  );
};

export default BlogCard;
