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
      // bio-component
        <div className="flex flex-col p-6 w-full sm:w-1/3 md:w-1/4 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
          {/* User Data */}
          <div className="mb-4">
            <strong className="text-gray-700">Id: </strong> 
            <span className="text-gray-900">{userData.name}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Username: </strong> 
            <span className="text-gray-900">{userData.rank}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Password: </strong> 
            <span className="text-gray-900">{userData.branch}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700"g>Name: </strong> 
            <span className="text-gray-900">{userData.specialty}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Email: </strong> 
            <span className="text-gray-900">{userData.unit}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Role: </strong> 
            <span className="text-gray-900">{userData.dutyPosition}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Jump Master Qualified: </strong> 
            <span className="text-gray-900">{userData.unitAddress}</span>
          </div>
        </div>
      );
    };

export default BioComponent;
