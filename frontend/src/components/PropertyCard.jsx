import { Link, useNavigate } from "react-router-dom";


const PropertyCard = ({ property }) => {

  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Delete this property?");

    if (!confirmDelete) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await API.delete(`/properties/${property._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      alert("Deleted");

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <img
        src={
          property.image ||
          "https://images.unsplash.com/photo-1566073771259-6a8506099945"
        }
        alt={property.title}
        className="w-full h-52 object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold">{property.title}</h2>

        <p className="text-gray-600">📍 {property.location}</p>

        <p className="font-bold mt-2">₹ {property.price} / night</p>
        <Link
          to={`/properties/${property._id}`}
          className="inline-block mt-3 bg-black text-white px-4 py-2 rounded"
        >
          View Details
        </Link>
       
      </div>
    </div>
  );
};

export default PropertyCard;
