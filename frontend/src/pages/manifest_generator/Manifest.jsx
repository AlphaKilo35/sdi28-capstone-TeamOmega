import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AvailableJumpers from "./AvailableJumpers";
import ManifestList from "./ManifestList";
import useManifestJumpers from "../../hooks/useManifestJumpers";
import useAvailableJumpers from "../../hooks/useAvailableJumpers";
import useUserData from "../../hooks/useUserData";

export default function Manifest() {
  const [search, setSearch] = useState("");
  const [manifestStatus, setManifestStatus] = useState("scheduled");
  const [isAddingJumper, setIsAddingJumper] = useState(false);
  const [loading, setLoading] = useState(true);

  ///grab this for your page nephi
  const [userId, setUserId] = useState(null); 
  const userData = useUserData(userId);

  if(userData){
    console.log("user data", userData)
  }
//////////
  const navigate = useNavigate();
  const location = useLocation();
  const totalSeats = location.state.numberOfSeats;
  const flightId = location.state.flight_id;

  const [manifestJumpers, setManifestJumpers] = useManifestJumpers(flightId);
  const availableJumpers = useAvailableJumpers();

  const filteredJumpers = availableJumpers.filter((jumper) =>
    jumper.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    fetch("http://localhost:3000/local/verify", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data) navigate("/login");
        setUserId(data.id) ///add this to your useEffect
        setLoading(false)
      })
      .catch((err) => {
        console.error("Auth verification failed", err);
        navigate("/login");
      });
  }, []);

  //adds user to the manifest in the UI and creates an entry in the database
  const addToManifest = async (jumper) => {
    if (manifestJumpers.length >= totalSeats || isAddingJumper) return;

    setIsAddingJumper(true);
    try {
      const response = await fetch("http://localhost:3000/manifests/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: jumper.id,
          flight_id: flightId,
          status: "scheduled",
          lift: 1,
        }),
      });

      const data = await response.json();

      const jumperWithManifestId = {
        ...jumper,
        manifest_id: parseInt(data.manifest_id),
        status: "scheduled",
        lift: 1,
      };

      setManifestJumpers((current) => {
        if (current.length >= totalSeats) throw new Error("Manifest is full");

        return [...current, jumperWithManifestId];
      });
      console.log("Manifest created:", data);
    } catch (error) {
      console.log("Error creating manifest:", error);
    } finally {
      setIsAddingJumper(false);
    }
  };

  //removes user from manifest in UI component and in the database
  const removeFromManifest = (jumperToRemove) => {
    setManifestJumpers(
      manifestJumpers.filter(
        (jumper) => jumper.manifest_id !== jumperToRemove.manifest_id
      )
    );

    fetch(`http://localhost:3000/manifests/${jumperToRemove.manifest_id}`, {
      method: "DELETE",
    })
      .then(() => console.log(`Manifest ${jumperToRemove.manifest_id} deleted`))
      .catch((error) => console.log("Error deleting manifest:", error));
  };

  //updates jump status as complete, scheduled, or scratched in UI component and in the database for all jumpers on the flight
  const updateStatus = (newStatus) => {
    setManifestStatus(newStatus);

    fetch(`http://localhost:3000/manifests/update-manifest/${flightId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Status updated:", data))
      .catch((error) => console.log("Error updating status:", error));
  };

  return (
    !loading && (
      <div className="p-4 min-h-screen bg-gray-900 text-gray-200">
        <header className="bg-gray-800 text-gold-400 p-4 shadow-md">
          <h1 className="text-4xl font-bold text-center">Manifest Generator</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AvailableJumpers
            filteredJumpers={filteredJumpers}
            addToManifest={addToManifest}
            totalSeats={totalSeats}
            manifestJumpers={manifestJumpers}
            search={search}
            setSearch={setSearch}
          />
          <ManifestList
            manifestJumpers={manifestJumpers}
            removeFromManifest={removeFromManifest}
            manifestStatus={manifestStatus}
            updateStatus={updateStatus}
            totalSeats={totalSeats}
          />
        </div>
      </div>
    )
  );
}
