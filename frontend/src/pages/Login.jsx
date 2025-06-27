import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext"; // adjust path if needed

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);



  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("[1] Form submitted");

    // --- The Fix is Here ---
    // 1. Get the base URL from the .env variable
    const API_BASE_URL = import.meta.env.VITE_API_GATEWAY_URL;
    
    // 2. Combine it with the correct path: /api/auth/login
    const API_URL = `${API_BASE_URL}/api/auth/login`;
    // --- End of Fix ---

    try {
        console.log("[2] Starting fetch request to:", API_URL); // New log to see the URL
        const startTime = Date.now();
        
        // Use the new API_URL variable in the fetch call
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({ username, password }),
        });

        const requestDuration = Date.now() - startTime;
        
        console.log(`[3] Request completed in ${requestDuration}ms`);
        console.log("[4] Response status:", response.status);
        
        if (!response.ok) {
            console.log("[5] Response not OK");
            const errorText = await response.text();
            console.log("[6] Error response body:", errorText);
            throw new Error(errorText || "Login failed");
        }

        console.log("[7] Parsing JSON response");
        const data = await response.json();
        console.log("[8] Parsed data:", data);
        
        console.log("[9] Calling auth context login");
        login(data.token, data.user);
        
        console.log("[10] Navigating to home");
        navigate("/");
    } catch (err) {
        console.error("[ERROR] Full error details:", {
            message: err.message,
            stack: err.stack,
            name: err.name
        });
        alert(`Login failed: ${err.message}`);
    }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-200">
      <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-sm mx-auto animate-fade-in border border-blue-100">
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
            placeholder="Username"
            className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-gray-50"
            required
            autoFocus
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-600 mb-1" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 text-lg bg-gray-50"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl w-full text-lg font-semibold shadow-md transition"
        >
          Login
        </button>
        {/* Optionally, add a divider and a sign up link */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          Don't have an account? <span className="text-blue-500 hover:underline cursor-pointer">Sign up</span>
        </div>
      </form>
    </div>
  );
};

export default Login;
