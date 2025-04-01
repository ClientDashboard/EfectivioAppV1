import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '../services/supabaseClient';
import { Link } from 'react-router-dom';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [totalSpent, setTotalSpent] = useState(0);
  const [totalTaxes, setTotalTaxes] = useState(0);
  const [recentExpenses, setRecentExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get authenticated user
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);

        // Fetch expenses data
        const { data: expenses, error } = await supabase
          .from('expenses')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: false })
          .limit(5);

        if (error) throw error;

        // Calculate totals
        if (expenses && expenses.length > 0) {
          const total = expenses.reduce((sum, expense) => sum + expense.total, 0);
          const taxes = expenses.reduce((sum, expense) => sum + expense.itbms, 0);
          
          setTotalSpent(total);
          setTotalTaxes(taxes);
          setRecentExpenses(expenses);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/login';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>{t('primary-logo.png')}</h1>
        <div className="dashboard-actions">
          <button onClick={handleLogout} className="logout-button">
            {t('logout')}
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        <div className="summary-cards">
          <div className="summary-card">
            <h2>{t('total_spent')}</h2>
            <p className="amount">${totalSpent.toFixed(2)}</p>
          </div>
          <div className="summary-card">
            <h2>{t('taxes_paid')}</h2>
            <p className="amount">${totalTaxes.toFixed(2)}</p>
          </div>
        </div>

        <div className="scan-section">
          <Link to="/scan" className="scan-button">
            {t('scan_qr')}
          </Link>
        </div>

        <div className="recent-expenses">
          <h2>{t('recent_expenses')}</h2>
          {recentExpenses.length > 0 ? (
            <div className="expense-list">
              {recentExpenses.map((expense) => (
                <div key={expense.id} className="expense-item">
                  <div className="expense-details">
                    <h3>{expense.merchant || 'Unknown'}</h3>
                    <p>{new Date(expense.date).toLocaleDateString()}</p>
                  </div>
                  <p className="expense-amount">${expense.total.toFixed(2)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-expenses">{t('no_expenses')}</p>
          )}
          
          <Link to="/expenses" className="view-all-link">
            {t('view_all_expenses')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
