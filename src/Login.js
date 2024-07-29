import React, { useState } from "react";
import axios from "axios";
import './App.css'; 
import { useNavigate } from "react-router-dom"; // Import useNavigate

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:9090/api/login", { email, password });
      alert("Login successful!");
      navigate("/chat"); // Redirect to Chat component after successful login
    } catch (error) {
      alert("Login failed!");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
}

export default Login;


