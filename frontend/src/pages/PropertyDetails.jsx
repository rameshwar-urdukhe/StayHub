import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";


import API from "../utils/api";

import PropertyInfo from "../components/PropertyInfo";
import ReviewForm from "../components/ReviewForm";
import ReviewList from "../components/ReviewList";
import BookingForm from "../components/BookingForm";


const PropertyDetails = () => {
  const { id } = useParams();

  const [property, setProperty] = useState(null);
  const navigate = useNavigate();

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this property?",
    );

    if (!confirmDelete) return;

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await API.delete(`/properties/${property._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      alert("Property Deleted");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Delete Failed");
    }
  };
  

  const fetchProperty = async () => {
    try {
      const res = await API.get(`/properties/${id}`);

      setProperty(res.data.property);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProperty();
  }, [id]);

  if (!property) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <PropertyInfo property={property} handleDelete={handleDelete} />
      <BookingForm propertyId={property._id} />
      <ReviewForm propertyId={property._id} refreshProperty={fetchProperty} />
      <ReviewList reviews={property.reviews} />
    </div>
  );
};

export default PropertyDetails;
