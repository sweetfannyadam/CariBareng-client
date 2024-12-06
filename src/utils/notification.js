import axiosInstance from '@/api/axios';

export const createNotification = async (token, target, payload) => {
  try {
    const response = await axiosInstance.post(
      `/notifications/${target}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Response utils:', response);
    return response;
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

export const fetchAllNotifications = async (token) => {
  try {
    const response = await axiosInstance.get('/notifications', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
  }
};

export const fetchNotification = async (token, id) => {
  try {
    const response = await axiosInstance.get(`/notifications/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('Notification details utils:', response);
    return response;
  } catch (error) {
    console.error('Error fetching notification:', error);
  }
};

export const deleteNotification = async (token, id) => {
  try {
    const response = await axiosInstance.delete(`/notifications/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error deleting notification:', error);
  }
};
