import {useState, useEffect, createContext} from 'react';
import { useParams } from 'react-router-dom';
import BioComponent from './BioComponent.jsx';
import Training_Status from './CurrentStatusComponent.jsx';
import Pay_Tracker from './PayLoss.jsx';
import theme from '../../../tailwind.config.js';
import useFetchData from '../../hooks/useFetchData.jsx';
import FiltersComponent from './FiltersComponent';

// Contexts for user and training data
export const userContext = createContext();
export const trainingContext = createContext();

function Individual_Training () {
var {id} = useParams();
//id = 1;

let userData = useFetchData(`http://localhost:3000/api/Individual-Training-Record/${id}`);
let jumpData = useFetchData(`http://localhost:3000/manifests/user/${id}`)
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
