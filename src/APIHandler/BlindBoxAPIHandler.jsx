import axios from "axios";
import { toast } from "react-toastify";
const API_URL = import.meta.env.VITE_API_URL;
const rootBlindBox = `${API_URL}/api/blindboxes`;
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
  };
};

export const getAllBlindBox = async (pageNumber, pageSize) => {
  const response = await axios.get(`${rootBlindBox}/paged`, {
    params: { pageNumber, pageSize },
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getBlindBoxbyId = async (id) => {
  const response = await axios.get(`${rootBlindBox}/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const createBlindBox = async (data) => {
  try {
    const response = await axios.post(rootBlindBox, data, {
      headers: getAuthHeaders(),
    });
    toast.success("BlindBox created successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to create BlindBox.");
    console.error("Error creating BlindBox:", error);
    throw error;
  }
};
export const updateBlindBoxbyId = async (id, data) => {
  try {
    const response = await axios.put(`${rootBlindBox}/${id}`, data, {
      headers: getAuthHeaders(),
    });
    toast.success("BlindBox updated successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to update BlindBox.");
    console.error("Error updating BlindBox:", error);
    throw error;
  }
};

export const deleteBlindBoxbyId   = async (id) => {   
  try {
    const response = await axios.delete(`${rootBlindBox}/${id}`, {
      headers: getAuthHeaders(),
    });
    toast.success("BlindBox deleted successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to delete BlindBox.");
    console.error("Error deleting BlindBox:", error);
    throw error;
  }
};
