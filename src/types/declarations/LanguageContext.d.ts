declare module '*/contexts/LanguageContext' {
  export type Language = 'en' | 'es';
  
  export interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => Promise<void>;
  }
  
  export function t(key: string): string;
  export function useLanguage(): LanguageContextType;
}
