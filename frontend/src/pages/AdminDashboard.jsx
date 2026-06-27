import { useEffect, useState } from "react";
import API from "../utils/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true); // Added for high-end skeleton layout states

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get("/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setStats(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10 animate-fade-in">
        {/* Dashboard Structural Management Header */}
        <div className="border-b border-white/5 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-brand-muted">
              Operational Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted">
              Live marketplace activity metrics, user account balances, and core
              system indices.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs px-3 py-1.5 rounded-xl bg-brand-surface border border-white/5 font-medium text-brand-success">
            <span className="w-2 h-2 rounded-full bg-brand-success animate-pulse" />
            System Live Sync Engine
          </div>
        </div>

        {/* Dynamic Cards Deck Grid Setup */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-brand-surface/20 border border-white/5 rounded-2xl p-6 h-32 animate-pulse space-y-3"
              >
                <div className="h-4 bg-slate-800 rounded w-1/2"></div>
                <div className="h-8 bg-slate-800 rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Metric Box 1: Total Platform Accounts */}
            <div className="bg-gradient-to-br from-brand-surface/40 to-brand-dark/20 border border-white/5 rounded-2xl p-6 backdrop-blur-md shadow-glass relative overflow-hidden group hover:border-brand-accent/30 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Total Base Users
                  </h2>
                  <p className="text-3xl sm:text-4xl font-black tracking-tight text-white pt-2">
                    {stats.totalUsers ?? 0}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-brand-accent/10 text-brand-accent border border-brand-accent/20 text-xl">
                  👥
                </div>
              </div>
              <p className="text-[10px] text-brand-muted mt-4 flex items-center gap-1 font-medium">
                <span className="text-brand-success">↗ Live</span> Registered
                traveler matrix instances
              </p>
            </div>

            {/* Metric Box 2: System Property Assets */}
            <div className="bg-gradient-to-br from-brand-surface/40 to-brand-dark/20 border border-white/5 rounded-2xl p-6 backdrop-blur-md shadow-glass relative overflow-hidden group hover:border-brand-accent/30 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Listed Properties
                  </h2>
                  <p className="text-3xl sm:text-4xl font-black tracking-tight text-white pt-2">
                    {stats.totalProperties ?? 0}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-brand-highlight/10 text-brand-highlight border border-brand-highlight/20 text-xl">
                  🏢
                </div>
              </div>
              <p className="text-[10px] text-brand-muted mt-4 flex items-center gap-1 font-medium">
                <span className="text-brand-success">↗ Live</span> Active
                monetization infrastructure units
              </p>
            </div>

            {/* Metric Box 3: Transaction Orders */}
            <div className="bg-gradient-to-br from-brand-surface/40 to-brand-dark/20 border border-white/5 rounded-2xl p-6 backdrop-blur-md shadow-glass relative overflow-hidden group hover:border-brand-accent/30 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Gross Bookings
                  </h2>
                  <p className="text-3xl sm:text-4xl font-black tracking-tight text-white pt-2">
                    {stats.totalBookings ?? 0}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-brand-success/10 text-brand-success border border-brand-success/20 text-xl">
                  ⚡
                </div>
              </div>
              <p className="text-[10px] text-brand-muted mt-4 flex items-center gap-1 font-medium">
                <span className="text-brand-success">↗ Live</span> Completed
                checkout reservations
              </p>
            </div>

            {/* Metric Box 4: Collective Feedback Feed */}
            <div className="bg-gradient-to-br from-brand-surface/40 to-brand-dark/20 border border-white/5 rounded-2xl p-6 backdrop-blur-md shadow-glass relative overflow-hidden group hover:border-brand-accent/30 transition-all duration-300">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Platform Reviews
                  </h2>
                  <p className="text-3xl sm:text-4xl font-black tracking-tight text-white pt-2">
                    {stats.totalReviews ?? 0}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xl">
                  ⭐
                </div>
              </div>
              <p className="text-[10px] text-brand-muted mt-4 flex items-center gap-1 font-medium">
                <span className="text-brand-success">↗ Live</span> Verified
                traveler experience records
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
