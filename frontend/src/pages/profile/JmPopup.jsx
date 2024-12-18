import { useState, useContext } from "react";
import { UserContext } from "./Profile.jsx";
import "./profile.css";

function JmPopup({ onSetPopup, changeJm, originJm, adminStatus, jmChanged }) {
  const user = useContext(UserContext);

  let [selectedValue, setSelectedValue] = useState("");

  function handleJmUpdate() {
    if (adminStatus && selectedValue !== originJm) {
      if ((selectedValue = "true")) {
        jmChanged(true);
        changeJm(true);
        onSetPopup();
      } else if ((selectedValue = "false")) {
        jmChanged(true);
        changeJm(false);
        onSetPopup();
      }
    } else {
      onSetPopup();
    }
  }

  return (
    <div className="bg-gray-800 border border-gold-600 p-4 rounded-md text-2xl text-center flex flex-col space-y-8 popup-overlay">
      <div>
        <h2 className="font-bold">Update Your JM Status</h2>
      </div>
      <div>
        <select
          name="jm"
          id="jm"
          className="w-full pl-2 pr-4 py-2 text-black border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400"
          onChange={(e) => setSelectedValue(e.target.value)}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </div>
      {!adminStatus && (
        <div>
          <h2 className="text-red-400">Status Change Unauthorized</h2>
        </div>
      )}
      <div>
        <button
          className="inline-block px-4 py-2 m-2 bg-gold-400 text-black font-bold rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gold-500 hover:scale-105 focus:bg-gold-500 focus:scale-105 active:scale-95"
          type="submit"
          onClick={handleJmUpdate}
        >
          Update
        </button>
      </div>
      <div>
        <button
          className="inline-block px-4 py-2 m-2 bg-gold-400 text-black font-bold rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gold-500 hover:scale-105 focus:bg-gold-500 focus:scale-105 active:scale-95"
          type="submit"
          onClick={onSetPopup}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default JmPopup;
