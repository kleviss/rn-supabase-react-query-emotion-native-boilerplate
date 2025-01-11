import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { CarCard } from '@/components/CarCard';
import { SearchFilters } from '@/components/SearchFilters';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useState } from 'react';

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
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<any>(null);

  const handleFiltersChange = (filters: any) => {
    console.log('Filters changed:', filters);
    setActiveFilters(filters);
    // TODO: Implement filter logic
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View style={styles.titleContainer}>
            <ThemedText style={styles.title}>Find Your Perfect Car</ThemedText>
            <ThemedText style={styles.subtitle}>
              Browse through our extensive collection of quality vehicles
            </ThemedText>
          </View>
          <Pressable
            style={styles.filterButton}
            onPress={() => setIsFiltersVisible(true)}>
            <ThemedText style={styles.filterButtonText}>🔍 Filters</ThemedText>
          </Pressable>
        </View>

        <View style={styles.resultsContainer}>
          <ThemedText style={styles.resultsTitle}>Available Cars</ThemedText>
          {MOCK_CARS.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
        </View>
      </ScrollView>

      <SearchFilters
        isVisible={isFiltersVisible}
        onClose={() => setIsFiltersVisible(false)}
        onFiltersChange={handleFiltersChange}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
    lineHeight: 40,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  filterButton: {
    backgroundColor: '#2563eb',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  filterButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  resultsContainer: {
    marginTop: 8,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
}); 