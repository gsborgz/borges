import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  pt: {
    translation: {
      teste: 'Teste',
    },
  },
  en: {
    translation: {
      teste: 'Test',
    },
  },
  fr: {
    translation: {
      teste: 'Testo',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
