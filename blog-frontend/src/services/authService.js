import api from './api';

export const register = async (userData) => {
    return await api.post('/auth/register', userData);
};

export const login = async (credentials) => {
    return await api.post('/auth/login', credentials);
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
};
