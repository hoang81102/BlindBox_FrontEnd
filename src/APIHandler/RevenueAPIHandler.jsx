import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const rootRevenue = `${API_URL}/api/revenue`;

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: token ? `Bearer ${token}` : "",
  };
};

export const getRevenueByMonth = async ({ year }) => {
  const response = await axios.get(`${rootRevenue}/by-month`, {
    headers: getAuthHeaders(),
    params: {
      year,
    },
  });
  return response.data;
};

export const getRevenueByYear = async () => {
  const response = await axios.get(`${rootRevenue}/by-year`, {
    headers: getAuthHeaders(),
  });
  return response.data;
};

export const getRevenueByDay = async ({ startDate, endDate }) => {
  const response = await axios.get(`${rootRevenue}/by-day`, {
    headers: getAuthHeaders(),
    params: {
      startDate,
      endDate,
    },
  });
  return response.data;
};
