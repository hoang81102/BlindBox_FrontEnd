import {
  getAllBlindBox,
  getBlindBoxbyId,
} from "../APIHandler/BlindBoxAPIHandler";

export const fetchBlindBoxes = async (page, pageSize) => {
  try {
    const data = await getAllBlindBox(page, pageSize);
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách Blind Box:", error);
    throw error;
  }
};

export const getBlindBoxDetails = async (id) => {
  try {
    const data = await getBlindBoxbyId(id);
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách Blind Box:", error);
    throw error;
  }
};
