import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PasswordReset = () => {
  const [confirmed, setConfirmed] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  
  const handleConfirm = () => {
    setConfirmed(true);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // In a real app, update password here
    navigate('/forgot-password/success');
  };
  
  if (!confirmed) {
    return (
      <div className="auth-container">
        <button className="back-button" onClick={() => navigate('/forgot-password/verify')}>
          <i className="fi fi-rr-arrow-left"></i>
        </button>
        
        <div className="auth-message-box">
          <h2 className="auth-title">Password reset</h2>
          <p className="auth-subtitle">Your password has been successfully reset. Click confirm to set a new password.</p>
          
          <button onClick={handleConfirm} className="primary-button">Confirm</button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="auth-container">
      <button className="back-button" onClick={() => setConfirmed(false)}>
        <i className="fi fi-rr-arrow-left"></i>
      </button>
      
      <h2 className="auth-title">Set a new password</h2>
      <p className="auth-subtitle">Create a new password. Ensure it differs from previous ones for security.</p>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label">Password</label>
          <div className="password-input-container">
            <input 
              type="password" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your new password"
              required 
            />
            <button type="button" className="password-toggle">
              <i className="fi fi-rr-eye"></i>
            </button>
          </div>
        </div>
        
        <div className="form-group">
          <label className="form-label">Confirm Password</label>
          <div className="password-input-container">
            <input 
              type="password" 
              className="form-input" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              required 
            />
            <button type="button" className="password-toggle">
              <i className="fi fi-rr-eye"></i>
            </button>
          </div>
        </div>
        
        <button type="submit" className="primary-button">Update Password</button>
      </form>
    </div>
  );
};

export default PasswordReset;
