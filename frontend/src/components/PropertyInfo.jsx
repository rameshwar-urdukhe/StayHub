import { Link } from "react-router-dom";

const PropertyInfo = ({ property, handleDelete }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const isOwner = user?.user?._id === property?.owner?._id;

  return (
    <div>
      <img
        src={property.image}
        alt={property.title}
        className="w-full h-[500px] object-cover rounded-lg"
      />

      <h1 className="text-4xl font-bold mt-5">{property.title}</h1>

      <p className="text-xl mt-2">📍 {property.location}</p>

      <p className="text-2xl font-bold mt-2">₹ {property.price}</p>

      <p className="mt-4 text-gray-700">{property.description}</p>

      <p className="mt-3 text-lg">⭐ {property.averageRating || 0}</p>

      {property.owner && (
        <p className="mt-2 text-gray-600">Hosted by: {property.owner.name}</p>
      )}

      {isOwner && (
        <div className="flex gap-3 mt-6">
          <Link
            to={`/edit-property/${property._id}`}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Property
          </Link>

          <button
            onClick={handleDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Delete Property
          </button>
        </div>
      )}
    </div>
  );
};

export default PropertyInfo;
