import { useState, useEffect, createContext } from "react";
import { useLocation } from 'react-router-dom';
import "./profile.css";
import EmailPopup from './EmailPopup.jsx';
import RolePopup from './RolePopup.jsx';
import JmPopup from './JmPopup.jsx';

export const UserContext = createContext({})

function Profile() {

    let [ user, setUser ] = useState({});

    let [ email, setEmail ] = useState('');
    let [ emailPopup, setEmailPopup ] = useState(false);

    let [ role, setRole ] = useState('');
    let [ rolePopup, setRolePopup ] = useState(false);
    let [ roleChange, setRoleChange ] = useState(false);

    let [ jm, setJm ] = useState('');
    let [ jmPopup, setJmPopup ] = useState(false);
    let [ jmChange, setJmChange ] = useState(false);

    const location = useLocation();

    useEffect(() => {
        fetch(`http://localhost:3000/users/${location.state.userId}`)
        .then(res => res.json())
        .then(data => {
            setUser(data[0]);
            setEmail(data[0].email);
            setRole(data[0].role);
            setJm(data[0].jm)
        })
    }, [])

    function Capitalize(str){
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function toggleEmailPopup() {
        setEmailPopup(!emailPopup)
    }

    function toggleRolePopup() {
        setRolePopup(!rolePopup);
    }

    function toggleJmPopup() {
        setJmPopup(!jmPopup);
    }

    if (!user.name) {
        return (<div>Loading...</div>)
    } else {   
        return (
            <UserContext.Provider value={user}>
            <div className="min-h-screen bg-gray-900 text-gray-200 homepage">
                <header className="bg-gray-800 text-gold-400 p-4 shadow-md">
                    <h1 className="text-3xl font-bold text-center">Profile of {user.name}</h1>
                </header>
                <div className="text-2xl font-bold text-center py-8">
                    <h1>Username: </h1>
                    <span><h2>{user.username}</h2></span>
                </div>
                <div className="text-2xl font-bold text-center py-8">
                    <h1>Email: </h1>
                    <span><h2>{email}</h2></span>
                    <button 
                        className="inline-block px-4 py-2 m-2 bg-gray-700 text-white rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gray-800 hover:scale-105 focus:bg-gray-800 focus:scale-105 active:scale-95" 
                        type="submit" 
                        onClick={toggleEmailPopup}
                    >Update Email Address
                    </button>
                    {emailPopup && (<EmailPopup onSetPopup={toggleEmailPopup} changeEmail={setEmail} originEmail={user.email}/>)}
                </div>
                <div className="text-2xl font-bold text-center py-8">
                    <h1>Role: </h1>
                    <span><h2>{Capitalize(role)}</h2></span>
                    <button 
                        className="inline-block px-4 py-2 m-2 bg-gray-700 text-white rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gray-800 hover:scale-105 focus:bg-gray-800 focus:scale-105 active:scale-95" 
                        type="submit" 
                        onClick={toggleRolePopup}
                    >Update Role
                    </button>
                    {rolePopup && (<RolePopup onSetPopup={toggleRolePopup}/>)}
                </div>
                <div className="text-2xl font-bold text-center py-8">
                    <h1>Jumpmaster: </h1>
                    <span><h2>{jm === true ? 'Yes' : 'No' }</h2></span>
                    <button 
                        className="inline-block px-4 py-2 m-2 bg-gray-700 text-white rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gray-800 hover:scale-105 focus:bg-gray-800 focus:scale-105 active:scale-95" 
                        type="submit" 
                        onClick={toggleJmPopup}
                    >Update JM Status
                    </button>
                    {jmPopup && (<JmPopup onSetPopup={toggleJmPopup}/>)}
                </div>
                <div className="text-2xl font-bold text-center py-8">
                    <button 
                        className="inline-block px-8 py-4 m-2 bg-gray-700 text-white rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gray-800 hover:scale-105 focus:bg-gray-800 focus:scale-105 active:scale-95" 
                        type="submit"
                    >Save Changes
                    </button>
                </div>
            </div>
            </UserContext.Provider>
        )
    }
}

export default Profile;