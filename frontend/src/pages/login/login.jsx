import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LogIn = () => {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log(data)

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            localStorage.setItem('userId', data.userId);

            navigate('/home');
        } catch (error) {
            setError(error.message);
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900 bg-cover">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <h1 className="text-2xl font-bold text-center mb-8">Login</h1>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Username</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type your username"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm text-gray-600">Password</label>
                <div className="relative">
                  <input
                    type="password"
                    placeholder="Type your password"
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-400"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  ></input>
                </div>
                <div className="text-right">
                  <a
                    href="#"
                    className="text-sm text-gray-600 hover:text-purple-500"
                  >
                    Forgot Password?
                  </a>
                </div>
                <button
                  className="w-full py-2 bg-black bg-cover text-white rounded-md hover:opacity-90 transition-opacity"
                  onClick={handleLogin}
                >
                  LOGIN
                </button>

                <div className="text-center text-sm text-gray-500 pt-16">
                  <p>Or Sign Up Below</p>
                  <button className="mt-2 font-medium text-gray-600 hover:text-purple-500">
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