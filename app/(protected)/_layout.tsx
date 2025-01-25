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
      <Stack.Screen
        name="car/[id]"
        options={{
          headerShown: true,
          headerTitle: 'Car Details',
        }}
      />
      <Stack.Screen name="new-listing" options={{ headerShown: true, headerTitle: 'New Listing' }} />
      <Stack.Screen name="my-listings" options={{ headerShown: true, headerTitle: 'My Listings' }} />
      <Stack.Screen name="messages" options={{ headerShown: true, headerTitle: 'Messages' }} />
      <Stack.Screen name="help" options={{ headerShown: true, headerTitle: 'Help' }} />
      <Stack.Screen name="profile" options={{ headerShown: true, headerTitle: 'Profile' }} />
    </Stack>
  );
} 