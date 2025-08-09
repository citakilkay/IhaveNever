import { View, Text, StyleSheet, TouchableOpacity, Alert, Linking, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Info, Heart, Star, MessageCircle } from 'lucide-react-native';
import * as StoreReview from 'expo-store-review';
import * as Application from 'expo-application';

export default function SettingsScreen() {
  const handleAbout = () => {
    Alert.alert(
      'About I Have Never',
      'A fun party game for groups of friends! Select a category and take turns reading questions. Drink if you HAVE done the thing mentioned in the question.\n\nVersion 1.0.0',
      [{ text: 'OK' }]
    );
  };

  const handleFeedback = () => {
    Alert.alert(
      'Send Feedback',
      'Help us improve the game! What features would you like to see?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Send Email',
          onPress: () => Linking.openURL('mailto:citakilkay@gmail.com')
        }
      ]
    );
  };

  // --- RATE APP: in-app prompt if available, otherwise open store listing
  const openStoreListing = async () => {
    // TODO: replace with your real App Store ID after you create the app record.
    const IOS_APP_ID = '0000000000'; // e.g. '1234567890'
    const ANDROID_PACKAGE = Application.applicationId ?? 'your.android.package';

    const storeUrl = Platform.select({
      ios: `itms-apps://itunes.apple.com/app/id${IOS_APP_ID}?action=write-review`,
      android: `market://details?id=${ANDROID_PACKAGE}`,
    }) as string;

    const webFallback = Platform.select({
      ios: `https://apps.apple.com/app/id${IOS_APP_ID}`,
      android: `https://play.google.com/store/apps/details?id=${ANDROID_PACKAGE}`,
    }) as string;

    try {
      const supported = await Linking.canOpenURL(storeUrl);
      if (supported) return Linking.openURL(storeUrl);
      return Linking.openURL(webFallback);
    } catch {
      return Linking.openURL(webFallback);
    }
  };

  const requestRating = async () => {
    try {
      const available = await StoreReview.isAvailableAsync();
      if (available) {
        await StoreReview.requestReview(); // native in-app rating prompt (system decides when to show)
      } else {
        await openStoreListing();
      }
    } catch {
      await openStoreListing();
    }
  };

  const handleRate = () => {
    Alert.alert(
      'Rate the App',
      'Enjoying the game? Please rate us in the app store!',
      [
        { text: 'Later', style: 'cancel' },
        { text: 'Rate Now', onPress: requestRating }
      ]
    );
  };

  return (
    <LinearGradient
      colors={['#0f0f23', '#1a1a2e', '#16213e']}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
        <Text style={styles.subtitle}>Game info and preferences</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Game Info</Text>

          <TouchableOpacity style={styles.option} onPress={handleAbout}>
            <View style={styles.optionLeft}>
              <View style={[styles.optionIcon, { backgroundColor: '#4ecdc4' }]}>
                <Info size={20} color="#fff" />
              </View>
              <View>
                <Text style={styles.optionTitle}>About</Text>
                <Text style={styles.optionSubtitle}>Game rules and version info</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={handleFeedback}>
            <View style={styles.optionLeft}>
              <View style={[styles.optionIcon, { backgroundColor: '#45b7d1' }]}>
                <MessageCircle size={20} color="#fff" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Send Feedback</Text>
                <Text style={styles.optionSubtitle}>Help us improve the game</Text>
              </View>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={handleRate}>
            <View style={styles.optionLeft}>
              <View style={[styles.optionIcon, { backgroundColor: '#feca57' }]}>
                <Star size={20} color="#fff" />
              </View>
              <View>
                <Text style={styles.optionTitle}>Rate the App</Text>
                <Text style={styles.optionSubtitle}>Show some love ⭐⭐⭐⭐⭐</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.gameRules}>
          <Text style={styles.rulesTitle}>How to Play</Text>
          <Text style={styles.rulesText}>
            1. Gather your friends around{'\n'}
            2. Choose a category{'\n'}
            3. Read the question aloud{'\n'}
            4. Anyone who HAS done it drinks!{'\n'}
            5. Tap "Next Question" to continue{'\n'}
            <Text style={{ fontWeight: '600', color: "#d9dce8ff" }}>
              Note: {' '}
            </Text>
            Share the story behind it if you drank it to make it more fun 🎉
          </Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.footerContent}>
            <Heart size={16} color="#ff6b9d" />
            <Text style={styles.footerText}>Made for unforgettable nights</Text>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  title: { color: '#fff', fontSize: 32, fontWeight: '800', marginBottom: 8 },
  subtitle: { color: '#8892b0', fontSize: 16, textAlign: 'center' },
  content: { flex: 1, paddingHorizontal: 20 },
  section: { marginBottom: 32 },
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 16 },
  option: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  optionLeft: { flexDirection: 'row', alignItems: 'center' },
  optionIcon: {
    width: 40, height: 40, borderRadius: 20,
    alignItems: 'center', justifyContent: 'center', marginRight: 16,
  },
  optionTitle: { color: '#fff', fontSize: 16, fontWeight: '600', marginBottom: 2 },
  optionSubtitle: { color: '#8892b0', fontSize: 14 },
  gameRules: {
    backgroundColor: 'rgba(255,255,255,0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  rulesTitle: { color: '#fff', fontSize: 18, fontWeight: '700', marginBottom: 16, textAlign: 'center' },
  rulesText: { color: '#8892b0', fontSize: 16, lineHeight: 24, textAlign: 'left' },
  footer: { alignItems: 'center', paddingBottom: 40 },
  footerContent: { flexDirection: 'row', alignItems: 'center' },
  footerText: { color: '#8892b0', fontSize: 14, marginLeft: 8, fontStyle: 'italic' },
});
