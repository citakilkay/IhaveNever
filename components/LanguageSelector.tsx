import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useLocalization } from '@/hooks/useLocalization';

export const LanguageSelector = () => {
    const { currentLocale, changeLanguage } = useLocalization();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => changeLanguage('en')}
                disabled={currentLocale === 'en'}
            >
                <Text style={[styles.flag, currentLocale === 'en' && styles.active]}>🇬🇧</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => changeLanguage('es')}
                disabled={currentLocale === 'es'}
            >
                <Text style={[styles.flag, currentLocale === 'es' && styles.active]}>🇪🇸</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => changeLanguage('fr')}
                disabled={currentLocale === 'fr'}
            >
                <Text style={[styles.flag, currentLocale === 'fr' && styles.active]}>🇫🇷</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => changeLanguage('pt')}
                disabled={currentLocale === 'pt'}
            >
                <Text style={[styles.flag, currentLocale === 'pt' && styles.active]}>🇵🇹</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => changeLanguage('tr')}
                disabled={currentLocale === 'tr'}
            >
                <Text style={[styles.flag, currentLocale === 'tr' && styles.active]}>🇹🇷</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        gap: 12,
        padding: 8
    },
    flag: {
        fontSize: 24,
        opacity: 0.5
    },
    active: {
        opacity: 1
    }
});
