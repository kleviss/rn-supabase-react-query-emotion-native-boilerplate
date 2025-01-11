import { Image, Pressable, StyleSheet, View } from 'react-native';

import { Link } from 'expo-router';
import { ThemedText } from './ThemedText';

interface CarCardProps {
  id: string;
  title: string;
  price: number;
  year: number;
  mileage: number;
  location: string;
  imageUrl: string;
}

export function CarCard({ id, title, price, year, mileage, location, imageUrl }: CarCardProps) {
  return (
    <Link href={`/car/${id}`} asChild>
      <Pressable style={styles.container}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <ThemedText style={styles.title}>{title}</ThemedText>
          <ThemedText style={styles.price}>€{price.toLocaleString()}</ThemedText>

          <View style={styles.details}>
            <ThemedText style={styles.detail}>📅 {year}</ThemedText>
            <ThemedText style={styles.detail}>🛣️ {mileage.toLocaleString()} km</ThemedText>
            <ThemedText style={styles.detail}>📍 {location}</ThemedText>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1a1a1a',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2563eb',
    marginBottom: 12,
  },
  details: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: 8,
  },
  detail: {
    fontSize: 14,
    color: '#666',
  },
}); 