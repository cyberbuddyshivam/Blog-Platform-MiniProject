import React, { useState, useEffect } from 'react';
import { getAllPosts, searchPosts } from '../services/postService';
import PostCard from '../components/PostCard';
import '../styles/Post.css';

function Home() {
    const [posts, setPosts] = useState([]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            setLoading(true);
            const response = await getAllPosts();
            setPosts(response.data);
            setError('');
        } catch (error) {
            console.error('Error loading posts:', error);
            setError('Failed to load posts. Please make sure you are logged in.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchKeyword.trim()) {
            loadPosts();
            return;
        }
        
        try {
            setLoading(true);
            const response = await searchPosts(searchKeyword);
            setPosts(response.data);
            setError('');
        } catch (error) {
            console.error('Error searching posts:', error);
            setError('Search failed');
        } finally {
            setLoading(false);
        }
    };

    const handleClearSearch = () => {
        setSearchKeyword('');
        loadPosts();
    };

    if (loading && posts.length === 0) {
        return <div className="loading">Loading posts...</div>;
    }

    return (
        <div className="home-container">
            <div className="search-section">
                <h1>Welcome to BlogPlatform</h1>
                <p className="subtitle">Share your thoughts with the world</p>
                <form onSubmit={handleSearch} className="search-form">
                    <input
                        type="text"
                        placeholder="Search posts by title..."
                        value={searchKeyword}
                        onChange={(e) => setSearchKeyword(e.target.value)}
                        className="search-input"
                    />
                    <button type="submit" className="btn-search">Search</button>
                    {searchKeyword && (
                        <button 
                            type="button" 
                            onClick={handleClearSearch}
                            className="btn-clear"
                        >
                            Clear
                        </button>
                    )}
                </form>
            </div>

            {error && <div className="error-message">{error}</div>}

            <div className="posts-grid">
                {posts.length > 0 ? (
                    posts.map(post => <PostCard key={post.id} post={post} />)
                ) : (
                    <p className="no-posts">
                        {searchKeyword ? 'No posts found matching your search' : 'No posts yet. Be the first to create one!'}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Home;
