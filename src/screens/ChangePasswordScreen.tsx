import React, { useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonPage,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonAlert,
  IonLoading,
  IonBackButton,
  IonButtons,
  IonText
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { t } from '../contexts/LanguageContext';

const ChangePasswordScreen: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');

  const history = useHistory();
  
  const handleChangePassword = () => {
    // For now, just show a message that this feature is coming soon
    setAlertMessage(t('Password change functionality will be available in a future update.'));
    setShowAlert(true);
  };
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile" />
          </IonButtons>
          <IonTitle>{t('Change Password')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonText>
          <h2 className="ion-text-center">{t('Change Password')}</h2>
        </IonText>
        
        <IonItem className="ion-margin-top">
          <IonLabel position="floating">{t('Current Password')}</IonLabel>
          <IonInput
            type="password"
            value={currentPassword}
            onIonChange={e => setCurrentPassword(e.detail.value!)}
          />
        </IonItem>
        
        <IonItem className="ion-margin-top">
          <IonLabel position="floating">{t('New Password')}</IonLabel>
          <IonInput
            type="password"
            value={newPassword}
            onIonChange={e => setNewPassword(e.detail.value!)}
          />
        </IonItem>
        
        <IonItem className="ion-margin-top ion-margin-bottom">
          <IonLabel position="floating">{t('Confirm New Password')}</IonLabel>
          <IonInput
            type="password"
            value={confirmPassword}
            onIonChange={e => setConfirmPassword(e.detail.value!)}
          />
        </IonItem>
        
        <IonButton
          expand="block"
          onClick={handleChangePassword}
          className="ion-margin-top"
          color="primary"
        >
          {t('Update Password')}
        </IonButton>
        
        <IonButton
          expand="block"
          fill="clear"
          onClick={() => history.goBack()}
          className="ion-margin-top"
        >
          {t('Cancel')}
        </IonButton>
        
        <IonLoading
          isOpen={loading}
          message={t('Please wait...')}
        />
        
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => {
            setShowAlert(false);
            history.goBack();
          }}
          header={t('Feature Coming Soon')}
          message={alertMessage}
          buttons={[{
            text: t('OK')
          }]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ChangePasswordScreen;