import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;
const rootPackage = `${API_URL}/api/packages`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
  };
};

// Lấy danh sách các gói sản phẩm (có phân trang)
export const getAllPackages = async (pageNumber, pageSize) => {
  try {
    const response = await axios.get(`${rootPackage}/paged`, {
      params: { pageNumber, pageSize },
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching packages:", error);
    throw error;
  }
};

// Tạo gói sản phẩm mới
export const createPackage = async (data) => {
  try {
    const response = await axios.post(rootPackage, data, {
      headers: getAuthHeaders(),
    });
    toast.success("Package created successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to create package.");
    console.error("Error creating package:", error);
    throw error;
  }
};

// Cập nhật gói sản phẩm theo ID
export const updatePackageById = async (id, data) => {
  try {
    const response = await axios.put(`${rootPackage}/${id}`, data, {
      headers: getAuthHeaders(),
    });
    toast.success("Package updated successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to update package.");
    console.error("Error updating package:", error);
    throw error;
  }
};

// Xóa gói sản phẩm theo ID
export const deletePackageById = async (id) => {
  try {
    const response = await axios.delete(`${rootPackage}/${id}`, {
      headers: getAuthHeaders(),
    });
    toast.success("Package deleted successfully!");
    return response.data;
  } catch (error) {
    toast.error("Failed to delete package.");
    console.error("Error deleting package:", error);
    throw error;
  }
};
