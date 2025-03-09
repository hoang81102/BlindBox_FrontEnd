import React, { useState, useEffect } from "react";
import "./UserProfile.scss";
import {
  FaCamera,
  FaEnvelope,
  FaPhone,
  FaVenusMars,
  FaPlus,
  FaTrash,
  FaEdit,
  FaSave,
} from "react-icons/fa";
import { UploadImageToCloudinaryService } from "../../../Services/UploadImageToCloudinaryService";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    avatar: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    const storedUser = {
      name: localStorage.getItem("fullName") || "Guest",
      email: localStorage.getItem("email") || "No email available",
      phone: localStorage.getItem("phoneNumber") || "No phone number",
      gender: localStorage.getItem("gender") || "Undefined",
      avatar: localStorage.getItem("avatar") || "",
    };
    setUser(storedUser);
    setAddresses(JSON.parse(localStorage.getItem("addresses")) || []);
  }, []);

  const handleImageChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const imageUrl = await UploadImageToCloudinaryService(file);
      setUser((prev) => ({ ...prev, avatar: imageUrl }));
      localStorage.setItem("avatar", imageUrl);
    } catch (error) {
      console.error("Lỗi upload ảnh:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="user-profile">
      <div className="profile-card">
        <div className="profile-avatar">
          <img src={user.avatar} className="profile-avatar1" alt="avatar" />
          <label htmlFor="avatarInput" className="avatar-icon">
            <FaCamera className="icon-camera" />
          </label>
          <input
            type="file"
            id="avatarInput"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
          {uploading && <p className="text-waiting">Uploading...</p>}
        </div>
        <div className="profile-info">
          {isEditing ? (
            <>
              {["name", "email", "phone"].map((field) => (
                <input
                  key={field}
                  type="text"
                  value={user[field]}
                  onChange={(e) =>
                    setUser({ ...user, [field]: e.target.value })
                  }
                />
              ))}
              <select
                value={user.gender}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              >
                {["Male", "Female", "Other", "Not specified"].map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <button
                onClick={() => setIsEditing(false)}
                className="save-button"
              >
                <FaSave /> Save
              </button>
            </>
          ) : (
            <>
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-detail">
                <FaEnvelope className="icon" /> {user.email}
              </p>
              <p className="profile-detail">
                <FaPhone className="icon" /> {user.phone}
              </p>
              <p className="profile-detail">
                <FaVenusMars className="icon" /> {user.gender}
              </p>
              <button
                onClick={() => setIsEditing(true)}
                className="edit-button"
              >
                <FaEdit /> Edit Profile
              </button>
            </>
          )}
        </div>
      </div>
      <div className="address-book">
        <h3>Address Book</h3>
        <div className="address-list">
          {addresses.map((address, index) => (
            <div key={index} className="address-item">
              {address}{" "}
              <FaTrash
                className="delete-icon"
                onClick={() =>
                  setAddresses(addresses.filter((_, i) => i !== index))
                }
              />
            </div>
          ))}
        </div>
        <div className="add-address">
          <input
            type="text"
            placeholder="Enter new address"
            value={newAddress}
            onChange={(e) => setNewAddress(e.target.value)}
          />
          <button
            onClick={() => setAddresses([...addresses, newAddress])}
            className="add-button"
          >
            <FaPlus /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
