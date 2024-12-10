import React, { useState } from "react";

const PayLoss = () => {
  const [isCurrent, setIsCurrent] = useState(false);
  const [jumpsNeeded, setJumpsNeeded] = useState(3); // Replace with real data
  const [daysUntilPayLoss, setDaysUntilPayLoss] = useState(5); // Replace with real data

  return (
    <div>
      <h1>Pay Loss Tracker</h1>

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
      <div>
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
        >
          Go to Airborne Calendar
        </a>
      </div>
    </div>
  );
};

export default PayLoss;
