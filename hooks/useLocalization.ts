import { useEffect, useState } from 'react';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translations from '@/locales';

const LANGUAGE_KEY = '@language';

export function useLocalization() {
    const [i18n] = useState(() => {
        const i18nInstance = new I18n(translations);
        i18nInstance.defaultLocale = 'en';
        i18nInstance.enableFallback = true;
        return i18nInstance;
    });

    const [currentLocale, setCurrentLocale] = useState('en');

    useEffect(() => {
        loadSavedLanguage();
    }, []);

    const loadSavedLanguage = async () => {
        try {
            const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
            if (savedLanguage) {
                setCurrentLocale(savedLanguage);
                i18n.locale = savedLanguage;
            } else {
                // Use device locale if available
                const deviceLocale = Localization.locale.split('-')[0];
                const supportedLocale = translations[deviceLocale as keyof typeof translations] ? deviceLocale : 'en';
                setCurrentLocale(supportedLocale);
                i18n.locale = supportedLocale;
            }
        } catch (error) {
            console.error('Error loading saved language:', error);
        }
    };

    const changeLanguage = async (locale: string) => {
        try {
            await AsyncStorage.setItem(LANGUAGE_KEY, locale);
            setCurrentLocale(locale);
            i18n.locale = locale;
        } catch (error) {
            console.error('Error saving language:', error);
        }
    };

    const t = (key: string, options?: any) => {
        return i18n.t(key, options);
    };

    return {
        t,
        currentLocale,
        changeLanguage,
        availableLocales: Object.keys(translations),
    };
}
