import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../utils/api";
import PropertyCard from "../components/PropertyCard";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true); // Added for premium skeleton experience

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get("/properties/my-properties", {
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

  return (
    <div className="min-h-screen bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14 space-y-10 animate-fade-in">
        {/* Admin Section Control Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-white/5">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-brand-muted">
              Inventory Portfolio
            </h1>
            <p className="text-xs sm:text-sm text-brand-muted">
              Oversee, update, and manage your active real estate listings
              across StayHub.
            </p>
          </div>

          <div className="flex items-center gap-3 self-start sm:self-auto">
            {/* Contextual Metric Token Counter */}
            <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-xs font-semibold text-slate-300">
              Active Listings:{" "}
              <span className="text-brand-accent ml-1 font-bold">
                {properties.length}
              </span>
            </div>

            <Link
              to="/add-property"
              className="bg-gradient-to-r from-brand-accent to-brand-highlight text-white text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl hover:opacity-90 active:scale-95 transition-all shadow-neon-blue"
            >
              + Create Listing
            </Link>
          </div>
        </div>

        {/* Conditional Layout Processing System Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-[4/3] bg-slate-800 rounded-2xl w-full"></div>
                <div className="h-5 bg-slate-800 rounded-lg w-2/3"></div>
                <div className="h-4 bg-slate-800 rounded-lg w-1/2"></div>
              </div>
            ))}
          </div>
        ) : properties.length === 0 ? (
          /* Premium Empty Inventory Presentation */
          <div className="max-w-md mx-auto text-center py-16 px-6 bg-brand-surface/20 border border-white/5 rounded-3xl backdrop-blur-md shadow-glass">
            <div className="w-16 h-16 mx-auto bg-brand-accent/10 border border-brand-accent/20 rounded-2xl flex items-center justify-center text-2xl mb-4">
              🏢
            </div>
            <h3 className="text-lg font-bold text-white mb-2">
              No Properties Listed Yet
            </h3>
            <p className="text-sm text-brand-muted max-w-xs mx-auto mb-6 leading-relaxed">
              You haven't initialized any property assets on our infrastructure
              pool. Start monetization now.
            </p>
            <Link
              to="/add-property"
              className="inline-flex items-center justify-center text-xs font-bold uppercase tracking-wider bg-white/5 border border-white/10 hover:bg-white/10 text-white px-5 py-3 rounded-xl transition-colors"
            >
              Launch First Property
            </Link>
          </div>
        ) : (
          /* Re-allocated Symmetrical Grid Configuration */
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProperties;
