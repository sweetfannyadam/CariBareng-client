import axiosInstance from '@/api/axios';

export const fetchUser = async (token) => {
  try {
    const response = await axiosInstance.get('/users', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching user:', error);
  }
};

export const updateUser = async (token, data) => {
  try {
    const response = await axiosInstance.put('/users', data, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error updating user:', error);
  }
};
