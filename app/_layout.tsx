import 'react-native-reanimated';
import 'react-native-gesture-handler';

import * as Network from 'expo-network'
import * as SplashScreen from 'expo-splash-screen';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { AuthProvider } from '../context/auth';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@emotion/react'
import { darkTheme } from '@/constants/theme';
import { lightTheme } from '@/constants/theme';
import { onlineManager } from '@tanstack/react-query'
import { useColorScheme } from '@/hooks/useColorScheme';
import { useEffect } from 'react';
import { useFonts } from 'expo-font';
// React Query Dev Tools
import { useReactQueryDevTools } from '@dev-plugins/react-query';

// React Query Client
const queryClient = new QueryClient()

// React Query Online Manager - Checks if the device is online to refetch queries
onlineManager.setEventListener((setOnline) => {
  const subscription = Network.addNetworkStateListener((state) => {
    setOnline(state.isConnected || false)
  })
  return () => subscription.remove()
})


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Integrate react-query with the DevTool hook
  useReactQueryDevTools(queryClient);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  // You can keep any existing theme setup here
  const theme = colorScheme === 'dark' ? darkTheme : lightTheme;


  return (
    <QueryClientProvider client={queryClient}>
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
    </QueryClientProvider>
  );
}
