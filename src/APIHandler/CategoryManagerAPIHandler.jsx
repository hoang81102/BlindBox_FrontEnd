// APIHandler/CategoryManagerAPIHandler.js
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;
const rootCategory = `${API_URL}/api/Category`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
  };
};

export const getAllCategories = async () => {
  try {
    const response = await axios.get(rootCategory, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error.message || error);
    return null; 
  }
};

export const getAllCategory = async (pageNumber, pageSize) => {
  try {
    const response = await axios.get(`${rootCategory}/paged`, {
      params: { pageNumber, pageSize },
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async (data) => {
  try {
    const response = await axios.post(rootCategory, data, {
      headers: getAuthHeaders(),
    });
    toast.success("Category created successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to create category.");
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategoryById = async (id, data) => {
  try {
    const response = await axios.put(`${rootCategory}/${id}`, data, {
      headers: getAuthHeaders(),
    });
    toast.success("Category updated successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to update category.");
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategoryById = async (id) => {
  try {
    const response = await axios.delete(`${rootCategory}/${id}`, {
      headers: getAuthHeaders(),
    });
    toast.success("Category deleted successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to delete category.");
    console.error("Error deleting category:", error);
    throw error;
  }
};
