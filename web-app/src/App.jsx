import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Bookings from "./pages/Bookings";
import Payments from "./pages/Payments";
import Locations from "./pages/Locations";
import Notifications from "./pages/Notifications";

function App() {
  const isLoggedIn = !!localStorage.getItem("token");

  return (
    <Routes>
      <Route path="/" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/bookings" element={<Bookings />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/locations" element={<Locations />} />
      <Route path="/notifications" element={<Notifications />} />
    </Routes>
  );
}

export default App;