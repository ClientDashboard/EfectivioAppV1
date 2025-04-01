import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const FooterNav = () => {
  const location = useLocation();
  
  return (
    <nav className="footer-nav">
      <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
        <div className="nav-item-icon">
          <i className="fi fi-sr-home"></i>
        </div>
        <span>Home</span>
      </Link>
      
      <Link to="/scan" className={`nav-item ${location.pathname === '/scan' ? 'active' : ''}`}>
        <div className="nav-item-icon">
          <i className="fi fi-rr-qr-scan"></i>
        </div>
        <span>Scan</span>
      </Link>
      
      <Link to="/expenses" className={`nav-item ${location.pathname === '/expenses' ? 'active' : ''}`}>
        <div className="nav-item-icon">
          <i className="fi fi-rr-receipt"></i>
        </div>
        <span>Expenses</span>
      </Link>
      
      <Link to="/profile" className={`nav-item ${location.pathname === '/profile' ? 'active' : ''}`}>
        <div className="nav-item-icon">
          <i className="fi fi-sr-user"></i>
        </div>
        <span>Profile</span>
      </Link>
    </nav>
  );
};

export default FooterNav;
