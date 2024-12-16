import { useState, useContext } from 'react';
import { UserContext } from './Profile.jsx';
import "./profile.css";

function EmailPopup ({onSetPopup, changeEmail, originEmail, emailChanged}) {

    const [ emailCorrect, setEmailCorrect ] = useState(true);
    const [ newEmail, setNewEmail ] = useState('');
    const [ confirmEmail, setConfirmEmail ] = useState('');
    const [ uniqueEmail, setUniqueEmail ] = useState(true);

    const user = useContext(UserContext);

    function handleEmailChange() {
        if (newEmail !== confirmEmail) {
            setEmailCorrect(false);
            setUniqueEmail(true);
        } else if (newEmail === originEmail) {
            setUniqueEmail(false)
            setEmailCorrect(true);
        } else if (newEmail !== '') {
            changeEmail(newEmail);
            setUniqueEmail(true);
            setEmailCorrect(true);
            emailChanged(true);
            onSetPopup()
        }
    }

    return (
        <div className="bg-gray-800 border border-gold-600 p-4 rounded-md text-2xl text-center flex flex-col space-y-4 popup-overlay">
            <div>
                <h2 className="font-bold">Update Your Email Address</h2>
                <h2>{user.email}</h2>
            </div>
            <div>
                <input type="text" className="w-full pl-2 pr-4 py-2 text-black border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400" placeholder="New Email Address" onChange={(e) => setNewEmail(e.target.value)}></input>
            </div>
            <div>
                <input type="text" className="w-full pl-2 pr-4 py-2 text-black border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400" placeholder="Confirm Email Address" onChange={(e) => setConfirmEmail(e.target.value)}></input>
            </div>
            <div>
                {!emailCorrect && (
                    <div><h3 className="text-color-red-400">Emails Must Match!</h3></div>
                )}
            </div>
            <div>
                {!uniqueEmail && (
                    <div><h3 className="text-color-red-400">Email Must differ!</h3></div>
                )}
            </div>
            <div>
                <button 
                    className="inline-block px-4 py-2 m-2 bg-gold-400 text-black font-bold rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gold-500 hover:scale-105 focus:bg-gold-500 focus:scale-105 active:scale-95"
                    type="submit"
                    onClick={handleEmailChange}
                >Update
                </button>
            </div>
            <div>
                <button 
                    className="inline-block px-4 py-2 m-2 bg-gold-400 text-black font-bold rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gold-500 hover:scale-105 focus:bg-gold-500 focus:scale-105 active:scale-95"
                    type="submit"
                    onClick={onSetPopup}
                >Close
                </button>
            </div>
        </div>
    )
}

export default EmailPopup;