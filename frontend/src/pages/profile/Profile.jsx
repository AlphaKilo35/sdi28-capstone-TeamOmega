import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";
import "./profile.css";
import EmailPopup from "./EmailPopup.jsx";
import RolePopup from "./RolePopup.jsx";
import JmPopup from "./JmPopup.jsx";
import ValidatePopup from "./ValidatePopup";
import { CircleUserRound } from "lucide-react";

export const UserContext = createContext({});

function Profile() {
  let [user, setUser] = useState({});
  let [currentUserId, setCurrentUserId] = useState(0);
  let [isAdmin, setIsAdmin] = useState(false);
  let [isLoading, setIsLoading] = useState(true);

  let [email, setEmail] = useState("");
  let [emailPopup, setEmailPopup] = useState(false);
  let [emailChange, setEmailChange] = useState(false);

  let [role, setRole] = useState("");
  let [rolePopup, setRolePopup] = useState(false);
  let [roleChange, setRoleChange] = useState(false);

  let [jm, setJm] = useState("");
  let [jmPopup, setJmPopup] = useState(false);
  let [jmChange, setJmChange] = useState(false);

  let [validatePopup, setValidatePopup] = useState(false);
  let [tokenCorrect, setTokenCorrect] = useState(false);
  let [savedChanges, setSavedChanges] = useState(false);

  useEffect(() => {
    fetch("http://localhost:3000/local/verify", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setCurrentUserId(data?.id);
        console.log("Current userId on profile load:", data.id);
        if (!data) navigate("/login");
      })
      .catch((err) => {
        console.error("Auth verification failed", err);
        navigate("/login");
      });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:3000/users/${currentUserId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data[0]) {
          setUser(data[0]);
          setEmail(data[0].email);
          setRole(data[0].role);
          setJm(data[0].jm);
          setIsLoading(false);
          if (data[0].role === "admin") {
            setIsAdmin(true);
          }
        }
      });
  }, [currentUserId]);

  function Capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function toggleEmailPopup() {
    setEmailPopup(!emailPopup);
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
        console.log("Token incorrect");
        setValidatePopup(true);
      } else {
        console.log("Changes Saved successfully");
        fetch(`http://localhost:3000/users/${user.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updateData),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("user updated successfully: ", data);
          })
          .catch((err) => {
            console.log("Failed to fetch user:", err);
            res.status(400).json({ err: "Failed to fetch user" });
          });
        setSavedChanges(true);
      }
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  } else {
    return (
      <UserContext.Provider value={user}>
        <div className="relative h-[calc(100vh-96px)] gap-6 bg-gray-800 flex items-center justify-center overflow-hidden z-10 bg-[url('/army-paratroopers_background_II.png')] bg-cover">
          <div className="absolute inset-0 bg-gray-900 text-gray-200 opacity-95"></div>
          <div className="bg-gray-800 flex flex-col items-center border border-gold-400  rounded-lg z-10 h-[75vh] w-96 p-4 shadow-md">
            <div>
              <CircleUserRound className="h-32 w-32 text-white " />
              <h1 className="text-white text-lg font-bold text-center">
                {user.name ? user.name : 'Joe Snuffy'}
              </h1>
            </div>

            <div className="text-white w-full space-y-4 mt-10">
              <div className="bg-gray-500 rounded-md p-4 w-full">
                <h3>MOS: {user.mos ? user.mos : '11B'} </h3>
              </div>
              <div className="bg-gray-700 rounded-md p-4 w-full">
                <h3>Rank: {user.rank ? user.rank : 'PFC'} </h3>
              </div>
              <div className="bg-gray-500 rounded-md p-4 w-full">
                <h3>UIC: {user.uic ? user.uic : 'WACGD0'} </h3>
              </div>
              <div className="bg-gray-700 rounded-md p-4 w-full">
                <h3>
                  ETS: <span className="text-sm">{user.ets ? user.ets.slice(9) : '2025-04-20'}</span>{" "}
                </h3>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 top-20 z-10 p-4 border border-gold-400 rounded-lg shadow-lg w-96 h-[75vh] shadow-lg">
            <div className="text-white flex items-center justify-between mt-8 text-left">
              <div>
                <h1 className="font-bold">Email: </h1>
                <span>
                  <h2 className="text-md">{email}</h2>
                </span>
              </div>
              <div>
                <button
                  className="inline-block px-2 py-1 ml-6 bg-gold-400 text-black text-bold rounded-lg cursor-pointer text-center transition-transform transform hover:bg-gold-500 hover:scale-105 focus:bg-gold-500 focus:scale-105 active:scale-95"
                  type="submit"
                  onClick={toggleEmailPopup}
                >
                  Update Email
                </button>
              </div>

              {emailPopup && (
                <EmailPopup
                  onSetPopup={toggleEmailPopup}
                  changeEmail={setEmail}
                  originEmail={user.email}
                  emailChanged={setEmailChange}
                />
              )}
            </div>
            <div className="text-white flex items-center justify-between mt-20 text-left">
              <div>
                <h1 className="font-bold">Role: </h1>
                <span>
                  <h2 className="text-md">{Capitalize(role)}</h2>
                </span>
              </div>
              <div className="text-right">
                <button
                  className="inline-block px-2 py-1 mt-2 bg-gold-400 text-black text-bold rounded-lg cursor-pointer text-center transition-transform transform hover:bg-gold-500 hover:scale-105 focus:bg-gold-500 focus:scale-105 active:scale-95"
                  type="submit"
                  onClick={toggleRolePopup}
                >
                  Update Role
                </button>
              </div>
              {rolePopup && (
                <RolePopup
                  onSetPopup={toggleRolePopup}
                  changeRole={setRole}
                  originRole={user.role}
                  adminStatus={isAdmin}
                  roleChanged={setRoleChange}
                />
              )}
            </div>
            <div className="text-white flex items-center justify-between mt-20 text-left">
              <div>
                <h1 className="font-bold">JM: </h1>
                <span>
                  <h2 className="text-md">{jm ? 'Yes' : 'No'}</h2>
                </span>
              </div>
              <div className="text-right">
                <button
                  className="inline-block px-2 py-1 mt-2 bg-gold-400 text-black text-bold rounded-lg cursor-pointer text-center transition-transform transform hover:bg-gold-500 hover:scale-105 focus:bg-gold-500 focus:scale-105 active:scale-95"
                  type="submit"
                  onClick={toggleJmPopup}
                >
                  Update JM
                </button>
              </div>

              {jmPopup && (
                <JmPopup
                  onSetPopup={toggleJmPopup}
                  changeJm={setJm}
                  adminStatus={isAdmin}
                  jmChanged={setJmChange}
                />
              )}

            </div>
            <div className=" font-bold text-center mt-20">
              <button
                className="inline-block px-4 py-2 mt-20 bg-gold-400 text-black text-bold rounded-lg cursor-pointer  transition-transform transform hover:bg-gold-500 hover:scale-105 focus:bg-gold-500 focus:scale-105 active:scale-95"
                type="submit"
                onClick={handleSaveChanges}
              >
                Save Changes
              </button>
            </div>
            {validatePopup && (
              <ValidatePopup
                onSetPopup={toggleValidatePopup}
                correctToken={setTokenCorrect}
                isCorrect={tokenCorrect}
              />
            )}
            {savedChanges && (
              <div className="text-xl text-green-400 text-center mt-10">
                <h2>Changes Saved Successfully</h2>
              </div>
            )}
          </div>
        </div>
      </UserContext.Provider>
    );
  }
}

export default Profile;
