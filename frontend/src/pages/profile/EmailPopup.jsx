import { useState, useContext } from 'react';
import { UserContext } from './Profile.jsx';
import "./profile.css";

function EmailPopup ({onSetPopup, changeEmail, originEmail}) {

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
        } else {
            changeEmail(newEmail);
            setUniqueEmail(true);
            setEmailCorrect(true);
            onSetPopup()
        }
    }

    return (
        <div className="bg-gray-800 border border-gold-600 p-4 rounded-md text-2xl font-bold text-center flex flex-col space-y-4 popup-overlay">
            <div>
                <h2>Update Your Email Address</h2>
                <h2>{user.email}</h2>
            </div>
            <div>
                <input type="text" className="bg-gray-900 text-l" placeholder="New Email Address" onChange={(e) => setNewEmail(e.target.value)}></input>
            </div>
            <div>
                <input type="text" className="bg-gray-900 text-l" placeholder="Confirm Email Address" onChange={(e) => setConfirmEmail(e.target.value)}></input>
            </div>
            <div>
                {!emailCorrect && (
                    <div><h3 className="text-color-red-400">Emails Must Match!</h3></div>
                )}
            </div>
            <div>
                {!uniqueEmail && (
                    <div><h3 className="text-color-red-400">Email must differ!</h3></div>
                )}
            </div>
            <div>
                <button 
                    className="inline-block px-8 py-4 m-2 bg-gray-700 text-white rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gray-800 hover:scale-105 focus:bg-gray-800 focus:scale-105 active:scale-95"
                    type="submit"
                    onClick={handleEmailChange}
                >Update
                </button>
            </div>
            <div>
                <button 
                    className="inline-block px-8 py-4 m-2 bg-gray-700 text-white rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gray-800 hover:scale-105 focus:bg-gray-800 focus:scale-105 active:scale-95"
                    type="submit"
                    onClick={onSetPopup}
                >Close
                </button>
            </div>
        </div>
    )
}

export default EmailPopup;