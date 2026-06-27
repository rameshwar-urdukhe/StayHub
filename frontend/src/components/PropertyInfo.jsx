import { Link } from "react-router-dom";

const PropertyInfo = ({ property, handleDelete }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isOwner = user?.user?._id === property?.owner?._id;

  return (
    <div className="space-y-8">
      {/* Immersive Cinematic Image Container */}
      <div className="relative group w-full h-[320px] sm:h-[450px] md:h-[520px] overflow-hidden rounded-3xl border border-white/10 shadow-glass bg-slate-900">
        <img
          src={
            property.image ||
            "https://images.unsplash.com/photo-1566073771259-6a8506099945"
          }
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
          loading="eager"
        />

        {/* Ambient Bottom Vignette / Overlay Layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent opacity-90 pointer-events-none" />

        {/* Dynamic Inner Badging over Media */}
        <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 z-10">
          <div className="px-4 py-2 rounded-xl bg-brand-dark/60 backdrop-blur-md border border-white/10 shadow-md">
            <span className="text-sm font-semibold text-brand-muted">
              Base Rate
            </span>
            <div className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              ₹ {property.price}
              <span className="text-xs sm:text-sm font-normal text-brand-muted">
                {" "}
                / night
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400/10 backdrop-blur-md border border-amber-400/30 text-amber-400 font-bold text-sm sm:text-base shadow-md">
            ⭐ {property.averageRating || "0.0"}
          </div>
        </div>
      </div>

      {/* Primary Listing Details Section */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {property.title}
          </h1>
          <p className="text-base sm:text-lg text-brand-muted font-medium mt-2 flex items-center gap-1.5">
            <span className="text-brand-accent">📍</span> {property.location}
          </p>
        </div>

        {/* Premium Host Profile Sign-off Card */}
        {property.owner && (
          <div className="inline-flex items-center gap-3 bg-white/5 border border-white/5 px-4 py-2.5 rounded-2xl">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-brand-accent to-brand-highlight flex items-center justify-center text-white font-black text-sm shadow-md">
              {property.owner.name[0].toUpperCase()}
            </div>
            <div>
              <p className="text-xs text-brand-muted font-medium">
                Professional Host
              </p>
              <p className="text-sm font-semibold text-slate-200">
                Stay managed by {property.owner.name}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Structural Divider */}
      <hr className="border-white/5" />

      {/* Architectural Narrative/Description Block */}
      <div className="space-y-3">
        <h3 className="text-lg font-bold tracking-tight text-white">
          About this luxury space
        </h3>
        <p className="text-brand-muted text-sm sm:text-base leading-relaxed tracking-wide whitespace-pre-line max-w-none">
          {property.description ||
            "No editorial description available for this premier listing configuration."}
        </p>
      </div>

      {/* Owner Control Dashboard Actions Area */}
      {isOwner && (
        <div className="pt-4 border-t border-white/5">
          <div className="bg-brand-highlight/5 border border-brand-highlight/20 p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h4 className="text-sm font-bold text-white">
                Administrative Actions
              </h4>
              <p className="text-xs text-brand-muted mt-0.5">
                As the verified owner, you hold operational modification
                authority.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={`/edit-property/${property._id}`}
                className="w-full sm:w-auto text-center bg-brand-surface border border-white/10 hover:border-brand-accent/40 text-slate-200 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-[0.98] shadow-sm"
              >
                🛠️ Edit Listing
              </Link>

              <button
                onClick={handleDelete}
                className="w-full sm:w-auto bg-red-500/10 border border-red-500/30 hover:bg-red-600 hover:border-red-600 text-red-400 hover:text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all active:scale-[0.98] shadow-sm"
              >
                🗑️ Remove Property
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyInfo;
