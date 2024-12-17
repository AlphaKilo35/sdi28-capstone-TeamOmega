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
  <div className="min-h-screen bg-gray-900 text-gray-200">
      <header className="flex flex-row bg-gray-800 text-gold-400 p-4 shadow-md justify-center flex-wrap:wrap">
      <h1 className="text-3xl font-bold text-center">
        Individual Training Dashboard
      </h1>
      </header>
            {/* Main Content */}
      <main className="p-6 text-gray-800">
        <div className="flex flex-col md:flex-row gap-6 flex-grow">
          <userContext.Provider value={userData}>
            <BioComponent />
          </userContext.Provider>
        </div>

        {/* Training Status and Pay Tracker */}
        <div className="bg-gray-800 p-6 rounded-lg flex-grow">
          <trainingContext.Provider value={jumpData}>
            <Training_Status />
            <Pay_Tracker />
          </trainingContext.Provider>
        </div>
      </main>
    </div>

)

}

export default Individual_Training;
