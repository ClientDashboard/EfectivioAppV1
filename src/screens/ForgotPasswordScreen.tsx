import React, { useState } from 'react';
import { 
  IonContent, 
  IonPage,
  IonButton,
  IonInput,
  IonItem,
  IonLabel,
  IonToast,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonBackButton,
  IonButtons,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';
import { useAuth } from '../contexts/AuthContext';
import { t } from '../contexts/LanguageContext';

const ForgotPasswordScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const { resetPassword } = useAuth();

  const handleResetPassword = async () => {
    if (!email) {
      setMessage(t('Please enter your email'));
      setIsError(true);
      setShowToast(true);
      return;
    }
    
    try {
      setLoading(true);
      await resetPassword(email);
      setMessage(t('Password reset email sent. Please check your inbox.'));
      setIsError(false);
      setShowToast(true);
    } catch (error: any) {
      console.error(error);
      setMessage(error.message || t('Failed to send reset email'));
      setIsError(true);
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/login" />
          </IonButtons>
          <IonTitle>{t('Reset Password')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <div className="ion-text-center ion-padding">
                <IonText>
                  <h1>{t('Reset Password')}</h1>
                  <p>{t('Enter your email to receive a password reset link')}</p>
                </IonText>
              </div>

              <IonCard>
                <IonCardContent>
                  <IonItem>
                    <IonLabel position="floating">{t('Email')}</IonLabel>
                    <IonInput
                      type="email"
                      value={email}
                      onIonChange={e => setEmail(e.detail.value!)}
                      autocapitalize="none"
                    />
                  </IonItem>
                  
                  <IonButton 
                    expand="block" 
                    onClick={handleResetPassword}
                    className="ion-margin-top"
                    color="primary"
                  >
                    {t('Send Reset Link')}
                  </IonButton>
                  
                  <IonButton 
                    expand="block" 
                    fill="clear"
                    routerLink="/login"
                    className="ion-margin-top"
                  >
                    {t('Back to Sign In')}
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        
        <IonLoading
          isOpen={loading}
          message={t('Please wait...')}
        />
        
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={message}
          duration={5000}
          color={isError ? 'danger' : 'success'}
        />
      </IonContent>
    </IonPage>
  );
};

export default ForgotPasswordScreen;