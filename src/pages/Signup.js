import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Login.css';  // Same CSS as Login

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://blogifybackend-ti05.onrender.com/api/auth/createuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();

      if (response.ok) {
        const loginResult = await login(email, password);
        if (loginResult.success) {
          navigate('/dashboard');
        } else {
          setErrorMsg('Signup succeeded but login failed.');
        }
      } else {
        setErrorMsg(json.error || 'Signup failed');
      }
    } catch (error) {
      setErrorMsg('Network error: ' + error.message);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-form-wrapper">
          <h2 className="auth-title">Signup</h2>
          <p className="auth-subtitle">Create your new account</p>

          {errorMsg && <div className="auth-error">{errorMsg}</div>}

          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password (min 6 chars)</label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={6}
                required
              />
            </div>





            <button className="auth-button" type="submit">Signup</button>
          </form>
        </div>
         <div
          className="auth-image register-image"
          aria-hidden="true"
        >
          <div className="auth-overlay">
            <div className="auth-quote">
              <p>"Your journey to Content Creation Starts Here."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default Signup;
