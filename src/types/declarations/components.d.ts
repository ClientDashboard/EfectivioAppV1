declare module '*/components' {
  import React from 'react';
  
  export interface BudgetFormProps {
    budget: any;
    onSubmit: (data: any) => void;
    isLoading: boolean;
  }
  
  export interface ExpenseFormProps {
    expense: any;
    onSubmit: (data: any) => void;
    isLoading: boolean;
  }
  
  export interface BudgetCardProps {
    budget: any;
    onPress?: () => void;
    onEdit?: () => void;
    onDelete?: (id: string) => void;
  }
  
  export interface ExpenseListProps {
    expenses: any[];
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
    isLoading: boolean;
  }
  
  export interface ChartComponentProps {
    type: string;
    data: any[];
    title: string;
    config: any;
  }
  
  export const BudgetForm: React.FC<BudgetFormProps>;
  export const ExpenseForm: React.FC<ExpenseFormProps>;
  export const BudgetCard: React.FC<BudgetCardProps>;
  export const ExpenseList: React.FC<ExpenseListProps>;
  export const ChartComponent: React.FC<ChartComponentProps>;
}
