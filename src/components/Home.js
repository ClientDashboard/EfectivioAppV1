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
