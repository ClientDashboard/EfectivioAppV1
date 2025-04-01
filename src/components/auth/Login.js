import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = ({ onLogin, onGoogleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };
  
  return (
    <div className="auth-container">
      {/* Logo */}
      <div className="auth-logo">
        <img src="/images/primary-logo.png" alt="Efectivio" className="auth-logo-img" />
      </div>
      
      {/* Removed "Get Started Now" heading */}
      <p className="auth-subtitle">Create an account or log in to explore about our app</p>
      
      {/* More stretched tabs */}
      <div className="auth-tabs">
        <button 
          className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
          onClick={() => setActiveTab('login')}
        >
          Log In
        </button>
        <button 
          className={`auth-tab ${activeTab === 'signup' ? 'active' : ''}`}
          onClick={() => setActiveTab('signup')}
        >
          Sign Up
        </button>
      </div>
      
      {activeTab === 'login' ? (
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              className="form-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="your@email.com"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="password-input-container">
              <input 
                type={showPassword ? "text" : "password"}
                id="password" 
                className="form-input" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                placeholder="••••••••"
                required 
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "fi fi-rr-eye-crossed" : "fi fi-rr-eye"}></i>
              </button>
            </div>
          </div>
          
          <div className="form-actions">
            <div className="remember-me">
              <input type="checkbox" id="remember" className="custom-checkbox" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/forgot-password" className="forgot-password-link">Forgot Password?</Link>
          </div>
          
          <button type="submit" className="primary-button">Log In</button>
          
          {/* Move Google login button up - no divider needed */}
          <div className="google-login-container">
            <button onClick={onGoogleLogin} className="google-button">
              <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" width="24" height="24" />
              <span>Sign In with Google</span>
            </button>
          </div>
        </form>
      ) : (
        <form className="auth-form" onSubmit={(e) => { e.preventDefault(); setActiveTab('login'); }}>
          <div className="form-group">
            <label className="form-label" htmlFor="signup-email">Email</label>
            <input 
              type="email" 
              id="signup-email" 
              className="form-input" 
              placeholder="your@email.com"
              required 
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="signup-password">Password</label>
            <div className="password-input-container">
              <input 
                type={showPassword ? "text" : "password"}
                id="signup-password" 
                className="form-input" 
                placeholder="••••••••"
                required 
              />
              <button 
                type="button" 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                <i className={showPassword ? "fi fi-rr-eye-crossed" : "fi fi-rr-eye"}></i>
              </button>
            </div>
          </div>
          
          <button type="submit" className="primary-button">Sign Up</button>
          
          {/* Move Google signup button up */}
          <div className="google-login-container">
            <button onClick={onGoogleLogin} className="google-button">
              <img src="https://cdn-icons-png.flaticon.com/512/281/281764.png" alt="Google" width="24" height="24" />
              <span>Sign Up with Google</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Login;
