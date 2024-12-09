import {useState, useEffect} from 'react';

import soldier_bio from './BioComponent.jsx';
import training_status from './CurrentStatusComponent.jsx';
import pay_tracker from './PayLoss.jsx';

//get current User's ID -> Save into state variable
//pass this state variable (User ID) through a fetch to the API endpoint
//This API endpoint is querying for all records

function Individual_Training () {
return (
  <div className="individual_training_dashboard">
      <h4>Individual Training Dashboard</h4>
      <div className="soldier_bio_panel">
        <soldier_bio />
      </div>
      <div className="training_table">
        <training_status />
      </div>
      <div className="pay_tracker">
        <pay_tracker />
      </div>
  </div>

)

}

export default Individual_Training;