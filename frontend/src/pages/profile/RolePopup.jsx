import { useState, useContext } from 'react';
import { UserContext } from './Profile.jsx';
import "./profile.css";

function RolePopup ({onSetPopup, changeRole, originRole, adminStatus, roleChanged}) {

    const user = useContext(UserContext);

    let [ selectedValue, setSelectedValue ] = useState('');
    
    function handleRoleUpdate() {
        console.log(adminStatus);
        if (adminStatus && selectedValue !== originRole) {
            if (selectedValue === 'member') {
                console.log('Role updated to member')
                changeRole('member');
                roleChanged(true);
                onSetPopup();
            } else if (selectedValue === 'leader') {
                console.log('Role updated to leader')
                changeRole('leader');
                roleChanged(true)
                onSetPopup();
            } else if (selectedValue === 'admin') {
                console.log('Role updated to admin')
                changeRole('admin');
                roleChanged(true);
                onSetPopup();
            }
        } else {
            onSetPopup();
        }
    }
    
    return (
                        <div className="bg-gray-800 border border-gold-600 p-4 rounded-md text-2xl text-center flex flex-col space-y-8 popup-overlay">
                            <div>
                                <h2 className="font-bold">Update Your Role</h2>
                            </div>
                            <div>
                                <select name="role" id="role" className="w-full pl-2 pr-4 py-2 text-black border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400" onChange={(e) => setSelectedValue(e.target.value)}>
                                    <option value="member">Member</option>
                                    <option value="leader">Leader</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            {!adminStatus && (
                                <div>
                                    <h2 className="text-color-red-400">Role Change Unauthorized</h2>
                                </div>
                            )}
                            <div>
                                <button 
                                    className="inline-block px-4 py-2 m-2 bg-gold-400 text-black font-bold rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gold-500 hover:scale-105 focus:bg-gold-500 focus:scale-105 active:scale-95"
                                    type="submit"
                                    onClick={handleRoleUpdate}
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

export default RolePopup;