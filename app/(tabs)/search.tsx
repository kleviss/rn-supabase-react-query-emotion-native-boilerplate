import { ScrollView, StyleSheet, View } from 'react-native';

import { CarCard } from '@/components/CarCard';
import { SearchFilters } from '@/components/SearchFilters';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Mock data for demonstration
const MOCK_CARS = [
  {
    id: '1',
    title: 'Mercedes-Benz C-Class 2020',
    price: 35000,
    year: 2020,
    mileage: 45000,
    location: 'Tirana',
    imageUrl: 'https://images.unsplash.com/photo-1617469767053-d3b523a0b982?w=800',
  },
  {
    id: '2',
    title: 'BMW 3 Series 2019',
    price: 32000,
    year: 2019,
    mileage: 55000,
    location: 'Durres',
    imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800',
  },
  {
    id: '3',
    title: 'Audi A4 2021',
    price: 38000,
    year: 2021,
    mileage: 25000,
    location: 'Vlore',
    imageUrl: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800',
  },
];

export default function SearchScreen() {
  const handleFiltersChange = (filters: any) => {
    console.log('Filters changed:', filters);
    // TODO: Implement filter logic
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Find Your Perfect Car</ThemedText>
          <ThemedText style={styles.subtitle}>
            Browse through our extensive collection of quality vehicles
          </ThemedText>
        </View>

        <SearchFilters onFiltersChange={handleFiltersChange} />

        <View style={styles.resultsContainer}>
          <ThemedText style={styles.resultsTitle}>Available Cars</ThemedText>
          {MOCK_CARS.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    lineHeight: 46,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
  },
  resultsContainer: {
    marginTop: 24,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    lineHeight: 36,
    color: '#1a1a1a',
  },
}); 