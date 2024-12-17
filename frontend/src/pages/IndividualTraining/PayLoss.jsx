import React, { useState, useEffect, useContext } from "react";
import { Link } from 'react-router-dom';
import {trainingContext} from './IndividualTrainingDashboard.jsx'

let checkCurrency = (date) => {

  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  let currentQuarter = Math.floor(currentMonth / 3) + 1;
  let checkedQuarter = Math.floor(new Date(date).getMonth() / 3) + 1;
  let checkedYear = new Date(date).getFullYear();
  console.log (currentMonth, currentYear, currentQuarter, checkedQuarter, checkedYear)
  if ( (checkedQuarter === currentQuarter || checkedQuarter === currentQuarter -1) &&
        ( checkedYear === currentYear || checkedYear === currentYear - 1) ) {
    return true;
  };
  return false;
}

const Pay_Tracker = () => {
  const [isCurrent, setIsCurrent] = useState(true);
  const [jumpsNeeded, setJumpsNeeded] = useState(3); // Replace with real data
  const [daysUntilPayLoss, setDaysUntilPayLoss] = useState(5); // Replace with real data

  let jumpData = useContext(trainingContext);

  // if (!jumpData.loading && !(jumpData.dataObject === null || jumpData.dataObject === undefined) ) {
  //   //Object.keys(jumpData.dataObject).length === 0 ) {
  //   //Array.isArray(jumpData.dataObject)) {
  //     var lastJump = jumpData.dataObject.filter(item => item.status === 'complete').reduce((latest, current) => {
  //       return new Date(current.date_time) > new Date(latest.date_time) ? current : latest;
  //     });
  // } else {
  //   var lastJump = {date_time: ''};
  //   lastJump.date_time = new Date('1990-01-01').toISOString()
  // }

  useEffect( () => {
    if (!jumpData.loading && jumpData.dataObject.filter(item => item.status === 'complete').length > 0) {
      console.log(jumpData.dataObject)
      var lastJump = jumpData.dataObject.filter(item => item.status === 'complete').reduce((latest, current) => {
            return new Date(current.date_time) > new Date(latest.date_time) ? current : latest;
      });
      setIsCurrent(checkCurrency(lastJump.date_time.split('T')[0]))
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

      {/* Jumps Needed to Become Current */}
      {!isCurrent && (<>
        <div>
          <p>You need {jumpsNeeded} more jump(s) to become current.</p>
        </div>

        <div className="mb-4">
          <p>
          { daysUntilPayLoss > 0
            ? `You have ${daysUntilPayLoss} day(s) to find a jump before pay loss.`
            : "Pay loss incurred!"}
          </p>
        </div>
        </>
      )}



      {/* Link to Airborne Calendar */}
      <div>
          <Link className=" font-semibold text-blue-600 underline" to="/Flights">Flights</Link>
      </div>
    </div>
  );
};

export default Pay_Tracker;
