import { useState, useEffect, useContext } from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './Home.jsx'

function FlightsNav() {

    let user = useContext(UserContext);
    
    const navigate = useNavigate();
    function handleFlightsNavigate() {
        navigate(`/flights`)
    }
    return (
        <div className="navigationTile" onClick={() => handleFlightsNavigate()}>Flights</div>
    )
}

export default FlightsNav;