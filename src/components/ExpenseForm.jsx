import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonSelect,
  IonSelectOption,
  IonLoading,
  IonList,
  IonText,
  IonSpinner
} from '@ionic/react';
import PropTypes from 'prop-types';
import { getBudgets } from '../services/supabaseService';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * ExpenseForm component for creating or editing expenses using Ionic components
 * 
 * @param {Object} expense - Existing expense data (for editing)
 * @param {Function} onSubmit - Function to call when form is submitted
 * @param {boolean} isLoading - Whether the form is in a loading state
 */
const ExpenseForm = ({ 
  expense = {}, 
  onSubmit, 
  isLoading = false 
}) => {
  const { t } = useLanguage();
  
  // Format date string YYYY-MM-DD
  const formatDateString = (date) => {
    if (!date) return '';
    
    const d = new Date(date);
    // Check if date is valid
    if (isNaN(d.getTime())) return '';
    
    const year = d.getFullYear();
    // Month is 0-based, so add 1 and pad with leading zero if needed
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    
    return `${year}-${month}-${day}`;
  };
  
  // Initialize form with expense data or defaults
  const [formData, setFormData] = useState({
    amount: expense.amount ? expense.amount.toString() : '',
    category: expense.category || '',
    date: formatDateString(expense.date) || formatDateString(new Date()),
    description: expense.description || '',
    budget_id: expense.budget_id || ''
  });

  // State for budgets
  const [budgets, setBudgets] = useState([]);
  const [loadingBudgets, setLoadingBudgets] = useState(false);
  
  // State for validation errors
  const [errors, setErrors] = useState({});
  
  // Define expense categories
  const categories = [
    'Food & Dining',
    'Shopping',
    'Housing',
    'Transportation',
    'Utilities',
    'Healthcare',
    'Personal',
    'Entertainment',
    'Travel',
    'Education',
    'Debt Payments',
    'Investments',
    'Other'
  ];
  
  // Fetch budgets for dropdown
  useEffect(() => {
    const loadBudgets = async () => {
      try {
        setLoadingBudgets(true);
        const data = await getBudgets();
        setBudgets(data || []);
      } catch (err) {
        console.error('Error loading budgets:', err);
      } finally {
        setLoadingBudgets(false);
      }
    };
    
    loadBudgets();
  }, []);
  
  // Handle text input changes
  const handleChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    
    const amount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = t('Enter a valid amount');
    }
    
    if (!formData.category) {
      newErrors.category = t('Please select a category');
    }
    
    // Validate date format (YYYY-MM-DD)
    if (!formData.date || !/^\d{4}-\d{2}-\d{2}$/.test(formData.date)) {
      newErrors.date = t('Enter a valid date (YYYY-MM-DD)');
    }
    
    if (!formData.description.trim()) {
      newErrors.description = t('Description is required');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Set date to today
  const handleSetToday = () => {
    handleChange('date', formatDateString(new Date()));
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // Format the data for submission
      const submissionData = {
        ...formData,
        amount: parseFloat(formData.amount),
        // Keep date as YYYY-MM-DD string
        date: formData.date
      };
      
      // If budget_id is empty string, set to null
      if (submissionData.budget_id === '') {
        submissionData.budget_id = null;
      }
      
      // Add ID if editing an existing expense
      if (expense.id) {
        submissionData.id = expense.id;
      }
      
      onSubmit(submissionData);
    }
  };
  
  return (
    <IonContent className="ion-padding">
      <IonList>
        <IonItem>
          <IonLabel position="stacked">{t('Amount')} *</IonLabel>
          <IonInput
            value={formData.amount}
            onIonChange={(e) => handleChange('amount', e.detail.value)}
            placeholder="0.00"
            type="number"
            disabled={isLoading}
            className={errors.amount ? 'ion-invalid' : ''}
          />
          {errors.amount && <IonText color="danger">{errors.amount}</IonText>}
        </IonItem>
        
        <IonItem>
          <IonLabel position="stacked">{t('Date')} * (YYYY-MM-DD)</IonLabel>
          <div style={{ display: 'flex' }}>
            <IonInput
              value={formData.date}
              onIonChange={(e) => handleChange('date', e.detail.value)}
              placeholder="YYYY-MM-DD"
              disabled={isLoading}
              className={errors.date ? 'ion-invalid' : ''}
            />
            <IonButton 
              size="small" 
              fill="clear" 
              onClick={handleSetToday} 
              disabled={isLoading}
            >
              {t('Today')}
            </IonButton>
          </div>
          {errors.date && <IonText color="danger">{errors.date}</IonText>}
        </IonItem>
        
        <IonItem>
          <IonLabel position="stacked">{t('Category')} *</IonLabel>
          <IonSelect
            value={formData.category}
            onIonChange={(e) => handleChange('category', e.detail.value)}
            placeholder={t('Select a category')}
            disabled={isLoading}
            className={errors.category ? 'ion-invalid' : ''}
          >
            {categories.map(category => (
              <IonSelectOption key={category} value={category}>
                {category}
              </IonSelectOption>
            ))}
          </IonSelect>
          {errors.category && <IonText color="danger">{errors.category}</IonText>}
        </IonItem>
        
        <IonItem>
          <IonLabel position="stacked">{t('Budget')} ({t('Optional')})</IonLabel>
          {loadingBudgets ? (
            <IonSpinner name="dots" />
          ) : (
            <IonSelect
              value={formData.budget_id}
              onIonChange={(e) => handleChange('budget_id', e.detail.value)}
              placeholder={t('No Budget')}
              disabled={isLoading || loadingBudgets}
            >
              <IonSelectOption value="">{t('No Budget')}</IonSelectOption>
              {budgets.map(budget => (
                <IonSelectOption key={budget.id} value={budget.id}>
                  {budget.name}
                </IonSelectOption>
              ))}
            </IonSelect>
          )}
        </IonItem>
        
        <IonItem>
          <IonLabel position="stacked">{t('Description')} *</IonLabel>
          <IonInput
            value={formData.description}
            onIonChange={(e) => handleChange('description', e.detail.value)}
            placeholder={t('Enter a description')}
            disabled={isLoading}
            maxlength={100}
            className={errors.description ? 'ion-invalid' : ''}
          />
          {errors.description && <IonText color="danger">{errors.description}</IonText>}
        </IonItem>
      </IonList>
      
      <IonButton
        expand="block"
        onClick={handleSubmit}
        disabled={isLoading}
        className="ion-margin-top"
      >
        {expense.id ? t('Update Expense') : t('Add Expense')}
      </IonButton>
      
      <IonLoading isOpen={isLoading} message={t('Please wait...')} />