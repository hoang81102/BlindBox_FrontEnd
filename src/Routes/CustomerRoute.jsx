import { Routes, Route } from "react-router-dom";
import HomePage from "../Components/Homepage/Homepage";
import UserProfile from "../Components/UserProfile/UserProfile";

const CustomerRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<BlindBox />} />
      <Route path="/adminNavBar" element={<AdminNavBar />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/products/:id" element={<BlindBoxProduct />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/luckyWheel" element={<LuckyWheel />} />
      <Route path="/blindbox" element={<LuckyWheel />} />
      <Route path="/wallet" element={<Wallet />} />
      <Route path="/order-history" element={<OrderHistory />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/voucher" element={<AvailableVoucher />} />
      <Route path="/checkout" element={<Payment />} />
    </Routes>
  );
};

export default CustomerRoute;
