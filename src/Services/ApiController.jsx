import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const loginUser = async (email, password) => {
  const response = await axios.post(`${API_URL}/api/Auth/login`, {
    Username: email,
    Password: password,
  });
  return response.data;
};

export const registerUser = async (email, password, name, phoneNumber) => {
  const response = await axios.post(`${API_URL}/api/Auth/register`, {
    email,
    password,
    name,
    phoneNumber,
  });
  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await axios.post(`${API_URL}/api/Auth/forgot-password`, {
    email,
  });
  return response.data;
};

export const resetPassword = async ({ token, newPassword }) => {
  const response = await axios.post(
    `${API_URL}/api/Auth/confirm-reset-password`,
    {
      token,
      newPassword,
    }
  );
  return response.data;
};
