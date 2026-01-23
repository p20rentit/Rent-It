import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import Unauthorized from "../pages/Unauthorized";

import AdminDashboard from "../pages/AdminDashboard";
import OwnerDashboard from "../pages/OwnerDashboard";
import CustomerDashboard from "../pages/CustomerDashboard";

import ProtectedRoute from "./ProtectedRoute";
import CostomerDashboard from "../pages/CustomerDashboard";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
<<<<<<< HEAD
        {/* Public Routes */}
=======
        {/* PUBLIC */}
>>>>>>> Rohit
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* CUSTOMER */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
<<<<<<< HEAD
              <CostomerDashboard />
=======
              <CustomerDashboard />
>>>>>>> Rohit
            </ProtectedRoute>
          }
        />

        {/* ADMIN */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* OWNER */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute allowedRoles={["OWNER"]}>
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
