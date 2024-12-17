import { useState, useEffect, createContext } from 'react';
import BioComponent from './BioComponent.jsx';
import Training_Status from './CurrentStatusComponent.jsx';
import Pay_Tracker from './PayLoss.jsx';
import theme from '../../../tailwind.config.js';
import useFetchData from '../../hooks/useFetchData.jsx';
import FiltersComponent from './FiltersComponent';

// Contexts for user and training data
export const userContext = createContext();
export const trainingContext = createContext();

function Individual_Training() {
  let userId = 22;

  // Fetch user data and jump data
  let userData = useFetchData(`http://localhost:3000/api/Individual-Training-Record/${userId}`);
  let jumpData = useFetchData(`http://localhost:3000/manifests/${userId}`);

  // State to manage filter values
  const [filters, setFilters] = useState({
    date: '',
    time: '',
    platform: '',
  });

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Updated Filters:', newFilters);
  };

  return (
    <div className="border-2 border-gold-400 bg-indigo-950 min-h-screen flex flex-col pb-16">
      {/* Page Title */}
      <h2 className="text-center text-2xl text-gold-600 font-semibold mb-4">
        Individual Training Dashboard
      </h2>

      <div className="flex flex-col md:flex-row gap-6 flex-grow">
        {/* Personal Information Section */}
        <div className="border-2 border-gold-400 bg-gray-500 w-full sm:w-full md:w-1/3 bg-white p-6 shadow-lg rounded-lg max-h-[653px] min-w-[330px] overflow-auto">
          <userContext.Provider value={userData}>
            <BioComponent />
          </userContext.Provider>
        </div>

        {/* Training Table Section */}
        <div className="bg-indigo-950 p-6 rounded-lg flex-grow">
          <div className="bg-gray-100 rounded-lg p-4 shadow-md">
            {/* Filters Component inside Training Table */}
            <FiltersComponent onFilterChange={handleFilterChange} />

            {/* Training Status */}
            <trainingContext.Provider value={jumpData}>
              <div className="mt-4">
                <Training_Status />
              </div>
            </trainingContext.Provider>
          </div>
        </div>

        {/* Pay Loss Tracker Section */}
        <div className="pay-loss">
          <Pay_Tracker />
        </div>
      </div>
    </div>
  );
}

export default Individual_Training;
