import { useState, useEffect, useContext, use } from "react";
import "./home.css";
import { UserContext } from "./Home.jsx";
import { useNavigate } from "react-router-dom";

function ProfileNav() {
  let user = useContext(UserContext);

  const navigate = useNavigate();
  function handleProfileNavigate() {
    navigate(`/profile`);
  }

  return (
    <div className="group h-80 w-80 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl z-10 shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute">
          <img className="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40" src="/Soldier.jpg" alt="Silhoutte of a Soldier" />
        </div>
        <div className="absolute h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="flex min-h-full flex-col items-center justify-center">
            <h1 className="text-3xl font-bold py-2">User Profile</h1>
            <p className="text-lg py-2">Update</p>
            <p className="text-base py-2">Admin Rights</p>
            <button className="mt-2 rounded-md text-3xl bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900" onClick={handleProfileNavigate}>View</button>
          </div>
        </div>
      </div>
    </div>
  );

}

export default ProfileNav;
