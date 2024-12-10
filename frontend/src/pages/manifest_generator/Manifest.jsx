import React, { useState, useEffect } from "react";

export default function Manifest({ totalSeats = 10, flightId = 2 }) {
  const [search, setSearch] = useState("");
  const [manifestJumpers, setManifestJumpers] = useState([]);
  const [manifestStatus, setManifestStatus] = useState("incomplete");
  const [availableJumpers, setAvailableJumpers] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/api/manifest/flight/${flightId}/users`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch manifested users');
        }
        return response.json();
      })
      .then(data => {
        setManifestJumpers(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [flightId]);
console.log("manifested jumpers:", manifestJumpers);

  useEffect(() => {
    fetch('http://localhost:3000/api/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        return response.json();
      })
      .then(data => {
        setAvailableJumpers(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  console.log("available jumpers:" ,availableJumpers)



  const filteredJumpers = availableJumpers.filter((jumper) =>
    jumper.name.toLowerCase().includes(search.toLowerCase())
  );

  const addToManifest = (jumper) => {
    if (manifestJumpers.length < totalSeats &&
      !manifestJumpers.find((j) => j.id === jumper.id)) {
      setManifestJumpers([...manifestJumpers, jumper]);
    }
  };

  const removeFromManifest = (jumper) => {
    setManifestJumpers(manifestJumpers.filter((j) => j.id !== jumper.id));
  };

  ///need to update this function to pass the status change back to the manifest table
  const updateStatus = (newStatus) => {
    setManifestStatus(newStatus);
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
              <div key={jumper.id} className="flex justify-between p-2 border">
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
            <button
              onClick={() => updateStatus("complete")}
              disabled={manifestStatus === "complete"}
            >
              Mark Complete
            </button>
          </div>

          <div className="mb-4">
            Available Seats: {totalSeats - manifestJumpers.length} /{" "}
            {totalSeats}
          </div>
            {manifestJumpers.map((jumper) => (
              <div key={jumper.id} className="flex justify-between p-2 border">
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
