#!/bin/bash
# This script updates the login UI with the latest feedback

cd ~/Efectivio-App/efectivio-app || exit 1
echo "Working in $(pwd)"

# Update Login component with requested changes
cat > src/components/auth/Login.js << 'EOL'
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
EOL

# Update CSS with improved styles for login
cat > src/styles/auth.css << 'EOL'
/* Enhanced Auth Styles */
.auth-container {
  display: flex;
  flex-direction: column;
  padding: 30px 20px;
  min-height: 100vh;
  background-color: white;
  max-height: 100vh; /* Make sure it fits on one screen */
  overflow-y: auto;
}

.auth-logo {
  display: flex;
  justify-content: center;
  margin-bottom: 25px;
}

.auth-logo-img {
  height: 60px;
}

.auth-subtitle {
  text-align: center;
  color: #888;
  margin-bottom: 25px;
  line-height: 1.5;
  font-size: 16px;
}

/* More stretched tabs */
.auth-tabs {
  display: flex;
  margin-bottom: 25px;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 3px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  height: 46px; /* Fixed height */
}

.auth-tab {
  flex: 1;
  height: 100%;
  text-align: center;
  background: none;
  border: none;
  border-radius: 5px;
  font-weight: 500;
  font-size: 16px;
  color: #888;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.auth-tab.active {
  background-color: white;
  color: #0a2647;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 18px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 14px;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  font-size: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
}

.form-input:focus {
  border-color: #1677ff;
  box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.1);
  outline: none;
}

.form-input::placeholder {
  color: #bbb;
}

.password-input-container {
  position: relative;
}

.password-toggle {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #888;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.password-toggle:hover {
  color: #1677ff;
}

.form-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #555;
  font-size: 15px;
}

.custom-checkbox {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  appearance: none;
  -webkit-appearance: none;
  background-color: white;
  border: 1.5px solid #e0e0e0;
  cursor: pointer;
  position: relative;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.custom-checkbox:checked {
  background-color: #1677ff;
  border-color: #1677ff;
}

.custom-checkbox:checked::after {
  content: '';
  position: absolute;
  left: 6px;
  top: 3px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.forgot-password-link {
  color: #1677ff;
  font-size: 15px;
  text-decoration: none;
  font-weight: 500;
}

.forgot-password-link:hover {
  text-decoration: underline;
}

.primary-button {
  width: 100%;
  padding: 14px;
  background-color: #1677ff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 20px;
  box-shadow: 0 2px 6px rgba(22, 119, 255, 0.2);
  transition: all 0.2s;
}

.primary-button:hover {
  background-color: #0958d9;
  box-shadow: 0 4px 8px rgba(22, 119, 255, 0.3);
}

.primary-button:active {
  transform: translateY(1px);
}

/* Google button container - moved up */
.google-login-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

/* Styled Google button */
.google-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  background-color: white;
  color: #333;
  border: 1.5px solid #e0e0e0;
  border-radius: 8px;
  padding: 12px 20px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.2s;
  width: 100%;
}

.google-button:hover {
  background-color: #f8f8f8;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
}

.google-button img {
  width: 24px;
  height: 24px;
}
EOL

# Build and sync with Capacitor
echo "===== Building and syncing with Capacitor ====="
npm run build
npx cap sync android

echo "===== All done! ====="
echo "Run 'npx cap open android' to open Android Studio and build the app"
echo "The login screen has been updated based on your feedback"