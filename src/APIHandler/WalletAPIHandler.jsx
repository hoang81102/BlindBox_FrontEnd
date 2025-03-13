import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootWallet = `${API_URL}/api/wallets`;
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const getWallet = async (accountId) => {
  const response = await axios.get(`${rootWallet}`, {
    params: { accountId },
    headers: getAuthHeaders(),
  });
  return response.data;
};
