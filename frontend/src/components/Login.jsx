import React, { useState } from "react";
import "./login.css";
function Login() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!(email || username) || !password) {
      setError("Please fill all credentials");
      setSuccess(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
             credentials: "include",
        body: JSON.stringify({ email, username, password })
      });

      if (response.ok) {
        
        setSuccess("Login Succesfully");
      } else {
        setError("Login Failed");
      }
    } catch (error) {
      setError("Login Explicitly Terminated");
    }
  };

  return (
    <div className="vt-background">
      <div className="vt-form-container">
        <div className="vt-logo">
          <svg width="32" height="32" viewBox="0 0 32 32">
            <rect width="32" height="32" rx="8" fill="#ff414d"/>
            <polygon points="12,9 25,16 12,23" fill="#fff"/>
          </svg>
          VideoTube
        </div>
        <form className="vt-form" onSubmit={handleSubmit}>
          <input
            className="vt-input"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Email (optional)"
          />
          <input
            className="vt-input"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="Username (optional)"
          />
          <input
            className="vt-input"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <button className="vt-button" type="submit">Login</button>
          {error && <p className="vt-message error">{error}</p>}
          {success && <p className="vt-message success">Login Successful!</p>}
        </form>
      </div>
    </div>
  );
}

export default Login;
