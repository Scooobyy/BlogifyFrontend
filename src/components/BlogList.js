import React, { useContext, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BlogContext } from '../context/BlogContext';
import './BlogList.css';

const BlogList = () => {
    const { blogs, loading, publishBlog, deleteBlog, unpublishBlog } = useContext(BlogContext);
    const navigate = useNavigate();

    const [publishingIds, setPublishingIds] = useState([]);
    const [unpublishingIds, setUnpublishingIds] = useState([]);
    const [deletingIds, setDeletingIds] = useState([]);

    const [confirmDeleteId, setConfirmDeleteId] = useState(null);
    const [confirmAction, setConfirmAction] = useState(null); // 'publish' or 'unpublish'
    const [confirmActionId, setConfirmActionId] = useState(null);

    if (loading) {
        return (
            <div className="container mt-10 text-center">
                <h2>Loading your blogs...</h2>
            </div>
        );
    }

  if (!blogs.length) {
    return (
        <div className="container mt-10 text-center">
            <div className="no-blogs-message p-6 rounded-lg inline-block">
                <h2 className="text-2xl font-semibold mb-2">You haven’t created any blog yet.</h2>
                <p>Start creating a new blog post.</p>
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
}

    // Trigger confirmation for publishing
    const promptPublish = (id, e) => {
        e.stopPropagation();
        setConfirmAction('publish');
        setConfirmActionId(id);
    };

    // Trigger confirmation for unpublishing
    const promptUnpublish = (id, e) => {
        e.stopPropagation();
        setConfirmAction('unpublish');
        setConfirmActionId(id);
    };

    // Trigger confirmation for deleting
    const handleDeleteClick = (id, e) => {
        e.stopPropagation();
        setConfirmDeleteId(id);
    };

    const confirmDelete = async () => {
        if (!confirmDeleteId) return;
        setDeletingIds(prev => [...prev, confirmDeleteId]);
        const result = await deleteBlog(confirmDeleteId);
        setDeletingIds(prev => prev.filter(did => did !== confirmDeleteId));
        setConfirmDeleteId(null);
        if (!result.success) alert(result.error);
    };

    const cancelDelete = () => setConfirmDeleteId(null);

    const confirmPublishUnpublish = async () => {
        if (!confirmActionId) return;

        if (confirmAction === 'publish') {
            setPublishingIds(prev => [...prev, confirmActionId]);
            const result = await publishBlog(confirmActionId);
            navigate('/dashboard')
            setPublishingIds(prev => prev.filter(pid => pid !== confirmActionId));
            if (!result.success) alert(result.error);
        }

        if (confirmAction === 'unpublish') {
            setUnpublishingIds(prev => [...prev, confirmActionId]);
            const result = await unpublishBlog(confirmActionId);
            setUnpublishingIds(prev => prev.filter(uid => uid !== confirmActionId));
            if (!result.success) alert(result.error);
        }

        setConfirmAction(null);
        setConfirmActionId(null);
    };

    const cancelConfirmAction = () => {
        setConfirmAction(null);
        setConfirmActionId(null);
    };

    return (
        <div className="container max-w-4xl mx-auto mt-10">
            <h1 className="mb-6 text-3xl font-bold">My Blogs</h1>
            <div className="list-group">
                {blogs.map(blog => (
                    <div
                        key={blog._id}
                        className="list-group-item list-group-item-action flex flex-col mb-3 cursor-pointer border rounded p-4 hover:bg-gray-100"
                        onClick={() => navigate(`/blog/${blog._id}`)}
                    >
                        <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                        <p className="text-gray-700 mb-2">
                            {blog.content.length > 150
                                ? blog.content.substring(0, 150) + '...'
                                : blog.content}
                        </p>
                        <small className="text-muted">
                            Status:{' '}
                            <span className={blog.status === 'published' ? 'text-green-600' : 'text-yellow-600'}>
                                {blog.status}
                            </span>
                        </small>

                        <div className="mt-4 mb-3 flex gap-5">
                            <Link
                                to={`/blog/${blog._id}`}
                                className="btn btn-sm btn-primary me-2"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Read More
                            </Link>
                            <Link
                                to={`/edit/${blog._id}`}
                                className="btn btn-sm btn-secondary me-2"
                                onClick={(e) => e.stopPropagation()}
                            >
                                Edit
                            </Link>

                            {blog.status !== 'published' && (
                                <button
                                    onClick={(e) => promptPublish(blog._id, e)}
                                    disabled={publishingIds.includes(blog._id)}
                                    className="btn btn-sm btn-success me-2"
                                >
                                    {publishingIds.includes(blog._id) ? 'Publishing...' : 'Publish'}
                                </button>
                            )}

                            {blog.status === 'published' && (
                                <button
                                    onClick={(e) => promptUnpublish(blog._id, e)}
                                    disabled={unpublishingIds.includes(blog._id)}
                                    className="btn btn-sm btn-warning me-2"
                                >
                                    {unpublishingIds.includes(blog._id) ? 'Unpublishing...' : 'Unpublish'}
                                </button>
                            )}

                            <button
                                onClick={(e) => handleDeleteClick(blog._id, e)}
                                disabled={deletingIds.includes(blog._id)}
                                className="btn btn-sm btn-danger me-2"
                            >
                                {deletingIds.includes(blog._id) ? 'Deleting...' : 'Delete'}
                            </button>
                        </div>
                    </div>
                ))}

                {/* Delete Confirmation Modal */}
                {confirmDeleteId && (
                    <div
                        className="modal fade show"
                        style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                        tabIndex="-1"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content p-4">
                                <h5>Confirm Deletion</h5>
                                <p>Are you sure you want to delete this blog?</p>
                                <div className="flex gap-4 justify-end">
                                    <button className="btn btn-secondary me-2" onClick={cancelDelete}>
                                        Cancel
                                    </button>
                                    <button className="btn btn-danger me-2" onClick={confirmDelete}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Publish/Unpublish Confirmation Modal */}
                {confirmAction && confirmActionId && (
                    <div
                        className="modal fade show"
                        style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}
                        tabIndex="-1"
                    >
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content p-4">
                                <h5>
                                    Confirm {confirmAction === 'publish' ? 'Publish' : 'Unpublish'}
                                </h5>
                                <p>
                                    Are you sure you want to{' '}
                                    {confirmAction === 'publish' ? 'publish' : 'unpublish'} this blog?
                                </p>
                                <div className="flex gap-4 justify-end">
                                    <button
                                        className="btn btn-secondary me-2"
                                        onClick={cancelConfirmAction}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        className="btn btn-primary me-2"
                                        onClick={confirmPublishUnpublish}
                                    >
                                        {confirmAction === 'publish' ? 'Publish' : 'Unpublish'}
                                    </button>
        
                                </div>
                            </div>
                        </div>
                    </div>
                    
                )}
            </div>
            
        </div>
    );
};

export default BlogList;
