import React from 'react';
import { 
  IonList, 
  IonItem, 
  IonLabel, 
  IonText, 
  IonIcon, 
  IonButton, 
  IonCard, 
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonSpinner,
  IonRefresher,
  IonRefresherContent,
  IonBadge,
  IonGrid,
  IonRow,
  IonCol,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonContent
} from '@ionic/react';
import { pencil, trash, receiptOutline } from 'ionicons/icons';
import PropTypes from 'prop-types';
import { useLanguage } from '../contexts/LanguageContext';

/**
 * ExpenseList component for displaying list of expenses using Ionic components
 * 
 * @param {Array} expenses - Array of expense objects
 * @param {Function} onDelete - Function to call when delete button is pressed
 * @param {Function} onEdit - Function to call when edit button is pressed
 * @param {boolean} isLoading - Whether the data is loading
 * @param {Function} onRefresh - Function to call on pull to refresh
 * @param {boolean} refreshing - Whether the list is refreshing
 */
const ExpenseList = ({ 
  expenses = [], 
  onDelete, 
  onEdit, 
  isLoading = false,
  onRefresh,
  refreshing = false
}) => {
  const { t } = useLanguage();
  
  // Format currency (assuming USD, but can be adapted)
  const formatCurrency = (value) => {
    return `$${parseFloat(value).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  // Get total of expenses
  const totalAmount = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);

  // Handle refresh
  const handleRefresh = (event) => {
    if (onRefresh) {
      onRefresh();
    }
    event.detail.complete();
  };

  // Render empty state
  const renderEmptyList = () => (
    <div className="ion-text-center ion-padding">
      {isLoading ? (
        <IonSpinner />
      ) : (
        <div>
          <IonIcon icon={receiptOutline} style={{ fontSize: '48px', color: '#ccc' }} />
          <IonText color="medium">
            <p>{t('No expenses found')}</p>
          </IonText>
        </div>
      )}
    </div>
  );

  return (
    <IonContent>
      <div className="ion-padding ion-margin-bottom" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottom: '1px solid #eee',
        paddingBottom: '12px'
      }}>
        <IonText style={{ fontSize: '18px', fontWeight: '600' }}>{t('Expenses')}</IonText>
        <IonText color="primary" style={{ fontSize: '16px', fontWeight: '600' }}>
          {t('Total')}: {formatCurrency(totalAmount)}
        </IonText>
      </div>
      
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent></IonRefresherContent>
      </IonRefresher>
      
      {expenses.length === 0 ? renderEmptyList() : (
        <IonList>
          {expenses.map(expense => (
            <IonItemSliding key={expense.id}>
              <IonItem>
                <IonLabel>
                  <h2>{expense.description}</h2>
                  <IonBadge color="light" style={{ marginRight: '8px', color: '#666' }}>
                    {expense.category}
                  </IonBadge>
                  <IonText color="medium">{formatDate(expense.date)}</IonText>
                </IonLabel>
                <IonText slot="end" style={{ fontWeight: '600' }}>
                  {formatCurrency(expense.amount)}
                </IonText>
              </IonItem>
              
              <IonItemOptions side="end">
                {onEdit && (
                  <IonItemOption color="primary" onClick={() => onEdit(expense.id)}>
                    <IonIcon slot="icon-only" icon={pencil} />
                  </IonItemOption>
                )}
                {onDelete && (
                  <IonItemOption color="danger" onClick={() => onDelete(expense.id)}>
                    <IonIcon slot="icon-only" icon={trash} />
                  </IonItemOption>
                )}
              </IonItemOptions>
            </IonItemSliding>
          ))}
        </IonList>
      )}
    </IonContent>
  );
};

ExpenseList.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
      category: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
    })
  ),
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  isLoading: PropTypes.bool,
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool
};

export default ExpenseList;