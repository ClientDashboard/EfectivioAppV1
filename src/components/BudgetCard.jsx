import React from 'react';
import { IonCard, IonCardContent, IonItem, IonLabel, IonIcon, IonButton, IonText, IonGrid, IonRow, IonCol } from '@ionic/react';
import { pencil, trash } from 'ionicons/icons';
import PropTypes from 'prop-types';
import { theme } from '../theme/theme';

/**
 * BudgetCard component for displaying budget summaries in Ionic
 * 
 * @param {Object} budget - The budget object to display
 * @param {Function} onDelete - Function to call when delete button is pressed
 * @param {Function} onPress - Function to call when card is pressed for details
 * @param {Function} onEdit - Function to call when edit button is pressed
 */
const BudgetCard = ({ budget, onDelete, onPress, onEdit }) => {
  // ✅ Ensure budget is not null
  if (!budget) {
    return (
      <IonCard>
        <IonCardContent>
          <IonText color="danger">Budget data is missing</IonText>
        </IonCardContent>
      </IonCard>
    );
  }

  // ✅ Ensure budget properties are valid before accessing
  const budgetName = budget?.name || 'Unnamed Budget';
  const budgetAmount = budget?.amount ? parseFloat(budget.amount) : 0;
  const spentAmount = budget?.spentAmount ? parseFloat(budget.spentAmount) : 0;

  // ✅ Calculate percentage used safely
  const percentUsed = budgetAmount > 0 ? Math.min(Math.round((spentAmount / budgetAmount) * 100), 100) : 0;

  // ✅ Determine progress bar color
  const getStatusColor = () => {
    if (percentUsed < 50) return '#4caf50'; // Green
    if (percentUsed < 75) return '#ff9800'; // Orange
    return '#f44336'; // Red
  };

  // ✅ Format currency safely
  const formatCurrency = (value) => {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  // ✅ Format date safely
  const formatDate = (dateString) => {
    return dateString ? new Date(dateString).toLocaleDateString() : 'N/A';
  };

  return (
    <IonCard onClick={onPress} style={{ margin: '8px 0' }}>
      <IonCardContent>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <IonText style={{ fontWeight: '600', fontSize: '18px' }}>{budgetName}</IonText>
          <IonText style={{ fontWeight: '700', fontSize: '18px' }}>{formatCurrency(budgetAmount)}</IonText>
        </div>
        
        <div style={{ marginBottom: '12px' }}>
          <div style={{ 
            height: '8px', 
            backgroundColor: '#e0e0e0', 
            borderRadius: '4px', 
            overflow: 'hidden',
            marginBottom: '4px'
          }}>
            <div style={{ 
              height: '100%', 
              width: `${percentUsed}%`, 
              backgroundColor: getStatusColor(),
              borderRadius: '4px'
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <IonText color="medium">{formatCurrency(spentAmount)} spent</IonText>
            <IonText color="medium">{percentUsed}%</IonText>
          </div>
        </div>
        
        {(budget.startDate || budget.endDate) && (
          <div style={{ marginBottom: '12px' }}>
            <IonText color="medium">
              {formatDate(budget.startDate)} - {formatDate(budget.endDate)}
            </IonText>
          </div>
        )}
        
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          {onEdit && (
            <IonButton 
              fill="clear" 
              color="success" 
              onClick={(e) => {
                e.stopPropagation();
                onEdit(budget.id);
              }}
              style={{ marginRight: '8px' }}
            >
              <IonIcon slot="start" icon={pencil} />
              Edit
            </IonButton>
          )}
          
          {onDelete && (
            <IonButton 
              fill="clear" 
              color="danger" 
              onClick={(e) => {
                e.stopPropagation();
                onDelete(budget.id);
              }}
            >
              <IonIcon slot="start" icon={trash} />
              Delete
            </IonButton>
          )}
        </div>
      </IonCardContent>
    </IonCard>
  );
};

BudgetCard.propTypes = {
  budget: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    amount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    spentAmount: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    startDate: PropTypes.string,
    endDate: PropTypes.string
  }),
  onDelete: PropTypes.func,
  onPress: PropTypes.func,
  onEdit: PropTypes.func
};

export default BudgetCard;