import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/login`, {
    email,
    password,
  });
  return response.data;
};

export const registerUser = async (
  firstName,
  lastName,
  email,
  password,
  gender,
  phoneNumber,
  address
) => {
  const response = await axios.post(`${API_URL}/api/register`, {
    firstName,
    lastName,
    email,
    password,
    gender,
    phoneNumber,
    address,
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/api/forgot-password`, {
    email,
  });
  return response.data;
};

export const resetPassword = async ({ email, token, newPassword }) => {
  const response = await axios.post(`${API_URL}/api/reset-password`, {
    email,
    token,
    newPassword,
  });
  return response.data;
};

export const googleLogin = async (credential) => {
  const response = await axios.post(`${API_URL}/api/google-login`, {
    token: credential,
  });
  return response.data;
};

export const addToCart = async (userId, blindBoxId, packageId, quantity) => {
  const response = await axios.post(`${API_URL}/api/Cart/add-to-cart`, {
    userId,
    blindBoxId,
    packageId,
    quantity,
  });
  return response.data;
};

export const loadCart = async (userId) => {
  const response = await axios.get(`${API_URL}/api/Cart/get-cart/${userId}`);
  return response.data;
};

export const updateQuantity = async (cartId, userId, quantity) => {
  const response = await axios.put(`${API_URL}/api/Cart/update-quantity`, {
    cartId,
    userId,
    quantity,
  });
  return response.data;
};
