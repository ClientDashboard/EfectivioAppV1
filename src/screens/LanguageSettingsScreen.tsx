import React from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonToolbar, 
  IonTitle, 
  IonPage,
  IonButton,
  IonBackButton,
  IonButtons,
  IonList,
  IonItem,
  IonLabel,
  IonRadioGroup,
  IonRadio,
  IonListHeader,
  IonText,
  IonItemDivider
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { useLanguage, t } from '../contexts/LanguageContext';

const LanguageSettingsScreen: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const history = useHistory();

  const handleLanguageChange = async (newLanguage: 'es' | 'en') => {
    await setLanguage(newLanguage);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/profile" />
          </IonButtons>
          <IonTitle>{t('Language Settings')}</IonTitle>
        </IonToolbar>
      </IonHeader>
      
      <IonContent className="ion-padding">
        <IonText>
          <h2>{t('Language Settings')}</h2>
        </IonText>
        
        <IonList>
          <IonListHeader>{t('Select Language')}</IonListHeader>
          <IonItemDivider />
          
          <IonRadioGroup 
            value={language || 'es'} 
            onIonChange={e => handleLanguageChange(e.detail.value as 'es' | 'en')}
          >
            <IonItem>
              <IonLabel>{t('Spanish')}</IonLabel>
              <IonRadio slot="start" value="es" />
            </IonItem>
            
            <IonItemDivider />
            
            <IonItem>
              <IonLabel>{t('English')}</IonLabel>
              <IonRadio slot="start" value="en" />
            </IonItem>
          </IonRadioGroup>
        </IonList>
        
        <IonText className="ion-padding">
          <p className="ion-padding-top">
            {t('The app will use this language throughout all screens.')}
          </p>
        </IonText>
        
        <IonButton
          expand="block"
          onClick={() => history.goBack()}
          className="ion-margin-top"
          color="primary"
        >
          {t('Save & Return')}
        </IonButton>
      </IonContent>
    </IonPage>
  );
};

export default LanguageSettingsScreen;