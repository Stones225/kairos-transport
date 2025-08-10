import React from 'react';
import {NextIntlProvider, useLocale, useTranslations} from 'next-intl';

export type SupportedLanguage = 'fr' | 'en' | 'it' | 'es' | 'mandingue';

interface LanguageContextType {
  currentLanguage: SupportedLanguage;
  setLanguage: (language: SupportedLanguage) => void;
  t: (key: string) => string;
  availableLanguages: { code: SupportedLanguage; name: string; flag: string }[];
}

const availableLanguages = [
  { code: 'fr' as SupportedLanguage, name: 'Français', flag: '🇸🇳' },
  { code: 'en' as SupportedLanguage, name: 'English', flag: '🇺🇸' },
  { code: 'it' as SupportedLanguage, name: 'Italiano', flag: '🇮🇹' },
  { code: 'es' as SupportedLanguage, name: 'Español', flag: '🇪🇸' },
  { code: 'mandingue' as SupportedLanguage, name: 'Mandingue', flag: '🌍' }
];

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <NextIntlProvider locale="en" messages={{}}>
      {children}
    </NextIntlProvider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const t = useTranslations();
  const currentLanguage = useLocale() as SupportedLanguage;

  const setLanguage = (_language: SupportedLanguage) => {
    // La navigation sera gérée par next-intl dans l'application Next.js
  };

  return {
    currentLanguage,
    setLanguage,
    t,
    availableLanguages
  };
};
