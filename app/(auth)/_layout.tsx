import { Redirect } from 'expo-router';
import { Stack } from 'expo-router';
import { useAuth } from '../../context/auth';

export default function AuthLayout() {
  const { session } = useAuth();

  // Redirect to the protected area if the user is signed in
  if (session) {
    return <Redirect href="/(protected)/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="sign-in" />
      <Stack.Screen name="sign-up" />
    </Stack>
  );
} 