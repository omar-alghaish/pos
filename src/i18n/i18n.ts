import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import en from './messages/en-us';
import ar from './messages/ar-eg';
import it from './messages/it-IT';
import fr from './messages/fr-FR';
import es from './messages/es-ES';
import de from './messages/de-DE';
import ru from './messages/ru-RU';
import ms from './messages/ms-MY';
import pt from './messages/pt-PT';
import tr from './messages/tr-TR';
import zh from './messages/zh-CN';
import af from './messages/af-ZA';
import az from './messages/az-AZ';
import ba from './messages/ba-RU';
import be from './messages/be-BY';
import bo from './messages/bo-CN';
import bs from './messages/bs-BA';
import ca from './messages/ca-ES';
import co from './messages/co-FR';
import cv from './messages/cv-RU';
import cy from './messages/cy-GB';
import eo from './messages/eo-EU';
import et from './messages/et-EE';
import eu from './messages/eu-ES';
import fil from './messages/fil-PH';
import ga from './messages/ga-IE';
import ht from './messages/ht-HT';
import hy from './messages/hy-AM';
import ia from './messages/ia-EU';
import is from './messages/is-IS';
import ka from './messages/ka-GE';
import kk from './messages/kk-KZ';
import ky from './messages/ky-KG';
import lb from './messages/lb-LU';
import ln from './messages/ln-CD';
import lv from './messages/lv-LV';
import mg from './messages/mg-MG';
import mi from './messages/mi-NZ';
import mk from './messages/mk-MK';
import mn from './messages/mn-MN';
import mt from './messages/mt-MT';
import my from './messages/my-MM';
import ps from './messages/ps-AF';
import rw from './messages/rw-RW';
import si from './messages/si-LK';
import so from './messages/so-SO';
import sq from './messages/sq-AL';
import sw from './messages/sw-KE';
import tg from './messages/tg-TJ';
import tl from './messages/tl-PH';
import tn from './messages/tn-BW';
import tt from './messages/tt-RU';
import uz from './messages/uz-UZ';
import vo from './messages/vo-EU';
import xh from './messages/xh-ZA';

i18n
  .use(LanguageDetector) // Detects the user's language automatically
  .use(initReactI18next) // Initializes react-i18next
  .init({
    resources: {
      en: en,
      ar: ar,
      it: it,
      fr: fr,
      es: es,
      de: de,
      ru: ru,
      ms: ms,
      pt: pt,
      tr: tr,
      zh: zh,
      af: af,
      az: az,
      ba: ba,
      be: be,
      bo: bo,
      bs: bs,
      ca: ca,
      co: co,
      cv: cv,
      cy: cy,
      eo: eo,
      et: et,
      eu: eu,
      fil: fil,
      ga: ga,
      ht: ht,
      hy: hy,
      ia: ia,
      is: is,
      ka: ka,
      kk: kk,
      ky: ky,
      lb: lb,
      ln: ln,
      lv: lv,
      mg: mg,
      mi: mi,
      mk: mk,
      mn: mn,
      mt: mt,
      my: my,
      ps: ps,
      rw: rw,
      si: si,
      so: so,
      sq: sq,
      sw: sw,
      tg: tg,
      tl: tl,
      tn: tn,
      tt: tt,
      uz: uz,
      vo: vo,
      xh: xh,
    },
    lng: 'en', // Default language
    fallbackLng: 'en', // Fallback language if the key is not available
    interpolation: {
      escapeValue: false, // React already handles escaping
    },
    react: {
      useSuspense: false, // Disable suspense to avoid render blocking
    },
  });

i18n.on('languageChanged', (lng) => {
  console.log('Language changed to:', lng); // Log language change
});

console.log('Available Languages:', Object.keys(i18n.services.resourceStore.data)); // Logs all available languages
console.log('Current Language:', i18n.language);

console.log('i18n initialized:', i18n.isInitialized);  // Should log true if i18n is initialized correctly

export default i18n;
