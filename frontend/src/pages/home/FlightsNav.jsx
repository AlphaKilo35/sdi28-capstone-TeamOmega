import { useState, useEffect, useContext } from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./Home.jsx";

function FlightsNav() {
  let user = useContext(UserContext);

  const navigate = useNavigate();
  function handleFlightsNavigate() {
    navigate(`/flights`);
  }
  return (
    <div className = "pt-4 pl-10 text-white transition-colors hover:text-gold-400 pr-10 pb-2  ">
      <h1 className = " text-2xl  font-bold text-center mb-2 relative">Flights</h1>
    <div className="group h-80 w-80  aspect-square"
    onClick={handleFlightsNavigate}>
      <div className="relative h-full w-full rounded-xl z-10 shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute">
          <img className="h-80 w-80 rounded-xl object-cover shadow-xl shadow-black/40" src="/Chinook.jpg" alt="Silhoutte of a Helicopter" />
        </div>
        <div className="absolute h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex min-h-full flex-col items-center justify-center">
            <h1 className="text-3xl font-bold py-2">Flights</h1>
            <p className="text-lg py-2">Available</p>
            <p className="text-base py-2">Manifest</p>

          </div>
        </div>
      </div>
      </div>
    </div>
  );
}

export default FlightsNav;
