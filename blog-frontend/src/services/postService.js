import api from './api';

export const getAllPosts = async () => {
    return await api.get('/posts');
};

export const getPostById = async (id) => {
    return await api.get(`/posts/${id}`);
};

export const createPost = async (postData) => {
    return await api.post('/posts', postData);
};

export const updatePost = async (id, postData) => {
    return await api.put(`/posts/${id}`, postData);
};

export const deletePost = async (id) => {
    return await api.delete(`/posts/${id}`);
};

export const searchPosts = async (keyword) => {
    return await api.get(`/posts/search?keyword=${keyword}`);
};
