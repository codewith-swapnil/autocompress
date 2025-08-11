import { createContext, useState, useEffect, useContext } from 'react';

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [language, setLanguage] = useState('english');
  const [translations, setTranslations] = useState({});

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const response = await import(`../locales/${language === 'english' ? 'en' : 'hi'}.json`);
        setTranslations(response.default);
      } catch (error) {
        console.error('Error loading translations:', error);
      }
    };

    loadTranslations();
    
    // Save language preference
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  return (
    <TranslationContext.Provider value={{ translations, language, setLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};