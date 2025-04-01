import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ExpenseList = () => {
  // Sample data for demonstration
  const [expenses] = useState([
    { id: 1, name: 'Super 99', category: 'Groceries', date: '03/10/2025', amount: 45.67 },
    { id: 2, name: 'Farmacia Arrocha', category: 'Healthcare', date: '03/08/2025', amount: 32.15 },
    { id: 3, name: 'Esso Gas Station', category: 'Transportation', date: '03/05/2025', amount: 28.50 }
  ]);
  
  return (
    <div className="main-content">
      <h2 className="section-title">All Expenses</h2>
      
      <div className="expense-list">
        {expenses.map((expense) => (
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
  );
};

export default ExpenseList;
