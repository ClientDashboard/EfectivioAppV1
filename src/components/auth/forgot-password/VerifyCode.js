import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VerifyCode = () => {
  const [code, setCode] = useState(['', '', '', '', '']);
  const inputRefs = [
    useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)
  ];
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || 'your email';
  
  useEffect(() => {
    // Focus first input on mount
    inputRefs[0].current.focus();
  }, []);
  
  const handleChange = (index, value) => {
    if (value.length > 1) value = value[0]; // Only allow one character
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    
    // Auto-advance to next input
    if (value && index < 4) {
      inputRefs[index + 1].current.focus();
    }
  };
  
  const handleKeyDown = (index, e) => {
    // Go back on backspace if empty
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, verify code here
    navigate('/forgot-password/reset');
  };
  
  const handleResend = () => {
    // In a real app, resend verification email
    alert('Verification code resent');
  };
  
  return (
    <div className="auth-container">
      <button className="back-button" onClick={() => navigate('/forgot-password')}>
        <i className="fi fi-rr-arrow-left"></i>
      </button>
      
      <h2 className="auth-title">Check your email</h2>
      <p className="auth-subtitle">We sent a reset link to {email}<br />Enter 5 digit code that mentioned in the email</p>
      
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="verification-code">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={inputRefs[index]}
              type="text"
              className="code-input"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              maxLength={1}
            />
          ))}
        </div>
        
        <button 
          type="submit" 
          className="primary-button"
          disabled={!code.every(digit => digit)}
        >
          Verify Code
        </button>
      </form>
      
      <div className="resend-link">
        Haven't got the email yet? <button onClick={handleResend} className="text-button">Resend email</button>
      </div>
    </div>
  );
};

export default VerifyCode;
