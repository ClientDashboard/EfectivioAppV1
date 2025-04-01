import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/layout/Header';
import FooterNav from './components/layout/FooterNav';
import Home from './components/Home';
import ExpenseList from './components/expenses/ExpenseList';
import ExpenseDetail from './components/expenses/ExpenseDetail';
import QRCodeScanner from './components/scanner/QRCodeScanner';
import Profile from './components/profile/Profile';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import './styles/App.css';
import './styles/auth.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Simulate checking for existing session
  useEffect(() => {
    const checkUser = async () => {
      try {
        // In a real app, check if user is already logged in
        const storedUser = localStorage.getItem('efectivio_user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Session check error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, []);
  
  const handleLogin = (credentials) => {
    // Simulate login success
    const loggedInUser = {
      id: 1,
      username: 'miguelalvarol',
      email: credentials.email,
      avatar: 'M'
    };
    
    setUser(loggedInUser);
    localStorage.setItem('efectivio_user', JSON.stringify(loggedInUser));
  };
  
  const handleGoogleLogin = () => {
    // Simulate Google login success
    const googleUser = {
      id: 2,
      username: 'miguelalvarol',
      email: 'miguelalvarol@gmail.com',
      avatar: 'M'
    };
    
    setUser(googleUser);
    localStorage.setItem('efectivio_user', JSON.stringify(googleUser));
  };
  
  const handleSignUp = (userData) => {
    // Simulate signup success
    const newUser = {
      id: 3,
      username: userData.username,
      email: userData.email,
      avatar: userData.username.charAt(0).toUpperCase()
    };
    
    setUser(newUser);
    localStorage.setItem('efectivio_user', JSON.stringify(newUser));
  };
  
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('efectivio_user');
  };
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return (
    <Router>
      <div className="app">
        <Routes>
          {/* Auth Routes - No Header */}
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={handleLogin} onGoogleLogin={handleGoogleLogin} />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <SignUp onSignUp={handleSignUp} onGoogleLogin={handleGoogleLogin} />} />
          <Route path="/forgot-password/*" element={user ? <Navigate to="/" /> : <ForgotPassword />} />
          
          {/* App Routes - With Header */}
          <Route path="*" element={
            <>
              <Header user={user} />
              <Routes>
                <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
                <Route path="/scan" element={user ? <QRCodeScanner /> : <Navigate to="/login" />} />
                <Route path="/expenses" element={user ? <ExpenseList /> : <Navigate to="/login" />} />
                <Route path="/expenses/:id" element={user ? <ExpenseDetail /> : <Navigate to="/login" />} />
                <Route path="/profile" element={user ? <Profile user={user} onLogout={handleLogout} /> : <Navigate to="/login" />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              {user && <FooterNav />}
            </>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
