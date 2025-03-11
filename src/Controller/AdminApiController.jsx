import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

/**
 * Lấy danh sách tất cả tài khoản admin
 */
export const getAllAccounts = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/Admin/GetAll`);
    return response.data;
  } catch (error) {
    console.error("Error fetching accounts:", error);
    throw error;
  }
};


/**
 * Cập nhật thông tin của một tài khoản theo ID
 */
export const updateAccount = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/api/Admin/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating account with ID ${id}:`, error);
    throw error;
  }
};

/**
 * Xóa một tài khoản theo ID
 */
// export const deleteAccount = async (id) => {
//   try {
//     const response = await axios.delete(`${API_URL}/api/Admin/${id}`);
//     return response.data;
//   } catch (error) {
//     console.error(`Error deleting account with ID ${id}:`, error);
//     throw error;
//   }
// };

/**
 * Thêm tài khoản mới
 */
// export const addAccount = async (newAccountData) => {
//   try {
//     const response = await axios.post(
//       `${API_URL}/api/Admin/Add`,
//       newAccountData
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error adding new account:", error);
//     throw error;
//   }
// };
