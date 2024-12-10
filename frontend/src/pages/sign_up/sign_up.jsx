import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      localStorage.setItem("userId", data.userId);

      navigate("/home");
    } catch (error) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:3000/oauth2/login/google'
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 bg-cover">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 ">
        {!signupSuccess ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-8">Sign up</h1>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm block text-gray-600">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your username"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  ></input>
                </div>
                <label className="text-sm block text-gray-600 ">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Choose a password"
                    className="w-full pl-10 border pr-4 border-gray-200 rounded-md py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                  <div className="text-right">
                    <p className="text-xs text-gray-600 mt-1 ml-3">
                      Password must be at least 8 characters and contain
                      capitals, numbers, and symbols
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm text-gray-600 block">
                  Confirm your password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Confirm your password"
                    className="border pl-10 py-2 pr-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></input>
                </div>
              </div>
              {!passwordMatch && (
                <div className="text-red-400">
                  <p>Password does not match. Please try again.</p>
                </div>
              )}
              <div className="space-y-4">
                <button className="w-full py-2 border rounded-md bg-black bg-cover text-white hover:opacity-90">
                  SIGN UP
                </button>
              </div>
              <div className="flex justify-center">
                <div className="mt-2 border-2 rounded-full w-24 text-center bg-[url('/googlepng.png')] h-10 bg-cover ">
                  <button onClick={handleGoogleLogin}className="h-full w-full">
                    <p className="text-2xl"></p>
                  </button>
                </div>
              </div>
              <div className="relative flex justify-center">
                <p className="text-gray-600 mt-6">Already have an account?</p>
              </div>
            </div>
            <div className="relative flex justify-center">
              <p className="font-medium text-gray-500 hover:text-purple-600">
                <Link to="/">Login</Link>
              </p>
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-2xl font-bold text-center mb-8">Success!</h1>
            <h3>
              You will be redirected to the login page in...
              <Countdown
                date={Date.now() + 5000}
                renderer={({ seconds }) => {
                  return <span> {seconds}</span>;
                }}
                onComplete={() => navigate("/login")}
              />
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
