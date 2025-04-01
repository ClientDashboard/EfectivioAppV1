import React from 'react';
import { useNavigate } from 'react-router-dom';

const Success = () => {
  const navigate = useNavigate();
  
  return (
    <div className="auth-container">
      <div className="auth-success">
        <div className="success-icon">
          <i className="fi fi-sr-check"></i>
        </div>
        
        <h2 className="auth-title">Successful</h2>
        <p className="auth-subtitle">Congratulations! Your password has been changed. Click continue to login.</p>
        
        <button onClick={() => navigate('/login')} className="primary-button">Continue</button>
      </div>
    </div>
  );
};

export default Success;
