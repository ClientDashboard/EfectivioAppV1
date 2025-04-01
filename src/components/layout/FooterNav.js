import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AiFillHome, AiOutlineQrcode, AiOutlineFileText, AiOutlineUser } from 'react-icons/ai';

const FooterNav = () => {
  const location = useLocation();

  const tabs = [
    { to: '/home', icon: <AiFillHome size={24} />, label: 'Home' },
    { to: '/scan', icon: <AiOutlineQrcode size={32} style={{ color: '#39FFBD' }} />, label: 'Scan' },
    { to: '/expenses', icon: <AiOutlineFileText size={24} />, label: 'Expenses' },
    { to: '/profile', icon: <AiOutlineUser size={24} />, label: 'Profile' },
  ];

  return (
    <nav style={styles.navbar}>
      {tabs.map((tab) => (
        <Link
          key={tab.to}
          to={tab.to}
          style={{
            ...styles.link,
            color: location.pathname === tab.to ? '#062644' : '#666',
            fontWeight: location.pathname === tab.to ? 'bold' : 'normal',
          }}
        >
          <div style={styles.icon}>{tab.icon}</div>
          <span style={styles.label}>{tab.label}</span>
        </Link>
      ))}
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTop: '1px solid #eee',
    padding: '10px 0',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 1000,
  },
  link: {
    textDecoration: 'none',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontSize: '12px',
  },
  icon: {
    marginBottom: '4px',
  },
  label: {
    fontSize: '12px',
  },
};

export default FooterNav;
