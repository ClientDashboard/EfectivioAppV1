import React, { useState, useEffect } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonPage,
  IonButton,
  IonIcon,
  IonText,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonAlert,
  IonLoading,
  IonItem,
  IonLabel,
  IonAvatar,
  IonCardTitle,
  IonCardSubtitle,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonThumbnail
} from '@ionic/react';
import { 
  logOut, 
  language, 
  cash, 
  lockClosed, 
  checkmarkCircle, 
  alertCircle 
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { t } from '../contexts/LanguageContext';

// ✅ Fixed import structure based on `supabaseService.ts`
import supabase, { checkAuthStatus } from '../services/supabaseService';

const ProfileScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const history = useHistory();
  
  useEffect(() => {
    checkAuth();
  }, []);
  
  const checkAuth = async () => {
    try {
      const result = await checkAuthStatus();
      console.log('Auth check result:', result);
    } catch (error) {
      console.error('Auth check error:', error);
    }
  };
  
  const handleSignOut = () => {
    setShowAlert(true);
  };

  const confirmSignOut = async () => {
    try {
      setLoading(true);
      await signOut();
      history.push('/login');
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get first letter of email for avatar
  const avatarLetter = user?.email ? user.email[0].toUpperCase() : '?';

  if (!user) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{t('Profile')}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding ion-text-center">
          <IonText>
            <h2>{t('Loading')}</h2>
          </IonText>
          <IonLoading isOpen={true} message={t('Please wait...')} />
        </IonContent>
      </IonPage>
    );
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('Profile')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <div className="ion-text-center ion-padding">
          <IonThumbnail style={{ margin: '0 auto', width: '150px', height: '40px' }}>
            <img src="assets/logo.png" alt="Logo" />
          </IonThumbnail>
        </div>
        
        <IonCard color="light">
          <IonCardContent className="ion-text-center ion-padding">
            <IonAvatar style={{ margin: '0 auto', width: '80px', height: '80px', backgroundColor: '#062644', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <IonText color="light" style={{ fontSize: '2rem' }}>{avatarLetter}</IonText>
            </IonAvatar>
            <IonText>
              <h2 className="ion-padding-top">{user.email}</h2>
            </IonText>
          </IonCardContent>
        </IonCard>
        
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{t('Account Information')}</IonCardTitle>
          </IonCardHeader>
          <IonList>
            <IonItem>
              <IonLabel>{t('Email')}</IonLabel>
              <IonText slot="end">{user.email}</IonText>
            </IonItem>
            <IonItem>
              <IonLabel>{t('Account Status')}</IonLabel>
              <IonText slot="end" color={user.email_confirmed_at ? 'success' : 'warning'}>
                <IonIcon icon={user.email_confirmed_at ? checkmarkCircle : alertCircle} />
                {user.email_confirmed_at ? t('Verified') : t('Not Verified')}
              </IonText>
            </IonItem>
          </IonList>
        </IonCard>
        
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{t('App Settings')}</IonCardTitle>
          </IonCardHeader>
          <IonList>
            <IonItem button onClick={() => history.push('/settings/language')}>
              <IonIcon icon={language} slot="start" color="primary" />
              <IonLabel>{t('Language Settings')}</IonLabel>
            </IonItem>
            
            <IonItem button onClick={() => history.push('/settings/currency')}>
              <IonIcon icon={cash} slot="start" color="primary" />
              <IonLabel>{t('Currency Settings')}</IonLabel>
            </IonItem>
            
            <IonItem button onClick={checkAuth}>
              <IonIcon icon={checkmarkCircle} slot="start" color="primary" />
              <IonLabel>{t('Check Authentication')}</IonLabel>
            </IonItem>
          </IonList>
        </IonCard>
        
        <IonButton 
          expand="block" 
          className="ion-margin-top"
          color="primary"
          onClick={() => history.push('/settings/password')}
        >
          <IonIcon slot="start" icon={lockClosed} />
          {t('Change Password')}
        </IonButton>
        
        <IonButton 
          expand="block" 
          className="ion-margin-top"
          color="danger"
          onClick={handleSignOut}
        >
          <IonIcon slot="start" icon={logOut} />
          {t('Sign Out')}
        </IonButton>
        
        <IonLoading
          isOpen={loading}
          message={t('Please wait...')}
        />
        
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header={t('Sign Out')}
          message={t('Are you sure you want to sign out?')}
          buttons={[
            {
              text: t('Cancel'),
              role: 'cancel'
            },
            {
              text: t('Sign Out'),
              handler: confirmSignOut
            }
          ]}
        />
      </IonContent>
    </IonPage>
  );
};

export default ProfileScreen;
