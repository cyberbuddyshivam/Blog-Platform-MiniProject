import React, { useState, useEffect, useContext } from "react";
import {
  getCommentsByPostId,
  createComment,
  deleteComment,
} from "../services/commentService";
import { AuthContext } from "../context/AuthContext";

function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (postId) {
      loadComments();
    }
  }, [postId]);

  const loadComments = async () => {
    try {
      setLoading(true);
      const response = await getCommentsByPostId(postId);
      // Ensure response.data is an array
      if (Array.isArray(response.data)) {
        setComments(response.data);
      } else {
        setComments([]);
        console.error("Comments response is not an array:", response.data);
      }
    } catch (error) {
      console.error("Error loading comments:", error);
      setComments([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      alert("Please enter a comment");
      return;
    }

    try {
      await createComment(postId, { content: newComment });
      setNewComment("");
      loadComments();
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment. Please try again.");
    }
  };

  const handleDelete = async (commentId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(commentId, postId);
        loadComments();
      } catch (error) {
        console.error("Error deleting comment:", error);
        alert("Error deleting comment");
      }
    }
  };

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleString();
    } catch (error) {
      return dateString;
    }
  };

  if (loading) {
    return <div className="loading">Loading comments...</div>;
  }

  return (
    <div className="comments-section">
      <h3>Comments ({comments.length})</h3>

      {user && (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write a comment..."
            rows="3"
            required
          />
          <button type="submit" className="btn-primary">
            Post Comment
          </button>
        </form>
      )}

      {!user && <p className="login-prompt">Please login to add comments.</p>}

      <div className="comments-list">
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment.id} className="comment">
              <div className="comment-header">
                <strong>{comment.user?.username || "Unknown User"}</strong>
                <span>{formatDate(comment.createdAt)}</span>
              </div>
              <p>{comment.content}</p>
              {user && user.username === comment.user?.username && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="btn-delete-small"
                >
                  Delete
                </button>
              )}
            </div>
          ))
        ) : (
          <p className="no-comments">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
}

export default CommentList;
