import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonPage,
  IonLoading,
  IonButton,
  IonAlert
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { createBudget, updateBudget, getBudgetById } from '../services/supabaseService';
import { t } from '../contexts/LanguageContext';
import { BudgetForm } from '../components';

interface RouteParams {
  id?: string;
}

const AddBudgetScreen: React.FC = () => {
  const { id: budgetId } = useParams<RouteParams>();
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [budget, setBudget] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [alertHeader, setAlertHeader] = useState<string>('');
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (budgetId) {
      setIsEditMode(true);
      loadBudget();
    }
  }, [budgetId]);

  const loadBudget = async () => {
    try {
      setIsLoading(true);
      const budgetData = await getBudgetById(budgetId);
      
      if (!budgetData) {
        setAlertHeader(t('Error'));
        setAlertMessage(t('Budget not found'));
        setShowAlert(true);
        history.goBack();
        return;
      }
      
      setBudget(budgetData);
    } catch (error) {
      console.error('Error loading budget:', error);
      setAlertHeader(t('Error'));
      setAlertMessage(t('Failed to load budget details. Please try again.'));
      setShowAlert(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (budgetData: any) => {
    try {
      setIsLoading(true);
      
      if (isEditMode) {
        // Update existing budget
        await updateBudget(budgetId!, budgetData);
        setAlertHeader(t('Success'));
        setAlertMessage(t('Budget updated successfully'));
        setShowAlert(true);
      } else {
        // Create new budget
        await createBudget(budgetData);
        setAlertHeader(t('Success'));
        setAlertMessage(t('Budget created successfully'));
        setShowAlert(true);
      }
    } catch (error) {
      console.error('Error saving budget:', error);
      setAlertHeader(t('Error'));
      setAlertMessage(t(isEditMode 
        ? 'Failed to update budget. Please try again.' 
        : 'Failed to create budget. Please try again.'
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
            {isEditMode ? t('Edit Budget') : t('Create Budget')}
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <BudgetForm
          budget={budget}
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
          message={alertMessage || ''}
          buttons={[t('OK')]}
        />
      </IonContent>
    </IonPage>
  );
};

export default AddBudgetScreen;