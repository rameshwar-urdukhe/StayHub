import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-black text-white px-8 py-4 flex justify-between items-center">
      <Link to="/" className="text-2xl font-bold">
        StayHub
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/">Home</Link>

        {user ? (
          <>
            <p>Welcome, {user.user.name}</p>

            {/* Only Admin Can See Add Property */}
            {user.user.role === "admin" && (
              <Link
                to="/add-property"
                className="bg-green-600 px-4 py-2 rounded"
              >
                Add Property
              </Link>
            )}

            {user?.user?.role === "admin" && (
              <Link to="/my-properties">My Properties</Link>
            )}

            <Link to="/my-bookings">My Bookings</Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>

            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
