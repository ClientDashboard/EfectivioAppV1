import React, { createContext, useContext, useState, useEffect } from 'react';

// Define supported languages
const supportedLanguages = ['en', 'es'];

// Translation dictionaries
const translations = {
  en: {
    'Home': 'Home',
    'Dashboard': 'Dashboard',
    'Budgets': 'Budgets',
    'Settings': 'Settings',
    'Profile': 'Profile',
    'Add Budget': 'Add Budget',
    'Edit Budget': 'Edit Budget',
    'Create Budget': 'Create Budget',
    'Add Expense': 'Add Expense',
    'Edit Expense': 'Edit Expense',
    'Budget Details': 'Budget Details',
    'Error': 'Error',
    'Success': 'Success',
    'OK': 'OK',
    'Cancel': 'Cancel',
    'Delete': 'Delete',
    'Loading...': 'Loading...',
    'Please wait...': 'Please wait...',
    'Budget created successfully': 'Budget created successfully',
    'Budget updated successfully': 'Budget updated successfully',
    'Budget not found': 'Budget not found',
    'Failed to load budget details. Please try again.': 'Failed to load budget details. Please try again.',
    'Failed to update budget. Please try again.': 'Failed to update budget. Please try again.',
    'Failed to create budget. Please try again.': 'Failed to create budget. Please try again.',
    'Expense updated successfully': 'Expense updated successfully',
    'Expense added successfully': 'Expense added successfully',
    'Expense not found': 'Expense not found',
    'Failed to load expense details. Please try again.': 'Failed to load expense details. Please try again.',
    'Failed to update expense. Please try again.': 'Failed to update expense. Please try again.',
    'Failed to create expense. Please try again.': 'Failed to create expense. Please try again.',
    'Language Settings': 'Language Settings',
    'Currency Settings': 'Currency Settings',
    'App Preferences': 'App Preferences',
    'Account Settings': 'Account Settings',
    'About': 'About',
    'Dark Mode': 'Dark Mode',
    'High Contrast': 'High Contrast',
    'Change Password': 'Change Password',
    'Notifications': 'Notifications',
    'Data Sync': 'Data Sync',
    'Select Language': 'Select Language',
    'Spanish': 'Spanish',
    'English': 'English',
    'Save & Return': 'Save & Return',
    'The app will use this language throughout all screens.': 'The app will use this language throughout all screens.',
    'Welcome to Efectivio': 'Welcome to Efectivio',
    'Welcome to the Efectivio App': 'Welcome to the Efectivio App',
    'Manage your expenses effectively': 'Manage your expenses effectively',
    'A simple app to track your expenses and manage your budgets effectively.': 'A simple app to track your expenses and manage your budgets effectively.',
    'Coming Soon': 'Coming Soon',
    'Sign In': 'Sign In',
    'Sign Up': 'Sign Up',
    'Email': 'Email',
    'Password': 'Password',
    'Confirm Password': 'Confirm Password',
    'Forgot Password': 'Forgot Password',
    'Reset Password': 'Reset Password',
    'Send Reset Link': 'Send Reset Link',
    'Back to Sign In': 'Back to Sign In',
    'Already have an account?': 'Already have an account?',
    "Don't have an account?": "Don't have an account?",
    'Budget Tracker': 'Budget Tracker',
    'Create Account': 'Create Account',
    'Current Password': 'Current Password',
    'New Password': 'New Password',
    'Confirm New Password': 'Confirm New Password',
    'Update Password': 'Update Password',
    // Add more translations as needed
  },
  es: {
    'Home': 'Inicio',
    'Dashboard': 'Panel',
    'Budgets': 'Presupuestos',
    'Settings': 'Configuración',
    'Profile': 'Perfil',
    'Add Budget': 'Añadir Presupuesto',
    'Edit Budget': 'Editar Presupuesto',
    'Create Budget': 'Crear Presupuesto',
    'Add Expense': 'Añadir Gasto',
    'Edit Expense': 'Editar Gasto',
    'Budget Details': 'Detalles del Presupuesto',
    'Error': 'Error',
    'Success': 'Éxito',
    'OK': 'OK',
    'Cancel': 'Cancelar',
    'Delete': 'Eliminar',
    'Loading...': 'Cargando...',
    'Please wait...': 'Por favor espere...',
    'Budget created successfully': 'Presupuesto creado con éxito',
    'Budget updated successfully': 'Presupuesto actualizado con éxito',
    'Budget not found': 'Presupuesto no encontrado',
    'Failed to load budget details. Please try again.': 'Error al cargar los detalles del presupuesto. Por favor, inténtelo de nuevo.',
    'Failed to update budget. Please try again.': 'Error al actualizar el presupuesto. Por favor, inténtelo de nuevo.',
    'Failed to create budget. Please try again.': 'Error al crear el presupuesto. Por favor, inténtelo de nuevo.',
    'Expense updated successfully': 'Gasto actualizado con éxito',
    'Expense added successfully': 'Gasto añadido con éxito',
    'Expense not found': 'Gasto no encontrado',
    'Failed to load expense details. Please try again.': 'Error al cargar los detalles del gasto. Por favor, inténtelo de nuevo.',
    'Failed to update expense. Please try again.': 'Error al actualizar el gasto. Por favor, inténtelo de nuevo.',
    'Failed to create expense. Please try again.': 'Error al crear el gasto. Por favor, inténtelo de nuevo.',
    'Language Settings': 'Configuración de Idioma',
    'Currency Settings': 'Configuración de Moneda',
    'App Preferences': 'Preferencias de la Aplicación',
    'Account Settings': 'Configuración de la Cuenta',
    'About': 'Acerca de',
    'Dark Mode': 'Modo Oscuro',
    'High Contrast': 'Alto Contraste',
    'Change Password': 'Cambiar Contraseña',
    'Notifications': 'Notificaciones',
    'Data Sync': 'Sincronización de Datos',
    'Select Language': 'Seleccionar Idioma',
    'Spanish': 'Español',
    'English': 'Inglés',
    'Save & Return': 'Guardar y Volver',
    'The app will use this language throughout all screens.': 'La aplicación usará este idioma en todas las pantallas.',
    'Welcome to Efectivio': 'Bienvenido a Efectivio',
    'Welcome to the Efectivio App': 'Bienvenido a la Aplicación Efectivio',
    'Manage your expenses effectively': 'Administra tus gastos de manera efectiva',
    'A simple app to track your expenses and manage your budgets effectively.': 'Una aplicación simple para realizar seguimiento de tus gastos y administrar tus presupuestos de manera efectiva.',
    'Coming Soon': 'Próximamente',
    'Sign In': 'Iniciar Sesión',
    'Sign Up': 'Registrarse',
    'Email': 'Correo Electrónico',
    'Password': 'Contraseña',
    'Confirm Password': 'Confirmar Contraseña',
    'Forgot Password': 'Olvidé mi Contraseña',
    'Reset Password': 'Restablecer Contraseña',
    'Send Reset Link': 'Enviar Enlace de Restablecimiento',
    'Back to Sign In': 'Volver a Iniciar Sesión',
    'Already have an account?': '¿Ya tienes una cuenta?',
    "Don't have an account?": "¿No tienes una cuenta?",
    'Budget Tracker': 'Rastreador de Presupuesto',
    'Create Account': 'Crear Cuenta',
    'Current Password': 'Contraseña Actual',
    'New Password': 'Nueva Contraseña',
    'Confirm New Password': 'Confirmar Nueva Contraseña',
    'Update Password': 'Actualizar Contraseña',
    // Add more translations as needed
  }
};

// Create the context
const LanguageContext = createContext();

// Provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguageState] = useState('en');

  // Load saved language preference on startup
  useEffect(() => {
    const loadLanguage = async () => {
      try {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage && supportedLanguages.includes(savedLanguage)) {
          setLanguageState(savedLanguage);
        }
      } catch (error) {
        console.error('Error loading language preference:', error);
      }
    };

    loadLanguage();
  }, []);

  // Function to set language and save it
  const setLanguage = async (lang) => {
    try {
      setLanguageState(lang);
      localStorage.setItem('language', lang);
    } catch (error) {
      console.error('Error saving language preference:', error);
    }
  };

  // Translation function 
  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Export the translation function for direct import
export const t = (key) => {
  // Get the language from localStorage as a fallback when used outside of component
  let language;
  try {
    language = localStorage.getItem('language') || 'en';
  } catch {
    language = 'en';
  }
  
  return translations[language]?.[key] || key;
};

export default LanguageContext;