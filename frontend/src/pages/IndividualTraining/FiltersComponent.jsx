
import React, { useState, useEffect } from "react";

const FiltersComponent = ({ onFilterChange }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [platforms, setPlatforms] = useState([]); // Platform types
  const [selectedPlatform, setSelectedPlatform] = useState("");

  // Mock platforms for testing
  useEffect(() => {
    const fetchPlatforms = async () => {
      const mockPlatforms = [
        { id: 1, name: "C-27" },
        { id: 2, name: "C-130" },
        { id: 3, name: "CASA-212" },
        { id: 4, name: "CH-47" },
        { id: 5, name: "UH-60" },
      ];
      setPlatforms(mockPlatforms);
    };

    fetchPlatforms();
  }, []);

  // Notify parent of filter changes
  useEffect(() => {
    onFilterChange({ date, time, platform: selectedPlatform });
  }, [date, time, selectedPlatform, onFilterChange]);

  return (
    <div className="p-6 bg-gray-100 rounded-md flex justify-center">
      <div className="flex flex-col md:flex-row md:space-x-8 space-y-4 md:space-y-0 items-center">
        {/* Filters Label */}
        <span className="text-lg font-semibold">Filters:</span>

        {/* Date Picker */}
        <div className="flex items-center">
          <label htmlFor="date" className="sr-only">
            Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-48"
          />
        </div>

        {/* Time Picker */}
        <div className="flex items-center">
          <label htmlFor="time" className="sr-only">
            Time:
          </label>
          <input
            type="time"
            id="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-48"
          />
        </div>

        {/* Platforms Dropdown */}
        <div className="flex items-center">
          <label htmlFor="platform" className="sr-only">
            Platform:
          </label>
          <select
            id="platform"
            value={selectedPlatform}
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="p-2 border border-gray-300 rounded-md w-48"
          >
            <option value="">Select a platform</option>
            {platforms.map((platform) => (
              <option key={platform.id} value={platform.name}>
                {platform.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default FiltersComponent;

