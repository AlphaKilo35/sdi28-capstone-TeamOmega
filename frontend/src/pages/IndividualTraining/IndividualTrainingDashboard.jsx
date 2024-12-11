import {useState, useEffect} from 'react';

import BioComponent from './BioComponent.jsx';
import Training_Status from './CurrentStatusComponent.jsx';
import Pay_Tracker from './PayLoss.jsx';

//get current User's ID -> Save into state variable
//pass this state variable (User ID) through a fetch to the API endpoint
//This API endpoint is querying for all records

function Individual_Training () {
return (
  <div className="min-h-screen flex flex-col pb-16">
      <h2 className='text-center text-2xl font-semibold mb-4'>Individual Training Dashboard</h2>
      <div className="flex flex-col md:flex-row gap-6 flex-grow">
        <div className='w-full sm:w-full md:w-1/3 bg-white p-6 shadow-lg rounded-lg max-h-[653px] min-w-[330px] overflow-auto'>
        <BioComponent />
      </div>
      <div className=" bg-white p-6 rounded-lg flex-grow">
        <Training_Status />
      </div>
      <div className="pay-loss">
        <Pay_Tracker />
      </div>
  </div>
  </div>

)

}

export default Individual_Training;