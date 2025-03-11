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
  IonItem,
  IonLabel,
  IonList,
  IonFab,
  IonFabButton,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { add, pencil, trash } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { getExpenseSummaryByCategory, getExpenses, getBudgets, checkAuthStatus } from '../services/supabaseService';
import { t } from '../contexts/LanguageContext';
import { BudgetCard, ChartComponent } from '../components';

const DashboardScreen: React.FC = () => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(true);
  const [expenseData, setExpenseData] = useState<any[]>([]);
  const [budgets, setBudgets] = useState<any[]>([]);
  const [recentExpenses, setRecentExpenses] = useState<any[]>([]);
  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [itemToDelete, setItemToDelete] = useState<{id: string, type: 'budget' | 'expense'} | null>(null);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      
      // Check authentication status
      const { user } = await checkAuthStatus();
      if (!user) {
        history.push('/login');
        return;
      }
      
      // Get data for expense categories chart
      const now = new Date();
      const startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
      const endDate = now.toISOString().split('T')[0];
      
      const categoryData = await getExpenseSummaryByCategory(startDate, endDate);
      setExpenseData(categoryData);
      
      // Get recent expenses
      const expenses = await getExpenses({ limit: 5 });
      setRecentExpenses(expenses);
      
      // Get active budgets
      const budgetData = await getBudgets();
      // Add spent amount to budgets
      const enhancedBudgets = await Promise.all(budgetData.slice(0, 3).map(async (budget) => {
        const budgetExpenses = await getExpenses({ budgetId: budget.id });
        const spentAmount = budgetExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
        return {
          ...budget,
          spentAmount
        };
      }));
      
      setBudgets(enhancedBudgets);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      setAlertHeader(t('Error'));
      setAlertMessage(t('Failed to load dashboard data. Please try again.'));
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    loadDashboardData().then(() => {
      event.detail.complete();
    });
  };

  const confirmDelete = (id: string, type: 'budget' | 'expense') => {
    setItemToDelete({ id, type });
    setAlertHeader(t(type === 'budget' ? 'Delete Budget' : 'Delete Expense'));
    setAlertMessage(t(`Are you sure you want to delete this ${type}?`));
    setShowAlert(true);
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  // Format amount for display
  const formatAmount = (amount: string | number) => {
    if (!amount) return '$0.00';
    return `${parseFloat(amount.toString()).toFixed(2)}`;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('Dashboard')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent />
        </IonRefresher>

        {isLoading ? (
          <IonLoading isOpen={isLoading} message={t('Loading...')} />
        ) : (
          <>
            <IonGrid>
              <IonRow>
                <IonCol size="12">
                  <ChartComponent data={expenseData} />
                </IonCol>
              </IonRow>
              <IonRow>
                {budgets.map((budget) => (
                  <IonCol key={budget.id} size="12">
                    <BudgetCard budget={budget} onDelete={() => confirmDelete(budget.id, 'budget')} />
                  </IonCol>
                ))}
              </IonRow>
            </IonGrid>

            <IonList>
              {recentExpenses.map((expense) => (
                <IonItem key={expense.id}>
                  <IonLabel>
                    <h2>{expense.name}</h2>
                    <p>{formatDate(expense.date)}</p>
                  </IonLabel>
                  <IonText slot="end">${formatAmount(expense.amount)}</IonText>
                  <IonButton fill="clear" onClick={() => confirmDelete(expense.id, 'expense')}>
                    <IonIcon icon={trash} />
                  </IonButton>
                </IonItem>
              ))}
            </IonList>
          </>
        )}

        <IonAlert
          isOpen={showAlert}
          header={alertHeader}
          message={alertMessage}
          buttons={[
            { text: t('Cancel'), role: 'cancel' },
            { text: t('Delete'), handler: () => console.log('Delete confirmed') },
          ]}
          onDidDismiss={() => setShowAlert(false)}
        />

        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/add-expense')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      </IonContent>
    </IonPage>
  );
};  

export default DashboardScreen;
