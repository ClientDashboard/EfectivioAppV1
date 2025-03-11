import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonPage,
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonListHeader,
  IonToggle,
  IonText,
  IonItemDivider
} from '@ionic/react';
import { 
  languageOutline, 
  cashOutline, 
  lockClosedOutline,
  informationCircleOutline,
  moonOutline,
  contrastOutline,
  notificationsOutline,
  cloudOutline
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { t } from '../contexts/LanguageContext';

const SettingsScreen: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('Settings')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        {/* App Preferences */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{t('App Preferences')}</IonCardTitle>
          </IonCardHeader>
          
          <IonList>
            <IonItem button onClick={() => history.push('/settings/language')} detail>
              <IonIcon icon={languageOutline} slot="start" color="primary" />
              <IonLabel>{t('Language Settings')}</IonLabel>
            </IonItem>
            
            <IonItem button onClick={() => history.push('/settings/currency')} detail>
              <IonIcon icon={cashOutline} slot="start" color="primary" />
              <IonLabel>{t('Currency Settings')}</IonLabel>
            </IonItem>
            
            <IonItemDivider></IonItemDivider>
            
            <IonItem>
              <IonIcon icon={moonOutline} slot="start" color="primary" />
              <IonLabel>{t('Dark Mode')}</IonLabel>
              <IonToggle slot="end"></IonToggle>
            </IonItem>
            
            <IonItem>
              <IonIcon icon={contrastOutline} slot="start" color="primary" />
              <IonLabel>{t('High Contrast')}</IonLabel>
              <IonToggle slot="end"></IonToggle>
            </IonItem>
          </IonList>
        </IonCard>
        
        {/* Account Settings */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{t('Account Settings')}</IonCardTitle>
          </IonCardHeader>
          
          <IonList>
            <IonItem button onClick={() => history.push('/settings/password')} detail>
              <IonIcon icon={lockClosedOutline} slot="start" color="primary" />
              <IonLabel>{t('Change Password')}</IonLabel>
            </IonItem>
            
            <IonItem>
              <IonIcon icon={notificationsOutline} slot="start" color="primary" />
              <IonLabel>{t('Notifications')}</IonLabel>
              <IonToggle slot="end" checked={true}></IonToggle>
            </IonItem>
            
            <IonItem>
              <IonIcon icon={cloudOutline} slot="start" color="primary" />
              <IonLabel>{t('Data Sync')}</IonLabel>
              <IonToggle slot="end" checked={true}></IonToggle>
            </IonItem>
          </IonList>
        </IonCard>
        
        {/* About */}
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{t('About')}</IonCardTitle>
          </IonCardHeader>
          
          <IonCardContent>
            <IonText>
              <h2>Budget Tracker</h2>
              <p>Version 1.0.0</p>
              <p>{t('A simple app to track your expenses and manage your budgets effectively.')}</p>
            </IonText>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default SettingsScreen;