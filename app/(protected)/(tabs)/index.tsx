import { StyleSheet, View } from 'react-native';

import { Link } from 'expo-router';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useTheme } from '@react-navigation/native';

export default function HomeScreen() {
  const theme = useTheme();
  return (
    <ThemedView style={styles.container}>
      <ThemedText style={[styles.title, { color: theme.colors.text }]}>Welcome to AutoScout AL</ThemedText>

      <View style={styles.linksContainer}>
        <Link href="/search" style={styles.link}>
          <ThemedText style={styles.linkText}>🔍 Find Cars</ThemedText>
        </Link>

        <Link href="/new-listing" style={styles.link}>
          <ThemedText style={styles.linkText}>📝 Create New Listing</ThemedText>
        </Link>

        <Link href="/saved" style={styles.link}>
          <ThemedText style={styles.linkText}>❤️ Saved Cars</ThemedText>
        </Link>

        <Link href="/help" style={styles.link}>
          <ThemedText style={styles.linkText}>❓ Help Center</ThemedText>
        </Link>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    // backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#1a1a1a',
    lineHeight: 46,
    marginTop: 20,
  },
  linksContainer: {
    width: '100%',
    gap: 15,
  },
  link: {
    padding: 20,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  linkText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
  },
});
