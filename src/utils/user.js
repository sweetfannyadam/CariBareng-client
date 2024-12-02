import axiosInstance from '../api/axios';

export const fetchUser = async (token) => {
  try {
    const response = await axiosInstance.get('/users', {
      headers: { Authorization: `Bearer ${token}` },
    });

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

export const uploadProfilePicture = async (token, image) => {
  try {
    const response = await axiosInstance.post('/users/profile-picture', image, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error uploading profile picture:', error);
  }
};

export const fetchUserMissingItems = async (token) => {
  try {
    const response = await axiosInstance.get('/missings/total', {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('User missing items:', response.data.data);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching total posts:', error);
  }
};

const data = await fetchUser();
console.log('fetchUser data:', data);
