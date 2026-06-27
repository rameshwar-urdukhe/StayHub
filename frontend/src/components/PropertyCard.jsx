import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api"; // Added missing import to prevent runtime crashes

const PropertyCard = ({ property }) => {
  const navigate = useNavigate();

  // Safeguard user check for admin badge context layers safely
  const localStorageUser = localStorage.getItem("user");
  const parsedUser = localStorageUser ? JSON.parse(localStorageUser) : null;
  const isAdmin = parsedUser?.user?.role === "admin";

  const handleDelete = async (e) => {
    // Prevent the click event from bubbling up and triggering the card navigation link
    e.preventDefault();
    e.stopPropagation();

    const confirmDelete = window.confirm("Delete this property?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/properties/${property._id}`, {
        headers: {
          Authorization: `Bearer ${parsedUser.token}`,
        },
      });

      alert("Deleted");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link
      to={`/properties/${property._id}`}
      className="group block bg-brand-surface/30 border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-brand-accent/30 hover:shadow-neon-blue backdrop-blur-md"
    >
      {/* Aspect Ratio Container for Media Asset */}
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-900">
        <img
          src={
            property.image ||
            "https://images.unsplash.com/photo-1566073771259-6a8506099945"
          }
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Floating Badges & Action Layers */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-brand-dark/60 backdrop-blur-md border border-white/10 text-xs font-semibold text-amber-400 shadow-md">
            ⭐ {property.rating || "New"}
          </div>
        </div>

        {/* Admin Access Panel Layer */}
        {/* Only show the delete button if the logged-in user is an admin AND they are the actual owner of this property */}
        {isAdmin && parsedUser?.user?._id === property?.owner?._id && (
          <button
            onClick={handleDelete}
            className="absolute top-3 right-3 p-2 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-md text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 z-20 shadow-md"
            title="Delete Listing"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        )}

        {/* Subtle Bottom Ambient Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-60 pointer-events-none" />
      </div>

      {/* Info Body Details Area */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="text-base font-bold text-white tracking-tight group-hover:text-brand-accent transition-colors truncate">
            {property.title}
          </h3>
          <p className="text-xs text-brand-muted flex items-center gap-1 font-medium truncate">
            <span>📍</span> {property.location}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-white/5">
          <span className="text-lg font-extrabold text-white">
            ₹{property.price}
            <span className="text-xs font-normal text-brand-muted">
              {" "}
              / night
            </span>
          </span>

          <div className="text-xs font-semibold text-brand-accent flex items-center gap-1 group-hover:translate-x-1 transition-transform">
            View Details <span>→</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;
