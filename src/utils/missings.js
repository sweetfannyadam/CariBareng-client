import axiosInstance from '../api/axios';

export const fetchMissingItems = async (payload) => {
  try {
    const response = await axiosInstance.get('/missings', payload);
    return response.data.data;
  } catch (error) {
    console.error('Error fetching missing items:', error);
  }
};

export const fetchMissingItem = async (tableId, payload) => {
  try {
    const response = await axiosInstance.get(`/missings/${tableId}`);
    return response.data.data;
  } catch (error) {
    console.error(`Error fetching missing item with ID: ${tableId}`, error);
  }
};

export const createMissingItem = async (payload, token) => {
  try {
    const response = await axiosInstance.post('/missings', {
      headers: { Authorization: `Bearer ${token}` },
      payload,
    });
    return response.data.data;
  } catch (error) {
    console.error(
      'Error creating missing item:',
      error.data?.error || error.message
    );
  }
};

export const updateMissingItem = async (token, tableId, payload) => {
  try {
    const response = await axiosInstance.get(`/missings/${tableId}`, {
      headers: { Authorization: `Bearer ${token}` },
      payload,
    });
    return response.data.data;
  } catch (error) {
    console.error(
      `Error updating missing item with ID: ${tableId}`,
      error.data?.error || error.message
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
      error.data?.error || error.message
    );
  }
};

export const addMissingItemPicture = async (token, tableId, image) => {
  try {
    const response = await axiosInstance.post(`/missings/${tableId}`, image, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data;
  } catch (error) {
    console.error(
      `Error uploading missing item picture with ID: ${tableId}`,
      error.data?.error || error.message
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
    const response = await axiosInstance.put(`/missings/${tableId}`, image, {
      headers: { Authorization: `Bearer ${token}` },
      image,
      imageId,
    });
    return response.data.data;
  } catch (error) {
    console.error(
      `Error updating missing item picture with ID: ${tableId}`,
      error.data?.error || error.message
    );
  }
};
