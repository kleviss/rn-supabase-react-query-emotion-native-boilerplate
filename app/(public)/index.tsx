import { Button, StyleSheet, Text, View } from 'react-native';

import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.superTitle}>Welcome to</Text>
        <Text style={styles.title}>RN Supabase React Query Emotion Native Boilerplate</Text>

        <Text style={styles.subtitle}>⭐️ Star this repo if you like it!</Text>

        <View style={styles.buttonContainer}>
          <Link href="/(auth)/sign-in" asChild>
            <Button title="Get Started (Sign In)" onPress={() => { }} />
          </Link>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  superTitle: {
    fontSize: 20,
    fontWeight: 'normal',
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 50,
  },
}); 