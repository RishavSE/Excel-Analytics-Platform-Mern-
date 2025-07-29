import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { API } from "../api/api";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role] = useState("user");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      const res = await API.post("/register", { email, password, role });
      localStorage.setItem("token", res.data.token);
      setMessage("✅ Registered successfully!");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "❌ Registration failed.");
    }
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <h2 className="signup-title">Create Your Account</h2>
        <form className="signup-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

      

          <button type="submit" className="signup-btn">Sign Up</button>

          {message && <p className="signup-message">{message}</p>}

          {/* Only Back to Sign In button */}
          <button
            type="button"
            className="secondary-btn"
            onClick={handleBackToLogin}
          >
            Back to Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
