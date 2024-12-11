import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom'

export default function Manifest({ totalSeats = 20, flightId = 2 }) {
  const [search, setSearch] = useState("");
  const [manifestJumpers, setManifestJumpers] = useState([]);
  const [manifestStatus, setManifestStatus] = useState("incomplete");
  const [availableJumpers, setAvailableJumpers] = useState([]);
  const location = useLocation()
  const flightInfo = location.state
  console.log(flightInfo)

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
  const addToManifest = (jumper) => {
    if (manifestJumpers.length < totalSeats) {
      fetch("http://localhost:3000/manifests/", {
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
      })
        .then((response) => response.json())
        .then((data) => {
          const jumperWithManifestId = {
            ...jumper,
            manifest_id: parseInt(data.manifest_id),
            status: "scheduled",
            lift: 1,
          };
          setManifestJumpers([...manifestJumpers, jumperWithManifestId]);
          console.log("Manifest created:", data);
        })
        .catch((error) => console.log("Error creating manifest:", error));
    }
  };

  ///removes user from manifest in UI and deletes row in database
  const removeFromManifest = (jumper) => {
    setManifestJumpers(manifestJumpers.filter((j) => j.id !== jumper.id));
    fetch(`http://localhost:3000/manifests/${jumper.manifest_id}`, {
      method: "DELETE",
    })
      .then((response) =>
        console.log(`Manifest for jumper ${jumper.id} deleted`)
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
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* available jumpers container */}
        <div className="border p-4">
          <h2 className="font-bold">Available Jumpers</h2>
          <input
            type="text"
            className="w-full border p-2 mb-4"
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
                  className="bg-blue-500 text-white"
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
          <div className="flex gap-2">
            <div className="text-sm">Status: {manifestStatus}</div>
            <select
              value={manifestStatus}
              onChange={(e) => updateStatus(e.target.value)}
              className="px-2 py-1 border rounded"
            >
              <option value="scheduled">Scheduled</option>
              <option value="scratched">Scratched</option>
              <option value="complete">Complete</option>
            </select>
          </div>

          <div className="mb-4">
            Available Seats: {totalSeats - manifestJumpers.length} /{" "}
            {totalSeats}
          </div>
          {manifestJumpers.map((jumper, index) => (
            <div
              key={`manifest-${jumper.id}-${index}`}
              className="flex justify-between p-2 border"
            >
              <div>
                {jumper.name} {jumper.jm && <span> (JM)</span>}
                <div className="text-gray-500">{jumper.unit}</div>
              </div>
              <button
                onClick={() => removeFromManifest(jumper)}
                className="bg-red-500 text-white"
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