import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Added for high-fidelity skeleton states

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get("/bookings/my-bookings", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this reservation?",
    );
    if (!confirmCancel) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await API.delete(`/bookings/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      alert("Booking Cancelled");
      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10 animate-fade-in">
        {/* Workspace Dynamic Layout Header */}
        <div className="border-b border-white/5 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-brand-muted">
              Your Itineraries
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted">
              Track upcoming reservation windows, manage schedules, and review
              destination paths.
            </p>
          </div>
          <div className="text-xs px-3 py-1.5 rounded-xl bg-brand-surface border border-white/5 font-semibold text-brand-accent self-start sm:self-auto shadow-sm">
            Total Trips:{" "}
            <span className="text-white font-bold">{bookings.length}</span>
          </div>
        </div>

        {/* Conditional Core Layout Engine */}
        {loading ? (
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div
                key={i}
                className="bg-brand-surface/20 border border-white/5 rounded-3xl p-6 h-64 animate-pulse flex flex-col md:flex-row gap-6"
              >
                <div className="w-full md:w-72 bg-slate-800 rounded-2xl shrink-0"></div>
                <div className="flex-1 space-y-4 py-2">
                  <div className="h-6 bg-slate-800 rounded w-1/3"></div>
                  <div className="h-4 bg-slate-800 rounded w-1/4"></div>
                  <div className="h-10 bg-slate-800 rounded w-1/2 mt-4"></div>
                </div>
              </div>
            ))}
          </div>
        ) : bookings.length === 0 ? (
          /* Premium Empty Bookings State */
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-brand-surface/20 border border-white/5 rounded-3xl backdrop-blur-md shadow-glass">
            <div className="w-16 h-16 mx-auto bg-brand-accent/10 border border-brand-accent/20 rounded-2xl flex items-center justify-center text-2xl mb-4">
              🧳
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              No Active Reservations
            </h3>
            <p className="text-sm text-brand-muted max-w-xs mx-auto mb-6 leading-relaxed">
              You haven't locked down any premier getaways yet. Your upcoming
              worldly adventures will stream right here.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-brand-accent to-brand-highlight text-white px-5 py-3 rounded-xl shadow-neon-blue hover:opacity-95 transition-all"
            >
              Explore Destinations
            </Link>
          </div>
        ) : (
          /* Premium Horizon Timeline Stack Layout */
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div
                key={booking._id}
                className="group bg-brand-surface/30 border border-white/5 rounded-3xl overflow-hidden backdrop-blur-md shadow-glass flex flex-col md:flex-row gap-6 p-4 md:p-5 transition-all duration-300 hover:border-white/10"
              >
                {/* Fixed Structural Aspect Frame for Image Cover */}
                <div className="w-full md:w-72 aspect-[4/3] md:aspect-video rounded-2xl overflow-hidden shrink-0 bg-slate-900 relative">
                  <img
                    src={
                      booking.property?.image ||
                      "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                    }
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                  {/* Absolute Badge for Live Operational Tracking Status */}
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brand-success/10 border border-brand-success/30 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-brand-success shadow-md">
                    <span className="w-1.5 h-1.5 bg-brand-success rounded-full animate-pulse" />
                    Confirmed Stay
                  </span>
                </div>

                {/* Content Details Block */}
                <div className="flex-1 flex flex-col justify-between py-1 space-y-4 md:space-y-0">
                  <div className="space-y-2">
                    <div className="space-y-0.5">
                      <Link
                        to={`/properties/${booking.property?._id}`}
                        className="text-lg sm:text-xl font-bold text-white hover:text-brand-accent transition-colors tracking-tight line-clamp-1"
                      >
                        {booking.property?.title}
                      </Link>
                      <p className="text-xs text-brand-muted font-medium flex items-center gap-1">
                        <span>📍</span> {booking.property?.location}
                      </p>
                    </div>

                    {/* Timeline Grid Split Display Card */}
                    <div className="grid grid-cols-2 gap-3 pt-2 max-w-sm">
                      <div className="bg-brand-dark/40 border border-white/5 p-2.5 rounded-xl">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                          Check In
                        </p>
                        <p className="text-xs font-semibold text-slate-200 mt-0.5">
                          {new Date(booking.checkIn).toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                        </p>
                      </div>
                      <div className="bg-brand-dark/40 border border-white/5 p-2.5 rounded-xl">
                        <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
                          Check Out
                        </p>
                        <p className="text-xs font-semibold text-slate-200 mt-0.5">
                          {new Date(booking.checkOut).toLocaleDateString(
                            undefined,
                            { month: "short", day: "numeric", year: "numeric" },
                          )}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Operational Cancellation Desk Button */}
                  <div className="pt-2 md:pt-0 self-start md:self-auto w-full md:w-auto flex justify-end">
                    <button
                      onClick={() => cancelBooking(booking._id)}
                      className="w-full md:w-auto inline-flex items-center justify-center gap-2 bg-red-500/5 border border-red-500/20 hover:bg-red-600 text-red-400 hover:text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all active:scale-95"
                    >
                      <svg
                        className="w-3.5 h-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      Cancel Reservation
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
