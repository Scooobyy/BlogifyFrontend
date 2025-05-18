import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const { forgotPassword } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const result = await forgotPassword(email);

    if (result.success) {
      setMessage(result.message);
      setTimeout(() => {
        navigate('/reset-password');
      }, 2000);
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* Image section */}
        <div className="auth-image">
          <div className="auth-overlay">
            <div className="auth-quote">
              <p>“Reset your password and get back on track!”</p>
            </div>
          </div>
        </div>

        {/* Form section */}
        <div className="auth-form-wrapper">
          <h2 className="auth-title">Forgot Password</h2>
          <p className="auth-subtitle">Enter your registered email to receive an OTP</p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <div className="auth-error">{error}</div>}
            {message && <div className="auth-success" style={{ color: 'green' }}>{message}</div>}

            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button className="auth-button" type="submit">Send OTP</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
