import 'react-native-reanimated';
import 'react-native-gesture-handler';

import * as SplashScreen from 'expo-splash-screen';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';

import { Colors } from '@/constants/Colors';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
import { getVehicles } from '@/lib/data/vehicles';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  getVehicles().then((vehicles) => {
    console.log(vehicles);
  });

  useEffect(() => {
    if (loaded) {
     
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="car/[id]"
            options={{
              headerTintColor: Colors[colorScheme ?? 'light'].tint,
              headerStyle: {
                backgroundColor: '#fff',
              },
              presentation: 'card',
            }}
          />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
