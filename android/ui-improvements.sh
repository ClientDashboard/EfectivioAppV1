#!/bin/bash
# This script updates the UI with the requested improvements

cd ~/Efectivio-App/efectivio-app || exit 1
echo "Working in $(pwd)"

# Fix navigation tabs and icons
cat > src/components/layout/FooterNav.js << 'EOL'
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
          <i className="fi fi-sr-qr-scan"></i>
        </div>
        <span>Scan</span>
      </Link>
      
      <Link to="/expenses" className={`nav-item ${location.pathname === '/expenses' ? 'active' : ''}`}>
        <div className="nav-item-icon">
          <i className="fi fi-sr-file-invoice"></i>
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
EOL

# Update the Home component to remove the greeting
cat > src/components/Home.js << 'EOL'
import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ user }) => {
  // Sample data for demonstration
  const dashboardData = {
    totalSpent: 106.32,
    taxPaid: 7.45,
    recentExpenses: [
      { id: 1, name: 'Super 99', category: 'Groceries', date: '03/10/2025', amount: 45.67 },
      { id: 2, name: 'Farmacia Arrocha', category: 'Healthcare', date: '03/08/2025', amount: 32.15 },
      { id: 3, name: 'Esso Gas Station', category: 'Transportation', date: '03/05/2025', amount: 28.50 }
    ]
  };
  
  if (!user) {
    return (
      <div className="main-content">
        <div className="dashboard">
          <h2 className="section-title">Welcome to Efectivio App</h2>
          <p>Please sign in to manage your expenses.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="main-content">
      <div className="dashboard">
        <div className="dashboard-stats">
          <div className="stat-box">
            <div className="stat-label">Total Spent</div>
            <div className="stat-value">${dashboardData.totalSpent.toFixed(2)}</div>
          </div>
          
          <div className="stat-box">
            <div className="stat-label">Tax Paid</div>
            <div className="stat-value">${dashboardData.taxPaid.toFixed(2)}</div>
          </div>
        </div>
        
        <Link to="/scan">
          <button className="scan-button">
            <i className="fi fi-sr-qr-scan"></i> Scan Receipt QR Code
          </button>
        </Link>
        
        <h3 className="section-title">Recent Expenses</h3>
        <div className="expense-list">
          {dashboardData.recentExpenses.map((expense) => (
            <Link to={`/expenses/${expense.id}`} key={expense.id} className="no-decoration">
              <div className="expense-item">
                <div className="expense-info">
                  <div className="expense-name">{expense.name}</div>
                  <div className="expense-category">{expense.category} • {expense.date}</div>
                </div>
                <div className="expense-amount">${expense.amount.toFixed(2)}</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
EOL

# Update Expense Detail component with modern design
cat > src/components/expenses/ExpenseDetail.js << 'EOL'
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ExpenseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Sample data - in a real app this would come from your API/database
  const expenseData = {
    id: parseInt(id),
    name: 'Super 99',
    category: 'Groceries',
    date: '03/10/2025',
    amount: 45.67,
    emisor: 'Super 99, S.A.',
    totalNeto: 42.68,
    montoExentoITBMS: 0.00,
    montoGravadoITBMS: 42.68,
    itbms: 2.99,
    totalImpuesto: 2.99,
    total: 45.67,
    pdfUrl: 'https://example.com/receipt.pdf'
  };
  
  // Use different data based on the ID
  if (id === '2') {
    expenseData.name = 'Farmacia Arrocha';
    expenseData.category = 'Healthcare';
    expenseData.date = '03/08/2025';
    expenseData.amount = 32.15;
    expenseData.emisor = 'Farmacia Arrocha, S.A.';
    expenseData.totalNeto = 30.05;
    expenseData.montoExentoITBMS = 15.00;
    expenseData.montoGravadoITBMS = 15.05;
    expenseData.itbms = 2.10;
    expenseData.totalImpuesto = 2.10;
    expenseData.total = 32.15;
  } else if (id === '3') {
    expenseData.name = 'Esso Gas Station';
    expenseData.category = 'Transportation';
    expenseData.date = '03/05/2025';
    expenseData.amount = 28.50;
    expenseData.emisor = 'Esso Panamá, S.A.';
    expenseData.totalNeto = 26.64;
    expenseData.montoExentoITBMS = 0.00;
    expenseData.montoGravadoITBMS = 26.64;
    expenseData.itbms = 1.86;
    expenseData.totalImpuesto = 1.86;
    expenseData.total = 28.50;
  }
  
  return (
    <div className="main-content">
      <div className="expense-detail">
        <div className="expense-header">
          <button 
            className="back-button"
            onClick={() => navigate('/expenses')}
          >
            <i className="fi fi-rr-arrow-left"></i> Back
          </button>
          
          <h2 className="expense-title">{expenseData.name}</h2>
          <div className="expense-meta">
            {expenseData.category} • {expenseData.date}
          </div>
        </div>
        
        {/* Remove the blue block, no summary here */}
        
        <div className="expense-details-section">
          <h3 className="section-title">Receipt Details</h3>
          
          <div className="detail-table">
            <div className="detail-row">
              <div className="detail-label">Emisor</div>
              <div className="detail-value">{expenseData.emisor}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Total Neto</div>
              <div className="detail-value">${expenseData.totalNeto.toFixed(2)}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Monto Exento ITBMS</div>
              <div className="detail-value">${expenseData.montoExentoITBMS.toFixed(2)}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Monto Gravado ITBMS</div>
              <div className="detail-value">${expenseData.montoGravadoITBMS.toFixed(2)}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">ITBMS</div>
              <div className="detail-value">${expenseData.itbms.toFixed(2)}</div>
            </div>
            
            <div className="detail-row">
              <div className="detail-label">Total Impuesto</div>
              <div className="detail-value">${expenseData.totalImpuesto.toFixed(2)}</div>
            </div>
            
            <div className="detail-row total-row">
              <div className="detail-label">Total</div>
              <div className="detail-value">${expenseData.total.toFixed(2)}</div>
            </div>
          </div>
          
          <div className="action-buttons">
            <a href={expenseData.pdfUrl} target="_blank" rel="noopener noreferrer" className="view-pdf-button">
              <i className="fi fi-rr-file-pdf"></i> View CAFE PDF
            </a>
            
            <button className="share-button">
              <i className="fi fi-rr-share"></i> Share
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpenseDetail;
EOL

# Create enhanced Profile component with settings
cat > src/components/profile/Profile.js << 'EOL'
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
EOL

# Update CSS for all the improvements
cat >> src/styles/App.css << 'EOL'
/* Updated Navigation Styles */
.footer-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  display: flex;
  justify-content: space-around;
  padding: 8px 0;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 10px;
  color: #888;
  text-decoration: none;
}

.nav-item.active {
  color: #0a2647;
}

.nav-item-icon {
  font-size: 18px;
  margin-bottom: 2px;
}

.nav-item-icon i {
  font-size: 20px;
}

/* Updated Expense Detail Styles */
.expense-detail {
  padding-bottom: 80px;
}

.expense-header {
  margin-bottom: 24px;
}

.back-button {
  background: none;
  border: none;
  display: flex;
  align-items: center;
  gap: 6px;
  color: #333;
  padding: 0;
  margin-bottom: 16px;
  font-size: 16px;
  cursor: pointer;
}

.expense-title {
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #0a2647;
}

.expense-meta {
  color: #888;
  font-size: 14px;
}

.expense-details-section {
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  padding: 20px;
  margin-bottom: 24px;
}

.section-title {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 16px;
  color: #333;
}

.detail-table {
  width: 100%;
  margin-bottom: 24px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-row:last-child {
  border-bottom: none;
}

.detail-label {
  font-size: 15px;
  color: #666;
}

.detail-value {
  font-size: 15px;
  font-weight: 500;
  color: #333;
}

.total-row {
  margin-top: 8px;
  padding-top: 16px;
  border-top: 1px solid #e0e0e0;
}

.total-row .detail-label,
.total-row .detail-value {
  font-weight: 700;
  color: #0a2647;
  font-size: 18px;
}

.action-buttons {
  display: flex;
  gap: 12px;
}

.view-pdf-button,
.share-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
}

.view-pdf-button {
  background-color: #0a2647;
  color: white;
  border: none;
}

.share-button {
  background-color: #f5f5f5;
  color: #333;
  border: none;
}

/* Enhanced Profile Styles */
.profile-container {
  padding-bottom: 80px;
}

.profile-header {
  text-align: center;
  margin-bottom: 24px;
}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #0a2647;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  margin: 0 auto 16px;
}

.profile-name {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #333;
}

.profile-email {
  color: #888;
  font-size: 14px;
}

.profile-tabs {
  display: flex;
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 4px;
  margin-bottom: 24px;
}

.profile-tab {
  flex: 1;
  padding: 12px;
  text-align: center;
  background: none;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #888;
  cursor: pointer;
}

.profile-tab.active {
  background-color: white;
  color: #0a2647;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.settings-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background-color: white;
  border-radius: 12px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  text-decoration: none;
  color: inherit;
}

.settings-icon {
  width: 40px;
  height: 40px;
  background-color: #f0f7ff;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 16px;
  color: #0a2647;
}

.settings-content {
  flex: 1;
}

.settings-content h3 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  color: #333;
}

.settings-content p {
  font-size: 13px;
  color: #888;
  margin: 0;
}

.settings-arrow {
  color: #ccc;
  font-size: 14px;
}

.logout-button {
  width: 100%;
  padding: 14px;
  background-color: #ff5a5a;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  margin-top: 24px;
  cursor: pointer;
}

.profile-activity {
  padding: 40px 0;
}

.activity-empty {
  text-align: center;
  color: #888;
  padding: 40px 0;
}

.activity-empty i {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.activity-empty h3 {
  font-size: 18px;
  margin-bottom: 8px;
  color: #666;
}

.activity-empty p {
  font-size: 14px;
}

/* Updated Dashboard Styles */
.dashboard {
  padding-bottom: 80px;
}

.dashboard-stats {
  display: flex;
  justify-content: space-between;
  background-color: white;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.stat-box {
  text-align: center;
  flex: 1;
}

.stat-label {
  font-size: 14px;
  color: #888;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #0a2647;
}

.scan-button {
  width: 100%;
  padding: 16px;
  background-color: #00d2a0;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 24px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(0, 210, 160, 0.2);
}

.scan-button i {
  font-size: 20px;
}

.expense-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s, box-shadow 0.2s;
}

.expense-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.expense-info {
  flex: 1;
}

.expense-name {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 4px;
  color: #333;
}

.expense-category {
  font-size: 13px;
  color: #888;
}

.expense-amount {
  font-size: 18px;
  font-weight: 600;
  color: #0a2647;
}
EOL

# Update index.html to include additional Flaticon Uicons
cat > public/index.html << 'EOL'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Efectivio App</title>
  <!-- Flaticon Uicons - All styles we need -->
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-solid-rounded/css/uicons-solid-rounded.css'>
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-bold-rounded/css/uicons-bold-rounded.css'>
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-solid-straight/css/uicons-solid-straight.css'>
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'>
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-crossed/css/uicons-regular-crossed.css'>
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-straight/css/uicons-regular-straight.css'>
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-solid-straight/css/uicons-solid-straight.css'>
  <!-- Add more icon sets needed for new features -->
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-regular-rounded/css/uicons-regular-rounded.css'>
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-thin-straight/css/uicons-thin-straight.css'>
  <link rel='stylesheet' href='https://cdn-uicons.flaticon.com/uicons-thin-rounded/css/uicons-thin-rounded.css'>
  <link rel="icon" href="%PUBLIC_URL%/images/icon.jpg" />
</head>
<body>
  <div id="root"></div>
</body>
</html>
EOL

# Build and sync with Capacitor
echo "===== Building and syncing with Capacitor ====="
npm run build
npx cap sync android

echo "===== All done! ====="
echo "Run 'npx cap open android' to open Android Studio and build the app"
echo "The UI has been updated and improved with the requested changes"