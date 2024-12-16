import { useState, useEffect, createContext } from "react";

import "./home.css";
import ProfileNav from "./ProfileNav.jsx";
import ManifestNav from "./ManifestNav.jsx";
import JumpLogNav from "./JumpLogNav.jsx";
import FlightsNav from "./FlightsNav.jsx";
import UnitTrainingNav from "./UnitTrainingNav.jsx";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

function Home() {
  //NEED TO LASH THIS UP WITH LOG-IN COOKIES
  //ADMIN_AUTH_STRING = "Secret Password"
  

  let [user, setUser] = useState({});
  let [currentUserId, setCurrentUserId] = useState(0);
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/local/verify", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUserId(data.id);
        if (!data) navigate("/login");
        setLoading(false);
      })
      .catch((err) => {
        console.error("Auth verification failed", err);
        navigate("/login");
      });
  }, []);
  
  useEffect(() => {
    fetch(`http://localhost:3000/users/${currentUserId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data[0]);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <UserContext.Provider value={user}>
          <div className="min-h-screen bg-gray-900 text-gray-200 homepage">
            <header className="bg-gray-800 text-gold-400 p-4 shadow-md">
              <h1 className="text-3xl font-bold text-center">Welcome, {user.name}</h1>
            </header>
          
            <main className="grid grid-cols-3 gap-6 p-6">
              <ProfileNav />
              <JumpLogNav />
              <FlightsNav />
              <ManifestNav />
              <UnitTrainingNav />
            </main>
          </div>
        </UserContext.Provider>
      </>
    );
  }
}

export default Home;
