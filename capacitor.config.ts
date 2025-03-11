import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.budgettracker',
  appName: 'Budget Tracker',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;