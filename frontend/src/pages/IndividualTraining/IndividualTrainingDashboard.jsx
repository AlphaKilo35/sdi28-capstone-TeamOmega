import {useState, useEffect, createContext} from 'react';
import { useParams } from 'react-router-dom';
import BioComponent from './BioComponent.jsx';
import Training_Status from './CurrentStatusComponent.jsx';
import Pay_Tracker from './PayLoss.jsx';
import theme from '../../../tailwind.config.js';
import useFetchData from '../../hooks/useFetchData.jsx';

//get current User's ID -> Save into state variable
//pass this state variable (User ID) through a fetch to the API endpoint
//This API endpoint is querying for all records

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
      <main className="p-6 text-gray-800">
      <div className="flex flex-col md:flex-row gap-6 flex-grow">
        <div className='border-2 border-gold-400 bg-gray-500 w-full sm:w-full md:w-1/3 bg-white p-6 shadow-lg rounded-lg max-h-[653px] min-w-[330px] overflow-auto'>
        <userContext.Provider value={userData}>
          <BioComponent />
        </userContext.Provider>
      </div>
      <div className=" bg-gray-800 p-6 rounded-lg flex-grow">
        <trainingContext.Provider value={jumpData}>
          <Training_Status />
        </trainingContext.Provider>
      </div>
      <div className="pay-loss">
        <trainingContext.Provider value={jumpData}>
          <Pay_Tracker />
        </trainingContext.Provider>
      </div>
  </div>
  </main>
  </div>

)

}

export default Individual_Training;