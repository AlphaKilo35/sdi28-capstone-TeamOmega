import React, { useEffect, useState } from "react";

const BioComponent = () => {
   
    const [userData, setUserData] = useState({
      name: "John Doe",
      rank: "Sergeant",
      branch: "Army",
      specialty: "Infantry (MOS 11B)",
      unit: "1st Infantry Division",
      dutyPosition: "Squad Leader",
      unitAddress: "123 Military Base Rd, Fort Example, USA",
    });

    useEffect(() => {
        const fetchUserData = async () => {
            setTimeout(() => {
                setUserData({
                    id: ""
                    name: "",
                    rank: "Sergeant",
                    branch: "Army",
                    specialty: "Infantry (MOS 11B)",
                    unit: "1st Infantry Division",
                    dutyPosition: "Squad Leader",
                    unitAddress: "123 Military Base Rd, Fort Example, USA",
                  });
                }, 500); 
              };
    
    fetchUserData();
    }, []);

    return (
        <div className="bio-component">
          <h2>Personal Information</h2>
          <div className="bio-field">
            <strong>Name:</strong> {userData.name}
          </div>
          <div className="bio-field">
            <strong>Rank:</strong> {userData.rank}
          </div>
          <div className="bio-field">
            <strong>Branch:</strong> {userData.branch}
          </div>
          <div className="bio-field">
            <strong>MOS/Specialty:</strong> {userData.specialty}
          </div>
          <div className="bio-field">
            <strong>Unit:</strong> {userData.unit}
          </div>
          <div className="bio-field">
            <strong>Duty Position:</strong> {userData.dutyPosition}
          </div>
          <div className="bio-field">
            <strong>Unit Address:</strong> {userData.unitAddress}
          </div>
        </div>
      );
    };
    
    export default BioComponent;