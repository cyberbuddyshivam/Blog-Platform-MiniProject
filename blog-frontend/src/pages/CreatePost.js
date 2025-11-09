import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../services/postService';
import { getAllCategories } from '../services/categoryService';
import '../styles/Post.css';

function CreatePost() {
    const [formData, setFormData] = useState({
        title: '',
        content: '',
        categoryId: ''
    });
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadCategories();
    }, []);

    const loadCategories = async () => {
        try {
            setLoading(true);
            const response = await getAllCategories();
            
            // Ensure response.data is an array
            if (Array.isArray(response.data)) {
                setCategories(response.data);
            } else if (response.data && typeof response.data === 'object') {
                // If response.data is an object, try to extract array from it
                const dataArray = Object.values(response.data);
                if (Array.isArray(dataArray)) {
                    setCategories(dataArray);
                } else {
                    console.error('Categories data is not in expected format:', response.data);
                    setCategories([]);
                }
            } else {
                console.error('Categories response is not an array:', response.data);
                setCategories([]);
            }
        } catch (error) {
            console.error('Error loading categories:', error);
            setError('Failed to load categories');
            setCategories([]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSubmitting(true);
        
        try {
            await createPost(formData);
            alert('Post created successfully!');
            navigate('/');
        } catch (err) {
            console.error('Error creating post:', err);
            setError(err.response?.data?.message || 'Failed to create post');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return <div className="loading">Loading categories...</div>;
    }

    return (
        <div className="create-post-container">
            <h2>Create New Post</h2>
            {error && <div className="error-message">{error}</div>}
            {categories.length === 0 && !loading && (
                <div className="warning-message">
                    No categories available. Please contact administrator.
                </div>
            )}
            <form onSubmit={handleSubmit} className="post-form">
                <div className="form-group">
                    <label>Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                        minLength="3"
                        maxLength="200"
                        placeholder="Enter post title"
                        disabled={submitting}
                    />
                </div>
                <div className="form-group">
                    <label>Category</label>
                    <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleChange}
                        disabled={submitting || categories.length === 0}
                    >
                        <option value="">Select a category (optional)</option>
                        {categories.map(cat => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <label>Content</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        rows="15"
                        placeholder="Write your post content here..."
                        required
                        disabled={submitting}
                    />
                </div>
                <div className="form-actions">
                    <button type="submit" className="btn-primary" disabled={submitting}>
                        {submitting ? 'Publishing...' : 'Publish Post'}
                    </button>
                    <button 
                        type="button" 
                        onClick={() => navigate('/')}
                        className="btn-secondary"
                        disabled={submitting}
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default CreatePost;

