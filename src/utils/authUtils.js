import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

// Function to decode the JWT token
export const decodeToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.log('This is token: ', token);
    console.error('Error decoding token:', error);
    return null;
  }
};

// Function to get the current access token from localStorage
export const getAccessToken = () => {
  return localStorage.getItem('access_token');
};

// Function to get the current refresh token from cookies
export const getRefreshToken = () => {
  const refreshToken = document.cookie
    .split('; ')
    .find((row) => row.startsWith('refreshToken='));
  return refreshToken ? refreshToken.split('=')[1] : null;

  // const cookies = document.cookie.split(';');
  // cookies.forEach((cookie) => {
  //   if (cookie.trim().startsWith('refreshToken=')) {
  //     refreshToken = cookie.split('=')[1];
  //   }
  // });
  // return refreshToken;
};

// Function to store access token in localStorage
export const setAccessToken = (token) => {
  localStorage.setItem('access_token', token);
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
    const response = await axios.post(
      'https://cari-barengbackend-production.up.railway.app/token',
      {},
      { withCredentials: true }
    );
    const { accessToken } = response.data.data;
    return accessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    throw new Error('Failed to refresh token');
  }
};
