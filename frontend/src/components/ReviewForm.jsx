import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const ReviewForm = ({ propertyId, refreshProperty }) => {
  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });

  const [hoverRating, setHoverRating] = useState(0); // Added for interactive star hover effect
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const localStorageUser = localStorage.getItem("user");
    const user = localStorageUser ? JSON.parse(localStorageUser) : null;

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
    <div className="w-full">
      <h3 className="text-lg font-bold text-white tracking-tight mb-1">
        Share your experience
      </h3>
      <p className="text-xs text-brand-muted mb-6">
        Your feedback helps travelers discover exceptional hospitality.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Interactive Premium Star Picker */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Rating
          </label>
          <div className="flex items-center gap-1.5 bg-brand-dark/50 border border-white/5 p-3 rounded-xl w-fit">
            {[1, 2, 3, 4, 5].map((starValue) => {
              const isFilled =
                hoverRating >= starValue ||
                (!hoverRating && reviewData.rating >= starValue);
              return (
                <button
                  key={starValue}
                  type="button"
                  onClick={() =>
                    setReviewData({ ...reviewData, rating: starValue })
                  }
                  onMouseEnter={() => setHoverRating(starValue)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="p-1 text-2xl transition-transform active:scale-95 duration-100 outline-none"
                  title={`Rate ${starValue} Stars`}
                >
                  <span
                    className={`transition-colors duration-150 ${isFilled ? "text-amber-400" : "text-slate-600"}`}
                  >
                    ★
                  </span>
                </button>
              );
            })}
            <span className="text-xs font-bold text-brand-muted px-2 min-w-[50px]">
              {hoverRating || reviewData.rating} / 5
            </span>
          </div>
        </div>

        {/* Premium Dark Textarea Field */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Review Commentary
          </label>
          <textarea
            value={reviewData.comment}
            required
            onChange={(e) =>
              setReviewData({
                ...reviewData,
                comment: e.target.value,
              })
            }
            placeholder="What made your stay memorable? Detail the amenities, location accuracy, or hosting quality..."
            rows={4}
            className="w-full bg-brand-dark/50 border border-white/10 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:border-brand-accent focus:ring-2 focus:ring-brand-accent/20 outline-none transition-all resize-none leading-relaxed"
          />
        </div>

        {/* Tactical Submittal Action Trigger */}
        <button
          type="submit"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-accent to-brand-highlight text-white text-sm font-semibold px-6 py-3 rounded-xl hover:opacity-95 active:scale-[0.98] transition-all shadow-neon-blue"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
          Publish Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
