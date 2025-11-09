import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Post.css';

function PostCard({ post }) {
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="post-card">
            <h2 className="post-title">{post.title}</h2>
            <div className="post-meta">
                <span className="post-author">By {post.authorName}</span>
                <span className="post-date">{formatDate(post.createdAt)}</span>
                {post.categoryName && (
                    <span className="post-category">{post.categoryName}</span>
                )}
            </div>
            <p className="post-excerpt">
                {post.content.substring(0, 200)}...
            </p>
            <div className="post-footer">
                <span className="post-comments">{post.commentCount} comments</span>
                <Link to={`/posts/${post.id}`} className="read-more">Read More →</Link>
            </div>
        </div>
    );
}

export default PostCard;
