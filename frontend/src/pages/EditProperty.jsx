import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Premium UX state tracking

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await API.get(`/properties/${id}`);

        setFormData({
          title: res.data.property.title,
          description: res.data.property.description,
          location: res.data.property.location,
          price: res.data.property.price,
          image: res.data.property.image,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      const user = JSON.parse(localStorage.getItem("user"));

      let imageUrl = formData.image;

      // Upload new image if selected
      if (imageFile) {
        const imageData = new FormData();
        imageData.append("image", imageFile);

        const uploadRes = await API.post("/upload", imageData);
        imageUrl = uploadRes.data.imageUrl;
      }

      await API.put(
        `/properties/${id}`,
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

      alert("Property Updated Successfully");
      navigate(`/properties/${id}`);
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to update property");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-dark text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto animate-fade-in space-y-8">
        {/* Editor Dashboard Title Header */}
        <div className="border-b border-white/5 pb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-brand-muted">
            Edit Asset Listing
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Modify structural information, spatial description narratives,
            pricing parameters, or images.
          </p>
        </div>

        {/* Master Form Layout Grid */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
        >
          {/* LEFT COLUMN: Main Metadata Input Form Fields (Weight 7/12) */}
          <div className="lg:col-span-7 bg-brand-surface/30 border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-glass space-y-5">
            {/* Listing Title Input Block */}
            <div className="flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3.5 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                Property Title Designation
              </label>
              <input
                type="text"
                name="title"
                required
                placeholder="Property Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full bg-transparent text-sm text-white font-medium outline-none border-none p-0 focus:ring-0"
              />
            </div>

            {/* Price & Location Inner Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Geographic Location Input */}
              <div className="flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3.5 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                  Geographic Location
                </label>
                <input
                  type="text"
                  name="location"
                  required
                  placeholder="Location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm text-white font-medium outline-none border-none p-0 focus:ring-0"
                />
              </div>

              {/* Base Price Rate Input */}
              <div className="flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3.5 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                  Price Rate per Night (INR)
                </label>
                <div className="flex items-center gap-1">
                  <span className="text-sm font-semibold text-brand-accent shrink-0 select-none">
                    ₹
                  </span>
                  <input
                    type="number"
                    name="price"
                    required
                    placeholder="Price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full bg-transparent text-sm text-white font-medium outline-none border-none p-0 focus:ring-0"
                  />
                </div>
              </div>
            </div>

            {/* Property Narrative Text Area */}
            <div className="flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3.5 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                Listing Narrative Description
              </label>
              <textarea
                name="description"
                required
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full bg-transparent text-sm text-white font-medium outline-none border-none p-0 focus:ring-0 resize-none leading-relaxed"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Media Control File Desk (Weight 5/12) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            {/* Asset Management Media Container Canvas */}
            <div className="bg-brand-surface/30 border border-white/5 rounded-3xl p-6 backdrop-blur-md shadow-glass space-y-5">
              {/* Conditional Static Image Render Display */}
              {formData.image && (
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                    Current Active Cover Image
                  </span>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-md">
                    <img
                      src={formData.image}
                      alt="Property"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-40 pointer-events-none" />
                  </div>
                </div>
              )}

              {/* Dynamic Drag & Drop File Loader Zone */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                  Replace Asset Media File
                </span>
                <div className="relative border-2 border-dashed border-white/10 hover:border-brand-highlight/40 rounded-2xl p-5 text-center bg-brand-dark/30 transition-colors group cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                  />
                  <div className="space-y-1.5">
                    <div className="text-2xl transition-transform group-hover:-translate-y-0.5 duration-200">
                      {imageFile ? "📸" : "🔄"}
                    </div>
                    {imageFile ? (
                      <div>
                        <p className="text-xs font-semibold text-brand-success">
                          New media replacement staged
                        </p>
                        <p className="text-[11px] text-brand-muted mt-1 font-mono max-w-[200px] mx-auto truncate bg-brand-dark/60 px-2 py-0.5 rounded border border-white/5">
                          {imageFile.name}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs font-medium text-slate-200">
                          Click to swap or update file imagery
                        </p>
                        <p className="text-[10px] text-brand-muted mt-0.5">
                          Overwrites the current marketplace listing cover
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Operational Form Action Dispatch Deck */}
            <div className="bg-brand-surface/20 border border-white/5 rounded-2xl p-4 flex flex-col gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-accent to-brand-highlight text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl hover:opacity-95 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-neon-blue pt-3.5"
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
                    Synchronizing Records...
                  </>
                ) : (
                  <>Push Updates</>
                )}
              </button>

              <button
                type="button"
                onClick={() => navigate(`/properties/${id}`)}
                disabled={isSubmitting}
                className="w-full text-center text-xs font-bold uppercase tracking-wider border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white py-3.5 rounded-xl transition-all active:scale-[0.98] disabled:opacity-30"
              >
                Cancel Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProperty;
