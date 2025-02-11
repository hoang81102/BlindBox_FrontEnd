import { Routes, Route } from "react-router-dom";
import HomePage from "../Components/HomePage/HomePage";
import AdminNavBar from "../Components/Admin/AdminNavBar/AdminNavBar";

const CustomerRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/adminNavBar" element={<AdminNavBar />} />
    </Routes>
  );
};

export default CustomerRoute;
