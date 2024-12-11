import { useState, useEffect, createContext } from "react";
import "./home.css";
import ProfileNav from "./ProfileNav.jsx";
import ManifestNav from "./ManifestNav.jsx";
import JumpLogNav from "./JumpLogNav.jsx";
import FlightsNav from "./FlightsNav.jsx";
import UnitTrainingNav from "./UnitTrainingNav.jsx";

export const UserContext = createContext({});

function Home() {
  //NEED TO LASH THIS UP WITH LOG-IN COOKIES
  let userId = 1;

  let [user, setUser] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data[0]);
        setUser(data[0]);
      });
  }, []);

  if (!user.name) {
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
