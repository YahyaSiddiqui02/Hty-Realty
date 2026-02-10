import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API_URL = `${BACKEND_URL}/api`;

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Projects API
export const projectsAPI = {
  getAll: (status) => api.get('/projects', { params: { status } }),
  getBySlug: (slug) => api.get(`/projects/${slug}`),
  create: (data) => api.post('/projects', data),
  update: (id, data) => api.put(`/projects/${id}`, data),
  delete: (id) => api.delete(`/projects/${id}`),
};

// Blog API
export const blogAPI = {
  getAll: (category, limit) => api.get('/blog', { params: { category, limit } }),
  getBySlug: (slug) => api.get(`/blog/${slug}`),
  create: (data) => api.post('/blog', data),
};

// Contact API
export const contactAPI = {
  submit: (data) => api.post('/contact', data),
  getAll: (status) => api.get('/contact', { params: { status } }),
  updateStatus: (id, status) => api.put(`/contact/${id}/status`, null, { params: { status } }),
};

// Resources API
export const resourcesAPI = {
  getAll: (category) => api.get('/resources', { params: { category } }),
  create: (data) => api.post('/resources', data),
};

// Payment API
export const paymentAPI = {
  createOrder: (data) => api.post('/payments/create-order', data),
  verify: (data) => api.post('/payments/verify', data),
};

// Favorites API
export const favoritesAPI = {
  getAll: () => api.get('/users/favorites'),
  add: (projectId) => api.post(`/users/favorites/${projectId}`),
  remove: (projectId) => api.delete(`/users/favorites/${projectId}`),
};

// Admin API
export const adminAPI = {
  getAnalytics: () => api.get('/admin/analytics'),
};

export default api;
