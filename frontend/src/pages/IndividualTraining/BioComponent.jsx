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

    useEffect(() => {
        const fetchUserData = async () => {
            setTimeout(() => {
                setUserData({
                    id: "",
                    name: "",
                    email: "",
                    role: "",
                    jm: "",
                  });
                }, 500);
              };

    fetchUserData();
    }, []);

    return (
      // bio-component
        <div className="flex flex-col bg-gray-50 p-6 w-full sm:w-1/3 md:w-1/4 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Personal Information</h2>
          {/* User Data */}
          <div className="mb-4">
            <strong className="text-gray-700">Id:</strong> 
            <span className="text-gray-900">{userData.name}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Username:</strong> 
            <span className="text-gray-900">{userData.rank}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Password:</strong> 
            <span className="text-gray-900">{userData.branch}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700"g>Name:</strong> 
            <span className="text-gray-900">{userData.specialty}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Email:</strong> 
            <span className="text-gray-900">{userData.unit}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Role:</strong> 
            <span className="text-gray-900">{userData.dutyPosition}</span>
          </div>
          <div className="mb-4">
            <strong className="text-gray-700">Jump Master Qualified:</strong> 
            <span className="text-gray-900">{userData.unitAddress}</span>
          </div>
        </div>
      );
    };

    export default BioComponent;