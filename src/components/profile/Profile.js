import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Profile = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('settings'); // 'settings' or 'activity'
  
  // Sample user data for demonstration
  const userData = user || {
    username: 'miguelalvarol',
    email: 'miguelalvarol@gmail.com',
    avatar: 'M'
  };
  
  return (
    <div className="main-content">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            {userData.avatar}
          </div>
          <h2 className="profile-name">{userData.username}</h2>
          <p className="profile-email">{userData.email}</p>
        </div>
        
        <div className="profile-tabs">
          <button 
            className={`profile-tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
          <button 
            className={`profile-tab ${activeTab === 'activity' ? 'active' : ''}`}
            onClick={() => setActiveTab('activity')}
          >
            Activity
          </button>
        </div>
        
        {activeTab === 'settings' ? (
          <div className="profile-settings">
            <Link to="/profile/edit" className="settings-card">
              <div className="settings-icon">
                <i className="fi fi-sr-user-pen"></i>
              </div>
              <div className="settings-content">
                <h3>Edit Profile</h3>
                <p>Update your personal information</p>
              </div>
              <i className="fi fi-sr-angle-right settings-arrow"></i>
            </Link>
            
            <Link to="/profile/password" className="settings-card">
              <div className="settings-icon">
                <i className="fi fi-sr-lock"></i>
              </div>
              <div className="settings-content">
                <h3>Change Password</h3>
                <p>Update your security credentials</p>
              </div>
              <i className="fi fi-sr-angle-right settings-arrow"></i>
            </Link>
            
            <Link to="/profile/notifications" className="settings-card">
              <div className="settings-icon">
                <i className="fi fi-sr-bell"></i>
              </div>
              <div className="settings-content">
                <h3>Notifications</h3>
                <p>Manage your notification preferences</p>
              </div>
              <i className="fi fi-sr-angle-right settings-arrow"></i>
            </Link>
            
            <Link to="/profile/language" className="settings-card">
              <div className="settings-icon">
                <i className="fi fi-sr-language"></i>
              </div>
              <div className="settings-content">
                <h3>Language</h3>
                <p>Change the app language</p>
              </div>
              <i className="fi fi-sr-angle-right settings-arrow"></i>
            </Link>
            
            <Link to="/profile/categories" className="settings-card">
              <div className="settings-icon">
                <i className="fi fi-sr-tags"></i>
              </div>
              <div className="settings-content">
                <h3>Categories</h3>
                <p>Customize expense categories</p>
              </div>
              <i className="fi fi-sr-angle-right settings-arrow"></i>
            </Link>
            
            <Link to="/profile/export" className="settings-card">
              <div className="settings-icon">
                <i className="fi fi-sr-file-export"></i>
              </div>
              <div className="settings-content">
                <h3>Export Data</h3>
                <p>Download your financial data</p>
              </div>
              <i className="fi fi-sr-angle-right settings-arrow"></i>
            </Link>
            
            <button className="logout-button" onClick={onLogout}>
              Logout
            </button>
          </div>
        ) : (
          <div className="profile-activity">
            <div className="activity-empty">
              <i className="fi fi-sr-hourglass-end"></i>
              <h3>No recent activity</h3>
              <p>Your activity history will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
