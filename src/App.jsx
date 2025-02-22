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
import AdminRoute from "./Routes/AdminRoute";
import ScrollToTop from "./Services/ScrollToTop";
import { CartProvider } from "./Services/CartService";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

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
          <Route
            path="/admin*"
            element={
              <AdminLayout>
                <AdminRoute />
              </AdminLayout>
            }
          />
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
