import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_URL = import.meta.env.VITE_API_URL;
const rootVouchers = `${API_URL}/api/voucher`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
  };
};

export const getAllVouchers = async (pageNumber, pageSize) => {
  const response = await axios.get(`${rootVouchers}/paged`, {
    params: { pageNumber, pageSize },
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getVoucherById = async (id) => {
  const response = await axios.get(`${rootVouchers}/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const createVoucher = async (data) => {
  try {
    const response = await axios.post(rootVouchers, data, {
      headers: getAuthHeaders(),
    });
    toast.success("Voucher created successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to create voucher.");
    console.error("Error creating voucher:", error);
    throw error;
  }
};

export const updateVoucherById = async (id, data) => {
  try {
    const response = await axios.put(`${rootVouchers}/${id}`, data, {
      headers: getAuthHeaders(),
    });
    toast.success("Voucher updated successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to update voucher.");
    console.error("Error updating voucher:", error);
    throw error;
  }
};

export const deleteVoucherById = async (id) => {
  try {
    const response = await axios.delete(`${rootVouchers}/${id}`, {
      headers: getAuthHeaders(),
    });
    toast.success("Voucher deleted successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to delete voucher.");
    console.error("Error deleting voucher:", error);
    throw error;
  }
};  
