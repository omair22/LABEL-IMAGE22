import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

const Login = () => {
  const [userType, setUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (userType === "user" && username === "neha" && password === "123") {
      navigate("/dashboard_admin", { state: { role: "user" } });
    } else if (userType === "admin" && username === "admin" && password === "123") {
      navigate("/dashboard_admin", { state: { role: "admin" } });
    } else {
      setError("Invalid username or password");
    }
  };
 
  const handleBack = () => {
    setUserType("");
    setUsername("");
    setPassword("");
    setError("");
  };

  return (
    <div className="container">
      {!userType && (
        <div className="user-type">
          <h1>Role Challenge</h1>
          <h2>Select User Type:</h2>
          <div className="user-type-buttons">
            <button onClick={() => setUserType("user")}>User</button>
            <button onClick={() => setUserType("admin")}>Admin</button>
          </div>
        </div>
      )}
      {userType && (
        <form className="form" onSubmit={handleLogin}>
          <h1>Login as {userType}</h1>
          {error && <p>{error}</p>}
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="button-group">
            <button type="submit">Login</button>
            {userType && (
              <button className="back-button" onClick={handleBack}>
                Back
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
