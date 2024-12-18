// import { useState, useEffect, createContext } from 'react';
// import BioComponent from './BioComponent.jsx';
// import Training_Status from './CurrentStatusComponent.jsx';
// import Pay_Tracker from './PayLoss.jsx';
// import theme from '../../../tailwind.config.js';
// import useFetchData from '../../hooks/useFetchData.jsx';
// import FiltersComponent from './FiltersComponent';

// // Contexts for user and training data
// export const userContext = createContext();
// export const trainingContext = createContext();

// function Individual_Training() {
//   let userId = 22;

//   // Fetch user data and jump data
//   let userData = useFetchData(`http://localhost:3000/api/Individual-Training-Record/${userId}`);
//   let jumpData = useFetchData(`http://localhost:3000/manifests/${userId}`);

//   // State to manage filter values
//   const [filters, setFilters] = useState({
//     date: '',
//     time: '',
//     platform: '',
//   });

//   // Handle filter changes
//   const handleFilterChange = (newFilters) => {
//     setFilters(newFilters);
//     console.log('Updated Filters:', newFilters);
//   };

//   return (
//     <div className="border-2 border-gold-400 bg-indigo-950 min-h-screen flex flex-col pb-16">
//       {/* Page Title */}
//       <h2 className="text-center text-2xl text-gold-600 font-semibold mb-4">
//         Individual Training Dashboard
//       </h2>

//       <div className="flex flex-col md:flex-row gap-6 flex-grow">
//         {/* Personal Information Section */}
//         <div className="border-2 border-gold-400 bg-gray-500 w-full sm:w-full md:w-1/3 bg-white p-6 shadow-lg rounded-lg max-h-[653px] min-w-[330px] overflow-auto">
//           <userContext.Provider value={userData}>
//             <BioComponent />
//           </userContext.Provider>
//         </div>

//         {/* Training Table Section */}
//         <div className="bg-indigo-950 p-6 rounded-lg flex-grow">
//           <div className="bg-gray-100 rounded-lg p-4 shadow-md">
//             {/* Filters Component inside Training Table */}
//             <FiltersComponent onFilterChange={handleFilterChange} />

//             {/* Training Status */}
//             <trainingContext.Provider value={jumpData}>
//               <div className="mt-4">
//                 <Training_Status />
//               </div>
//             </trainingContext.Provider>
//           </div>
//         </div>

//         {/* Pay Loss Tracker Section */}
//         <div className="pay-loss">
//           <Pay_Tracker />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Individual_Training;

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
  let userId = 17;

  // Fetch user data and jump data
  let userData = useFetchData(`http://localhost:3000/api/Individual-Training-Record/${userId}`);
  let jumpData = useFetchData(`http://localhost:3000/manifests/${userId}`);

  // State to manage filter values
  const [filters, setFilters] = useState({
    date: '',
    time: '',
    platform: '',
  });

  // State to store filtered flight results
  const [filteredFlights, setFilteredFlights] = useState([]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    console.log('Updated Filters:', newFilters);
  };

  // Handle filtered results coming from FiltersComponent
  const handleFilterResults = (results) => {
    setFilteredFlights(results);
    console.log('Filtered Flights:', results);
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
            <FiltersComponent
              onFilterChange={handleFilterChange}
              onFilterResults={handleFilterResults}
            />

            {/* Filtered Training Table */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Filtered Training Table</h3>
              {filteredFlights.length > 0 ? (
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-2">Airframe</th>
                      <th className="border border-gray-300 p-2">Type Load</th>
                      <th className="border border-gray-300 p-2">Type Time of Day</th>
                      <th className="border border-gray-300 p-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFlights.map((flight) => (
                      <tr key={flight.flight_id}>
                        <td className="border border-gray-300 p-2">{flight.airframe}</td>
                        <td className="border border-gray-300 p-2">{flight.type_load}</td>
                        <td className="border border-gray-300 p-2">{flight.type_tod}</td>
                        <td className="border border-gray-300 p-2">
                          {new Date(flight.date_time).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No filtered results to display.</p>
              )}
            </div>

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

