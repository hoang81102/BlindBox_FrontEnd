import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootCart = `${API_URL}/cart-management/managed-carts`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
  };
};

export const addToCart = async (userId, blindBoxId, packageId, quantity) => {
  const response = await axios.post(
    `${rootCart}/add-to-cart`,
    { userId, blindBoxId, packageId, quantity },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const loadCart = async (userId) => {
  try {
    const response = await axios.get(`${rootCart}/${userId}`, {
      headers: getAuthHeaders(),
    });
    console.log("Dữ liệu giỏ hàng từ API:", response.data);
    return response.data;
  } catch (error) {
    console.error("Lỗi khi tải giỏ hàng:", error);
    return [];
  }
};

export const updateQuantity = async (cartId, userId, quantity) => {
  const response = await axios.put(
    `${rootCart}/update-quantity`,
    { cartId, userId, quantity },
    { headers: getAuthHeaders() }
  );
  return response.data;
};

export const deleteItemInCart = async (cartId) => {
  const response = await axios.delete(`${rootCart}/delete/${cartId}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
