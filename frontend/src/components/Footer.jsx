import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold">StayHub</h2>

            <p className="text-gray-400 mt-2">
              Find your perfect stay anywhere in the world.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>

            <div className="flex flex-col gap-2">
              <Link to="/">Home</Link>

              <Link to="/wishlist">Wishlist</Link>

              <Link to="/my-bookings">My Bookings</Link>

              <Link to="/profile">Profile</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Contact</h3>

            <p>Email: support@stayhub.com</p>

            <p>Phone: +91 9876543210</p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-400">
          © {new Date().getFullYear()} StayHub. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
