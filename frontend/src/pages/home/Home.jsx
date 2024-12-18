import { useState, useEffect, createContext } from "react";

import "./home.css";
import ProfileNav from "./ProfileNav.jsx";
import ManifestNav from "./ManifestNav.jsx";
import JumpLogNav from "./JumpLogNav.jsx";
import FlightsNav from "./FlightsNav.jsx";
import TrainingRecordNav from "./TrainingRecordNav.jsx";
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
        setCurrentUserId(data?.id);
        console.log("Current userId on homepage load:", data.id);
        if (!data) navigate("/login");
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
        console.log("User object on homepage load:", data[0]);
        if (data[0]) {
          setLoading(false);
        }
      });
  }, [currentUserId]);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <UserContext.Provider value={user}>
        <div className="flex flex-col">
          <header className="bg-gray-800 text-gold-400 p-4 shadow-md">
            <h1 className="text-3xl font-bold text-center">
              Welcome, {user?.name}
            </h1>
          </header>
          <div className="relative min-h-screen bg-gray-800 bg-[url('/army-paratroopers_background_II.png')]">
            <div className="absolute inset-0 min-h-screen w-full bg-gray-900 text-gray-200 opacity-95"></div>
            <main className="flex gap-60 mt-20 flex-wrap justify-center">
              <ProfileNav />
              <FlightsNav />
              <TrainingRecordNav />
            </main>
          </div>
        </div>
      </UserContext.Provider>
    );
  }
}

export default Home;
