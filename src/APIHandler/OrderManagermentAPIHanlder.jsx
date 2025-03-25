import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL;
const rootOrder = `${API_URL}/api/orders`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

// lấy tất cả đơn hàng pending đang chờ xử lý
export const getAllPendingOrder = async (pageNumber, pageSize) => {
  const response = await axios.get(`${rootOrder}/checkOrder`, {
    headers: getAuthHeaders(),
    params: { pageNumber, pageSize },
  });
  return response.data;
};
// lấy tất cả đơn hàng CONFIRMED đã xử lý
export const getAllConfirmedOrder = async (pageNumber, pageSize) => {
  const response = await axios.get(`${rootOrder}/confirmed`, {
    headers: getAuthHeaders(),
    params: { pageNumber, pageSize },
  });
  return response.data;
};
// lấy tất cả đơn hàng DELIVERED đã xử lý
export const getAllDeliveredOrder = async (pageNumber, pageSize) => {
  const response = await axios.get(`${rootOrder}/delivering`, {
    headers: getAuthHeaders(),
    params: { pageNumber, pageSize },
  });
  return response.data;
};
// lấy tất cả đơn hàng COMPLETED đã xử lý
export const getAllCompletedOrder = async (pageNumber, pageSize) => {
  const response = await axios.get(`${rootOrder}/completed`, {
    headers: getAuthHeaders(),
    params: { pageNumber, pageSize },
  });
  return response.data;
};
// chỉnh sửa trạng thái đơn hàng
export const updateOrderStatus = async (orderId, orderStatus) => {
  try {
    const response = await axios.patch(
      `${rootOrder}/orderStatus`,
      null, // Không cần gửi body
      {
        params: { orderId, orderStatus }, 
        headers: getAuthHeaders(),
      }
    );
    toast.success("Update order status successfully");
    return response.data;
  } catch (error) {
    toast.error("Failed to update order status");
    console.error("Error updating order status:", error);
    throw error;
  }
};