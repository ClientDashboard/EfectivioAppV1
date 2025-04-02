import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import { home, settings, person } from 'ionicons/icons';
import { useAuth } from '../contexts/AuthContext';

// Import your screens
import Login from '../screens/Login';
import Home from '../screens/Home';
import Settings from '../screens/Settings';

const AppNavigator = () => {
  const { user } = useAuth();

  return (
    <>
      {user ? (
        // Authenticated routes
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/home" component={Home} />
            <Route exact path="/settings" component={Settings} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          
          <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
              <IonIcon icon={home} />
              <IonLabel>Home</IonLabel>
            </IonTabButton>
            
            <IonTabButton tab="settings" href="/settings">
              <IonIcon icon={settings} />
              <IonLabel>Settings</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      ) : (
        // Unauthenticated routes
        <IonRouterOutlet>
          <Route exact path="/login" component={Login} />
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
        </IonRouterOutlet>
      )}
    </>
  );
};

export default AppNavigator;