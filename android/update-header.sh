#!/bin/bash
# This script updates the Header.js to remove the Efectivio text

echo "Updating Header.js to remove Efectivio text"
cat > src/components/layout/Header.js << 'EOL'
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
EOL

echo "Adding CSS to hide header title (in case it's referenced elsewhere)"
# Add CSS to ensure the header title is hidden
cat >> src/styles/App.css << 'EOL'
/* Hide header title */
.header-title {
  display: none;
}
EOL

echo "Building and syncing with Capacitor"
# Build and sync with Capacitor
npm run build
npx cap sync android

echo "All done! Run 'npx cap open android' to open Android Studio and see the changes."