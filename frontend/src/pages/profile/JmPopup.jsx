import { useState, useContext } from 'react';
import { UserContext } from './Profile.jsx';
import "./profile.css";

function JmPopup ({onSetPopup}) {
    
    const user = useContext(UserContext);

    return (
        <div className="bg-gray-800 border border-gold-600 p-4 rounded-md text-2xl font-bold text-center flex flex-col space-y-8 popup-overlay">
            <div>
                <h2>Update Your JM Status</h2>
            </div>
            <div>
                <button 
                    className="inline-block px-8 py-4 m-2 bg-gray-700 text-white rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gray-800 hover:scale-105 focus:bg-gray-800 focus:scale-105 active:scale-95"
                    type="submit"
                    onClick={onSetPopup}
                >Update
                </button>
            </div>
        </div>
    )
}

export default JmPopup;