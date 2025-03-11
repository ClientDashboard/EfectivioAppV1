import { supabase } from '../utils/supabaseClient';

// ---- BUDGET OPERATIONS ----

/**
 * Get all budgets for the current user
 */
export const getBudgets = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting budgets:', error);
    throw error;
  }
};

/**
 * Get a single budget by ID
 * @param {string} id - Budget ID
 */
export const getBudgetById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('budgets')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting budget:', error);
    throw error;
  }
};

/**
 * Create a new budget
 * @param {Object} budgetData - Budget data to create
 */
export const createBudget = async (budgetData) => {
  try {
    const { data, error } = await supabase
      .from('budgets')
      .insert([budgetData])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating budget:', error);
    throw error;
  }
};

/**
 * Update an existing budget
 * @param {string} id - Budget ID
 * @param {Object} budgetData - Budget data to update
 */
export const updateBudget = async (id, budgetData) => {
  try {
    const { data, error } = await supabase
      .from('budgets')
      .update(budgetData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating budget:', error);
    throw error;
  }
};

/**
 * Delete a budget
 * @param {string} id - Budget ID
 */
export const deleteBudget = async (id) => {
  try {
    const { error } = await supabase
      .from('budgets')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting budget:', error);
    throw error;
  }
};

// ---- EXPENSE OPERATIONS ----

/**
 * Get all expenses for the current user
 */
export const getExpenses = async () => {
  try {
    const { data: user } = await supabase.auth.getUser();
    if (!user) throw new Error('Not authenticated');

    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting expenses:', error);
    throw error;
  }
};

/**
 * Get expenses for a specific budget
 * @param {string} budgetId - Budget ID
 */
export const getExpensesByBudget = async (budgetId) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('budget_id', budgetId)
      .order('date', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting expenses for budget:', error);
    throw error;
  }
};

/**
 * Get expense by ID
 * @param {string} id - Expense ID
 */
export const getExpenseById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting expense:', error);
    throw error;
  }
};

/**
 * Create a new expense
 * @param {Object} expenseData - Expense data to create
 */
export const createExpense = async (expenseData) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .insert([expenseData])
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating expense:', error);
    throw error;
  }
};

/**
 * Update an existing expense
 * @param {string} id - Expense ID
 * @param {Object} expenseData - Expense data to update
 */
export const updateExpense = async (id, expenseData) => {
  try {
    const { data, error } = await supabase
      .from('expenses')
      .update(expenseData)
      .eq('id', id)
      .select();

    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error updating expense:', error);
    throw error;
  }
};

/**
 * Delete an expense
 * @param {string} id - Expense ID
 */
export const deleteExpense = async (id) => {
  try {
    const { error } = await supabase
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting expense:', error);
    throw error;
  }
};

// ---- ANALYTICS AND REPORTING ----

/**
 * Get expense summary grouped by category
 * @param {string} startDate - Start date (YYYY-MM-DD)
 * @param {string} endDate - End date (YYYY-MM-DD)
 */
export const getExpensesByCategory = async (startDate, endDate) => {
  try {
    // We can't do group by in Supabase directly with the free tier
    // So we fetch all expenses and group them in the client
    let query = supabase
      .from('expenses')
      .select('*');
    
    if (startDate) {
      query = query.gte('date', startDate);
    }
    
    if (endDate) {
      query = query.lte('date', endDate);
    }
    
    const { data, error } = await query;

    if (error) throw error;
    
    // Group expenses by category
    const groupedExpenses = data.reduce((grouped, expense) => {
      const category = expense.category || 'Uncategorized';
      
      if (!grouped[category]) {
        grouped[category] = 0;
      }
      
      grouped[category] += parseFloat(expense.amount);
      return grouped;
    }, {});
    
    // Convert to array format for charts
    return Object.keys(groupedExpenses).map(category => ({
      name: category,
      value: groupedExpenses[category]
    }));
  } catch (error) {
    console.error('Error getting expenses by category:', error);
    throw error;
  }
};

/**
 * Get monthly expense totals
 * @param {number} months - Number of months to include
 */
export const getMonthlyExpenses = async (months = 6) => {
  try {
    // Calculate date range
    const endDate = new Date();
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - months + 1);
    startDate.setDate(1);
    
    // Format dates for query
    const formattedStartDate = startDate.toISOString().split('T')[0];
    
    // Fetch expenses in date range
    const { data, error } = await supabase
      .from('expenses')
      .select('*')
      .gte('date', formattedStartDate)
      .order('date');

    if (error) throw error;
    
    // Create month buckets (last 6 months)
    const monthBuckets = {};
    for (let i = 0; i < months; i++) {
      const d = new Date();
      d.setMonth(d.getMonth() - i);
      const monthKey = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      const monthName = d.toLocaleString('default', { month: 'short' });
      monthBuckets[monthKey] = { name: monthName, value: 0 };
    }
    
    // Group expenses by month
    data.forEach(expense => {
      const expenseDate = new Date(expense.date);
      const monthKey = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, '0')}`;
      
      if (monthBuckets[monthKey]) {
        monthBuckets[monthKey].value += parseFloat(expense.amount);
      }
    });
    
    // Convert to array and sort chronologically
    return Object.values(monthBuckets).reverse();
  } catch (error) {
    console.error('Error getting monthly expenses:', error);
    throw error;
  }
};