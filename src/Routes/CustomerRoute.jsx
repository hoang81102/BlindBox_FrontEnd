import { Routes, Route } from "react-router-dom";
import HomePage from "../Components/Homepage/Homepage";
import UserProfile from "../Components/UserProfile/UserProfile";


const CustomerRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/profile" element={<UserProfile />} />

    </Routes>
  );
};

export default CustomerRoute;
