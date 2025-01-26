import { Redirect } from 'expo-router';
import { Stack } from 'expo-router';
import { useAuth } from '../../context/auth';

export default function ProtectedLayout() {
  const { session } = useAuth();

  // Redirect to sign in if not authenticated
  if (!session) {
    return <Redirect href="/(auth)/sign-in" />;
  }


  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(screens)" options={{ headerShown: false }} />
    </Stack>
  );
}