import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./Components/Register/Welcome";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import ForgetPassword from "./Components/Login/ForgetPassword";
import VerifyEmail from "./Components/Register/VerifyEmail";
import ResetPassword from "./Components/Login/ResetPassword";
import CustomerRoute from "./Routes/CustomerRoute";
import CustomerLayout from "./Routes/CustomerLayout";
import AdminLayout from "./Routes/AdminLayout";
import ScrollToTop from "./Services/ScrollToTop";
import { CartProvider } from "./Services/CartService";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
/*..............................................*/
/*AdminRoute*/
import RevenueManagement from "./Components/Admin/Admin_Managerment/RevenueManagement";
import CategoryManager from "./Components/Admin/Admin_Managerment/CategoryManagement";
import UserManagement from "./Components/Admin/Admin_Managerment/UserManagement";
import VoucherManagement from "./Components/Admin/Admin_Managerment/VoucherManagement";
import PackageManagement from "./Components/Admin/Admin_Managerment/PackageManagement";
import BlindBoxManagement from "./Components/Admin/Admin_Managerment/BlindBoxManagement";
import OrderListManagerment from "./Components/Admin/Admin_Managerment/OrderListManagerment";
import OrderConfirmManagerment from "./Components/Admin/Admin_Managerment/OrderConfirmManagerment";
import OrderDeliveryManagerment from "./Components/Admin/Admin_Managerment/OrderDeliveryManagerment";
import OrderCompleteManagerment from "./Components/Admin/Admin_Managerment/OrderCompleteManagerment";
function App() {
  return (
    <CartProvider>
      <Router>
        <ScrollToTop></ScrollToTop>

        <Routes>
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify" element={<VerifyEmail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route
            path="/*"
            element={
              <CustomerLayout>
                <CustomerRoute />
              </CustomerLayout>
            }
          />
          {/*..............................................*/}
          {/*AdminRoute*/}

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<UserManagement />} />

            <Route
              path="/admin/revenue"
              element={<RevenueManagement />}
            ></Route>
            <Route
              path="/admin/order/order-list"
              element={<OrderListManagerment />}
            ></Route>
            <Route
              path="/admin/order/order-confirm"
              element={<OrderConfirmManagerment />}
            ></Route>
            <Route
              path="/admin/order/order-delivered"
              element={<OrderDeliveryManagerment />}
            ></Route>
            <Route
              path="/admin/order/order-completed"
              element={<OrderCompleteManagerment />}
            ></Route>
            <Route path="/admin/category" element={<CategoryManager />}></Route>
            <Route path="/admin/user" element={<UserManagement />}></Route>
            <Route
              path="/admin/voucher"
              element={<VoucherManagement />}
            ></Route>
            <Route
              path="/admin/package"
              element={<PackageManagement />}
            ></Route>
            <Route
              path="/admin/blindbox"
              element={<BlindBoxManagement />}
            ></Route>
          </Route>
        </Routes>

        <ToastContainer
          position="top-right"
          autoClose={500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </CartProvider>
  );
}

export default App;
