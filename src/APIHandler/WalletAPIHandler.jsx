import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getWallet = async (accountId) => {
  const response = await axios.get(`${API_URL}/api/Wallet/getWallet`, {
    params: { accountId },
  });
  return response.data;
};
