import { useState, useEffect, useContext } from "react";
import "./home.css";
import { UserContext } from "./Home.jsx";
import { useNavigate } from "react-router-dom";

function ProfileNav() {
  let user = useContext(UserContext);

  const navigate = useNavigate();
  function handleProfileNavigate() {
    navigate(`/profiles`);
  }

  return (
    <div class="group h-96 w-80 [perspective:1000px]">
        <div class="relative h-full w-full rounded-xl z-10 shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
          <div class="absolute">
            <img class="h-full w-full rounded-xl object-cover shadow-xl shadow-black/40" src="/Soldier.jpg" alt="Silhoutte of a Soldier" />
          </div>
          <div class="absolute h-full w-full rounded-xl bg-black/80 px-12 text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div class="flex min-h-full flex-col items-center justify-center">
              <h1 class="text-3xl font-bold">User Profile</h1>
              <p class="text-lg">Update</p>
              <p class="text-base">Admin Rights</p>
              <button class="mt-2 rounded-md bg-neutral-800 py-1 px-2 text-sm hover:bg-neutral-900" onClick={handleProfileNavigate}>View</button>
            </div>
          </div>
        </div>
      </div>
  );

}

export default ProfileNav;
