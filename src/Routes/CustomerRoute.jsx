import { Routes, Route } from "react-router-dom";
import HomePage from "../Components/HomePage/HomePage";
import AdminNavBar from "../Components/Admin/AdminNavBar/AdminNavBar";
import UserProfile from "../Components/UserProfile/UserProfile";
import About from "../Components/About/About";
import Contact from "../Components/Contact/Contact";
import FAQs from "../Components/FAQS/FAQS";
import BlindBoxProduct from "../Components/BlindBoxProduct/BlindBoxProduct";
import CartPage from "../Components/Cart/CartPage";
const CustomerRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/adminNavBar" element={<AdminNavBar />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/faqs" element={<FAQs />} />
      <Route path="/products/:id" element={<BlindBoxProduct />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default CustomerRoute;
