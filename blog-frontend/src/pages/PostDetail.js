import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, deletePost } from "../services/postService";
import { AuthContext } from "../context/AuthContext";
import CommentList from "../components/CommentList";
import "../styles/Post.css";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const response = await getPostById(id);
      setPost(response.data);
      setError("");
    } catch (error) {
      console.error("Error loading post:", error);
      setError("Failed to load post");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        alert("Post deleted successfully");
        navigate("/");
      } catch (error) {
        console.error("Error deleting post:", error);
        alert("Error deleting post");
      }
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return <div className="loading">Loading post...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!post) {
    return <div className="error">Post not found</div>;
  }

  const canEdit = user && user.username === post.authorName;

  return (
    <div className="post-detail-container">
      <article className="post-detail">
        <h1>{post.title}</h1>
        <div className="post-meta-detail">
          <span>
            By <strong>{post.authorName || "Unknown"}</strong>
          </span>
          <span>{formatDate(post.createdAt)}</span>
          {post.categoryName && (
            <span className="category-badge">{post.categoryName}</span>
          )}
        </div>

        {canEdit && (
          <div className="post-actions">
            <button
              onClick={() => navigate(`/posts/${id}/edit`)}
              className="btn-edit"
            >
              Edit Post
            </button>
            <button onClick={handleDelete} className="btn-delete">
              Delete Post
            </button>
          </div>
        )}

        <div className="post-content">{post.content}</div>
      </article>

      <CommentList postId={id} />
    </div>
  );
}

export default PostDetail;
