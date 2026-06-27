import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";
import AdminRoute from "./components/AdminRoute";
import PropertyDetails from "./pages/PropertyDetails";
import AddProperty from "./pages/AddProperty";
import EditProperty from "./pages/EditProperty";
import MyBookings from "./pages/Bookings";
import MyProperties from "./pages/MyProperties";
import Profile from "./pages/Profile";
import Wishlist from "./pages/Wishlist";
import Footer from "./components/Footer";

function App() {
  return (
    /* Unified Platform Base Layer Shell Context */
    <div className="min-h-screen bg-brand-dark flex flex-col font-sans selection:bg-brand-accent/30 selection:text-white antialiased">
      {/* Global Interactive Navigation Menu */}
      <Navbar />

      {/* Dynamic Content Routing Canvas Node */}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />

          <Route
            path="/add-property"
            element={
              <AdminRoute>
                <AddProperty />
              </AdminRoute>
            }
          />

          <Route
            path="/edit-property/:id"
            element={
              <AdminRoute>
                <EditProperty />
              </AdminRoute>
            }
          />

          <Route
            path="/my-bookings"
            element={
              <ProtectedRoute>
                <MyBookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-properties"
            element={
              <AdminRoute>
                <MyProperties />
              </AdminRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin-dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/wishlist"
            element={
              <ProtectedRoute>
                <Wishlist />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      {/* Global Application Sticky Footer */}
      <Footer />
    </div>
  );
}

export default App;
