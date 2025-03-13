import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootAuth = `${API_URL}/api/Auth`;

export const loginUser = async (email, password) => {
  const response = await axios.post(`${rootAuth}/login`, {
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
  const response = await axios.post(`${rootAuth}/register`, {
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
  const response = await axios.post(`${rootAuth}/forgot-password`, {
    email,
  });
  return response.data;
};

export const resetPassword = async ({ email, token, newPassword }) => {
  const response = await axios.post(`${rootAuth}/reset-password`, {
    email,
    token,
    newPassword,
  });
  return response.data;
};

export const googleLogin = async (credential) => {
  const response = await axios.post(`${rootAuth}/google-login`, {
    token: credential,
  });
  return response.data;
};
