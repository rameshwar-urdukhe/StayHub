import { useEffect, useState } from "react";

import API from "../utils/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    const res = await API.get("/dashboard/stats", {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    setStats(res.data);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded p-6">
          <h2>Total Users</h2>

          <p className="text-4xl font-bold">{stats.totalUsers}</p>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2>Total Properties</h2>

          <p className="text-4xl font-bold">{stats.totalProperties}</p>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2>Total Bookings</h2>

          <p className="text-4xl font-bold">{stats.totalBookings}</p>
        </div>

        <div className="bg-white shadow rounded p-6">
          <h2>Total Reviews</h2>

          <p className="text-4xl font-bold">{stats.totalReviews}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
