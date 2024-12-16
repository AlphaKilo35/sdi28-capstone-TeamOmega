import React, { useEffect, useState, useContext } from "react";
import {userContext} from './IndividualTrainingDashboard.jsx'

const BioComponent = () => {
  const [userData, setUserData] = useState({
  });
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors

  const userId = 1; // Example userId, replace with actual if dynamic

  let userDataContext = useContext(userContext)

  useEffect(() => {
    setUserData (userDataContext.dataObject) 
  },[]);

  if (userDataContext.loading) {
    return <p>Loading...</p>;
  }
console.log (userDataContext)
  if (error) {
    return <p>Error: {error}</p>;
  }

    return (
      // bio-component
        <div className="flex flex-col p-6 w-full sm:w-1/3 md:w-1/4 rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
          {/* User Data */}
          <div className="mb-4">
            <strong className="text-gray-700">Name: </strong> 
            <span className="text-gray-900">{userDataContext.dataObject.name}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Email: </strong> 
            <span className="text-gray-900">{userDataContext.dataObject.email}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Role: </strong> 
            <span className="text-gray-900">{userDataContext.dataObject.role}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Jump Master Qualified: </strong> 
            <span className="text-gray-900">{userDataContext.dataObject.jm}</span>
          </div>
        </div>
      );
    };

export default BioComponent;
