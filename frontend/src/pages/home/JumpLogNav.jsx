import { useState, useEffect, useContext } from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './Home.jsx'

function JumpLogNav() {

    let user = useContext(UserContext);
    
    const navigate = useNavigate();

    function handleJumpLogNavigate() {
        let truncName = user.username.replace(/ /g, "");
        navigate(`/jumplogs/${truncName}`, {state: {userId: user.id}})
    }

    return (
        <div className="navigationTile" onClick={() => handleJumpLogNavigate()}>Jump Log</div>
        )
}

export default JumpLogNav;