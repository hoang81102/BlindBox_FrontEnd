import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
  };
};

export const getAllBlindBox = async (pageNumber, pageSize) => {
  const response = await axios.get(`${API_URL}/api/Blindbox/GetAll-paged`, {
    params: { pageNumber, pageSize },
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getBlindBoxbyId = async (id) => {
  const response = await axios.get(`${API_URL}/api/Blindbox/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
