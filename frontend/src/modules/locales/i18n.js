import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

import en from './en.json';
import vi from './vi.json';

const resources = {
    en: {
        translation: en
    },
    vi: {
        translation: vi
    }
};

const savedLanguage = localStorage.getItem('i18nextLng') || 'vi';

i18n
    .use(initReactI18next)
    .init({
        resources,
        lng: savedLanguage,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false
        }
    });

i18n.on('languageChanged', (lng) => {
    localStorage.setItem('i18nextLng', lng);
    document.documentElement.lang = lng;
});

export default i18n;