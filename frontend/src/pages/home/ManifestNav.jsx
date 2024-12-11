import { useState, useEffect, useContext } from 'react'
import './home.css'
import { useNavigate } from 'react-router-dom'
import { UserContext } from './Home.jsx'

function ManifestNav() {

    let user = useContext(UserContext);
    
    const navigate = useNavigate();
    function handleManifestNavigate() {
        navigate(`/manifest`)
    }
    if (user.role === 'admin') {
        return (
        <div className="navigationTile" onClick={() => handleManifestNavigate()}>Manifest</div>
        )
    }
}

export default ManifestNav;