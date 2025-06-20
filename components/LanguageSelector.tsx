import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

export const LanguageSelector = () => {
    const { language, setLanguage } = useAppState();

    return (
        <View style={styles.container}>
            <TouchableOpacity
                onPress={() => setLanguage('en')}
                disabled={language === 'en'}
            >
                <Text style={[styles.flag, language === 'en' && styles.active]}>🇬🇧</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setLanguage('es')}
                disabled={language === 'es'}
            >
                <Text style={[styles.flag, language === 'es' && styles.active]}>🇪🇸</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setLanguage('fr')}
                disabled={language === 'fr'}
            >
                <Text style={[styles.flag, language === 'fr' && styles.active]}>🇫🇷</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setLanguage('pt')}
                disabled={language === 'pt'}
            >
                <Text style={[styles.flag, language === 'es' && styles.active]}>🇵🇹</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setLanguage('tr')}
                disabled={language === 'tr'}
            >
                <Text style={[styles.flag, language === 'tr' && styles.active]}>🇹🇷</Text>
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