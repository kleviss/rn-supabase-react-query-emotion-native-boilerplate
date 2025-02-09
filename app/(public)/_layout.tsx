import { Redirect, Stack } from 'expo-router';

import { useAuth } from '../../context/auth';

export default function PublicLayout() {
  const { session } = useAuth();

  if (session) {
    return <Redirect href="/(protected)/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
} 