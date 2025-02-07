import { Routes, Route } from "react-router-dom";
import HomePage from "../Components/HomePage/HomePage";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import AdminNavBar from "../Components/Admin/AdminNavBar/AdminNavBar";

const CustomerRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/adminNavBar" element={<AdminNavBar />} />
    </Routes>
  );
};

export default CustomerRoute;
