import { useEffect, useState } from "react";
import API from "../utils/api";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get("/bookings/my-bookings", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setBookings(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (id) => {
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
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {bookings.map((booking) => (
          <div key={booking._id} className="border rounded-lg p-4 shadow">
            <img
              src={booking.property.image}
              alt=""
              className="h-48 w-full object-cover rounded"
            />

            <h2 className="text-xl font-semibold mt-3">
              {booking.property.title}
            </h2>

            <p>{booking.property.location}</p>

            <p>Check In: {new Date(booking.checkIn).toLocaleDateString()}</p>

            <p>Check Out: {new Date(booking.checkOut).toLocaleDateString()}</p>
            <button
              onClick={() => cancelBooking(booking._id)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
            >
              Cancel Booking
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBookings;
