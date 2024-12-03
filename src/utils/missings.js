import axiosInstance from '../api/axios';

export const fetchMissingItems = async (params) => {
  try {
    const response = await axiosInstance.get('/missings', { params });
    return response.data.data;
  } catch (error) {
    console.error(
      'Error fetching missing items:',
      error.response?.data || error.message
    );
  }
};

export const fetchMissingItem = async (tableId) => {
  try {
    const response = await axiosInstance.get(`/missings/${tableId}`);
    return response.data.data;
  } catch (error) {
    console.error(
      `Error fetching missing item with ID: ${tableId}`,
      error.response?.data || error.message
    );
  }
};

export const createMissingItem = async (payload, token) => {
  try {
    const response = await axiosInstance.post('/missings', payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      'Error creating missing item:',
      error.response?.data || error.message
    );
  }
};

export const updateMissingItem = async (token, tableId, payload) => {
  try {
    const response = await axiosInstance.put(`/missings/${tableId}`, payload, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      `Error updating missing item with ID: ${tableId}`,
      error.response?.data || error.message
    );
  }
};

export const deleteMissingItem = async (token, tableId) => {
  try {
    const response = await axiosInstance.delete(`/missings/${tableId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      `Error deleting missing item with ID: ${tableId}`,
      error.response?.data || error.message
    );
  }
};

export const addMissingItemPicture = async (token, tableId, image) => {
  try {
    const response = await axiosInstance.post(
      `/missings/${tableId}/picture`,
      image,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      `Error uploading missing item picture with ID: ${tableId}`,
      error.response?.data || error.message
    );
  }
};

export const updateMissingItemPicture = async (
  token,
  tableId,
  image,
  imageId
) => {
  try {
    const response = await axiosInstance.put(
      `/missings/${tableId}/picture/${imageId}`,
      image,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data.data;
  } catch (error) {
    console.error(
      `Error updating missing item picture with ID: ${tableId}`,
      error.response?.data || error.message
    );
  }
};
