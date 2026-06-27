import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../utils/api";

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [isLoading, setIsLoading] = useState(false); // Added for professional layout feedback loop

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      await API.post("/auth/register", formData);
      alert("Registration Successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Registration Failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden flex-grow">
      {/* Premium ambient layout mesh highlights */}
      <div className="absolute top-1/4 right-1/3 w-[250px] h-[250px] rounded-full bg-brand-highlight/5 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-[250px] h-[250px] rounded-full bg-brand-accent/5 blur-[80px] pointer-events-none" />

      {/* Glassmorphic Shell Card Container */}
      <div className="w-full max-w-md bg-brand-surface/40 border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-glass animate-fade-in space-y-6">
        {/* Core Header Typography Stack */}
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            Create Account
          </h2>
          <p className="text-xs text-brand-muted">
            Join StayHub to list premium real estate or reserve luxury stays.
          </p>
        </div>

        {/* Input Form Fields Sheet Wrapper */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Legal Identity Name Field */}
          <div className="flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3.5 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
              Full Name
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-50 select-none">👤</span>
              <input
                type="text"
                name="name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="w-full bg-transparent text-sm text-white placeholder-slate-600 font-medium outline-none border-none p-0 focus:ring-0"
              />
            </div>
          </div>

          {/* Electronic Mailing Address Field */}
          <div className="flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3.5 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
              Email Address
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-50 select-none">✉️</span>
              <input
                type="email"
                name="email"
                required
                placeholder="name@domain.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent text-sm text-white placeholder-slate-600 font-medium outline-none border-none p-0 focus:ring-0"
              />
            </div>
          </div>

          {/* Customized Account Platform Role Selector */}
          <div className="flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3.5 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all relative group">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
              Account Profile Intent
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-50 select-none">🛠️</span>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full bg-transparent text-sm text-white font-medium outline-none border-none p-0 focus:ring-0 cursor-pointer appearance-none relative z-10"
              >
                <option value="user" className="bg-brand-surface text-white">
                  Standard Traveler (Book Stays)
                </option>
                <option value="admin" className="bg-brand-surface text-white">
                  Property Owner / Admin (Host Stays)
                </option>
              </select>
            </div>
            <span className="absolute right-4 bottom-4 text-[10px] text-brand-muted pointer-events-none group-hover:text-white transition-colors">
              ▼
            </span>
          </div>

          {/* Security Passphrase Token Field */}
          <div className="flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3.5 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
              Choose Password
            </label>
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-50 select-none">🔑</span>
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent text-sm text-white placeholder-slate-600 font-medium outline-none border-none p-0 focus:ring-0"
              />
            </div>
          </div>

          {/* Dynamic Registration Trigger Switch */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-brand-accent to-brand-highlight text-white text-xs font-bold uppercase tracking-wider py-4 rounded-xl hover:opacity-95 active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-neon-blue pt-3"
          >
            {isLoading ? (
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
                Staging Profile Portfolio...
              </>
            ) : (
              <>Establish Account Profile</>
            )}
          </button>
        </form>

        {/* Cross-linking Navigation Anchor Panel */}
        <div className="text-center pt-2 border-t border-white/5">
          <p className="text-xs text-brand-muted">
            Already maintain a registered profile registration?{" "}
            <Link
              to="/login"
              className="text-brand-accent font-semibold hover:underline pl-0.5"
            >
              Sign In Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
