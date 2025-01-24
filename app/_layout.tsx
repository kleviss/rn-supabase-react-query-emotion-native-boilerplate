import 'react-native-reanimated';
import 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';

import { AuthProvider } from '../context/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@emotion/react'
import { darkTheme } from '@/constants/theme';
// import { getVehicles } from '@/config/data/vehicles';
import { lightTheme } from '@/constants/theme';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  // getVehicles().then((vehicles) => {
  //   console.log(vehicles);
  // });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // You can keep any existing theme setup here
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;


  return (
    <AuthProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider theme={theme}>
          <Stack screenOptions={{ headerShown: false }}>
            {/* Public routes */}
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />

            {/* Protected routes */}
            <Stack.Screen name="(protected)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </GestureHandlerRootView>
    </AuthProvider>
  );
}
