import { Routes, Route } from "react-router-dom";
import Homepage from "../Components/Homepage/Homepage";
import Login from "../Components/Login/Login";
import Register from "../Components/Register/Register";
import AdminNavBar from "../Components/Admin/AdminNavBar/AdminNavBar";

const CustomerRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/adminNavBar" element={<AdminNavBar />} />
    </Routes>
  );
};

export default CustomerRoute;
