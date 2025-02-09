import { Stack } from 'expo-router';

export default function ScreensLayout() {

  const CarDetailPageOptions = { headerShown: true, headerTitle: 'Car Details', };
  const NewListingPageOptions = { headerShown: true, headerTitle: 'New Listing' };
  const HelpPageOptions = { headerShown: true, headerTitle: 'Help Center' };
  const MessagesPageOptions = { headerShown: true, headerTitle: 'Messages' };
  const MyListingsPageOptions = { headerShown: true, headerTitle: 'My Listings' };
  const ProfilePageOptions = { headerShown: true, headerTitle: 'Profile' };

  return (
    <Stack>
      <Stack.Screen name="car/[id]" options={CarDetailPageOptions} />
      <Stack.Screen name="new-listing/index" options={NewListingPageOptions} />
      <Stack.Screen name="help/index" options={HelpPageOptions} />
      <Stack.Screen name="messages/index" options={MessagesPageOptions} />
      <Stack.Screen name="my-listings/index" options={MyListingsPageOptions} />
      <Stack.Screen name="profile-settings/index" options={ProfilePageOptions} />
    </Stack>
  );
}
