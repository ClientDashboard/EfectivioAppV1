import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonPage,
  IonBackButton,
  IonButtons,
  IonText
} from '@ionic/react';
import { t } from '../contexts/LanguageContext';

const CurrencySettingsScreen: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile" />
          </IonButtons>
          <IonTitle>{t('Currency Settings')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding ion-text-center">
        <IonText>
          <h2>{t('Currency Settings')}</h2>
          <p>{t('Coming Soon')}</p>
        </IonText>
      </IonContent>
    </IonPage>
  );
};

export default CurrencySettingsScreen;