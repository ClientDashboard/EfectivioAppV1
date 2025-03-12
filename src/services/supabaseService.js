import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// ✅ Ensure that only a single Supabase client is created and exported
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

// Budgets
export const createBudget = async (budgetData) => {
  const { data, error } = await supabase
    .from('budgets')
    .insert([budgetData])
    .select();
  
  if (error) throw error;
  return data[0];
};

export const updateBudget = async (id, budgetData) => {
  const { data, error } = await supabase
    .from('budgets')
    .update(budgetData)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const getBudgetById = async (id) => {
  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const getBudgets = async () => {
  const { data, error } = await supabase
    .from('budgets')
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

export const deleteBudget = async (id) => {
  const { error } = await supabase
    .from('budgets')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

export const getBudgetSpending = async (budgetId) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('amount')
    .eq('budget_id', budgetId);
  
  if (error) throw error;
  
  const totalSpent = data.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  return { totalSpent };
};

// Expenses
export const createExpense = async (expenseData) => {
  const { data, error } = await supabase
    .from('expenses')
    .insert([expenseData])
    .select();
  
  if (error) throw error;
  return data[0];
};

export const updateExpense = async (id, expenseData) => {
  const { data, error } = await supabase
    .from('expenses')
    .update(expenseData)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

export const getExpenseById = async (id) => {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};

export const getExpenses = async (options = {}) => {
  let query = supabase
    .from('expenses')
    .select('*');
  
  // Filter by budget ID if provided
  if (options.budgetId) {
    query = query.eq('budget_id', options.budgetId);
  }
  
  // Apply limit if provided
  if (options.limit) {
    query = query.limit(options.limit);
  }
  
  // Order by date descending
  query = query.order('date', { ascending: false });
  
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
};

export const deleteExpense = async (id) => {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

export const getExpenseSummaryByCategory = async (startDate, endDate) => {
  // Get expenses within date range
  const { data, error } = await supabase
    .from('expenses')
    .select('category, amount')
    .gte('date', startDate)
    .lte('date', endDate);
  
  if (error) throw error;
  
  // Group expenses by category
  const categories = {};
  data.forEach(expense => {
    if (!categories[expense.category]) {
      categories[expense.category] = 0;
    }
    categories[expense.category] += parseFloat(expense.amount);
  });
  
  // Convert to array format for charts
  return Object.keys(categories).map(category => ({
    category,
    amount: categories[category]
  }));
};

// Auth functions
export const checkAuthStatus = async () => {
  const { data } = await supabase.auth.getSession();
  return { user: data.session?.user || null };
};
