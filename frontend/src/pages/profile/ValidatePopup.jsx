import { useState, useContext } from 'react';
import { UserContext } from './Profile.jsx';
import "./profile.css";

function ValidatePopup ({onSetPopup, correctToken, isCorrect}) {

    const [ successfulValidation, setSuccessfulValidation ] = useState(false);
    const [ inputKey, setInputKey ] = useState('');
    const [ correctKey, setCorrectKey ] = useState(true)

    let adminKey = 'Secret Password';

    const user = useContext(UserContext);

    function handleValidationCheck() {
        if (inputKey === adminKey) {
            setSuccessfulValidation(true);
            setCorrectKey(true);
            correctToken(true);
        } else {
            setCorrectKey(false);
        }
    }

    return (
        <div className="bg-gray-800 border border-gold-600 p-4 rounded-md text-2xl font-bold text-center flex flex-col space-y-4 popup-overlay">
            <div>
                <h2>Input Admin Key</h2>
            </div>
            {!successfulValidation && (
                <>
                    <div>
                        <input type="text" className="bg-gray-900 text-l" placeholder="Admin Key" onChange={(e) => setInputKey(e.target.value)}></input>
                    </div>
                    {!correctKey && (
                        <div><h2>Inncorrect Admin Key</h2></div>
                    )}
                    <div>
                        <button 
                            className="inline-block px-8 py-4 m-2 bg-gray-700 text-white rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gray-800 hover:scale-105 focus:bg-gray-800 focus:scale-105 active:scale-95"
                            type="submit"
                            onClick={handleValidationCheck}
                        >Confirm
                        </button>
                    </div>
                </>
            )}
            {successfulValidation && (
                <>
                {/* <div>
                    <img src="https://png.pngtree.com/png-vector/20210409/ourmid/pngtree-green-check-mark-icon-design-template-vector-png-image_3136287.jpg" alternate="Green Checkmark"></img>
                </div> */}
                <div><h2>Validation Successful!</h2></div>
                </>
            )}
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

export default ValidatePopup;