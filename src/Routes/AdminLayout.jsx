import React from "react";
import AdminSideBar from "../Components/Admin/AdminSideBar/AdminSideBar";

const AdminLayout = ({ children }) => {
  return (
    <div className="admin-layout">
      <AdminSideBar />
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
