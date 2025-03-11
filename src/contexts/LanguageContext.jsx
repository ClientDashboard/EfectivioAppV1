import React, { createContext, useState, useContext, useEffect } from 'react';

// Default translations
const translations = {
  en: {
    welcome: 'Welcome to Efectivio App',
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    logout: 'Logout',
    home: 'Home',
    settings: 'Settings',
    // Add more translations as needed
  },
  es: {
    welcome: 'Bienvenido a Efectivio App',
    login: 'Iniciar Sesión',
    signup: 'Registrarse',
    email: 'Correo Electrónico',
    password: 'Contraseña',
    logout: 'Cerrar Sesión',
    home: 'Inicio',
    settings: 'Configuración',
    // Add more translations as needed
  },
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const [t, setT] = useState(translations.en);

  useEffect(() => {
    // Update translations when language changes
    setT(translations[language]);
  }, [language]);

  const changeLanguage = (lang) => {
    if (translations[lang]) {
      setLanguage(lang);
    }
  };

  const value = {
    language,
    t,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};