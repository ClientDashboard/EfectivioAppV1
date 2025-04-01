import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EmailEntry = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, send reset email here
    navigate('/forgot-password/verify', { state: { email } });
  };
  
  return (
    <div className="auth-container">
      <button className="back-button" onClick={() => navigate('/login')}>
        <i className="fi fi-rr-arrow-left"></i>
      </button>
      
      <h2 className="auth-title">Forgot password</h2>
      <p className="auth-subtitle">Please enter your email to reset the password</p>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Your Email</label>
          <input 
            type="email" 
            className="form-input" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="Enter your email"
            required 
          />
        </div>
        
        <button type="submit" className="primary-button">Reset Password</button>
      </form>
    </div>
  );
};

export default EmailEntry;
