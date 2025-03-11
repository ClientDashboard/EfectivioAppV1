import React, { useState } from 'react';
import { 
  IonContent, 
  IonItem, 
  IonLabel, 
  IonInput, 
  IonButton, 
  IonTextarea, 
  IonLoading,
  IonList,
  IonText
} from '@ionic/react';
import PropTypes from 'prop-types';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * BudgetForm component for creating or editing budgets using Ionic components
 * 
 * @param {Object} budget - Existing budget data (for editing)
 * @param {Function} onSubmit - Function to call when form is submitted
 * @param {boolean} isLoading - Whether the form is in a loading state
 */
const BudgetForm = ({ 
  budget = {}, 
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
  
  // Initialize form with budget data or defaults
  const [formData, setFormData] = useState({
    name: budget.name || '',
    amount: budget.amount ? budget.amount.toString() : '',
    description: budget.description || '',
    startDate: formatDateString(budget.startDate) || formatDateString(new Date()),
    endDate: formatDateString(budget.endDate) || formatDateString(new Date(new Date().setMonth(new Date().getMonth() + 1)))
  });

  // State for validation errors
  const [errors, setErrors] = useState({});
  
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
  
  // Set budget to end of current month
  const handleSetMonthlyBudget = () => {
    const today = new Date();
    const startDate = formatDateString(today);
    
    // Set end date to last day of current month
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const endDate = formatDateString(endOfMonth);
    
    setFormData(prev => ({
      ...prev,
      startDate,
      endDate
    }));
  };
  
  // Validate the form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = t('Budget name is required');
    }
    
    const amount = parseFloat(formData.amount);
    if (!formData.amount || isNaN(amount) || amount <= 0) {
      newErrors.amount = t('Enter a valid amount');
    }
    
    // Validate date format for startDate (YYYY-MM-DD)
    if (!formData.startDate || !/^\d{4}-\d{2}-\d{2}$/.test(formData.startDate)) {
      newErrors.startDate = t('Enter a valid date (YYYY-MM-DD)');
    }
    
    // Validate date format for endDate (YYYY-MM-DD)
    if (!formData.endDate || !/^\d{4}-\d{2}-\d{2}$/.test(formData.endDate)) {
      newErrors.endDate = t('Enter a valid date (YYYY-MM-DD)');
    }
    
    // Validate end date is after start date
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = t('End date must be after start date');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      // Format the data for submission
      const submissionData = {
        ...formData,
        amount: parseFloat(formData.amount),
        // Keep dates as YYYY-MM-DD strings
        startDate: formData.startDate,
        endDate: formData.endDate
      };
      
      // Add ID if editing an existing budget
      if (budget.id) {
        submissionData.id = budget.id;
      }
      
      onSubmit(submissionData);
    }
  };
  
  return (
    <IonContent className="ion-padding">
      <IonList>
        <IonItem>
          <IonLabel position="stacked">{t('Budget Name')} *</IonLabel>
          <IonInput
            value={formData.name}
            onIonChange={(e) => handleChange('name', e.detail.value)}
            placeholder={t('e.g., Monthly Expenses')}
            disabled={isLoading}
            className={errors.name ? 'ion-invalid' : ''}
          />
          {errors.name && <IonText color="danger">{errors.name}</IonText>}
        </IonItem>
        
        <IonItem>
          <IonLabel position="stacked">{t('Budget Amount')} *</IonLabel>
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
          <IonLabel position="stacked">{t('Start Date')} * (YYYY-MM-DD)</IonLabel>
          <IonInput
            value={formData.startDate}
            onIonChange={(e) => handleChange('startDate', e.detail.value)}
            placeholder="YYYY-MM-DD"
            disabled={isLoading}
            className={errors.startDate ? 'ion-invalid' : ''}
          />
          {errors.startDate && <IonText color="danger">{errors.startDate}</IonText>}
        </IonItem>
        
        <IonItem>
          <IonLabel position="stacked">{t('End Date')} * (YYYY-MM-DD)</IonLabel>
          <IonInput
            value={formData.endDate}
            onIonChange={(e) => handleChange('endDate', e.detail.value)}
            placeholder="YYYY-MM-DD"
            disabled={isLoading}
            className={errors.endDate ? 'ion-invalid' : ''}
          />
          {errors.endDate && <IonText color="danger">{errors.endDate}</IonText>}
        </IonItem>
      </IonList>
      
      <IonButton 
        fill="clear" 
        onClick={handleSetMonthlyBudget}
        disabled={isLoading}
        className="ion-margin-bottom"
      >
        {t('Set as Monthly Budget')}
      </IonButton>
      
      <IonItem>
        <IonLabel position="stacked">{t('Description')} ({t('Optional')})</IonLabel>
        <IonTextarea
          value={formData.description}
          onIonChange={(e) => handleChange('description', e.detail.value)}
          placeholder={t('Add details about this budget')}
          rows={4}
          disabled={isLoading}
        />
      </IonItem>
      
      <IonButton
        expand="block"
        onClick={handleSubmit}
        disabled={isLoading}
        className="ion-margin-top"
      >
        {budget.id ? t('Update Budget') : t('Create Budget')}
      </IonButton>
      
      <IonLoading isOpen={isLoading} message={t('Please wait...')} />
    </IonContent>
  );
};

BudgetForm.propTypes = {
  budget: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    description: PropTypes.string
  }),
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

export default BudgetForm;