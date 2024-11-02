import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enUs from './messages/en-us';
import arEg from './messages/ar-eg';
import itIt from './messages/it-IT';
import frFr from './messages/fr-FR';
import esEs from './messages/es-ES';
import deDe from './messages/de-DE';
import ruRu from './messages/ru-RU';
import msMy from './messages/ms-MY';
import ptPt from './messages/pt-PT';
import trTr from './messages/tr-TR';
import zhCn from './messages/zh-CN';

const resources = {
  en: enUs,
  ar: arEg,
  it: itIt,
  fr: frFr,
  es: esEs,
  de: deDe,
  ru: ruRu,
  ms: msMy,
  pt: ptPt,
  tr: trTr,
  zh: zhCn,
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

console.log('Available Languages:', Object.keys(resources));
console.log('Current Language:', i18n.language);
