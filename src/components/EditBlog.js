import React, { useContext, useEffect, useState } from 'react';
import { BlogContext } from '../context/BlogContext';
import { useParams, useNavigate } from 'react-router-dom';
import './EditBlog.css';

const EditBlog = () => {
  const { id } = useParams();
  const { blogs, loading, fetchBlogById, editBlog  } = useContext(BlogContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const blogFromContext = blogs.find(b => b._id === id);
    if (blogFromContext) {
      setTitle(blogFromContext.title);
      setContent(blogFromContext.content);
      setLoadingBlog(false);
      setError(null);
    } else if (!loading) {
      setLoadingBlog(true);
      fetchBlogById(id).then(result => {
        if (result.success) {
          setTitle(result.data.title);
          setContent(result.data.content);
          setError(null);
        } else {
          setError('Blog not found');
        }
        setLoadingBlog(false);
      });
    }
  }, [id, blogs, loading, fetchBlogById]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const result = await editBlog(id, title, content);
    setSaving(false);

    if (result.success) {
      navigate('/blogs');
    } else {
      setError(result.error);
    }
  };

  if (loading || loadingBlog) return <div className="text-center mt-10">Loading blog data...</div>;
  if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Edit Your Blog</h1>
      <form onSubmit={handleSubmit}>

        <div className="form-control mb-3">
          <label htmlFor="title" className="form-label">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            type="text"
            className="form-control"
            placeholder="Enter blog title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={saving}
          />
        </div>

        <div className="form-control ">
          <label htmlFor="content" className="form-label">
            Content <span className="text-red-600">*</span>
          </label>
          <textarea
            id="content"
            className="form-control"
            rows="10"
            placeholder="Write your blog content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={saving}
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => navigate('/blogs')}
            className="btn btn-cancel"
            disabled={saving}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="btn"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlog;
