import React, { useState } from 'react';

const FlightAndChalk = () => {
  const [flightManifest, setFlightManifest] = useState([
    { id: 1, name: 'Jumper 1' },
    { id: 2, name: 'Jumper 2' },
    { id: 3, name: 'Jumper 3' },
  ]);

  const [jumpChalks, setJumpChalks] = useState([]);

  // Move jumper from manifest to Chalks
  const moveToChalks = (jumper) => {
    setFlightManifest(flightManifest.filter((j) => j.id !== jumper.id));
    setJumpChalks([...jumpChalks, jumper]);
  };

  // Move a jumper from Chalks to Flight
  const moveToManifest = (jumper) => {
    setJumpChalks(jumpChalks.filter((j) => j.id !== jumper.id));
    setFlightManifest([...flightManifest, jumper]);
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <div className="flex justify-between gap-8">
        {/* Flight Manifest Column */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-6 text-center bg-gray-200 py-2 rounded-lg">
            Flight Manifest
          </h2>
          <div className="space-y-3">
            {flightManifest.map((jumper) => (
              <div
                key={jumper.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
              >
                <span className="text-gray-700">{jumper.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Control Buttons Column */}
        <div className="flex flex-col justify-center gap-4">
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-700 transition-colors"
            onClick={() => {
              const jumper = flightManifest[0];
              if (jumper) moveToChalks(jumper);
            }}
          >
            -&gt;
          </button>
          <button
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg text-gray-700 transition-colors"
            onClick={() => {
              const jumper = jumpChalks[0];
              if (jumper) moveToManifest(jumper);
            }}
          >
            &lt;-
          </button>
        </div>

        {/* Jump Chalks Column */}
        <div className="flex-1">
          <h2 className="text-xl font-semibold mb-6 text-center bg-gray-200 py-2 rounded-lg">
            Jump Chalks
          </h2>
          <div className="space-y-3">
            {jumpChalks.map((jumper) => (
              <div
                key={jumper.id}
                className="flex justify-between items-center bg-gray-100 p-4 rounded-lg"
              >
                <span className="text-gray-700">{jumper.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightAndChalk;