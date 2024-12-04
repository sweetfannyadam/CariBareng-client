import axiosInstance from "@/api/axios";

export const createFoundItem = async (payload, token, username) => {
    try {
      const response = await axiosInstance.post(`/notifications/${username}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data.data;
    } catch (error) {
      console.error(
        'Error creating notification item:',
        error.response?.data || error.message
      );
    }
  };