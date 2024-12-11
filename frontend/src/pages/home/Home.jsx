import { useState, useEffect, createContext } from 'react'
import './home.css'
import ProfileNav from './ProfileNav.jsx'
import ManifestNav from './ManifestNav.jsx'
import JumpLogNav from './JumpLogNav.jsx'
import FlightsNav from './FlightsNav.jsx'
import UnitTrainingNav from './UnitTrainingNav.jsx'

export const UserContext = createContext({})

function Home() {

  //NEED TO LASH THIS UP WITH LOG-IN COOKIES
  let userId = 1

  let [ user, setUser ] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/users/${userId}`)
    .then(res => res.json())
    .then(data => {
      console.log(data[0]);
      setUser(data[0]);
    })
  }, [])

  if (!user.name) {
    return (
      <div>Loading...</div>
    )
  } else {
    return (
    <>
      <UserContext.Provider value={user}>
        <div className="homepage">
          <ProfileNav />
          <JumpLogNav />
          <FlightsNav />
          <ManifestNav />
          <UnitTrainingNav />
        </div>
      </UserContext.Provider>
    </>
    )
  }
}

export default Home;
