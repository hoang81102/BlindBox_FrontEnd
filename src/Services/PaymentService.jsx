import { createPayment } from "../APIHandler/PaymentAPIHandler";

const handleError = (error, message) => {
  console.error(`${message}:`, error.response?.data || error.message);
  return { success: false, message: error.response?.data?.message || message };
};

export const createPaymentDetail = async (paymentData) => {
  try {
    if (!paymentData.orderId || !paymentData.price) {
      throw new Error("Thiếu thông tin đơn hàng hoặc số tiền!");
    }

    const formattedPaymentData = {
      orderId: String(paymentData.orderId),
      description: paymentData.description || "",
      price: Number(paymentData.price),
      returnUrl: paymentData.returnUrl || "",
      cancelUrl: paymentData.cancelUrl || "",
    };

    const newPayment = await createPayment(formattedPaymentData);
    return {
      success: true,
      data: {
        ...newPayment,
        createdDateFormatted: new Date(newPayment.createdDate).toLocaleString(),
      },
    };
  } catch (error) {
    return handleError(error, "Lỗi khi tạo thanh toán");
  }
};
