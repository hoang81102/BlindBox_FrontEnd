import PayOS from "@payos/payos-checkout";

export const PayOSCheckout = ({ amount, orderId }) => {
  const handlePayment = async () => {
    try {
      const payOS = new PayOS({
        apiKey: "YOUR_API_KEY",
        env: "sandbox",
      });

      const checkoutUrl = await payOS.createCheckoutUrl({
        amount: amount,
        orderId: orderId,
        returnUrl: "http://localhost:3000/success",
        cancelUrl: "http://localhost:3000/cancel",
      });

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Lỗi khi tạo link thanh toán:", error);
    }
  };

  return <button onClick={handlePayment}>Thanh toán với PayOS</button>;
};
