import { useCallback } from 'react';
import { View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider } from 'jotai';
import * as SplashScreen from 'expo-splash-screen';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';

// Prevent auto-hide so our splash.png stays up until we say so
SplashScreen.preventAutoHideAsync().catch(() => {
  // ignore if it's already prevented
});

export default function RootLayout() {
  // Keep your existing initialization logic
  useFrameworkReady();

  // Hide the splash as soon as the root view has laid out (first frame ready)
  const onLayoutRootView = useCallback(async () => {
    try {
      await SplashScreen.hideAsync();
    } catch {
      // ignore
    }
  }, []);

  return (
    <Provider>
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </View>
    </Provider>
  );
}
