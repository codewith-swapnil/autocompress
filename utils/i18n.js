import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translations
import en from '../locales/en.json';
import es from '../locales/es.json';
import zh from '../locales/zh.json';
import hi from '../locales/hi.json';
import ar from '../locales/ar.json';
import fr from '../locales/fr.json';
import ru from '../locales/ru.json';
import pt from '../locales/pt.json';
import de from '../locales/de.json';
import ja from '../locales/ja.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      es: { translation: es },
      zh: { translation: zh },
      hi: { translation: hi },
      ar: { translation: ar },
      fr: { translation: fr },
      ru: { translation: ru },
      pt: { translation: pt },
      de: { translation: de },
      ja: { translation: ja }
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;