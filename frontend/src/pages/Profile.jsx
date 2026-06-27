import { useEffect, useState } from "react";
import API from "../utils/api";

const Profile = () => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true); // Added for professional layout entrance hydration

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setUserData({
        ...res.data,
        password: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.put(
        "/auth/profile",
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      alert(res.data.message);
      setEditing(false);
      fetchProfile();
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-dark text-white max-w-2xl mx-auto p-4 md:p-8 flex items-center justify-center">
        <div className="animate-pulse flex space-x-4 w-full bg-brand-surface/40 border border-white/5 p-8 rounded-3xl shadow-glass">
          <div className="rounded-full bg-slate-800 h-16 w-16"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-4 bg-slate-800 rounded w-3/4"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-4 bg-slate-800 rounded col-span-2"></div>
                <div className="h-4 bg-slate-800 rounded col-span-1"></div>
              </div>
              <div className="h-4 bg-slate-800 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-dark text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto animate-fade-in space-y-8">
        {/* Profile Dynamic Dashboard Section Title Header */}
        <div className="border-b border-white/5 pb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-brand-muted">
            Personal Security Hub
          </h1>
          <p className="text-xs sm:text-sm text-brand-muted mt-1">
            Configure system configurations, profile tracking signatures, and
            active platform parameters.
          </p>
        </div>

        {/* Master Account Data Card Canvas Area */}
        <div className="bg-brand-surface/30 border border-white/5 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-glass relative overflow-hidden">
          {/* Subtle Ambient Accent Mesh Glow Background element */}
          <div className="absolute top-0 right-0 w-[150px] h-[150px] rounded-full bg-brand-accent/5 blur-[40px] pointer-events-none" />

          {editing ? (
            /* ================= EDITING CONDITION VIEWPORT ================= */
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b border-white/5 pb-4 mb-2">
                <div className="w-8 h-8 rounded-lg bg-brand-accent/10 border border-brand-accent/20 flex items-center justify-center text-brand-accent text-sm">
                  📝
                </div>
                <h2 className="text-md font-bold text-slate-200 tracking-wide">
                  Modify Account Record
                </h2>
              </div>

              {/* Name Field Segment */}
              <div className="flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3.5 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                  Legal Full Name
                </label>
                <input
                  type="text"
                  value={userData.name}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      name: e.target.value,
                    })
                  }
                  className="w-full bg-transparent text-sm text-white font-medium outline-none border-none p-0 focus:ring-0"
                />
              </div>

              {/* Email Field Segment */}
              <div className="flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3.5 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                  Electronic Mail Address
                </label>
                <input
                  type="email"
                  value={userData.email}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      email: e.target.value,
                    })
                  }
                  className="w-full bg-transparent text-sm text-white font-medium outline-none border-none p-0 focus:ring-0"
                />
              </div>

              {/* Password Field Segment */}
              <div className="flex flex-col gap-1.5 bg-brand-dark/50 border border-white/10 p-3.5 rounded-xl focus-within:border-brand-accent/40 focus-within:ring-2 focus-within:ring-brand-accent/10 transition-all">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 select-none">
                  New System Password
                </label>
                <input
                  type="password"
                  placeholder="Leave completely empty to preserve active security layers"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      password: e.target.value,
                    })
                  }
                  className="w-full bg-transparent text-sm text-white font-medium placeholder-slate-600 outline-none border-none p-0 focus:ring-0"
                />
              </div>

              {/* Form Save/Cancel Action Controller Block */}
              <div className="flex items-center gap-3 pt-4">
                <button
                  onClick={handleUpdate}
                  className="bg-gradient-to-r from-brand-accent to-brand-highlight text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl hover:opacity-95 active:scale-95 transition-all shadow-neon-blue"
                >
                  Save Profile
                </button>

                <button
                  onClick={() => {
                    setEditing(false);
                    fetchProfile();
                  }}
                  className="bg-white/5 border border-white/10 hover:bg-white/10 text-slate-300 text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all active:scale-95"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            /* ================= STATIC READ-ONLY DISPLAY CONDITION VIEWPORT ================= */
            <div className="space-y-6">
              {/* Premium Header Profile Avatar Card Identity Component Row */}
              <div className="flex items-center gap-4 bg-brand-dark/40 border border-white/5 p-4 rounded-2xl">
                <div className="w-16 h-16 shrink-0 rounded-2xl bg-gradient-to-br from-brand-accent to-brand-highlight flex items-center justify-center text-white font-black text-2xl shadow-lg relative">
                  {userData.name ? userData.name[0].toUpperCase() : "U"}
                  <div
                    className="absolute -bottom-1 -right-1 w-5 h-5 bg-brand-success rounded-full border-4 border-brand-dark flex items-center justify-center"
                    title="Account Active"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-xl font-bold text-white truncate leading-snug">
                    {userData.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-semibold bg-brand-accent/10 border border-brand-accent/20 text-brand-accent capitalize tracking-wide shadow-sm">
                      🛡️ {userData.role} Role Account
                    </span>
                  </div>
                </div>
              </div>

              {/* Structured Metadata Read Deck Stack */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="bg-brand-dark/20 border border-white/5 rounded-xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Account Legal Identifier
                  </p>
                  <p className="text-sm font-semibold text-slate-200 mt-1 truncate">
                    {userData.name || "N/A"}
                  </p>
                </div>

                <div className="bg-brand-dark/20 border border-white/5 rounded-xl p-4">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Primary Contact Endpoint
                  </p>
                  <p className="text-sm font-semibold text-slate-200 mt-1 truncate">
                    {userData.email || "N/A"}
                  </p>
                </div>
              </div>

              {/* Edit Trigger Panel Navigation Control Anchor */}
              <div className="pt-4 border-t border-white/5">
                <button
                  onClick={() => setEditing(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-200 hover:text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xl transition-all active:scale-[0.98]"
                >
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00-2 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                  Modify Information Records
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
