import { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import API from "../utils/api";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [properties, setProperties] = useState([]);
const [filters, setFilters] = useState({
  search: "",
  minPrice: "",
  maxPrice: "",
  sort: "",
});

  useEffect(() => {
    const fetchProperties = async () => {
      try {
       const res = await API.get(
         `/properties?search=${filters.search}&minPrice=${filters.minPrice}&maxPrice=${filters.maxPrice}&sort=${filters.sort}`,
       );
        setProperties(res.data.properties);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperties();
  }, [filters]);

  return (
    <div>
      <SearchBar filters={filters} setFilters={setFilters} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.length === 0 ? (
          <div className="col-span-full text-center py-10">
            <h2 className="text-2xl font-semibold">No Properties Found</h2>

            <p className="text-gray-500">Try different filters.</p>
          </div>
        ) : (
          properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
