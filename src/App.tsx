import React, { useState, useEffect } from 'react';
import { Redirect, Route, RouteProps } from 'react-router-dom';
import { 
  IonApp, 
  IonRouterOutlet, 
  setupIonicReact,
  IonLoading
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext'; // Add this import

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

/* Authentication Screens */
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

/* App Screens */
import AppRoutes from './screens/AppRoutes';

setupIonicReact();

const App: React.FC = () => {
  const { user, isLoading } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      setAuthChecked(true);
    }
  }, [isLoading]);

  if (!authChecked) {
    return (
      <IonApp>
        <IonLoading
          isOpen={true}
          message={"Loading..."}
        />
      </IonApp>
    );
  }

  return (
    <LanguageProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            {/* Auth Routes */}
            <Route exact path="/login" render={() => (
              user ? <Redirect to="/dashboard" /> : <LoginScreen />
            )} />
            <Route exact path="/signup" render={() => (
              user ? <Redirect to="/dashboard" /> : <SignupScreen />
            )} />
            <Route exact path="/forgot-password" render={() => (
              user ? <Redirect to="/dashboard" /> : <ForgotPasswordScreen />
            )} />
            
            {/* Protected Routes */}
            <Route path="/" render={() => (
              !user ? <Redirect to="/login" /> : <AppRoutes />
            )} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </LanguageProvider>
  );
};

export default App;