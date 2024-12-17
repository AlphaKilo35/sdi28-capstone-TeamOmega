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
  <div className=" border-2 border-gold-400 bg-indigo-950 min-h-screen flex flex-col pb-16">
      <h2 className='text-center text-2xl text-gold-600 font-semibold mb-4'>Individual Training Dashboard</h2>
      <div className="flex flex-col md:flex-row gap-6 flex-grow">
        <div className='border-2 border-gold-400 bg-gray-500 w-full sm:w-full md:w-1/3 bg-white p-6 shadow-lg rounded-lg max-h-[653px] min-w-[330px] overflow-auto'>
        <userContext.Provider value={userData}>
          <BioComponent />
        </userContext.Provider>
      </div>
      <div className=" bg-indigo-950 p-6 rounded-lg flex-grow">
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
  </div>

)

}

export default Individual_Training;