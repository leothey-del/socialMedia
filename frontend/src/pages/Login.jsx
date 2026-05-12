import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("[1] Form submitted");

    const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL;
    const API_URL = `${API_BASE_URL}/api/auth/login`;

    try {
      console.log("[2] Starting fetch request to:", API_URL);
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
      console.error("[ERROR] Details:", err);
      alert(`Login failed: ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-sm mx-auto border border-blue-100"
      >
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-3xl font-bold text-blue-700 mb-1">Sign In</h2>
          <p className="text-gray-500 text-sm">Welcome back! Please login to your account.</p>
        </div>

        {/* Username Input */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter Username"
            /* Forced text-black and bg-white for visibility */
            className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white text-black placeholder-gray-400"
            required
            autoFocus
          />
        </div>

        {/* Password Input (Set to type="text" to avoid dots) */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-1" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="text" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter Password"
            /* Forced text-black and bg-white so you can see what you type */
            className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-white text-black placeholder-gray-400"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl w-full text-lg font-semibold shadow-md transition duration-200"
        >
          Login
        </button>

        <div className="mt-6 text-center text-gray-500 text-sm">
          Don't have an account? <span className="text-blue-500 hover:underline cursor-pointer font-medium">Sign up</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
