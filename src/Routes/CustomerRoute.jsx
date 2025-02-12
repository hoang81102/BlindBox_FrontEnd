import { Routes, Route } from "react-router-dom";
import HomePage from "../Components/HomePage/HomePage";
import AdminNavBar from "../Components/Admin/AdminNavBar/AdminNavBar";
import UserProfile from "../Components/UserProfile/UserProfile";

const CustomerRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/adminNavBar" element={<AdminNavBar />} />
      <Route path="/profile" element={<UserProfile />} />
    </Routes>
  );
};

export default CustomerRoute;
