import { useState, useContext } from 'react';
import { UserContext } from './Profile.jsx';
import {Check} from 'lucide-react'
import "./profile.css";

function ValidatePopup ({onSetPopup, correctToken, isCorrect}) {

    const [ successfulValidation, setSuccessfulValidation ] = useState(true);
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
        <div className="bg-gray-800 border border-gold-600 p-4 rounded-md text-2xl text-center flex flex-col space-y-4 popup-overlay">
            {!successfulValidation && (
                <div>
                    <h2 className="font-bold text-white">Input Admin Key</h2>
                </div>
            )}
            {!successfulValidation && (
                <>
                    <div>
                        <input type="text" className="w-full pl-2 pr-4 py-2 text-black border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400" placeholder="Admin Key" onChange={(e) => setInputKey(e.target.value)}></input>
                    </div>
                    {!correctKey && (
                        <div><h2 className="text-color-red-400">Inncorrect Admin Key</h2></div>
                    )}
                    <div>
                        <button
                            className="inline-block px-4 py-2 m-2 bg-gold-400 text-black font-bold rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gold-500 hover:scale-105 focus:bg-gold-500 focus:scale-105 active:scale-95"
                            type="submit"
                            onClick={handleValidationCheck}
                        >Confirm
                        </button>
                    </div>
                </>
            )}
            {successfulValidation && (
                <div className = "z-100 flex flex-col items-center">
                    <div><h2 className="text-2xl z-100 text-white">Validation Successful!</h2></div>
                    <div>
                        <Check className = {` transition transform ${!successfulValidation ? 'min-h-0 translate-y-0px' : 'min-h-max translate-y-(-20px) duration-300'} bg-green-400 rounded-md mt-2 w-12 h-12 text-white `} />
                    </div>
                </div>
            )}
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

export default ValidatePopup;