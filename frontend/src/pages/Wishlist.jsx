import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import PropertyCard from "../components/PropertyCard";

const Wishlist = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // Added for high-end layout skeleton state

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setProperties(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeWishlist = async (propertyId, e) => {
    // Intercept clicks to prevent event bubbling from triggering card layout links
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await API.delete(`/wishlist/${propertyId}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      fetchWishlist();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10 animate-fade-in">
        {/* Wishlist Header Control Desk */}
        <div className="border-b border-white/5 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-brand-muted">
              Saved Collection
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted">
              Your curated portfolio of premier accommodations, luxury escapes,
              and custom stays.
            </p>
          </div>
          <div className="text-xs px-3 py-1.5 rounded-xl bg-brand-surface border border-white/5 font-semibold text-brand-highlight self-start sm:self-auto shadow-sm">
            Saved Items:{" "}
            <span className="text-white font-bold">{properties.length}</span>
          </div>
        </div>

        {/* Dynamic Conditional Render Engine */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[4/3] bg-slate-800 rounded-2xl w-full"></div>
                <div className="h-5 bg-slate-800 rounded-lg w-2/3"></div>
                <div className="h-4 bg-slate-800 rounded-lg w-1/2"></div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          /* Premium Empty Wishlist State Component */
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-brand-surface/20 border border-white/5 rounded-3xl backdrop-blur-md shadow-glass">
            <div className="w-16 h-16 mx-auto bg-brand-accent/10 border border-brand-accent/20 rounded-2xl flex items-center justify-center text-2xl mb-4">
              ❤️
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              Your Wishlist is Empty
            </h3>
            <p className="text-sm text-brand-muted max-w-xs mx-auto mb-6 leading-relaxed">
              When exploring accommodations, tap the save button to organize
              your favorite dream properties right here.
            </p>
            <Link
              to="/"
              className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-brand-accent to-brand-highlight text-white px-5 py-3 rounded-xl shadow-neon-blue hover:opacity-95 transition-all"
            >
              Start Exploring
            </Link>
          </div>
        ) : (
          /* Optimized 4-Column Grid Structure with Floating Actions */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <div key={property._id} className="relative group/wishlist">
                {/* Standardized Core Property Card Item */}
                <PropertyCard property={property} />

                {/* Floating Absolute Action Overlay Trigger */}
                <button
                  onClick={(e) => removeWishlist(property._id, e)}
                  className="absolute top-3 right-3 p-2 rounded-xl bg-red-500/10 border border-red-500/30 backdrop-blur-md text-red-400 hover:bg-red-500 hover:text-white transition-all duration-200 z-30 shadow-md opacity-150 md:opacity-0 md:group-hover/wishlist:opacity-100"
                  title="Remove from Wishlist"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 4.293z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
