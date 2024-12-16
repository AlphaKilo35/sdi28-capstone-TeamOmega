import { useState, useEffect, createContext } from "react";
import { useLocation } from 'react-router-dom';
import "./profile.css";
import EmailPopup from './EmailPopup.jsx';
import RolePopup from './RolePopup.jsx';
import JmPopup from './JmPopup.jsx';
import ValidatePopup from './ValidatePopup';

export const UserContext = createContext({})

function Profile() {

    let [ user, setUser ] = useState({});
    let [ currentUserId, setCurrentUserId ] = useState(0);
    let [ isAdmin, setIsAdmin ] = useState(true);
    let [ isLoading, setIsLoading ] = useState(true);

    let [ email, setEmail ] = useState('');
    let [ emailPopup, setEmailPopup ] = useState(false);
    let [ emailChange, setEmailChange ] = useState(false);

    let [ role, setRole ] = useState('');
    let [ rolePopup, setRolePopup ] = useState(false);
    let [ roleChange, setRoleChange ] = useState(false);

    let [ jm, setJm ] = useState('');
    let [ jmPopup, setJmPopup ] = useState(false);
    let [ jmChange, setJmChange ] = useState(false);

    let [ validatePopup, setValidatePopup ] = useState(false);
    let [ tokenCorrect, setTokenCorrect ] = useState(false);
    let [ savedChanges, setSavedChanges ] = useState(false);

    useEffect(() => {
        fetch("http://localhost:3000/local/verify", {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            setCurrentUserId(data?.id);
            console.log('Current userId on profile load:', data.id)
            if (!data) navigate("/login");
          })
          .catch((err) => {
            console.error("Auth verification failed", err);
            navigate("/login");
          });
      }, []);

    useEffect(() => {
        fetch(`http://localhost:3000/users/${currentUserId}`)
        .then(res => res.json())
        .then(data => {
            if (data[0]) {
                setUser(data[0]);
                setEmail(data[0].email);
                setRole(data[0].role);
                setJm(data[0].jm);
                setIsLoading(false);
                if (data[0].role === 'admin') {
                    setIsAdmin(true);
                }
            }
        })
    }, [currentUserId])

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

    function toggleValidatePopup() {
        setValidatePopup(!validatePopup);
    }

    function handleSaveChanges() {
        if (emailChange || roleChange || jmChange) {
            const updateData = {};
            
            if (emailChange) {
                updateData.email = email;
            }
            if (roleChange && tokenCorrect) {
                updateData.role = role;
            }
            if (jmChange && tokenCorrect) {
                updateData.jm = jm;
            }
            if ((roleChange || jmChange) && !tokenCorrect) {
                console.log('Token incorrect');
                setValidatePopup(true)
            } else {
                console.log('Changes Saved successfully')
                fetch(`http://localhost:3000/users/${user.id}`, {
                    method: 'PATCH',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updateData)
                })
                .then(response => response.json())
                .then(data => {
                    console.log('user updated successfully: ', data)
                })
                .catch(err => {
                    console.log('Failed to fetch user:', err);
                    res.status(400).json({err: 'Failed to fetch user'});
                })
                setSavedChanges(true);
            }
        }
        } 
    
    if (isLoading) {
        return (<div>Loading...</div>)
    } else {   
        return (
            <UserContext.Provider value={user}>
            <div className="min-h-screen flex items-center justify-center bg-gray-900 bg-cover">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-192">
                <header className="bg-gray-900 text-gold-400 p-4 shadow-md">
                    <h1 className="text-3xl font-bold text-center">Profile of {user.name}</h1>
                </header>
                <div className="text-2xl text-white text-center py-8">
                    <h1 className="font-bold">Name: </h1>
                    <span><h2>{user.name}</h2></span>
                </div>
                <div className="text-2xl text-white text-center py-8">
                    <h1 className="font-bold">Email: </h1>
                    <span><h2>{email}</h2></span>
                    <button 
                        className="inline-block px-4 py-2 m-2 bg-gold-400 text-black text-bold rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gold-500 hover:scale-105 focus:bg-gold-500 focus:scale-105 active:scale-95" 
                        type="submit" 
                        onClick={toggleEmailPopup}
                    >Update Email Address
                    </button>
                    {emailPopup && (<EmailPopup onSetPopup={toggleEmailPopup} changeEmail={setEmail} originEmail={user.email} emailChanged={setEmailChange}/>)}
                </div>
                <div className="text-2xl text-white text-center py-8">
                    <h1 className="font-bold">Role: </h1>
                    <span><h2>{Capitalize(role)}</h2></span>
                    <button 
                        className="inline-block px-4 py-2 m-2 bg-gold-400 text-black text-bold rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gold-500 hover:scale-105 focus:bg-gold-500 focus:scale-105 active:scale-95" 
                        type="submit" 
                        onClick={toggleRolePopup}
                    >Update Role
                    </button>
                    {rolePopup && (<RolePopup onSetPopup={toggleRolePopup} changeRole={setRole} originRole={user.role} adminStatus={isAdmin} roleChanged={setRoleChange}/>)}
                </div>
                <div className="text-2xl text-white text-center py-8">
                    <h1 className="font-bold">Jumpmaster: </h1>
                    <span><h2>{jm === true ? 'Yes' : 'No' }</h2></span>
                    <button 
                        className="inline-block px-4 py-2 m-2 bg-gold-400 text-black text-bold rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gold-500 hover:scale-105 focus:bg-gold-500 focus:scale-105 active:scale-95" 
                        type="submit" 
                        onClick={toggleJmPopup}
                    >Update JM Status
                    </button>
                    {jmPopup && (<JmPopup onSetPopup={toggleJmPopup} changeJm={setJm} adminStatus={isAdmin} jmChanged={setJmChange}/>)}
                </div>
                <div className="text-3xl font-bold text-center py-8">
                    <button 
                        className="inline-block px-8 py-4 m-2 bg-gold-400 text-black text-bold rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gold-500 hover:scale-105 focus:bg-gold-500 focus:scale-105 active:scale-95" 
                        type="submit"
                        onClick={handleSaveChanges}
                    >Save Changes
                    </button>
                </div>
                    {validatePopup && (<ValidatePopup onSetPopup={toggleValidatePopup} correctToken={setTokenCorrect} isCorrect={tokenCorrect}/>)}
                    {savedChanges && (<div className="text-xl text-green"><h2>Changes Saved Successfully</h2></div>)}
                
            </div>
            </div>
            </UserContext.Provider>
        )
    }
}

export default Profile;