import React, { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .order('date', { ascending: false });
        
      if (error) throw error;
      
      setExpenses(data || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const openPdf = (pdfUrl) => {
    window.open(pdfUrl, '_blank');
  };

  if (loading) return <div>Loading expenses...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      
      {expenses.length === 0 ? (
        <p>No expenses found. Scan a receipt to add one.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Emisor</th>
              <th>Total Neto</th>
              <th>Monto Exento ITBMS</th>
              <th>Monto Gravado ITBMS</th>
              <th>ITBMS</th>
              <th>Total Impuesto</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.emisor}</td>
                <td>${expense.totalNeto}</td>
                <td>${expense.montoExento}</td>
                <td>${expense.montoGravado}</td>
                <td>${expense.itbms}</td>
                <td>${expense.totalImpuesto}</td>
                <td>${expense.total}</td>
                <td>
                  <button onClick={() => openPdf(expense.pdfUrl)}>
                    See CAFE
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExpenseList;
