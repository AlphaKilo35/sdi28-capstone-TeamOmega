import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'

export default function Manifest() {
  const [search, setSearch] = useState("");
  const [manifestJumpers, setManifestJumpers] = useState([]);
  const [manifestStatus, setManifestStatus] = useState("scheduled");
  const [availableJumpers, setAvailableJumpers] = useState([]);
  const [isAddingJumper, setIsAddingJumper] = useState(false);

  
  const location = useLocation()
  const totalSeats = location.state.numberOfSeats
  const flightId = location.state.flight_id

  useEffect(() => {
    fetch(`http://localhost:3000/manifests/flight/${flightId}/users`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch manifested users");
        }
        return response.json();
      })
      .then((data) => {
        setManifestJumpers(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, [flightId]);

  useEffect(() => {
    fetch("http://localhost:3000/manifests/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }
        return response.json();
      })
      .then((data) => {
        setAvailableJumpers(data);
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  }, []);

  const filteredJumpers = availableJumpers.filter((jumper) =>
    jumper.name.toLowerCase().includes(search.toLowerCase())
  );

  ///adds user to manifest in UI and creates row in database
  const addToManifest = async (jumper) => {
    if (manifestJumpers.length >= totalSeats || isAddingJumper) {
      return;
    }

    setIsAddingJumper(true);
    
    try {
      const response = await fetch("http://localhost:3000/manifests/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
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

      setManifestJumpers(current => {
        if (current.length >= totalSeats) {
          throw new Error("Manifest is full");
        }
        return [...current, jumperWithManifestId];
      });
      
      console.log("Manifest created:", data);
    } catch (error) {
      console.log("Error creating manifest:", error);
    } finally {
      setIsAddingJumper(false);
    }
  };


  ///removes user from manifest in UI and deletes row in database
  const removeFromManifest = (jumperToRemove) => {
    setManifestJumpers(manifestJumpers.filter(
      (jumper) => jumper.manifest_id !== jumperToRemove.manifest_id
    ));

    fetch(`http://localhost:3000/manifests/${jumperToRemove.manifest_id}`, {
      method: "DELETE",
    })
      .then((response) =>
        console.log(`Manifest ${jumperToRemove.manifest_id} deleted`)
      )
      .catch((error) => console.log("Error deleting manifest:", error));
  };

  //updates status of jump in UI and updates the status for all related users in the database
  const updateStatus = (newStatus) => {
    setManifestStatus(newStatus);

    fetch(`http://localhost:3000/manifests/update-manifest/${flightId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => console.log("Status updated:", data))
      .catch((error) => console.log("Error updating status:", error));
  };
  return (

    //main container
    <div className="p-4 min-h-screen bg-gray-900 text-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* available jumpers container */}
        <div className="border p-4">
          <h2 className="font-bold">Available Jumpers</h2>
          <input
            type="text"
            className="w-full border p-2 mb-4 text-gray-900"
            placeholder="Search jumpers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div>
            {filteredJumpers.map((jumper) => (
              <div
                key={`available-${jumper.id}`}
                className="flex justify-between p-2 border"
              >
                <div>
                  {jumper.name} {jumper.jm && <span> (JM)</span>}
                  <div className="text-gray-500">{jumper.unit}</div>
                </div>
                <button
                  onClick={() => addToManifest(jumper)}
                  disabled={manifestJumpers.length >= totalSeats}
                  className="inline-flex w-full justify-center rounded-md bg-gold-600  px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* manifest container*/}
        <div className="border p-4">
          <h2 className="font-bold">Flight Manifest</h2>

        {/* jump status*/}
          <div className="flex gap-2">
            <div className="text-sm ">Status: {manifestStatus}</div>
            <select
              value={manifestStatus}
              onChange={(e) => updateStatus(e.target.value)}
              className="px-2 py-1 border rounded text-gray-900">
              <option value="scheduled">Scheduled</option>
              <option value="scratched">Scratched</option>
              <option value="complete">Complete</option>
            </select>
          </div>

            {/* seats available*/}
          <div className="mb-4">
            Available Seats: {totalSeats - manifestJumpers.length} /{" "}
            {totalSeats}
          </div>
          {manifestJumpers.map((jumper) => (
            <div
              key={`manifest-${jumper.manifest_id}`}
              className="flex justify-between p-2 border"
            >
              <div>
                {jumper.name} {jumper.jm && <span> (JM)</span>}
                <div className="text-gray-500">{jumper.unit}</div>
              </div>
              <button
                onClick={() => removeFromManifest(jumper)}
                className="bg-red-500 text-white cursor-pointer"
              >
                remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
