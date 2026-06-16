import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../utils/api";

const AddProperty = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null);

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

      let imageUrl = "";

      // Upload image first
      if (imageFile) {
        const imageData = new FormData();

        imageData.append("image", imageFile);

        const uploadRes = await API.post("/upload", imageData);

        imageUrl = uploadRes.data.imageUrl;
      }

      // Create property
      await API.post(
        "/properties",
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

      alert("Property Added");

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(error.response?.data?.message || "Failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Add Property</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
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

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="
              m-5
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

        <button type="submit" className="bg-black text-white px-5 py-3 rounded">
          Add Property
        </button>
      </form>
    </div>
  );
};

export default AddProperty;
