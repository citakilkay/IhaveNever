import { useEffect, useState } from 'react';
import * as Localization from 'expo-localization';
import { I18n } from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const translations = {
    en: {
        // Navigation
        categories: 'Categories',
        play: 'Play',
        settings: 'Settings',

        // Categories Screen
        appTitle: 'I Have Never',
        chooseCategorySubtitle: 'Choose categories to start playing!',
        selectCategories: 'Select Categories',
        selectedCount: '{{count}} selected',
        startGame: 'Start Game',
        selectAtLeastOne: 'Please select at least one category',

        // Game Screen
        playingNow: 'Playing Now',
        questionsLeft: '{{count}} questions left',
        nextQuestion: 'Next Question',
        allQuestionsUsed: 'All Questions Used!',
        allQuestionsUsedMessage: 'You\'ve seen all questions from selected categories. Starting over!',
        resetGame: 'Reset Game',
        resetGameMessage: 'Are you sure you want to go back to categories?',
        cancel: 'Cancel',
        reset: 'Reset',
        ok: 'OK',

        // Empty States
        noGameActive: 'No Game Active',
        noGameActiveMessage: 'Go to Categories and select some to start playing!',
        chooseCategory: 'Choose Categories',

        // Question Card
        drinkInstruction: 'Drink if you HAVE done this! 🍻',

        // Settings Screen
        settingsTitle: 'Settings',
        settingsSubtitle: 'Game info and preferences',
        gameInfo: 'Game Info',
        language: 'Language',
        about: 'About',
        aboutSubtitle: 'Game rules and version info',
        sendFeedback: 'Send Feedback',
        feedbackSubtitle: 'Help us improve the game',
        rateApp: 'Rate the App',
        rateSubtitle: 'Show some love ⭐⭐⭐⭐⭐',
        howToPlay: 'How to Play',
        gameRules: '1. Gather your friends around\n2. Choose categories\n3. Read the question aloud\n4. Anyone who HAS done it drinks!\n5. Tap "Next Question" to continue',
        madeWithLove: 'Made for unforgettable nights',

        // About Dialog
        aboutTitle: 'About I Have Never',
        aboutMessage: 'A fun party game for groups of friends! Select categories and take turns reading questions. Drink if you HAVE done the thing mentioned in the question.\n\nVersion 1.0.0',

        // Feedback Dialog
        feedbackTitle: 'Send Feedback',
        feedbackMessage: 'Help us improve the game! What features would you like to see?',
        sendEmail: 'Send Email',
        later: 'Later',

        // Rate Dialog
        rateTitle: 'Rate the App',
        rateMessage: 'Enjoying the game? Please rate us in the app store!',
        rateNow: 'Rate Now',

        // Categories
        generalFun: 'General Fun',
        generalFunDesc: 'Classic never have I ever questions',
        travelAdventure: 'Travel & Adventure',
        travelAdventureDesc: 'Questions about exploring the world',
        foodDrinks: 'Food & Drinks',
        foodDrinksDesc: 'Culinary adventures and mishaps',
        technology: 'Tech & Social Media',
        technologyDesc: 'Digital age experiences',
        childhood: 'Childhood & School',
        childhoodDesc: 'Nostalgic memories from younger days',
        relationships: 'Friends & Family',
        relationshipsDesc: 'Questions about relationships and social life',
        party: 'Party & Nightlife',
        partyDesc: 'Wild nights and party adventures',
        dating: 'Dating & Romance',
        datingDesc: 'Love, dating, and romantic adventures',
        wild: 'Wild & Crazy',
        wildDesc: 'The most daring and outrageous experiences',
    },
    es: {
        // Navigation
        categories: 'Categorías',
        play: 'Jugar',
        settings: 'Ajustes',

        // Categories Screen
        appTitle: 'Yo Nunca',
        chooseCategorySubtitle: '¡Elige categorías para empezar a jugar!',
        selectCategories: 'Seleccionar Categorías',
        selectedCount: '{{count}} seleccionadas',
        startGame: 'Empezar Juego',
        selectAtLeastOne: 'Por favor selecciona al menos una categoría',

        // Game Screen
        playingNow: 'Jugando Ahora',
        questionsLeft: '{{count}} preguntas restantes',
        nextQuestion: 'Siguiente Pregunta',
        allQuestionsUsed: '¡Todas las Preguntas Usadas!',
        allQuestionsUsedMessage: 'Has visto todas las preguntas de las categorías seleccionadas. ¡Empezando de nuevo!',
        resetGame: 'Reiniciar Juego',
        resetGameMessage: '¿Estás seguro de que quieres volver a las categorías?',
        cancel: 'Cancelar',
        reset: 'Reiniciar',
        ok: 'OK',

        // Empty States
        noGameActive: 'No Hay Juego Activo',
        noGameActiveMessage: '¡Ve a Categorías y selecciona algunas para empezar a jugar!',
        chooseCategory: 'Elegir Categorías',

        // Question Card
        drinkInstruction: '¡Bebe si SÍ has hecho esto! 🍻',

        // Settings Screen
        settingsTitle: 'Ajustes',
        settingsSubtitle: 'Información del juego y preferencias',
        gameInfo: 'Información del Juego',
        language: 'Idioma',
        about: 'Acerca de',
        aboutSubtitle: 'Reglas del juego e información de versión',
        sendFeedback: 'Enviar Comentarios',
        feedbackSubtitle: 'Ayúdanos a mejorar el juego',
        rateApp: 'Calificar la App',
        rateSubtitle: 'Muestra algo de amor ⭐⭐⭐⭐⭐',
        howToPlay: 'Cómo Jugar',
        gameRules: '1. Reúne a tus amigos alrededor\n2. Elige categorías\n3. Lee la pregunta en voz alta\n4. ¡Cualquiera que SÍ lo haya hecho bebe!\n5. Toca "Siguiente Pregunta" para continuar',
        madeWithLove: 'Hecho para noches inolvidables',

        // About Dialog
        aboutTitle: 'Acerca de Yo Nunca',
        aboutMessage: '¡Un juego divertido para grupos de amigos! Selecciona categorías y túrnense para leer preguntas. Bebe si SÍ has hecho lo que menciona la pregunta.\n\nVersión 1.0.0',

        // Feedback Dialog
        feedbackTitle: 'Enviar Comentarios',
        feedbackMessage: '¡Ayúdanos a mejorar el juego! ¿Qué características te gustaría ver?',
        sendEmail: 'Enviar Email',
        later: 'Más Tarde',

        // Rate Dialog
        rateTitle: 'Calificar la App',
        rateMessage: '¿Disfrutando el juego? ¡Por favor califícanos en la tienda de aplicaciones!',
        rateNow: 'Calificar Ahora',

        // Categories
        generalFun: 'Diversión General',
        generalFunDesc: 'Preguntas clásicas de yo nunca',
        travelAdventure: 'Viajes y Aventuras',
        travelAdventureDesc: 'Preguntas sobre explorar el mundo',
        foodDrinks: 'Comida y Bebidas',
        foodDrinksDesc: 'Aventuras culinarias y percances',
        technology: 'Tecnología y Redes Sociales',
        technologyDesc: 'Experiencias de la era digital',
        childhood: 'Infancia y Escuela',
        childhoodDesc: 'Recuerdos nostálgicos de días más jóvenes',
        relationships: 'Amigos y Familia',
        relationshipsDesc: 'Preguntas sobre relaciones y vida social',
        party: 'Fiestas y Vida Nocturna',
        partyDesc: 'Noches salvajes y aventuras de fiesta',
        dating: 'Citas y Romance',
        datingDesc: 'Amor, citas y aventuras románticas',
        wild: 'Salvaje y Loco',
        wildDesc: 'Las experiencias más atrevidas y escandalosas',
    }
};

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