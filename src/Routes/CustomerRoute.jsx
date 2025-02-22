import { Routes, Route } from "react-router-dom";
import BlindBox from "../Components/BlindBox/BlindBox";
import About from "../Components/About/About";
import Contact from "../Components/Contact/Contact";
import FAQs from "../Components/FAQS/FAQS";
import BlindBoxProduct from "../Components/BlindBoxProduct/BlindBoxProduct";
import CartPage from "../Components/AccountDropdown/Cart/CartPage";
import LuckyWheel from "../Components/LuckyWheel/LuckyWheel";
import HomePages from "../Components/HomePages/HomePages";
import UserProfile from "../Components/AccountDropdown/UserProfile/UserProfile";
import Wallet from "../Components/AccountDropdown/Wallet/Wallet";
import OrderHistory from "../Components/AccountDropdown/OrderHistory/OrderHistory";
import Wishlist from "../Components/AccountDropdown/Wishlist/Wishlist";
import AvailableVoucher from "../Components/AccountDropdown/AvailableVoucher/AvailableVoucher";
import Payment from "../Components/Payment/Payment";
const CustomerRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<BlindBox />} />
      <Route path="/home" element={<HomePages />} />
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
