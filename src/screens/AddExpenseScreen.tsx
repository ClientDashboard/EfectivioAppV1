import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonPage,
  IonLoading,
  IonAlert
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { createExpense, updateExpense, getExpenseById } from '../services/supabaseService';
import { t } from '../contexts/LanguageContext';
import { ExpenseForm } from '../components';

interface RouteParams {
  id?: string;
  budgetId?: string;
}

const AddExpenseScreen: React.FC = () => {
  const { id: expenseId, budgetId } = useParams<RouteParams>();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [expense, setExpense] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertHeader, setAlertHeader] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (expenseId) {
      setIsEditMode(true);
      loadExpense();
    } else if (budgetId) {
      // If creating a new expense for a specific budget
      setExpense({ budget_id: budgetId });
    }
  }, [expenseId, budgetId]);

  const loadExpense = async () => {
    try {
      setIsLoading(true);
      const expenseData = await getExpenseById(expenseId);
      
      if (!expenseData) {
        setAlertHeader(t('Error'));
        setAlertMessage(t('Expense not found'));
        setShowAlert(true);
        history.goBack();
        return;
      }
      
      setExpense(expenseData);
    } catch (error) {
      console.error('Error loading expense:', error);
      setAlertHeader(t('Error'));
      setAlertMessage(t('Failed to load expense details. Please try again.'));
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (expenseData: any) => {
    try {
      setIsLoading(true);
      
      if (isEditMode) {
        // Update existing expense
        await updateExpense(expenseId!, expenseData);
        setAlertHeader(t('Success'));
        setAlertMessage(t('Expense updated successfully'));
        setShowAlert(true);
      } else {
        // Create new expense
        await createExpense(expenseData);
        setAlertHeader(t('Success'));
        setAlertMessage(t('Expense added successfully'));
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error saving expense:', error);
      setAlertHeader(t('Error'));
      setAlertMessage(t(isEditMode 
        ? 'Failed to update expense. Please try again.' 
        : 'Failed to create expense. Please try again.'
      ));
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {isEditMode ? t('Edit Expense') : t('Add Expense')}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <ExpenseForm
          expense={expense}
          onSubmit={handleSubmit}
          isLoading={isLoading}
        />
        
        <IonLoading
          isOpen={isLoading}
          message={t('Please wait...')}
        />
        
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => {
            setShowAlert(false);
            if (alertHeader === t('Success')) {
              history.goBack();
            }
          }}
          header={alertHeader}
          message={alertMessage}
          buttons={[t('OK')]}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddExpenseScreen;