import { useState, useEffect, useContext } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Home.jsx";

function TrainingRecordNav() {
  let user = useContext(UserContext);

  const navigate = useNavigate();
  function handleTrainingRecordNavigate() {
    navigate(`/Individual-Training-Record/${user.id}`);
  }
  if (user.role === "admin" || user.role === "leader") {
    return (
      <div className="group h-96 w-80 [perspective:1000px]">
        <div className="relative h-full w-full rounded-xl z-10 shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div className="absolute">
            <img className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40" src="/Training.jpg" alt="Silhoutte of a Paratrooper" />
          </div>
          <div className="absolute h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div className="flex min-h-full flex-col items-center justify-center">
              <h1 className="text-3xl font-bold">Training Record</h1>
              <p className="text-lg">Jump Log</p>
              <p className="text-base">Current Jump Status</p>
              <button className="mt-2 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900" onClick={handleTrainingRecordNavigate}>View</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TrainingRecordNav;