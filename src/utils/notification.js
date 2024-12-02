import axiosInstance from '@/api/axios';

export const createNotification = async (token, payload, target) => {
  try {
    const response = await axiosInstance.post(
      `/notifications/${target}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          body: JSON.stringify(payload),
        },
      }
    );
    return response.data.data;
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
    return response.data.data;
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