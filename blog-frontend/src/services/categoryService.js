import api from './api';

export const getAllCategories = async () => {
    return await api.get('/categories');
};

export const getCategoryById = async (id) => {
    return await api.get(`/categories/${id}`);
};

export const createCategory = async (categoryData) => {
    return await api.post('/categories', categoryData);
};
