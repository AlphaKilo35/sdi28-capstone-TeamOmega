import {useState, useEffect} from 'react';

import BioComponent from './BioComponent.jsx';
import Training_Status from './CurrentStatusComponent.jsx';
import Pay_Tracker from './PayLoss.jsx';

//get current User's ID -> Save into state variable
//pass this state variable (User ID) through a fetch to the API endpoint
//This API endpoint is querying for all records

function Individual_Training () {
return (
  <div className="individual_training_dashboard">
      <h4>Individual Training Dashboard</h4>
      <div className="soldier_bio_panel">
        <BioComponent />
      </div>
      <div className="training_table">
        <Training_Status />
      </div>
      <div className="pay_tracker">
        <Pay_Tracker />
      </div>
  </div>

)

}

export default Individual_Training;