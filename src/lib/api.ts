import axios from 'axios';

const API_BASE_URL = 'https://blog-be-gxxu.onrender.com/api';

export const getBlogs = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs`);
    return response.data;
  } catch (error) {
    console.error('Error fetching blogs:', error);
    throw error;
  }
};

export const getBlogById = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/blogs/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching blog with id ${id}:`, error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/categories`);
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}; 