import { StyleSheet, View } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { ThemedText } from './ThemedText';
import { useState } from 'react';

interface SearchFiltersProps {
  onFiltersChange: (filters: SearchFilters) => void;
}

interface SearchFilters {
  make: string;
  model: string;
  priceRange: string;
  year: string;
  transmission: string;
}

const PRICE_RANGES = [
  'Any',
  '0-5,000',
  '5,000-10,000',
  '10,000-20,000',
  '20,000+',
];

const YEARS = ['Any', ...Array.from({ length: 30 }, (_, i) => `${new Date().getFullYear() - i}`)];
const TRANSMISSIONS = ['Any', 'Manual', 'Automatic'];

export function SearchFilters({ onFiltersChange }: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFilters>({
    make: 'Any',
    model: 'Any',
    priceRange: 'Any',
    year: 'Any',
    transmission: 'Any',
  });

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title}>Filters</ThemedText>

      <View style={styles.filterSection}>
        <ThemedText style={styles.label}>Price Range</ThemedText>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={filters.priceRange}
            onValueChange={(value) => handleFilterChange('priceRange', value)}
            style={styles.picker}>
            {PRICE_RANGES.map((range) => (
              <Picker.Item key={range} label={range} value={range} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.filterSection}>
        <ThemedText style={styles.label}>Year</ThemedText>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={filters.year}
            onValueChange={(value) => handleFilterChange('year', value)}
            style={styles.picker}>
            {YEARS.map((year) => (
              <Picker.Item key={year} label={year} value={year} />
            ))}
          </Picker>
        </View>
      </View>

      <View style={styles.filterSection}>
        <ThemedText style={styles.label}>Transmission</ThemedText>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={filters.transmission}
            onValueChange={(value) => handleFilterChange('transmission', value)}
            style={styles.picker}>
            {TRANSMISSIONS.map((transmission) => (
              <Picker.Item key={transmission} label={transmission} value={transmission} />
            ))}
          </Picker>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
    lineHeight: 36,
  },
  filterSection: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  picker: {
    height: 50,
    width: '100%',
  },
}); 