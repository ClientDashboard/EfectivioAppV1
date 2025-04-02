declare module '../components' {
    import React from 'react';
    
    export const BudgetForm: React.FC<{
      budget: any;
      onSubmit: (data: any) => void;
      isLoading: boolean;
    }>;
    
    export const ExpenseForm: React.FC<{
      expense: any;
      onSubmit: (data: any) => void;
      isLoading: boolean;
    }>;
    
    export const BudgetCard: React.FC<{
      budget: any;
      onPress?: () => void;
      onEdit?: () => void;
      onDelete?: (id: string) => void;
    }>;
    
    export const ExpenseList: React.FC<{
      expenses: any[];
      onEdit?: (id: string) => void;
      onDelete?: (id: string) => void;
      isLoading: boolean;
    }>;
    
    export const ChartComponent: React.FC<{
      type: string;
      data: any[];
      title: string;
      config: any;
    }>;
  }