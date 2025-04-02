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
  IonList,
  IonAlert,
  IonLoading,
  IonRefresher,
  IonRefresherContent,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton
} from '@ionic/react';
import { RefresherEventDetail } from '@ionic/core';
import { add, walletOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { getBudgets, getExpenses, deleteBudget } from '../services/supabaseService';
import { t } from '../contexts/LanguageContext';
import { BudgetCard } from '../components';

const BudgetListScreen: React.FC = () => {
  const history = useHistory();
  const [budgets, setBudgets] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertHeader, setAlertHeader] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [budgetToDelete, setBudgetToDelete] = useState<string | null>(null);

  useEffect(() => {
    loadBudgets();
  }, []);

  const loadBudgets = async () => {
    try {
      setIsLoading(true);
      
      // Get all budgets
      const budgetData = await getBudgets();
      
      // Add spent amount to each budget
      const enhancedBudgets = await Promise.all(budgetData.map(async (budget) => {
        const expenses = await getExpenses({ budgetId: budget.id });
        const spentAmount = expenses.reduce(
          (sum, expense) => sum + parseFloat(expense.amount), 
          0
        );
        
        return {
          ...budget,
          spentAmount
        };
      }));
      
      setBudgets(enhancedBudgets);
    } catch (error) {
      console.error('Error loading budgets:', error);
      setAlertHeader(t('Error'));
      setAlertMessage(t('Failed to load budgets. Please try again.'));
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = (event: CustomEvent<RefresherEventDetail>) => {
    loadBudgets().then(() => {
      event.detail.complete();
    });
  };

  const confirmDeleteBudget = (budgetId: string) => {
    setBudgetToDelete(budgetId);
    setAlertHeader(t('Delete Budget'));
    setAlertMessage(t('Are you sure you want to delete this budget? All associated expenses will be disassociated.'));
    setShowAlert(true);
  };

  const handleDeleteBudget = async () => {
    if (!budgetToDelete) return;

    try {
      setIsLoading(true);
      await deleteBudget(budgetToDelete);
      // Refresh budgets list after deletion
      await loadBudgets();
      setAlertHeader(t('Success'));
      setAlertMessage(t('Budget deleted successfully'));
      setShowAlert(true);
    } catch (error) {
      console.error('Error deleting budget:', error);
      setAlertHeader(t('Error'));
      setAlertMessage(t('Failed to delete budget'));
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('Budgets')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        
        {budgets.length === 0 && !isLoading ? (
          <div className="ion-text-center ion-padding">
            <IonIcon icon={walletOutline} style={{ fontSize: '64px', color: '#ccc' }} />
            <IonText>
              <h2>{t('No budgets found')}</h2>
              <p>{t('Create your first budget to track your spending')}</p>
            </IonText>
            <IonButton 
              expand="block" 
              onClick={() => history.push('/budgets/add')}
            >
              {t('Create Budget')}
            </IonButton>
          </div>
        ) : (
          <IonList>
            {budgets.map(budget => (
              <BudgetCard
                key={budget.id}
                budget={budget}
                onPress={() => history.push(`/budgets/${budget.id}`)}
                onEdit={() => history.push(`/budgets/edit/${budget.id}`)}
                onDelete={() => confirmDeleteBudget(budget.id)}
              />
            ))}
          </IonList>
        )}
        
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={() => history.push('/budgets/add')}>
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
        
        <IonLoading
          isOpen={isLoading}
          message={t('Loading...')}
        />
        
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => {
            setShowAlert(false);
            setBudgetToDelete(null);
          }}
          header={alertHeader}
          message={alertMessage}
          buttons={
            budgetToDelete
              ? [
                  {
                    text: t('Cancel'),
                    role: 'cancel'
                  },
                  {
                    text: t('Delete'),
                    role: 'destructive',
                    handler: handleDeleteBudget
                  }
                ]
              : [t('OK')]
          }
        />
      </IonContent>
    </IonPage>
  );
};

export default BudgetListScreen;