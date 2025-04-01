import { useEffect, useState } from 'react';
import { supabase } from '../services/supabaseClient';

const ExpenseList = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchExpenses = async () => {
      const { data: user, error: userError } = await supabase.auth.getUser();
      if (userError) return;

      let { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.user?.id);

      if (!error) setExpenses(data);
    };

    fetchExpenses();
  }, []);

  return (
    <div>
      <h2>Expense List</h2>
      <table>
        <thead>
          <tr>
            <th>Emisor</th>
            <th>Total Neto</th>
            <th>Monto Exento</th>
            <th>Monto Gravado</th>
            <th>ITBMS</th>
            <th>Total Impuesto</th>
            <th>Total</th>
            <th>See CAFE</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.emisor}</td>
              <td>${expense.total_neto}</td>
              <td>${expense.monto_exento}</td>
              <td>${expense.monto_gravado}</td>
              <td>${expense.itbms}</td>
              <td>${expense.total_impuesto}</td>
              <td>${expense.total}</td>
              <td><a href={expense.pdf_link} target="_blank">View PDF</a></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
