import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // 1. Added state to track visibility
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL;
    const API_URL = `${API_BASE_URL}/api/auth/login`;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Login failed");
      }

      const data = await response.json();
      login(data.token, data.user);
      navigate("/");
    } catch (err) {
      alert(`Login failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-sm mx-auto border border-blue-100">
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-1">Sign In</h2>
          <p className="text-gray-400 text-sm">Welcome back! Please login to your account.</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-600 mb-1" htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-gray-50"
            required
          />
        </div>

        <div className="mb-6 relative">
          <label className="block text-gray-600 mb-1" htmlFor="password">Password</label>
          <div className="relative">
            <input
              id="password"
              // 2. Dynamic type: switches between 'password' and 'text'
              type={showPassword ? "text" : "password"} 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-gray-50 pr-12"
              required
            />
            {/* 3. The Toggle Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-500 text-sm font-medium"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl w-full text-lg font-semibold shadow-md transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
