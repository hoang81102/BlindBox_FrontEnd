import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootPayment = `${API_URL}/api/payments`;
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const createPayment = async ({
  orderId,
  description,
  price,
  returnUrl,
  cancelUrl,
}) => {
  const response = await axios.post(
    `${rootPayment}/create`,
    {
      orderId,
      description,
      price,
      returnUrl,
      cancelUrl,
    },
    { headers: getAuthHeaders() }
  );
  return response.data;
};
