import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonDatetime,
  IonButton,
  IonTextarea,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol
} from '@ionic/react';
import { t } from '../contexts/LanguageContext';
import { getBudgets } from '../services/supabaseService';

const ExpenseForm = ({ expense, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    budget_id: '',
  });

  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    'Food',
    'Transportation',
    'Housing',
    'Entertainment',
    'Healthcare',
    'Education',
    'Shopping',
    'Utilities',
    'Travel',
    'Other'
  ];

  useEffect(() => {
    loadBudgets();
  }, []);

  useEffect(() => {
    if (expense) {
      setFormData({
        amount: expense.amount?.toString() || '',
        description: expense.description || '',
        category: expense.category || '',
        date: expense.date || new Date().toISOString().split('T')[0],
        budget_id: expense.budget_id || '',
      });
    }
  }, [expense]);

  const loadBudgets = async () => {
    try {
      setLoading(true);
      const budgetData = await getBudgets();
      setBudgets(budgetData);
    } catch (error) {
      console.error('Error loading budgets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (value) => {
    // Format date to YYYY-MM-DD
    const formattedDate = value.split('T')[0];
    setFormData(prev => ({
      ...prev,
      date: formattedDate
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.amount) {
      alert(t('Please enter an amount'));
      return;
    }
    
    if (!formData.description) {
      alert(t('Please enter a description'));
      return;
    }
    
    if (!formData.category) {
      alert(t('Please select a category'));
      return;
    }
    
    if (!formData.date) {
      alert(t('Please select a date'));
      return;
    }
    
    // Convert amount to number
    const parsedData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };
    
    onSubmit(parsedData);
  };

  return (
    <div className="ion-padding">
      <form onSubmit={handleSubmit}>
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">{t('Amount')}</IonLabel>
                <IonInput
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onIonChange={e => handleChange({
                    target: { name: 'amount', value: e.detail.value }
                  })}
                  required
                  min="0.01"
                  step="0.01"
                />
              </IonItem>
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">{t('Description')}</IonLabel>
                <IonInput
                  type="text"
                  name="description"
                  value={formData.description}
                  onIonChange={e => handleChange({
                    target: { name: 'description', value: e.detail.value }
                  })}
                  required
                />
              </IonItem>
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>{t('Category')}</IonLabel>
                <IonSelect
                  value={formData.category}
                  onIonChange={e => handleSelectChange('category', e.detail.value)}
                  placeholder={t('Select a category')}
                >
                  {categories.map(category => (
                    <IonSelectOption key={category} value={category}>
                      {t(category)}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>{t('Date')}</IonLabel>
                <IonDatetime
                  displayFormat="YYYY-MM-DD"
                  value={formData.date}
                  onIonChange={e => handleDateChange(e.detail.value)}
                  max={new Date().toISOString()}
                />
              </IonItem>
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel>{t('Budget')}</IonLabel>
                <IonSelect
                  value={formData.budget_id}
                  onIonChange={e => handleSelectChange('budget_id', e.detail.value)}
                  placeholder={t('Select a budget (optional)')}
                >
                  <IonSelectOption value="">{t('None')}</IonSelectOption>
                  {budgets.map(budget => (
                    <IonSelectOption key={budget.id} value={budget.id}>
                      {budget.name}
                    </IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
            </IonCol>
          </IonRow>
          
          <IonRow>
            <IonCol>
              <IonButton
                expand="block"
                type="submit"
                disabled={isLoading}
              >
                {t(expense ? 'Update Expense' : 'Add Expense')}
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
      
      <IonLoading isOpen={isLoading} message={t('Please wait...')} />
    </div>
  );
};

export default ExpenseForm;