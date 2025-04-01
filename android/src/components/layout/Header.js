import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ user }) => {
  const location = useLocation();
  
  // Determine if we should use the dark logo based on path
  const isDarkMode = location.pathname === '/login' || location.pathname === '/signup';
  const logoSrc = isDarkMode ? '/images/dark-logo.png' : '/images/primary-logo.png';
  
  return (
    <header className="header">
      <div className="header-logo">
        <img src={logoSrc} alt="Efectivio" height="30" />
        {/* Removed the Efectivio text h1 */}
      </div>
      
      {!location.pathname.includes('/login') && !location.pathname.includes('/signup') && (
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link to="/scan" className={`nav-link ${location.pathname === '/scan' ? 'active' : ''}`}>Scan QR</Link>
          <Link to="/expenses" className={`nav-link ${location.pathname === '/expenses' ? 'active' : ''}`}>Expenses</Link>
        </div>
      )}
    </header>
  );
};

export default Header;
