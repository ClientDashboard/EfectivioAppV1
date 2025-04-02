declare module '../contexts/AuthContext' {
    export interface User {
      email: string;
      email_confirmed_at?: string;
      [key: string]: any;
    }
    
    export interface AuthContextType {
      user: User | null;
      isLoading: boolean;
      signIn: (email: string, password: string) => Promise<any>;
      signUp: (email: string, password: string) => Promise<any>;
      signOut: () => Promise<any>;
      resetPassword: (email: string) => Promise<any>;
    }
    
    export function useAuth(): AuthContextType;
  }