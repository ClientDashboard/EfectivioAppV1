import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonPage,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle
} from '@ionic/react';
import { t } from '../contexts/LanguageContext';

const HomeScreen: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{t('Home')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>{t('Welcome to Efectivio')}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonText>
              <p>{t('Welcome to the Efectivio App')}</p>
              <p>{t('Manage your expenses effectively')}</p>
            </IonText>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default HomeScreen;