import { useEffect, useState } from "react";
import API from "../utils/api";
import PropertyCard from "../components/PropertyCard";

const MyProperties = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get("/properties/my-properties", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setProperties(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Properties</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property._id} property={property} />
        ))}
      </div>
    </div>
  );
};

export default MyProperties;
