import { createOrder } from "../APIHandler/OrderAPIHanlder";

const handleError = (error, message) => {
  console.error(`${message}:`, error.response?.data || error.message);
  return { success: false, message: error.response?.data?.message || message };
};

export const createOrdertoPayment = async (orderData) => {
  try {
    if (!orderData.accountId || !orderData.priceTotal) {
      throw new Error("Thiếu thông tin tài khoản hoặc tổng giá trị!");
    }

    const formattedOrderData = {
      ...orderData,
      price: Number(orderData.price),
      priceTotal: Number(orderData.priceTotal),
      phoneNumber: String(orderData.phoneNumber),
      discountMoney: Number(orderData.discountMoney ?? 0),
      paymentConfirmed: orderData.paymentConfirmed ?? false,
      createdDate: new Date().toISOString(),
    };

    const newOrder = await createOrder(formattedOrderData);

    return {
      success: true,
      data: {
        ...newOrder,
        createdDateFormatted: new Date(newOrder.createdDate).toLocaleString(),
      },
    };
  } catch (error) {
    return handleError(error, "Lỗi khi tạo đơn hàng");
  }
};
