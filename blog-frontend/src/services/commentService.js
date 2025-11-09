import api from './api';

export const getCommentsByPostId = async (postId) => {
    return await api.get(`/posts/${postId}/comments`);
};

export const createComment = async (postId, commentData) => {
    return await api.post(`/posts/${postId}/comments`, commentData);
};

export const deleteComment = async (commentId, postId) => {
    return await api.delete(`/posts/${postId}/comments/${commentId}`);
};
