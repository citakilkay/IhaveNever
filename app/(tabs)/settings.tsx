import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { LanguageSelector } from '@/components/LanguageSelector'
import { Info, Heart, Star, MessageCircle } from 'lucide-react-native';
import { useLocalization } from '@/hooks/useLocalization';


export default function SettingsScreen() {
  const { t } = useLocalization();
  const handleAbout = () => {
    Alert.alert(
      t('aboutTitle'),
      t('aboutMessage'),
      [{ text: t('ok') }]
    );
  };

  const handleFeedback = () => {
    Alert.alert(
      t('feedbackTitle'),
      t('feedbackMessage'),
      [
        { text: t('cancel'), style: 'cancel' },
        {
          text: t('sendEmail'),
          onPress: () => Linking.openURL('mailto:feedback@ihavenevergame.com')
        }
      ]
    );
  };

  const handleRate = () => {
    Alert.alert(
      t('rateTitle'),
      t('rateMessage'),
      [
        { text: t('later'), style: 'cancel' },
        { text: t('rateNow'), onPress: () => { } }
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#0f0f23', '#1a1a2e', '#16213e']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{t('settingsTitle')}</Text>
        <Text style={styles.subtitle}>{t('settingsSubtitle')}</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('gameInfo')}</Text>
          <LanguageSelector />

          <TouchableOpacity style={styles.option} onPress={handleAbout}>
            <View style={styles.optionLeft}>
              <View style={[styles.optionIcon, { backgroundColor: '#4ecdc4' }]}>
                <Info size={20} color="#fff" />
              </View>
              <View>
                <Text style={styles.optionTitle}>{t('about')}</Text>
                <Text style={styles.optionSubtitle}>{t('aboutSubtitle')}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={handleFeedback}>
            <View style={styles.optionLeft}>
              <View style={[styles.optionIcon, { backgroundColor: '#45b7d1' }]}>
                <MessageCircle size={20} color="#fff" />
              </View>
              <View>
                <Text style={styles.optionTitle}>{t('sendFeedback')}</Text>
                <Text style={styles.optionSubtitle}>{t('feedbackSubtitle')}</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={handleRate}>
            <View style={styles.optionLeft}>
              <View style={[styles.optionIcon, { backgroundColor: '#feca57' }]}>
                <Star size={20} color="#fff" />
              </View>
              <View>
                <Text style={styles.optionTitle}>{t('rateApp')}</Text>
                <Text style={styles.optionSubtitle}>{t('rateSubtitle')}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.gameRules}>
          <Text style={styles.rulesTitle}>{t('howToPlay')}</Text>
          <Text style={styles.rulesText}>{t('gameRules')}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Heart size={16} color="#ff6b9d" />
            <Text style={styles.footerText}>{t('madeWithLove')}</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 8,
  },
  subtitle: {
    color: '#8892b0',
    fontSize: 16,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
  },
  option: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  optionSubtitle: {
    color: '#8892b0',
    fontSize: 14,
  },
  gameRules: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  rulesTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  rulesText: {
    color: '#8892b0',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'left',
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  footerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  footerText: {
    color: '#8892b0',
    fontSize: 14,
    marginLeft: 8,
    fontStyle: 'italic',
  },
});
