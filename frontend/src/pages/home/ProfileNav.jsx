import { useState, useEffect, useContext } from 'react'
import './home.css'
import { UserContext } from './Home.jsx';
import { useNavigate } from 'react-router-dom'



function ProfileNav() {
    let user = useContext(UserContext);

    const navigate = useNavigate();
    function handleProfileNavigate() {
        let truncName = user.username.replace(/ /g, "");
        navigate(`/profiles/${truncName}`, {state: {userId: user.id}})
    }
    return (
        <div className="navigationTile" onClick={() => handleProfileNavigate()}>Profile</div>
    )
}

export default ProfileNav;