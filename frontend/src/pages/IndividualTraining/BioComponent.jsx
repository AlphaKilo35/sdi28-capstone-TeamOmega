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
//console.log (userDataContext)
  if (error) {
    return <p>Error: {error}</p>;
  }

    return (
      // bio-component
      <main className="w-full h-full p-6 max-h-full min-w-[330px] overflow-auto">



          <h3 className="text-2xl font-bold text-gold-400 mb-6">Personal Information</h3>
          {/* User Data */}
          <div className="mb-4">
            <strong className="text-gray-700">Name: </strong>
            <span className="text-gray-800">{userDataContext.dataObject.name}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Email: </strong>
            <span className="text-gray-800">{userDataContext.dataObject.email}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Role: </strong>
            <span className="text-gray-800">{userDataContext.dataObject.role}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Jump Master Qualified: </strong>
            <span className="text-gray-800">{userDataContext.dataObject.jm.toString()}</span>
          </div>


        </main>
      );
    };

export default BioComponent;
