import React from 'react';
import { IonList, IonItem, IonLabel, IonButton, IonIcon, IonSpinner } from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import { t } from '../contexts/LanguageContext';

const CustomExpenseList = ({ expenses, onDelete, onEdit, isLoading }) => {
  if (isLoading) {
    return (
      <div className="ion-text-center ion-padding">
        <IonSpinner />
        <p>{t('Loading...')}</p>
      </div>
    );
  }

  if (!expenses || expenses.length === 0) {
    return (
      <div className="ion-text-center ion-padding">
        <p>{t('No expenses found')}</p>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  // Format amount for display
  const formatAmount = (amount) => {
    if (!amount) return '$0.00';
    return `$${parseFloat(amount).toFixed(2)}`;
  };

  return (
    <IonList>
      {expenses.map((expense) => (
        <IonItem key={expense.id}>
          <IonLabel>
            <h2>{expense.description}</h2>
            <p>{expense.category}</p>
            <p>{formatDate(expense.date)}</p>
          </IonLabel>
          <IonLabel slot="end">
            <h2 className="ion-text-right">{formatAmount(expense.amount)}</h2>
          </IonLabel>
          
          <IonButton fill="clear" onClick={() => onEdit && onEdit(expense.id)}>
            <IonIcon slot="icon-only" icon={pencil} />
          </IonButton>
          
          <IonButton fill="clear" color="danger" onClick={() => onDelete && onDelete(expense.id)}>
            <IonIcon slot="icon-only" icon={trash} />
          </IonButton>
        </IonItem>
      ))}
    </IonList>
  );
};

export default CustomExpenseList;
