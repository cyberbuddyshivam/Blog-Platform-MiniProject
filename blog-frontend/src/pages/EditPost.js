import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPostById, updatePost } from "../services/postService";
import { getAllCategories } from "../services/categoryService";
import "../styles/Post.css";

function EditPost() {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    categoryId: "",
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadPost();
    loadCategories();
  }, [id]);

  const loadPost = async () => {
    try {
      const response = await getPostById(id);
      const post = response.data;
      setFormData({
        title: post.title || "",
        content: post.content || "",
        categoryId: post.categoryId || "",
      });
      setLoading(false);
    } catch (error) {
      console.error("Error loading post:", error);
      setError("Failed to load post");
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const response = await getAllCategories();
      if (Array.isArray(response.data)) {
        setCategories(response.data);
      } else {
        setCategories([]);
      }
    } catch (error) {
      console.error("Error loading categories:", error);
      setCategories([]);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await updatePost(id, formData);
      alert("Post updated successfully!");
      navigate(`/posts/${id}`);
    } catch (error) {
      console.error("Error updating post:", error);
      setError(error.response?.data?.message || "Failed to update post");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="create-post-container">
      <h2>Edit Post</h2>
      {error && <div className="error-message">{error}</div>}
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
            disabled={submitting}
          />
        </div>
        <div className="form-group">
          <label>Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            disabled={submitting}
          >
            <option value="">Select a category (optional)</option>
            {categories.map((cat) => (
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
            required
            disabled={submitting}
          />
        </div>
        <div className="form-actions">
          <button type="submit" className="btn-primary" disabled={submitting}>
            {submitting ? "Updating..." : "Update Post"}
          </button>
          <button
            type="button"
            onClick={() => navigate(`/posts/${id}`)}
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

export default EditPost;
