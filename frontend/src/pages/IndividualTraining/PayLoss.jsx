import React, { useState } from "react";

const PayLoss = () => {
  const [isCurrent, setIsCurrent] = useState(false);
  const [jumpsNeeded, setJumpsNeeded] = useState(3); // Replace with real data
  const [daysUntilPayLoss, setDaysUntilPayLoss] = useState(5); // Replace with real data

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-red-400 text-black py-4 px-8 text-center shadow-2xl z-50 transition-all ${
          isCurrent ? "bg-green-400" : ""
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
      {!isCurrent && (
        <div>
          <p>You need {jumpsNeeded} more jump(s) to become current.</p>
        </div>
      )}

      {/* Days Until Pay Loss */}
      <div className="mb-4">
        <p>
          {daysUntilPayLoss > 0
            ? `You have ${daysUntilPayLoss} day(s) to find a jump before pay loss.`
            : "Pay loss incurred!"}
        </p>
      </div>

      {/* Link to Airborne Calendar */}
      <div>
        <a
          href="https://your-airborne-calendar-link.com"
          target="_blank"
          rel="noopener noreferrer"
          className=" font-semibold text-blue-600 underline"
        >
          Go to Airborne Calendar
        </a>
      </div>
    </div>
  );
};

export default PayLoss;
