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
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        
        const data = await response.json();
        console.log("Login successful", data);
  
        
  // ✅ Console log the specific token & user
  console.log("Token:", data.token, "User:", data.user);


       // ✅ NOW passing token & user
  login(data.token, data.user);

        navigate("/");
      } else {
        console.error("Login failed");
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
      <h2 className="text-2xl mb-4">Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className="border p-2 w-full mb-2"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="border p-2 w-full mb-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
      >
        Login
      </button>
    </form>
  );
};

export default Login;
