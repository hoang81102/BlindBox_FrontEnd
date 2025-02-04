import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/api/Auth/api/User/Login`, {
      Username: email,
      Password: password,
    });

    return response.data;
  } catch (error) {
    console.error("Login error:", error.response?.data || error.message);
    throw error.response?.data || "Login failed";
  }
};

export const registerUser = async (email, password, name, phoneNumber) => {
  try {
    const response = await axios.post(`${API_URL}/api/Auth/register`, {
      email,
      password,
      name,
      phoneNumber,
    });

    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : "Something went wrong";
  }
};
