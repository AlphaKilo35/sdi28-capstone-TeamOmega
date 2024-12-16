import { useState, useEffect, useContext } from "react";
import "./home.css";
import { UserContext } from "./Home.jsx";
import { useNavigate } from "react-router-dom";

function ProfileNav() {
  let user = useContext(UserContext);

  const navigate = useNavigate();
  function handleProfileNavigate() {
    navigate(`/profiles/${user.id}`);
  }

  return (
    <div className="grid place-items-center bg-gray-900 text-gray-200">
      <div
        className="inline-block px-8 py-4 m-2 bg-gray-700 text-white rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gray-800 hover:scale-105 focus:bg-gray-800 focus:scale-105 active:scale-95"
        role="button"
        tabIndex={0}
        onClick={handleProfileNavigate}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") handleProfileNavigate();
        }}
      >
        Profile
      </div>
    </div>
  );

}

export default ProfileNav;
