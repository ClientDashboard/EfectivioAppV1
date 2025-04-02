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
  IonText
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { t } from '../contexts/LanguageContext';

const SignupScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { signUp } = useAuth();
  const history = useHistory();

  const handleSignup = async () => {
    // Form validation
    if (!email || !password || !confirmPassword) {
      setError(t('All fields are required'));
      setShowToast(true);
      return;
    }
    
    if (password !== confirmPassword) {
      setError(t('Passwords do not match'));
      setShowToast(true);
      return;
    }
    
    if (password.length < 6) {
      setError(t('Password must be at least 6 characters'));
      setShowToast(true);
      return;
    }
    
    try {
      setLoading(true);
      await signUp(email, password);
      setError(t('Account created successfully! Please check your email to confirm your account.'));
      setIsSuccess(true);
      setShowToast(true);
      // Wait a bit before redirecting
      setTimeout(() => {
        history.push('/login');
      }, 2000);
    } catch (error: any) {
      console.error(error);
      setError(error.message || t('Sign up error'));
      setIsSuccess(false);
      setShowToast(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow className="ion-justify-content-center">
            <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="4">
              <div className="ion-text-center ion-padding">
                <IonText>
                  <h1 className="ion-no-margin">{t('Budget Tracker')}</h1>
                  <p>{t('Create Account')}</p>
                </IonText>
              </div>

              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center">{t('Sign Up')}</IonCardTitle>
                </IonCardHeader>
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
                  
                  <IonItem>
                    <IonLabel position="floating">{t('Password')}</IonLabel>
                    <IonInput
                      type="password"
                      value={password}
                      onIonChange={e => setPassword(e.detail.value!)}
                    />
                  </IonItem>
                  
                  <IonItem className="ion-margin-bottom">
                    <IonLabel position="floating">{t('Confirm Password')}</IonLabel>
                    <IonInput
                      type="password"
                      value={confirmPassword}
                      onIonChange={e => setConfirmPassword(e.detail.value!)}
                    />
                  </IonItem>
                  
                  <IonButton 
                    expand="block" 
                    onClick={handleSignup}
                    className="ion-margin-top"
                    color="primary"
                  >
                    {t('Sign Up')}
                  </IonButton>
                  
                  <IonButton 
                    expand="block" 
                    fill="clear"
                    routerLink="/login"
                    className="ion-margin-top"
                  >
                    {t('Already have an account?')} {t('Sign In')}
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
          message={error}
          duration={3000}
          color={isSuccess ? 'success' : 'danger'}
        />
      </IonContent>
    </IonPage>
  );
};

export default SignupScreen;