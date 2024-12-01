import { jwtDecode } from 'jwt-decode';
import axiosInstance from '@/api/axios';

// Function to decode the JWT token
export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error, '\nToken:', token);
    return null;
  }
};

// Function to get the current access token from localStorage
export const getAccessToken = () => {
  return localStorage.getItem('accessToken');
};

// Function to store access token in localStorage
export const setAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

// Function to get the current refresh token from cookies
export const getRefreshToken = () => {
  const refreshToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('refreshToken='));
  return refreshToken ? refreshToken.split('=')[1] : null;
};

// Function to store refresh token in cookies
export const setRefreshToken = (token) => {
  document.cookie = `refreshToken=${token}; HttpOnly; Secure; Samsite=Strict; path=/`;
};

export const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
};

// Function to set expiration time for access token
export const setTokenExpiration = (expiresIn) => {
  const expirationTime = Date.now() + expiresIn * 1000; // Convert from seconds to ms
  localStorage.setItem('access_token_expiration', expirationTime);
};

// Function to refresh the access token using the refresh token
export const refreshToken = async () => {
  const refreshToken = getRefreshToken();

  if (!refreshToken) {
    throw new Error('Refresh token not found');
  }

  try {
    const response = await axiosInstance.post('/token', {});
    const { accessToken } = response.data.data;
    setAccessToken(accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw new Error('Failed to refresh token');
  }
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  document.cookie =
    'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
