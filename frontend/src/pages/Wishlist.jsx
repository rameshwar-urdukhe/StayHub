import { useEffect, useState } from "react";
import API from "../utils/api";
import PropertyCard from "../components/PropertyCard";

const Wishlist = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get("/wishlist", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setProperties(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const removeWishlist = async (
  propertyId
) => {
  try {

    const user = JSON.parse(
      localStorage.getItem("user")
    );

    await API.delete(
      `/wishlist/${propertyId}`,
      {
        headers: {
          Authorization:
            `Bearer ${user.token}`,
        },
      }
    );

    fetchWishlist();

  } catch (error) {

    console.log(error);
  }
};

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">❤️ My Wishlist</h1>

      {properties.length === 0 ? (
        <div className="text-center py-10">
          <h2 className="text-2xl font-semibold">No Saved Properties</h2>

          <p className="text-gray-500 mt-2">
            Save properties to view them here.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div key={property._id}>
              <PropertyCard property={property} />

              <button
                onClick={() => removeWishlist(property._id)}
                className="mt-2 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg"
              >
                Remove from Wishlist
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
