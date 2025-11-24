import { I18n } from 'i18n-js';
import * as Localization from 'expo-localization';
import { translations } from './translations';

const i18n = new I18n(translations);

// Set the locale once at the beginning of your app
i18n.locale = Localization.locale || 'uz';

// When a value is missing from a language it'll fallback to another language with the key present
i18n.enableFallback = true;

// Default to Uzbek
i18n.defaultLocale = 'uz';

export default i18n;

export const setLanguage = (language: 'uz' | 'en' | 'ru') => {
  i18n.locale = language;
};

export const getCurrentLanguage = () => i18n.locale;
