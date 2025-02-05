import React from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CustomerRoute from "./Routes/CustomerRoute";
import CustomerLayout from "./Routes/CustomerLayout";
<<<<<<< HEAD:src/App.js
import "bootstrap/dist/css/bootstrap.min.css";

=======
import "react-toastify/dist/ReactToastify.css";
>>>>>>> QuangDo_FE:src/App.jsx

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/*"
          element={
            <CustomerLayout>
              <CustomerRoute />
            </CustomerLayout>
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
  );
}

export default App;
