import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SplashPage = () => {
  const [adminSelected, setAdminSelected] = useState(false);
  const [authCode, setAuthCode] = useState("");
  const [incorrectAuthString, setIncorrectAuthString] = useState(false);

  const navigate = useNavigate();

  const handleSetRole = () => {
    const setRole = async () => {
      let response = await fetch("http://localhost:3000/oauth2/role", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ admin: adminSelected, authCode: authCode }),
      });
      response = await response.json();
      if (response.roleCreated) {
        navigate("/home");
      } else if (response?.messageCode === 0) {
        setIncorrectAuthString(true);
      }
    };
    setRole();
  };

  return (
    <div className="relative min-h-screen bg-gray-800 bg-[url('/army-paratroopers_background_II.png')] flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-800 opacity-95"></div>
      <div className = "absolute top-32"></div>

      <div className="relative z-10 bg-gray-900 p-8 rounded-lg shadow-lg mt-10 w-96 ">
        <div className="space-y-4">
          <div className="">
            <h1 className="text-center text-white text-2xl">Welcome!</h1>
            <h1 className="mt-8 text-white">
              Since this is your first login, please select your role below:
            </h1>
          </div>
          <div>
            <select
              className="w-full border rounded-md text-lg p-2"
              onChange={(e) => setAdminSelected(e.target.value === "true")}
            >
              <option value="false">User</option>
              <option value="true">Admin</option>
            </select>
          </div>
          {adminSelected && (
            <div>
              <h3 className="text-sm text-gray-400">Authorization code</h3>
              <input
                className="pl-2 border w-full mt-2 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                onChange={(e) => setAuthCode(e.target.value)}
                value={authCode}
              ></input>
              {incorrectAuthString && (
                <div className="text-right mt-2">
                  <p className="text-sm text-red-400">
                    Incorrect authentication code
                  </p>
                </div>
              )}
            </div>
          )}
          <div className="text-right pt-6">
            <button
              className="border p-2 rounded-md bg-blue-400 hover:bg-blue-500"
              onClick={handleSetRole}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplashPage;
