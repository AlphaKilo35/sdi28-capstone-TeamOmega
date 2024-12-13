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
                        <div className="bg-gray-800 border border-gold-600 p-4 rounded-md text-2xl font-bold text-center flex flex-col space-y-8 popup-overlay">
                            <div>
                                <h2>Update Your Role</h2>
                            </div>
                            <div>
                                <select name="role" id="role" className="bg-gray-900 text-l" onChange={(e) => setSelectedValue(e.target.value)}>
                                    <option value="member">Member</option>
                                    <option value="leader">Leader</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>
                            {!adminStatus && (
                                <div>
                                    <h2>Role Change Unauthorized</h2>
                                </div>
                            )}
                            <div>
                                <button 
                                    className="inline-block px-8 py-4 m-2 bg-gray-700 text-white rounded-lg cursor-pointer text-lg text-center transition-transform transform hover:bg-gray-800 hover:scale-105 focus:bg-gray-800 focus:scale-105 active:scale-95"
                                    type="submit"
                                    onClick={handleRoleUpdate}
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

export default RolePopup;