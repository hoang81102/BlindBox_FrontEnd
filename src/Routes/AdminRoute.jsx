import { Routes, Route } from "react-router-dom";
import AdminSidebar from "../Components/Admin/AdminNavBar/AdminSideBar";

const AdminRoute = () => {
  return (
    <Routes>
      <Route path="/admin" element={<AdminSidebar />} />
    </Routes>
  );
};

export default AdminRoute;
