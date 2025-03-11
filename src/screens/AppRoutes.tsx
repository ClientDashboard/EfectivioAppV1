import React from 'react';
import { 
  IonRouterOutlet, 
  IonTabs, 
  IonTabBar, 
  IonTabButton,
  IonIcon,
  IonLabel 
} from '@ionic/react';
import { 
  Route, 
  Redirect 
} from 'react-router-dom';
import { 
  wallet, 
  home, 
  settings,
  person,
  statsChart 
} from 'ionicons/icons';
import { t } from '../contexts/LanguageContext';

// Screens
import HomeScreen from './HomeScreen';
import DashboardScreen from './DashboardScreen';
import BudgetListScreen from './BudgetListScreen';
import BudgetDetailScreen from './BudgetDetailScreen';
import AddBudgetScreen from './AddBudgetScreen';
import AddExpenseScreen from './AddExpenseScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import LanguageSettingsScreen from './LanguageSettingsScreen';
import CurrencySettingsScreen from './CurrencySettingsScreen';
import ChangePasswordScreen from './ChangePasswordScreen';

const AppRoutes: React.FC = () => {
  return (
    <IonTabs>
      <IonRouterOutlet>
        {/* Home */}
        <Route exact path="/home" component={HomeScreen} />
        
        {/* Dashboard */}
        <Route exact path="/dashboard" component={DashboardScreen} />
        
        {/* Budgets */}
        <Route exact path="/budgets" component={BudgetListScreen} />
        <Route exact path="/budgets/:id" component={BudgetDetailScreen} />
        <Route exact path="/budgets/add" component={AddBudgetScreen} />
        <Route exact path="/budgets/edit/:id" component={AddBudgetScreen} />
        
        {/* Expenses */}
        <Route exact path="/expenses/add" component={AddExpenseScreen} />
        <Route exact path="/expenses/add/:budgetId" component={AddExpenseScreen} />
        <Route exact path="/expenses/edit/:id" component={AddExpenseScreen} />
        
        {/* Settings */}
        <Route exact path="/settings" component={SettingsScreen} />
        <Route exact path="/settings/language" component={LanguageSettingsScreen} />
        <Route exact path="/settings/currency" component={CurrencySettingsScreen} />
        <Route exact path="/settings/password" component={ChangePasswordScreen} />
        
        {/* Profile */}
        <Route exact path="/profile" component={ProfileScreen} />
        
        {/* Default redirect */}
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
      
      <IonTabBar slot="bottom">
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={home} />
          <IonLabel>{t('Home')}</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="dashboard" href="/dashboard">
          <IonIcon icon={statsChart} />
          <IonLabel>{t('Dashboard')}</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="budgets" href="/budgets">
          <IonIcon icon={wallet} />
          <IonLabel>{t('Budgets')}</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="settings" href="/settings">
          <IonIcon icon={settings} />
          <IonLabel>{t('Settings')}</IonLabel>
        </IonTabButton>
        
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={person} />
          <IonLabel>{t('Profile')}</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

export default AppRoutes;