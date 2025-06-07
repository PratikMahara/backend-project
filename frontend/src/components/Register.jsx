import React, { useState } from 'react';
import './register.css'



function Register() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleCoverImageChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!fullName || !email || !username || !password || !avatar) {
      setError('Please fill all required fields and upload an avatar.');
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('username', username);
    formData.append('password', password);
    formData.append('avatar', avatar);
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/register', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      setSuccess('Registration successful! You can now log in.');

      // Clear form fields
      setFullName('');
      setEmail('');
      setUsername('');
      setPassword('');
      setAvatar(null);
      setCoverImage(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
   
    
     <div className="vt-background">
      <a href="/login" className="vt-button vt-login-top-right">Login</a>
      <div className="vt-form-container">
        <h2>Register</h2>
        {error && <p className="vt-message error">{error}</p>}
        {success && <p className="vt-message success">{success}</p>}
        <form className="vt-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <input
            className="vt-input"
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            className="vt-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="vt-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="vt-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <label>
            Avatar (required):
            <input type="file" accept="image/*" onChange={handleAvatarChange} required />
          </label>
          <label>
            Cover Image (optional):
            <input type="file" accept="image/*" onChange={handleCoverImageChange} />
          </label>
          <button className="vt-button" type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default Register;
