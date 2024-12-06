import axiosInstance from '../api/axios';
import { refreshToken } from './authentication';

export const fetchUser = async (token) => {
  try {
    const response = await axiosInstance.get('/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.data.data) {
      await refreshToken(token);
    }

    return response.data.data;
  } catch (error) {
    console.error(
      'Error fetching user:',
      error.response?.data || error.message
    );
  }
};

export const updateUser = async (token, payload) => {
  try {
    const response = await axiosInstance.put('/users', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};

export const uploadProfilePicture = async (token, payload) => {
  try {
    const response = await axiosInstance.put('/users/profilepicture', payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
  }
};

export const fetchUserMissingItems = async (token) => {
  try {
    const response = await axiosInstance.get('/missings/total', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching total posts:', error);
  }
};
