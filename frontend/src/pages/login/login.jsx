import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [badUserResponse, setBadUserResponse] = useState({
    user: true,
    passwordMatch: true,
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    setBadUserResponse({ user: true, passwordMatch: true });
    try {
      let response = await fetch("http://localhost:3000/local/login", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ email: email, password: password }),
        credentials: "include",
      });
      console.log(response);
      response = await response.json();
      console.log(response);
      if (response?.redirectUrl) {
        navigate(response.redirectUrl);
      } else if (response.userFound && !response.user) {
        setBadUserResponse({ user: true, passwordMatch: false });
      } else {
        setBadUserResponse({ user: false, passwordMatch: true });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:3000/oauth2/login/google";
  };

  const handleDevLogin = () => {
    fetch('http://localhost:3000/local/dev', {
      credentials: 'include'
    })
    .then((res)=>res.json())
    .then((data)=>{
      if(data) navigate('/home')
    })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-grey-800 bg-opacity-40 bg-[url('/army-paratroopers_background_II.png')] ">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-white mb-8">Login</h1>
        <div className = "text-center ">

        <button className = "w-full h-full text-white hover:text-gold-400"
        onClick={handleDevLogin}>Dev Login</button>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Email</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Type your email"
                className="w-full pl-2 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            {!badUserResponse?.user && (
              <div className="text-right">
                <p className="text-sm text-red-400">User not found</p>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-sm text-gray-400">Password</label>
            <div className="relative">
              <input
                type="password"
                placeholder="Type your password"
                className="w-full pl-2 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-400"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></input>
            </div>
            {!badUserResponse?.passwordMatch && (
              <div className="text-right">
                <p className="text-sm text-red-400">Incorrect Password</p>
              </div>
            )}
            <div className="text-right">
              <a
                href="#"
                className="text-sm text-gray-400 hover:text-gold-400"
              >
                Forgot Password?
              </a>
            </div>
            <button
              className="w-full py-2 bg-gold-600 bg-cover text-black font-bold rounded-md hover:opacity-90 transition-opacity"
              onClick={handleLogin}
            >
              LOGIN
            </button>
            <div className="flex flex-col items-center pt-3 text-sm text-white">
              <p>Login with</p>
              <div className="  rounded-full w-24 text-center bg-[url('/googlepng.png')] h-10 bg-cover ">
                <button
                  onClick={handleGoogleLogin}
                  className="h-full w-full"
                ></button>
              </div>
            </div>
            <div className="text-center text-sm text-gray-200 pt-4">
              <p>Or Sign Up Below</p>
              <button className="mt-2 font-medium text-gray-400 hover:text-gold-400">
                <Link to="/signup">Sign Up</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
