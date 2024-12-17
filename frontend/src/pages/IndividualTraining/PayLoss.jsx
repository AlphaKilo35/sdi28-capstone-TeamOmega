import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import { trainingContext } from './IndividualTrainingDashboard.jsx';

let checkCurrency = (date) => {

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let currentYear = new Date().getFullYear();
  let currentQuarter = Math.floor(currentMonth / 3) + 1;
  let checkedQuarter = Math.floor(new Date(date).getMonth() / 3) + 1;
  let checkedYear = new Date(date).getFullYear();
  console.log (currentMonth, currentYear, currentQuarter, checkedQuarter, checkedYear)
  if ( (checkedQuarter === currentQuarter || checkedQuarter === currentQuarter -1) &&
        ( checkedYear === currentYear || checkedYear === currentYear - 1) ) {
    return true;
  }
  return false;
}

let checkJumps = (date) => {
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let currentQuarter = Math.floor(currentMonth / 3) + 1;
  let checkedQuarter = Math.floor(new Date(date).getMonth() / 3) + 1;
  let checkedYear = new Date(date).getFullYear();
  console.log((currentYear - checkedYear) * 4 + (currentQuarter - checkedQuarter))
  return ( (currentYear - checkedYear) * 4 + (currentQuarter - checkedQuarter))
}

let daysLeft = () => {
  let now = new Date();
  let currentQuarter = Math.floor(now.getMonth() / 3) + 1;
  let quarterEndDate;
  switch (currentQuarter) {
    case 1: quarterEndDate = new Date(now.getFullYear(), 2, 31);
      break;
    case 2: quarterEndDate = new Date(now.getFullYear(), 5, 30);
      break;
    case 3: quarterEndDate = new Date(now.getFullYear(), 8, 30);
      break;
    case 4: quarterEndDate = new Date(now.getFullYear(),11,31);
      break;
  }
  return ( `${quarterEndDate.toISOString().split('T')[0]} (${Math.ceil( (quarterEndDate - now) / (1000*3600*24))})`);
}

const Pay_Tracker = () => {
  const [isCurrent, setIsCurrent] = useState(true);
  const [jumpsNeeded, setJumpsNeeded] = useState(1); // Replace with real data
  const [daysUntilPayLoss, setDaysUntilPayLoss] = useState(5); // Replace with real data

  let jumpData = useContext(trainingContext);

  useEffect( () => {
    if (!jumpData.loading && jumpData.dataObject.filter(item => item.status === 'complete').length > 0) {
      var lastJump = jumpData.dataObject.filter(item => item.status === 'complete').reduce((latest, current) => {
            return new Date(current.date_time) > new Date(latest.date_time) ? current : latest;
      });
      setIsCurrent(checkCurrency(lastJump.date_time.split('T')[0]));
      setJumpsNeeded(checkJumps(lastJump.date_time.split('T')[0]));
    } else {
      setIsCurrent(false);
    }

  }, [jumpData]);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 text-black py-4 px-8 text-center shadow-2xl z-50 transition-all ${
        isCurrent ? "bg-green-400" : "bg-red-400"
      }`}
    >
      <h2 className="text-2xl font-bold mb-2">Pay Loss Tracker</h2>

      {/* Current Jump Status */}
      <div
        style={{
          color: isCurrent ? "green" : "red",
          fontWeight: "bold",
          marginBottom: "10px",
        }}
      >
        {isCurrent ? "Current" : "Not Current"}
      </div>
      <div>
      <p>You need <b>{jumpsNeeded}</b> more jump(s) to maintain / become current by: <b>{daysLeft()}</b> days.</p>
      </div>
      {/* Link to Airborne Calendar */}
      <div>
        <Link className="font-semibold text-blue-600 underline" to="/Flights">
          Flights
        </Link>
      </div>
    </div>
  );
};

export default Pay_Tracker;
