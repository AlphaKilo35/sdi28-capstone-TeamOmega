import { useState, useEffect, useContext } from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './Home.jsx'

function UnitTrainingNav() {

    let user = useContext(UserContext);
    
    const navigate = useNavigate();
    function handleUnitTrainingNavigate() {
        navigate(`/unittraining`)
    }
    if (user.role === 'admin' || user.role === 'leader') {
        return (
        <div className="navigationTile" onClick={() => handleUnitTrainingNavigate()}>Unit Training</div>
        )
    }
}

export default UnitTrainingNav;