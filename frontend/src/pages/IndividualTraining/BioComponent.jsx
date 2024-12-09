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
                    name: "John Doe",
                    rank: "Sergeant",
                    branch: "Army",
                    specialty: "Infantry (MOS 11B)",
                    unit: "1st Infantry Division",
                    dutyPosition: "Squad Leader",
                    unitAddress: "123 Military Base Rd, Fort Example, USA",
                  });
                }, 500); 
              };