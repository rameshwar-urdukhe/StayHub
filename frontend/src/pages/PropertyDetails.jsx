import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Consolidated identical imports
import API from "../utils/api";

import PropertyInfo from "../components/PropertyInfo";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import BookingForm from "../components/BookingForm";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [property, setProperty] = useState(null);
  const [wishlistStatus, setWishlistStatus] = useState("idle"); // 'idle' | 'saving' | 'saved'

  const addToWishlist = async () => {
    try {
      setWishlistStatus("saving");
      const user = JSON.parse(localStorage.getItem("user"));

      await API.post(
        `/wishlist/${property._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      setWishlistStatus("saved");
      // Resets micro-interaction state after 3 seconds
      setTimeout(() => setWishlistStatus("idle"), 3000);
    } catch (error) {
      console.log(error);
      setWishlistStatus("idle");
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmDelete) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await API.delete(`/properties/${property._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      alert("Property Deleted");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  const fetchProperty = async () => {
    try {
      const res = await API.get(`/properties/${id}`);
      setProperty(res.data.property);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  // Premium Skeleton Loading Screen
  if (!property) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 animate-pulse space-y-8">
        <div className="space-y-3">
          <div className="h-8 bg-slate-800 rounded-xl w-1/3"></div>
          <div className="h-4 bg-slate-800 rounded-lg w-1/4"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-6">
          <div className="lg:col-span-8 space-y-6">
            <div className="aspect-[16/9] bg-slate-800 rounded-3xl"></div>
            <div className="h-24 bg-slate-800 rounded-2xl"></div>
          </div>
          <div className="lg:col-span-4 h-96 bg-slate-800 rounded-3xl"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 relative">
      {/* Toast Notification Micro-interaction */}
      {wishlistStatus === "saved" && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-brand-surface border border-brand-success/30 px-5 py-3 rounded-xl shadow-glass animate-fade-in">
          <span className="text-brand-success text-xl">✨</span>
          <p className="text-sm font-medium text-slate-200">
            Saved to your wishlist!
          </p>
        </div>
      )}

      {/* Dynamic Header Action Panel */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-6 border-b border-white/5">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-brand-muted">
            {property.title}
          </h1>
          <p className="text-sm text-brand-muted mt-1.5 flex items-center gap-1.5">
            <span className="text-brand-accent">📍</span> {property.location}
          </p>
        </div>

        {/* Wishlist Placement Call to Action */}
        <button
          onClick={addToWishlist}
          disabled={wishlistStatus === "saving"}
          className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border font-semibold text-xs uppercase tracking-wider transition-all active:scale-[0.98] self-start sm:self-auto ${
            wishlistStatus === "saved"
              ? "bg-pink-500/10 border-pink-500 text-pink-500 shadow-[0_0_15px_rgba(236,72,153,0.1)]"
              : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-200"
          }`}
        >
          <svg
            className={`w-4 h-4 transition-transform ${wishlistStatus === "saving" ? "animate-pulse" : "group-hover:scale-110"}`}
            fill={wishlistStatus === "saved" ? "currentColor" : "none"}
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          {wishlistStatus === "saving"
            ? "Saving..."
            : wishlistStatus === "saved"
              ? "Saved"
              : "Save Property"}
        </button>
      </div>

      {/* Asymmetric 66% / 33% Master Layout Column Grid Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* LEFT COMPONENT COLUMN (Weight 8/12 - 66%) */}
        <div className="lg:col-span-8 space-y-8">
          {/* Main Media Gallery and Details */}
          <div className="bg-brand-surface/30 border border-white/5 rounded-3xl p-6 backdrop-blur-md shadow-glass">
            <PropertyInfo property={property} handleDelete={handleDelete} />
          </div>

          {/* Social Community & Review System */}
          <div className="bg-brand-surface/20 border border-white/5 rounded-3xl p-6 space-y-8">
            <div className="bg-brand-dark/40 border border-white/5 p-5 rounded-2xl">
              <ReviewForm
                propertyId={property._id}
                refreshProperty={fetchProperty}
              />
            </div>
            <ReviewList reviews={property.reviews} />
          </div>
        </div>

        {/* RIGHT COMPONENT COLUMN (Weight 4/12 - 33%) */}
        <div className="lg:col-span-4 lg:sticky lg:top-28">
          <div className="bg-gradient-to-b from-brand-surface via-brand-surface to-brand-dark p-0.5 border border-white/10 rounded-3xl shadow-glass transition-all duration-300 hover:border-brand-accent/30 hover:shadow-neon-blue">
            <div className="bg-brand-surface rounded-[22px] p-6 space-y-5">
              <div className="flex justify-between items-baseline">
                <span className="text-2xl font-black text-white">
                  ₹{property.price}
                  <span className="text-xs font-normal text-brand-muted">
                    {" "}
                    / night
                  </span>
                </span>
                <div className="flex items-center gap-1 text-sm font-bold text-amber-400 bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
                  ⭐ {property.averageRating || "0.0"}
                </div>
              </div>

              {/* Integrated Checkout Element */}
              <BookingForm propertyId={property._id} />

              <p className="text-center text-[11px] text-brand-muted">
                You won't be charged yet. Complete scheduling information next.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
