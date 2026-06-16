import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import API from "../utils/api";

const Home = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await API.get("/properties");

        setProperties(res.data.properties);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {properties.map((property) => (
        <PropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
};

export default Home;
