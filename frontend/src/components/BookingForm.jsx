import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const BookingForm = ({ propertyId }) => {
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false); // Added for premium UX state handling

  const localStorageUser = localStorage.getItem("user");
  const user = localStorageUser ? JSON.parse(localStorageUser) : null;

  const handleBooking = async () => {
    if (!bookingData.checkIn || !bookingData.checkOut) {
      alert("Please select both Check-In and Check-Out dates.");
      return;
    }

    try {
      setIsSubmitting(true);
      const currentUser = JSON.parse(localStorage.getItem("user"));

      await API.post(
        "/bookings",
        {
          propertyId,
          checkIn: bookingData.checkIn,
          checkOut: bookingData.checkOut,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`,
          },
        },
      );

      alert("Booking Successful");

      setBookingData({
        checkIn: "",
        checkOut: "",
      });
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Booking Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full space-y-5">
      <div className="space-y-1">
        <h3 className="text-base font-bold text-white tracking-tight">
          Select Booking Window
        </h3>
        <p className="text-xs text-brand-muted">
          Ensure your desired availability frame is open before checkout.
        </p>
      </div>

      {/* Styled Stacked Calendar Matrix Wrapper */}
      <div className="space-y-3">
        {/* Check-In Input Field */}
        <div className="relative flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
            Check-In Date
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-60">📅</span>
            <input
              type="date"
              value={bookingData.checkIn}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  checkIn: e.target.value,
                })
              }
              className="w-full bg-transparent text-sm text-white font-medium outline-none border-none p-0 focus:ring-0 cursor-pointer scheme-dark"
            />
          </div>
        </div>

        {/* Check-Out Input Field */}
        <div className="relative flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
            Check-Out Date
          </label>
          <div className="flex items-center gap-2">
            <span className="text-sm opacity-60">📅</span>
            <input
              type="date"
              value={bookingData.checkOut}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  checkOut: e.target.value,
                })
              }
              className="w-full bg-transparent text-sm text-white font-medium outline-none border-none p-0 focus:ring-0 cursor-pointer scheme-dark"
            />
          </div>
        </div>
      </div>

      {/* Conditional Primary Action Deck Wrapper */}
      <div className="pt-2">
        {user ? (
          <button
            onClick={handleBooking}
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-accent to-brand-highlight text-white text-sm font-semibold py-3.5 rounded-xl hover:opacity-95 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-neon-blue"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Processing Booking...
              </>
            ) : (
              <>⚡ Instant Confirmation</>
            )}
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-200 text-sm font-semibold py-3.5 rounded-xl active:scale-[0.99] transition-all"
          >
            🔑 Login To Reserve Stay
          </button>
        )}
      </div>
    </div>
  );
};

export default BookingForm;
