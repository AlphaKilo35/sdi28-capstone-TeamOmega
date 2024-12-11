import React, { useEffect, useState } from "react";

const BioComponent = () => {
  const [userData, setUserData] = useState({
    id: "",
    username: "",
    password: "",
    name: "",
    email: "",
    role: "",
    jm: "",
  });
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  const userId = 1; // Example userId, replace with actual if dynamic

  const fetchUserData = async () => {
    try {
      // Uncomment this block if you want to use the backend
      const response = await fetch(`http://localhost:3000/api/Individual-Training-Record/${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setUserData({
        id: data.id || "",
        username: data.username || "",
        password: data.password || "",
        name: data.name || "",
        email: data.email || "",
        role: data.role || "",
        jm: data.jm || "",
      });
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError(err.message);

      // Use mock data if the API call fails
      const mockUserData = {
        id: "1",
        username: "mockuser",
        password: "mockpassword",
        name: "Mock User",
        email: "mockuser@example.com",
        role: "Admin",
        jm: "Yes",
      };
      setUserData(mockUserData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="bio-component">
      <h2>Personal Information</h2>
      <div className="bio-field">
        <strong>Id:</strong> {userData.id}
      </div>
      <div className="bio-field">
        <strong>Username:</strong> {userData.username}
      </div>
      <div className="bio-field">
        <strong>Password:</strong> {userData.password}
      </div>
      <div className="bio-field">
        <strong>Name:</strong> {userData.name}
      </div>
      <div className="bio-field">
        <strong>Email:</strong> {userData.email}
      </div>
      <div className="bio-field">
        <strong>Role:</strong> {userData.role}
      </div>
      <div className="bio-field">
        <strong>Jump Master Qualified:</strong> {userData.jm}
      </div>
    </div>
  );
};

export default BioComponent;
