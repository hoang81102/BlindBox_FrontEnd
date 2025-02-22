import { Routes, Route } from "react-router-dom";
import FeedbackManagement from "../Components/Admin/Admin_Managerment/FeedbackManagement";
import ProductManagement from "../Components/Admin/Admin_Managerment/ProductManagement";
import VoucherManagement from "../Components/Admin/Admin_Managerment/VoucherManagement";
import CategoryManager from "../Components/Admin/Admin_Managerment/CategoryManagement";
import RevenueManagement from "../Components/Admin/Admin_Managerment/RevenueManagement";
import UserManager from "../Components/Admin/Admin_Managerment/UserManagement";
const AdminRoute = () => {
  return (
    <Routes path="admin">
      <Route path="/users" element={<UserManager />} />
      <Route path="/revenue" element={<RevenueManagement />} />
      <Route path="/category" element={<CategoryManager />} />
      <Route path="/voucher" element={<VoucherManagement />} />
      <Route path="/product" element={<ProductManagement />} />
      <Route path="/feedback" element={<FeedbackManagement />} />
    </Routes>
  );
};

export default AdminRoute;
