import { Routes, Route } from "react-router-dom";
import Homepage from "../Components/Homepage/Homepage";
import Login from "../Components/Login/Login";

const CustomerRoute = () => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};

export default CustomerRoute;
