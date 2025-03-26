import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_URL = import.meta.env.VITE_API_URL;
const rootBlindBoxImage = `${API_URL}/api/DataImages/Blindbox-Images`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
    Accept: "application/json",
  };
};

export const getAllBlindBoxImages = async (blindboxId) => {
  try {
    const response = await axios.get(
      `${rootBlindBoxImage}/Blindbox/${blindboxId}`,
      {
        headers: getAuthHeaders(),
      }
    );
    return response.data;
  } catch (error) {
    toast.error("Error fetching blind box images:", error.message || error);
    return null;
  }
};

export const createBlindBoxImage = async (blindboxId, imageUrls) => {
  try {
    const response = await axios.post(
      `${rootBlindBoxImage}`,
      { blindboxId, imageUrls },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    toast.error("Error creating blind box image:", error.message || error);
    return null;
  }
};

export const updateBlindBoxImage = async (blindboximageId, imageUrl) => {
  try {
    const response = await axios.put(
      `${rootBlindBoxImage}`,
      {
        blindboximageId,
        imageUrl,
      },
      { headers: getAuthHeaders() }
    );
    return response.data;
  } catch (error) {
    toast.error("Error updating blind box image:", error.message || error);
    return null;
  }
};
