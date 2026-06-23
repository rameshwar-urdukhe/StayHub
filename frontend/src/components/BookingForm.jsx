import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const BookingForm = ({ propertyId }) => {
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState({
    checkIn: "",
    checkOut: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));

 const handleBooking = async () => {
   try {
     const user = JSON.parse(localStorage.getItem("user"));

     await API.post(
       "/bookings",
       {
         propertyId,
         checkIn: bookingData.checkIn,
         checkOut: bookingData.checkOut,
       },
       {
         headers: {
           Authorization: `Bearer ${user.token}`,
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
   }
 };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Book This Property</h2>

      <input
        type="date"
        value={bookingData.checkIn}
        onChange={(e) =>
          setBookingData({
            ...bookingData,
            checkIn: e.target.value,
          })
        }
        className="w-full border p-3 rounded mb-3"
      />

      <input
        type="date"
        value={bookingData.checkOut}
        onChange={(e) =>
          setBookingData({
            ...bookingData,
            checkOut: e.target.value,
          })
        }
        className="w-full border p-3 rounded mb-4"
      />

      {user ? (
        <button
          onClick={handleBooking}
          className="w-full bg-black text-white py-3 rounded"
        >
          Book Now
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="w-full bg-gray-500 text-white py-3 rounded"
        >
          Login To Book
        </button>
      )}
    </div>
  );
};

export default BookingForm;
