import React, { useState, useEffect } from "react";
import "./UserProfile.scss";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaPlus,
  FaTrash,
  FaEdit,
  FaSave,
} from "react-icons/fa";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [addresses, setAddresses] = useState([]);
  const [newAddress, setNewAddress] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  useEffect(() => {
    const storedName = localStorage.getItem("username") || "Guest";
    const storedEmail = localStorage.getItem("email") || "No email available";
    const storedPhone =
      localStorage.getItem("phoneNumber") || "No phone number";
    const storedAddresses = JSON.parse(localStorage.getItem("addresses")) || [];

    setUser({
      name: storedName,
      email: storedEmail,
      phone: storedPhone,
    });
    setEditedUser({
      name: storedName,
      email: storedEmail,
      phone: storedPhone,
    });
    setAddresses(storedAddresses);
  }, []);

  const handleAddAddress = () => {
    if (newAddress.trim() !== "") {
      const updatedAddresses = [...addresses, newAddress];
      setAddresses(updatedAddresses);
      localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
      setNewAddress("");
    }
  };

  const handleDeleteAddress = (index) => {
    const updatedAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(updatedAddresses);
    localStorage.setItem("addresses", JSON.stringify(updatedAddresses));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = () => {
    setUser(editedUser);
    localStorage.setItem("username", editedUser.name);
    localStorage.setItem("email", editedUser.email);
    localStorage.setItem("phoneNumber", editedUser.phone);
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <div className="profile-card">
        <div className="profile-avatar">
          <FaUserCircle size={80} />
        </div>
        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedUser.name}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, name: e.target.value })
                }
              />
              <input
                type="email"
                value={editedUser.email}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, email: e.target.value })
                }
              />
              <input
                type="text"
                value={editedUser.phone}
                onChange={(e) =>
                  setEditedUser({ ...editedUser, phone: e.target.value })
                }
              />
              <button onClick={handleSaveProfile} className="save-button">
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
              <button onClick={handleEditToggle} className="edit-button">
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
              <FaMapMarkerAlt className="icon" /> {address}
              <FaTrash
                className="delete-icon"
                onClick={() => handleDeleteAddress(index)}
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
          <button onClick={handleAddAddress} className="add-button">
            <FaPlus /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
