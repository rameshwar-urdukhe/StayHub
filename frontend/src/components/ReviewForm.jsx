import { useState } from "react";
import {useNavigate} from 'react-router-dom'
import API from "../utils/api";

const ReviewForm = ({ propertyId, refreshProperty }) => {
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });

const navigate = useNavigate();

 const handleSubmit = async (e) => {
   e.preventDefault();

   const user = JSON.parse(localStorage.getItem("user"));

   if (!user) {
     navigate("/login");
     return;
   }

   try {
     await API.post(`/reviews/${propertyId}`, reviewData, {
       headers: {
         Authorization: `Bearer ${user.token}`,
       },
     });

     refreshProperty();

     setReviewData({
       rating: 5,
       comment: "",
     });
   } catch (error) {
     console.log(error);
   }
 };

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold mb-4">Leave a Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="rating"
          value={reviewData.rating}
          onChange={(e) =>
            setReviewData({
              ...reviewData,
              rating: e.target.value,
            })
          }
          className="border p-3 rounded w-full"
        >
          <option value="1">⭐ 1</option>
          <option value="2">⭐⭐ 2</option>
          <option value="3">⭐⭐⭐ 3</option>
          <option value="4">⭐⭐⭐⭐ 4</option>
          <option value="5">⭐⭐⭐⭐⭐ 5</option>
        </select>

        <textarea
          value={reviewData.comment}
          onChange={(e) =>
            setReviewData({
              ...reviewData,
              comment: e.target.value,
            })
          }
          className="border p-3 rounded w-full"
        />

        <button type="submit" className="bg-black text-white px-5 py-3 rounded">
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
