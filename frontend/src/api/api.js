import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});

export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getProfile = () => API.get('/auth/profile');
export const logoutUser = () => API.post('/auth/logout');

export const getAllCryptos = () => API.get('/crypto');
export const getTopGainers = () => API.get('/crypto/gainers');
export const getNewListings = () => API.get('/crypto/new');
export const addCrypto = (data) => API.post('/crypto', data);
export const getCryptoById = (id) => API.get(`/crypto/${id}`);

export default API;
