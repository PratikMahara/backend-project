import React, { useState } from "react";

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
     <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email (optional)"
      />
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username (optional)"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {success && <p style={{color: 'green'}}>Login Successful!</p>}
    </form>
  );
}

export default Login;
