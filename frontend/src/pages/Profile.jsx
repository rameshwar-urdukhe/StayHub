import { useEffect, useState } from "react";
import API from "../utils/api";

const Profile = () => {
  const [editing, setEditing] = useState(false);

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.get("/auth/profile", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      setUserData({
        ...res.data,
        password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await API.put(
        "/auth/profile",
        {
          name: userData.name,
          email: userData.email,
          password: userData.password,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      );

      alert(res.data.message);

      setEditing(false);

      fetchProfile();
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white shadow-lg rounded-xl p-6">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        {editing ? (
          <>
            <div className="mb-4">
              <label className="block mb-2 font-medium">Name</label>

              <input
                type="text"
                value={userData.name}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    name: e.target.value,
                  })
                }
                className="w-full border p-3 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">Email</label>

              <input
                type="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    email: e.target.value,
                  })
                }
                className="w-full border p-3 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block mb-2 font-medium">New Password</label>

              <input
                type="password"
                placeholder="Leave empty if not changing"
                value={userData.password}
                onChange={(e) =>
                  setUserData({
                    ...userData,
                    password: e.target.value,
                  })
                }
                className="w-full border p-3 rounded"
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleUpdate}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Save Changes
              </button>

              <button
                onClick={() => {
                  setEditing(false);
                  fetchProfile();
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-4">
              <p>
                <strong>Name:</strong> {userData.name}
              </p>

              <p>
                <strong>Email:</strong> {userData.email}
              </p>

              <p>
                <strong>Role:</strong>{" "}
                <span className="capitalize">{userData.role}</span>
              </p>
            </div>

            <button
              onClick={() => setEditing(true)}
              className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Update Profile
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
