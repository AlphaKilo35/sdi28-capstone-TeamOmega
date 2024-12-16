import { useState, useEffect, useContext } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Home.jsx";

function UnitTrainingNav() {
  let user = useContext(UserContext);

  const navigate = useNavigate();
  function handleUnitTrainingNavigate() {
    navigate(`/Individual-Training-Record/${user.id}`);
  }
  if (user.role === "admin" || user.role === "leader") {
    return (
        <div className="grid place-items-center bg-gray-900 text-gray-200">
      <div
        className="inline-block px-8 py-4 m-2 bg-gray-700 text-white rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gray-800 hover:scale-105 focus:bg-gray-800 focus:scale-105 active:scale-95"
        role="button"
        tabIndex={0}
        onClick={handleUnitTrainingNavigate}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleUnitTrainingNavigate();
        }}
      >
        Unit Training
      </div>
      </div>
    );
  }
}

export default UnitTrainingNav;
