import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import enUs from './messages/en-us';
import arEg from './messages/ar-eg';
const resources = {
  en: enUs,
  ar: arEg
};

i18n
  .use(LanguageDetector) // Detects the user's language automatically
  .use(initReactI18next) // Initializes react-i18next
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
  });

export default i18n;
