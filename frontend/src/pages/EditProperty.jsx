import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../utils/api";

const EditProperty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    image: "",
  });

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await API.get(`/properties/${id}`);

        setFormData({
          title: res.data.property.title,
          description: res.data.property.description,
          location: res.data.property.location,
          price: res.data.property.price,
          image: res.data.property.image,
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchProperty();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      let imageUrl = formData.image;

      // Upload new image if selected
      if (imageFile) {
        const imageData = new FormData();

        imageData.append("image", imageFile);

        const uploadRes = await API.post("/upload", imageData);

        imageUrl = uploadRes.data.imageUrl;
      }

      await API.put(
        `/properties/${id}`,
        {
          ...formData,
          image: imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      alert("Property Updated Successfully");

      navigate(`/properties/${id}`);
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed to update property");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Property</h1>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="text"
          name="title"
          placeholder="Property Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
          rows="4"
        />

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        {/* Current Image */}
        {formData.image && (
          <div>
            <p className="font-medium mb-2">Current Image</p>

            <img
              src={formData.image}
              alt="Property"
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
        )}

        {/* Upload New Image */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-5">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
            className="
              w-full
              cursor-pointer
              file:mr-4
              file:py-2
              file:px-4
              file:rounded-md
              file:border-0
              file:bg-black
              file:text-white
            "
          />

          {imageFile && (
            <p className="mt-3 text-green-600">Selected: {imageFile.name}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-black text-white py-3 rounded hover:bg-gray-800"
        >
          Update Property
        </button>
      </form>
    </div>
  );
};

export default EditProperty;
