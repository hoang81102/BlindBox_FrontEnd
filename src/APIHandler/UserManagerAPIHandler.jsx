import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const API_URL = import.meta.env.VITE_API_URL;
const rootAccounts = `${API_URL}/api/admin`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
  };
};

export const getAllAccounts = async (pageNumber, pageSize) => {
  try {
    const response = await axios.get(`${rootAccounts}/accounts`, {
      params: { pageNumber, pageSize },
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    if (error.response?.status === 401) {
      toast.error("Unauthorized: Please log in again.");
    } else if (error.response?.status === 404) {
      toast.error("Accounts not found.");
    } else {
      toast.error("Failed to fetch accounts.");
    }
    console.error("Error fetching accounts:", error);
    throw error;
  }
};

export const updateAccountById = async (id, data) => {
  try {
    const response = await axios.put(`${rootAccounts}/users/${id}`, data, {
      headers: getAuthHeaders(),
    });
    toast.success("Account updated successfully!");
    console.log(response.data.role);
    console.log(response.data.address);
    return response.data;
  } catch (error) {
    toast.error("Failed to update account.");
    console.error("Error updating account:", error);
    throw error;
  }
};
