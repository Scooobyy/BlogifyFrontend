import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import './CreateBlog.css';

const CreateBlog = () => {
  const navigate = useNavigate();
  const { createBlog, publishBlog,autoSaveBlogDraft } = useContext(BlogContext);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [localError, setLocalError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [savingDraft, setSavingDraft] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [savedBlogId, setSavedBlogId] = useState(null);



  // eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  if (!title && !content) return;

  const timer = setTimeout(async () => {
    const blogData = {
      title,
      content,
      status: 'draft',
      thumbnail: null,
    };

    const result = await autoSaveBlogDraft(blogData, savedBlogId);
       if (result.success) {
      setSavedBlogId(result.data._id);
      console.log('Auto-saved draft');
      
    }
  }, 5000); // Auto-save after 5 seconds of inactivity
  return () => clearTimeout(timer); // Clear on next input
}, [title, content]);







  // Clear message in 2 seconds//
  useEffect(() => {
    let timer;

    if (localError) {
      timer = setTimeout(() => {
        setLocalError(null);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [localError]);

  useEffect(() => {
    let timer;

    if (successMessage) {
      timer = setTimeout(() => {
        setSuccessMessage('');
        navigate('/blogs'); // navigate after success message disappears
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [successMessage, navigate]);

  const handleSaveDraft = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setLocalError('Please fill in all required fields');
      return;
    }

    setLocalError(null);
    setSavingDraft(true);

    const blogData = {
      title,
      content,
      status: 'draft',
      thumbnail: null,
    };

    const result = await createBlog(blogData);

    if (result.success) {
      setSuccessMessage('Draft saved successfully!');
      setSavedBlogId(result.data._id);
    } else {
      setLocalError(result.error || 'Failed to save draft');
    }

    setSavingDraft(false);
  };

  const handlePublish = async () => {
    if (!savedBlogId) {
      setLocalError('Please save the draft before publishing.');
      return;
    }

    setLocalError(null);
    setPublishing(true);

    const result = await publishBlog(savedBlogId);

    if (result.success) {
      setSuccessMessage('Blog published successfully!');
    } else {
      setLocalError(result.error || 'Failed to publish blog');
    }

    setPublishing(false);
  };

  return (
    <div className="container max-w-3xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-3xl font-bold mb-6">Create New Blog</h2>

      {localError && (
        <div className="alert alert-danger mb-4" role="alert">
          {localError}
        </div>
      )}

      {successMessage && (
        <div className="alert alert-success mb-4" role="alert">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSaveDraft}>
        <div className="form-group mb-4">
          <label htmlFor="title" className="form-label">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            id="title"
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={savingDraft || publishing}
            placeholder="Enter blog title"
          />
        </div>

        <div className="form-group mb-4">
          <label htmlFor="content" className="form-label">
            Content <span className="text-red-600">*</span>
          </label>
          <textarea
            id="content"
            rows="10"
            className="form-control"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={savingDraft || publishing}
            placeholder="Write your blog content here"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          disabled={savingDraft || publishing}
        >
          {savingDraft ? 'Saving...' : 'Save Draft'}
        </button>
      </form>

      {savedBlogId && (
        <button
          type="button"
          className="btn btn-success mt-4"
          onClick={handlePublish}
          disabled={publishing || savingDraft}
        >
          {publishing ? 'Publishing...' : 'Publish Blog'}
        </button>
      )}
    </div>
  );
};

export default CreateBlog;
