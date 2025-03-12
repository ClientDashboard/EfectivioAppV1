import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonPage,
  IonButton,
  IonIcon,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonAlert,
  IonLoading,
  IonRefresher,
  IonRefresherContent,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { add } from 'ionicons/icons';
import { useParams, useHistory } from 'react-router-dom';
import { getBudgetById, getExpenses, deleteExpense, getBudgetSpending } from '../services/supabaseService';
import { t } from '../contexts/LanguageContext';
import { BudgetCard, ChartComponent } from '../components';
import CustomExpenseList from "../components/CustomExpenseList";
interface RouteParams {
  id: string;
}

const BudgetDetailScreen: React.FC = () => {
  const { id: budgetId } = useParams<RouteParams>();
  const history = useHistory();
  const [budget, setBudget] = useState<any>(null);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [expenseToDelete, setExpenseToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadBudgetDetails();
  }, [budgetId]);

  const loadBudgetDetails = async () => {
    try {
      setIsLoading(true);
      
      // Get budget details
      const budgetDetails = await getBudgetById(budgetId);
      
      if (!budgetDetails) {
        setAlertHeader(t('Error'));
        setAlertMessage(t('Budget not found'));
        setShowAlert(true);
        history.goBack();
        return;
      }
      
      // Get budget spending info
      const spendingInfo = await getBudgetSpending(budgetId);
      
      // Set budget with spending info
      setBudget({
        ...budgetDetails,
        spentAmount: spendingInfo.totalSpent
      });
      
      // Get expenses for this budget
      const budgetExpenses = await getExpenses({ budgetId });
      setExpenses(budgetExpenses);
      
      // Create category data for chart
      const categories: Record<string, number> = {};
      budgetExpenses.forEach(expense => {
        if (!categories[expense.category]) {
          categories[expense.category] = 0;
        }
        categories[expense.category] += parseFloat(expense.amount);
      });
      
      const chartData = Object.keys(categories).map(category => ({
        category,
        amount: categories[category]
      }));
      
      setCategoryData(chartData);
    } catch (error) {
      console.error('Error loading budget details:', error);
      setAlertHeader(t('Error'));
      setAlertMessage(t('Failed to load budget details. Please try again.'));
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    loadBudgetDetails().then(() => {
      event.detail.complete();
    });
  };

  const confirmDeleteExpense = (expenseId: string) => {
    setExpenseToDelete(expenseId);
    setAlertHeader(t('Delete Expense'));
    setAlertMessage(t('Are you sure you want to delete this expense?'));
    setShowAlert(true);
  };

  const handleDeleteExpense = async () => {
    if (!expenseToDelete) return;
    
    try {
      await deleteExpense(expenseToDelete);
      // Refresh budget details after deletion
      loadBudgetDetails();
    } catch (error) {
      console.error('Error deleting expense:', error);
      setAlertHeader(t('Error'));
      setAlertMessage(t('Failed to delete expense'));
      setShowAlert(true);
    }
  };

  if (!budget && !isLoading) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{t('Budget Details')}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <IonText color="danger">
            <h2 className="ion-text-center">{t('Budget not found')}</h2>
          </IonText>
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('Budget Details')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        
        {/* Budget Card */}
        {budget && (
          <BudgetCard
            budget={budget}
            onEdit={() => history.push(`/budgets/edit/${budgetId}`)}
          />
        )}
        
        {/* Add Expense Button */}
        <IonButton 
          expand="block" 
          className="ion-margin-vertical"
          color="primary"
          onClick={() => history.push(`/expenses/add/${budgetId}`)}
        >
          <IonIcon slot="start" icon={add} />
          {t('Add Expense to Budget')}
        </IonButton>
        
        {/* Expense Category Chart */}
        {categoryData.length > 0 && (
          <IonCard>
            <IonCardHeader>
              <IonTitle size="large">{t('Expense Categories')}</IonTitle>
            </IonCardHeader>
            <IonCardContent>
              <ChartComponent
                type="pie"
                data={categoryData}
                title={t('Expenses by Category')}
                config={{
                  labelKey: 'category',
                  valueKey: 'amount',
                  formatYLabel: (value: number) => `$${value}`
                }}
              />
            </IonCardContent>
          </IonCard>
        )}
        
        {/* Budget Expenses */}
        <IonCard>
          <IonCardHeader>
            <IonTitle size="large">{t('Budget Expenses')}</IonTitle>
          </IonCardHeader>
          <IonCardContent>
            <CustomExpenseList
              expenses={expenses}
              onDelete={confirmDeleteExpense}
              onEdit={(id: string) => history.push(`/expenses/edit/${id}?budgetId=${budgetId}`)}
              isLoading={isLoading}
            />
          </IonCardContent>
        </IonCard>

        <IonLoading
          isOpen={isLoading}
          message={t('Loading...')}
        />
        
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => {
            setShowAlert(false);
            setExpenseToDelete(null);
          }}
          header={alertHeader}
          message={alertMessage}
          buttons={[
            {
              text: t('Cancel'),
              role: 'cancel'
            },
            {
              text: t('Delete'),
              role: 'destructive',
              handler: () => {
                if (expenseToDelete) {
                  handleDeleteExpense();
                }
              }
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default BudgetDetailScreen;