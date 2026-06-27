import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const AddProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added for premium loading tracking

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      const user = JSON.parse(localStorage.getItem("user"));

      let imageUrl = "";

      // Upload image first
      if (imageFile) {
        const imageData = new FormData();
        imageData.append("image", imageFile);

        const uploadRes = await API.post("/upload", imageData);
        imageUrl = uploadRes.data.imageUrl;
      }

      // Create property
      await API.post(
        "/properties",
        {
          ...formData,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      alert("Property Added");
      navigate("/");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto animate-fade-in space-y-8">
        {/* Creation Header Desk */}
        <div className="border-b border-white/5 pb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-brand-muted">
            List New Asset
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Deploy a premium residential, urban, or coastal listing out to the
            global StayHub marketplace network.
          </p>
        </div>

        {/* Master Glass Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-brand-surface/30 border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-glass space-y-6 relative"
        >
          {/* Form Section: Listing Imagery */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
              Showcase Media Cover Image
            </label>

            {/* Redesigned Drag & Drop Area Mock Layout */}
            <div className="relative border-2 border-dashed border-white/10 hover:border-brand-accent/40 rounded-2xl p-6 text-center bg-brand-dark/30 transition-colors group cursor-pointer">
              <input
                type="file"
                id="listing-image-upload"
                accept="image/*"
                required
                onChange={(e) => setImageFile(e.target.files[0])}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <div className="space-y-2">
                <div className="text-3xl transition-transform group-hover:-translate-y-0.5 duration-200">
                  {imageFile ? "📸" : "📤"}
                </div>
                {imageFile ? (
                  <div>
                    <p className="text-sm font-semibold text-brand-success">
                      File staged successfully
                    </p>
                    <p className="text-xs text-brand-muted mt-1 font-mono max-w-xs mx-auto truncate bg-brand-dark/60 px-3 py-1 rounded-md border border-white/5">
                      {imageFile.name}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-sm font-medium text-slate-200">
                      Click to choose or drag property photo here
                    </p>
                    <p className="text-xs text-brand-muted mt-1">
                      Supports high-resolution PNG, JPG, or WEBP formats up to
                      10MB
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Section: Title Text Block */}
          <div className="flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3.5 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
              Listing Title Designation
            </label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g., High-Floor Penthouse Suite with Panoramic Ocean Horizons"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-transparent text-sm text-white placeholder-slate-600 font-medium outline-none border-none p-0 focus:ring-0"
            />
          </div>

          {/* Grid Layout Split for Price and Location Coordinates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Location Input */}
            <div className="flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3.5 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                Geographic Location
              </label>
              <input
                type="text"
                name="location"
                required
                placeholder="e.g., Malibu, California"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-transparent text-sm text-white placeholder-slate-600 font-medium outline-none border-none p-0 focus:ring-0"
              />
            </div>

            {/* Price Per Night Input */}
            <div className="flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3.5 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                Base Price Rate per Night (INR)
              </label>
              <div className="flex items-center gap-1">
                <span className="text-sm font-semibold text-brand-accent shrink-0 select-none">
                  ₹
                </span>
                <input
                  type="number"
                  name="price"
                  required
                  placeholder="e.g., 12500"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm text-white placeholder-slate-600 font-medium outline-none border-none p-0 focus:ring-0"
                />
              </div>
            </div>
          </div>

          {/* Form Section: Narrative Description Area */}
          <div className="flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3.5 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
              Editorial Property Narrative Description
            </label>
            <textarea
              name="description"
              required
              rows={5}
              placeholder="Detail the spatial architecture, surrounding environment, dedicated guest access parameters, and premium room configurations..."
              value={formData.description}
              onChange={handleChange}
              className="w-full bg-transparent text-sm text-white placeholder-slate-600 font-medium outline-none border-none p-0 focus:ring-0 resize-none leading-relaxed"
            />
          </div>

          {/* Form Action Submit Controller Panel Deck */}
          <div className="pt-4 border-t border-white/5 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto min-w-[180px] inline-flex items-center justify-center gap-2 bg-gradient-to-r from-brand-accent to-brand-highlight text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl hover:opacity-95 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-neon-blue"
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
                  Uploading Assets...
                </>
              ) : (
                <>🚀 Initialize Listing</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProperty;
