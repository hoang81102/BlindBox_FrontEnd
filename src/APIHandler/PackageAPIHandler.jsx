import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getPackageId = async (id) => {
  const response = await axios.get(`${API_URL}/api/Package/${id}`);
  return response.data;
};
