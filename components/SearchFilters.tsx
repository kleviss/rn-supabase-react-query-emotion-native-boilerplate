import { Modal, Pressable, StyleSheet, View } from 'react-native';

import { Picker } from '@react-native-picker/picker';
import { ThemedText } from './ThemedText';
import { useState } from 'react';

interface SearchFiltersProps {
  isVisible: boolean;
  onClose: () => void;
  onFiltersChange: (filters: SearchFilters) => void;
}

interface SearchFilters {
  make: string;
  model: string;
  priceRange: string;
  year: string;
  transmission: string;
}

const MAKES = [
  'Any',
  'Audi',
  'BMW',
  'Mercedes-Benz',
  'Volkswagen',
  'Toyota',
  'Honda',
];

const PRICE_RANGES = [
  'Any',
  '0-5,000',
  '5,000-10,000',
  '10,000-20,000',
  '20,000+',
];

const YEARS = ['Any', ...Array.from({ length: 30 }, (_, i) => `${new Date().getFullYear() - i}`)];
const TRANSMISSIONS = ['Any', 'Manual', 'Automatic'];

export function SearchFilters({ isVisible, onClose, onFiltersChange }: SearchFiltersProps) {
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

  const handleApplyFilters = () => {
    onFiltersChange(filters);
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <ThemedText style={styles.title}>Filters</ThemedText>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <ThemedText style={styles.closeButtonText}>✕</ThemedText>
            </Pressable>
          </View>

          <View style={styles.filterSection}>
            <ThemedText style={styles.label}>Make</ThemedText>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={filters.make}
                onValueChange={(value) => handleFilterChange('make', value)}
                style={styles.picker}
                itemStyle={styles.pickerItem}>
                {MAKES.map((make) => (
                  <Picker.Item key={make} label={make} value={make} />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.filterSection}>
            <ThemedText style={styles.label}>Price Range</ThemedText>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={filters.priceRange}
                onValueChange={(value) => handleFilterChange('priceRange', value)}
                style={styles.picker}
                itemStyle={styles.pickerItem}>
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
                style={styles.picker}
                itemStyle={styles.pickerItem}>
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
                style={styles.picker}
                itemStyle={styles.pickerItem}>
                {TRANSMISSIONS.map((transmission) => (
                  <Picker.Item key={transmission} label={transmission} value={transmission} />
                ))}
              </Picker>
            </View>
          </View>

          <Pressable style={styles.applyButton} onPress={handleApplyFilters}>
            <ThemedText style={styles.applyButtonText}>Apply Filters</ThemedText>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
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
    backgroundColor: '#f8f9fa',
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: 'transparent',
  },
  pickerItem: {
    fontSize: 16,
  },
  applyButton: {
    backgroundColor: '#2563eb',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  applyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
}); 