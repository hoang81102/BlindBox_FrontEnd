import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootOrder = `${API_URL}/api/orders`;
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const createOrder = async ({
  accountId,
  orderStatus,
  price,
  priceTotal,
  paymentConfirmed,
  deliveryAddress,
  note,
  phoneNumber,
  discountMoney,
}) => {
  const response = await axios.post(
    `${rootOrder}`,
    {
      accountId,
      orderStatus,
      price,
      priceTotal,
      paymentConfirmed,
      deliveryAddress,
      note,
      phoneNumber,
      discountMoney,
    },
    { headers: getAuthHeaders() }
  );
  return response.data;
};
