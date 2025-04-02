declare module '../services/supabaseService' {
    export interface Budget {
      id: string;
      name: string;
      amount: number;
      description?: string;
      period?: string;
      [key: string]: any;
    }
    
    export interface Expense {
      id: string;
      budget_id?: string;
      amount: number;
      description: string;
      category: string;
      date: string;
      [key: string]: any;
    }
    
    export const supabase: any;
    
    export function createBudget(budgetData: any): Promise<any>;
    export function updateBudget(id: string, budgetData: any): Promise<any>;
    export function getBudgetById(id: string): Promise<any>;
    export function getBudgets(): Promise<any[]>;
    export function deleteBudget(id: string): Promise<any>;
    export function getBudgetSpending(budgetId: string): Promise<any>;
    
    export function createExpense(expenseData: any): Promise<any>;
    export function updateExpense(id: string, expenseData: any): Promise<any>;
    export function getExpenseById(id: string): Promise<any>;
    export function getExpenses(options?: any): Promise<any[]>;
    export function deleteExpense(id: string): Promise<any>;
    export function getExpenseSummaryByCategory(startDate: string, endDate: string): Promise<any[]>;
    
    export function checkAuthStatus(): Promise<{ user: any | null }>;
  }