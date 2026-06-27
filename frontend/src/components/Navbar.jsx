import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false); // Mobile drawer state
  const [dropdownOpen, setDropdownOpen] = useState(false); // Desktop profile dropdown state
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Dynamic Scroll Tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    setDropdownOpen(false);
    logout();
    navigate("/login");
  };

  const getLinkClass = (path) => {
    const isActive = location.pathname === path;
    return `relative text-sm font-semibold transition-all duration-300 py-1.5 px-1 rounded-lg hover:text-white group flex items-center gap-1 ${
      isActive ? "text-brand-accent" : "text-brand-muted"
    }`;
  };

  const activeUnderline = (path) => {
    const isActive = location.pathname === path;
    return (
      <span
        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-brand-accent to-brand-highlight shadow-neon-blue rounded-full transition-all duration-300 ${
          isActive
            ? "w-full opacity-100"
            : "w-0 opacity-0 group-hover:w-full group-hover:opacity-50"
        }`}
      />
    );
  };

  return (
    <nav
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "bg-brand-dark/70 backdrop-blur-xl border-b border-white/5 shadow-glass py-3"
          : "bg-brand-dark border-b border-white/5 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Wing: Brand Identity Logo */}
          <Link to="/" className="flex items-center gap-2 group relative z-10">
            <span className="text-2xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-brand-accent bg-clip-text text-transparent transition-transform duration-300 group-hover:scale-[1.02] active:scale-[0.98]">
              Stay
              <span className="text-brand-accent transition-colors duration-300 group-hover:text-brand-highlight">
                Hub
              </span>
            </span>
          </Link>

          {/* Center/Right Wing: Desktop Navigation Links */}
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/" className={getLinkClass("/")}>
              Home
              {activeUnderline("/")}
            </Link>

            {user ? (
              <>
                <Link
                  to="/my-bookings"
                  className={getLinkClass("/my-bookings")}
                >
                  My Bookings
                  {activeUnderline("/my-bookings")}
                </Link>

                <Link to="/wishlist" className={getLinkClass("/wishlist")}>
                  Wishlist
                  {activeUnderline("/wishlist")}
                </Link>

                {/* Conditional Administrative Suite Links */}
                {user?.user?.role === "admin" && (
                  <>
                    <Link
                      to="/my-properties"
                      className={getLinkClass("/my-properties")}
                    >
                      My Properties
                      {activeUnderline("/my-properties")}
                    </Link>
                    <Link
                      to="/admin-dashboard"
                      className={getLinkClass("/admin-dashboard")}
                    >
                      Dashboard
                      {activeUnderline("/admin-dashboard")}
                    </Link>
                    <Link
                      to="/add-property"
                      className="bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:border-brand-accent/40 text-xs font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition-all duration-300 hover:shadow-neon-blue hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                    >
                      + Add Property
                    </Link>
                  </>
                )}

                {/* Interactive Premium User Profile Dropdown Component Container */}
                <div
                  className="relative pl-4 border-l border-white/10"
                  ref={dropdownRef}
                >
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="flex items-center gap-2.5 p-1.5 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all duration-300 focus:outline-none group active:scale-[0.98]"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-accent to-brand-highlight flex items-center justify-center text-white font-black text-sm shadow-md transition-transform duration-300 group-hover:rotate-6">
                      {user.user.name[0].toUpperCase()}
                    </div>
                    <span className="text-sm font-semibold text-slate-300 group-hover:text-white transition-colors max-w-[90px] truncate select-none">
                      {user.user.name.split(" ")[0]}
                    </span>
                    <span
                      className={`text-[10px] text-brand-muted transition-transform duration-300 ${dropdownOpen ? "rotate-180" : ""}`}
                    >
                      ▼
                    </span>
                  </button>

                  {/* Dropdown Menu Overlay Card */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2.5 w-48 bg-brand-surface border border-white/15 rounded-2xl p-2 shadow-glass backdrop-blur-2xl animate-fade-in origin-top-right scale-100 transition-all">
                      <div className="px-3 py-2 border-b border-white/5 mb-1">
                        <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">
                          Account Access
                        </p>
                        <p className="text-xs font-semibold text-white truncate mt-0.5">
                          {user.user.email}
                        </p>
                      </div>
                      <Link
                        to="/profile"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
                      >
                        👤 View Profile Hub
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:text-white hover:bg-red-500/10 transition-colors mt-1 border-t border-white/5 pt-2"
                      >
                        🚪 Logout System
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Unauthenticated Session State Interface Action Links */
              <div className="flex items-center gap-4">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-brand-muted hover:text-white transition-colors px-2 py-1.5"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-brand-accent to-brand-highlight text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all duration-300 hover:shadow-neon-blue hover:-translate-y-0.5 active:translate-y-0 active:scale-95"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Hamburger Expansion Toggle Trigger Control Card */}
          <div className="md:hidden flex items-center relative z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-brand-muted hover:text-white focus:outline-none p-2 rounded-xl bg-white/5 border border-white/5 transition-colors"
            >
              <svg
                className="w-6 h-6 transform transition-transform duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Responsive Mobile Drawer Slide Panel Layout Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-brand-dark/95 border-b border-white/15 backdrop-blur-2xl p-4 space-y-2.5 animate-fade-in shadow-2xl">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="block px-4 py-2.5 text-sm font-semibold rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition-all"
          >
            🏠 Home Explorer
          </Link>

          {user ? (
            <>
              <Link
                to="/my-bookings"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition-all"
              >
                🧳 My Bookings
              </Link>
              <Link
                to="/wishlist"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 text-sm font-semibold rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition-all"
              >
                ❤️ Wishlist Collection
              </Link>

              {user?.user?.role === "admin" && (
                <>
                  <Link
                    to="/my-properties"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2.5 text-sm font-semibold rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                  >
                    🏢 My Managed Properties
                  </Link>
                  <Link
                    to="/admin-dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-2.5 text-sm font-semibold rounded-xl text-slate-300 hover:bg-white/5 hover:text-white transition-all"
                  >
                    📊 Admin Analytics Dashboard
                  </Link>
                  <Link
                    to="/add-property"
                    onClick={() => setIsOpen(false)}
                    className="block mx-2 bg-gradient-to-r from-brand-accent to-brand-highlight text-white text-center py-3 rounded-xl text-xs font-bold uppercase tracking-wider mt-2 shadow-neon-blue"
                  >
                    + Add New Property Listing
                  </Link>
                </>
              )}

              {/* Mobile Identity Signature Profiling Card */}
              <div className="pt-4 border-t border-white/5 mt-4 px-2 flex items-center justify-between">
                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 group"
                >
                  <div className="w-9 h-9 rounded-xl bg-brand-accent flex items-center justify-center text-white font-black shadow-md">
                    {user.user.name[0].toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">
                      {user.user.name}
                    </p>
                    <p className="text-[10px] text-brand-muted font-medium">
                      Profile Settings
                    </p>
                  </div>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-500/10 border border-red-500/30 text-red-400 hover:bg-red-500 hover:text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className="text-center py-3 rounded-xl text-xs font-bold uppercase tracking-wider border border-white/10 text-white hover:bg-white/5"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={() => setIsOpen(false)}
                className="text-center py-3 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-brand-accent to-brand-highlight text-white shadow-neon-blue"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
