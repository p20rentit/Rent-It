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

// Owner vehicle pages
import VehicleList from "../pages/owner/VehicleList";
import AddVehicle from "../pages/owner/AddVehicle";
import EditVehicle from "../pages/owner/EditVehicle";
import OwnerLayout from "../components/OwnerLayout";

import ProtectedRoute from "./ProtectedRoute";
import ForgotPassword from "../pages/ForgotPassword";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* CUSTOMER */}
        <Route
          path="/customer"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <CustomerDashboard />
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

        {/* OWNER - All routes use OwnerLayout with sidebar */}
        <Route
          path="/owner"
          element={
            <ProtectedRoute allowedRoles={["OWNER"]}>
              <OwnerLayout />
            </ProtectedRoute>
          }
        >
          {/* Nested routes - will render inside OwnerLayout's <Outlet /> */}
          <Route index element={<OwnerDashboard />} />
          <Route path="vehicles" element={<VehicleList />} />
          <Route path="vehicles/add" element={<AddVehicle />} />
          <Route path="vehicles/edit/:id" element={<EditVehicle />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
