import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootPackage = `${API_URL}/api/packages`;
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};
export const getPackageId = async (id) => {
  const response = await axios.get(`${rootPackage}/${id}`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};
