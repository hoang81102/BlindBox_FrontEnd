import React from "react";
import HeaderAdmin from "../Components/Admin/HeaderAdmin/HeaderAdmin";
import AdminSidebarLayout from "./AdminSidebarLayout";

const AdminLayout = () => {
  return (
    <>
      <div className="header-admin" style={{ margin: "0px 50px" }}>
        <HeaderAdmin />
      </div>
      <div className="my-4">
        <AdminSidebarLayout />
        
      </div>
    </>
  );
};

export default AdminLayout;
