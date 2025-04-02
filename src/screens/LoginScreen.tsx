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

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  
  const { signIn } = useAuth();
  const history = useHistory();

  const handleLogin = async () => {
    if (!email || !password) {
      setError(t('Please enter your email and password'));
      setShowToast(true);
      return;
    }
    
    try {
      setLoading(true);
      await signIn(email, password);
      // Navigation will be handled by the router based on auth state
      history.push('/dashboard');
    } catch (error: any) {
      console.error(error);
      setError(error.message || t('Login error'));
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
                  <p>{t('Sign In')}</p>
                </IonText>
              </div>

              <IonCard>
                <IonCardHeader>
                  <IonCardTitle className="ion-text-center">{t('Sign In')}</IonCardTitle>
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
                  
                  <IonItem className="ion-margin-bottom">
                    <IonLabel position="floating">{t('Password')}</IonLabel>
                    <IonInput
                      type="password"
                      value={password}
                      onIonChange={e => setPassword(e.detail.value!)}
                    />
                  </IonItem>
                  
                  <IonButton 
                    expand="block" 
                    onClick={handleLogin}
                    className="ion-margin-top"
                    color="primary"
                  >
                    {t('Sign In')}
                  </IonButton>
                  
                  <IonButton 
                    expand="block" 
                    fill="clear"
                    routerLink="/signup"
                    className="ion-margin-top"
                  >
                    {t("Don't have an account?")} {t('Sign Up')}
                  </IonButton>
                  
                  <IonButton
                    expand="block"
                    fill="clear"
                    routerLink="/forgot-password"
                    className="ion-margin-top"
                  >
                    {t('Forgot Password')}
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
          color="danger"
        />
      </IonContent>
    </IonPage>
  );
};

export default LoginScreen;