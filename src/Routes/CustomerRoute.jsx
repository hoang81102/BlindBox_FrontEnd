import { Routes, Route } from "react-router-dom";
import HomePage from "../Components/Homepage/Homepage";
import UserProfile from "../Components/UserProfile/UserProfile";
import UserManager from "../Components/Admin/Admin_Managerment/UserManager";
import CategoryManager from "../Components/Admin/Admin_Managerment/CategoryManager";
import AdminSidebar from "../Components/Admin/AdminSideBar/AdminSideBar";






const CustomerRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<UserProfile />} />
      <Route path="/categoryManager" element={<CategoryManager />} />
      <Route path="/userManager" element={<UserManager />} />
      <Route path="/admin" element={<AdminSidebar />} />
    </Routes>
  );
};

export default CustomerRoute;
