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
        <div className="bio-component">
          <h2>Personal Information</h2>
          <div className="bio-field">
            <strong>Id:</strong> {userData.name}
          </div>
          <div className="bio-field">
            <strong>Username:</strong> {userData.rank}
          </div>
          <div className="bio-field">
            <strong>Password:</strong> {userData.branch}
          </div>
          <div className="bio-field">
            <strong>Name:</strong> {userData.specialty}
          </div>
          <div className="bio-field">
            <strong>Email:</strong> {userData.unit}
          </div>
          <div className="bio-field">
            <strong>Role:</strong> {userData.dutyPosition}
          </div>
          <div className="bio-field">
            <strong>Jump Master Qualified:</strong> {userData.unitAddress}
          </div>
        </div>
      );
    };

    export default BioComponent;