import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import BottomSheet from '@gorhom/bottom-sheet';
import { Car } from '@/constants/mock-data';
import { ThemedText } from './ThemedText';

const MAKES = ['BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Toyota', 'Honda'];
const PRICE_RANGES = [
  { label: 'Under €5,000', min: 0, max: 5000 },
  { label: '€5,000 - €10,000', min: 5000, max: 10000 },
  { label: '€10,000 - €20,000', min: 10000, max: 20000 },
  { label: '€20,000 - €30,000', min: 20000, max: 30000 },
  { label: '€30,000 - €50,000', min: 30000, max: 50000 },
  { label: 'Over €50,000', min: 50000, max: Infinity },
];
const YEARS = Array.from({ length: 21 }, (_, i) => 2024 - i);
const TRANSMISSIONS = ['Any', 'Automatic', 'Manual'];

interface Filters {
  make?: string;
  priceRange?: { min: number; max: number; label: string };
  year?: number;
  transmission?: string;
}

interface SearchFiltersProps {
  isVisible: boolean;
  onClose: () => void;
  onFiltersChange: (filters: Filters) => void;
  activeFilters?: Filters;
}

export function filterCars(cars: Car[], filters: Filters): Car[] {
  return cars.filter((car) => {
    if (filters.make && !car.title.includes(filters.make)) return false;
    if (filters.priceRange && (car.price < filters.priceRange.min || car.price > filters.priceRange.max)) return false;
    if (filters.year && car.year !== filters.year) return false;
    if (filters.transmission && filters.transmission !== 'Any' && car.transmission !== filters.transmission) return false;
    return true;
  });
}

export function SearchFilters({ isVisible, onClose, onFiltersChange, activeFilters = {} }: SearchFiltersProps) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [filters, setFilters] = React.useState<Filters>(activeFilters);
  const snapPoints = useMemo(() => ['25%', '75%'], []);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      onClose();
    }
  }, [onClose]);

  const handleMakeSelect = (make: string) => {
    setFilters(prev => ({ ...prev, make: prev.make === make ? undefined : make }));
  };

  const handlePriceSelect = (range: typeof PRICE_RANGES[0]) => {
    setFilters(prev => ({
      ...prev,
      priceRange: prev.priceRange?.label === range.label ? undefined : range
    }));
  };

  const handleYearSelect = (year: number) => {
    setFilters(prev => ({ ...prev, year: prev.year === year ? undefined : year }));
  };

  const handleTransmissionSelect = (transmission: string) => {
    setFilters(prev => ({
      ...prev,
      transmission: prev.transmission === transmission ? undefined : transmission
    }));
  };

  const handleApply = () => {
    onFiltersChange(filters);
    onClose();
  };

  const handleClear = () => {
    setFilters({});
    onFiltersChange({});
    onClose();
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose
      style={styles.bottomSheet}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <ThemedText style={styles.title}>Filters</ThemedText>
          <Pressable onPress={handleClear} style={styles.clearButton}>
            <ThemedText style={styles.clearButtonText}>Clear All</ThemedText>
          </Pressable>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Make</ThemedText>
            <View style={styles.optionsGrid}>
              {MAKES.map((make) => (
                <Pressable
                  key={make}
                  style={[
                    styles.optionButton,
                    filters.make === make && styles.optionButtonSelected,
                  ]}
                  onPress={() => handleMakeSelect(make)}
                >
                  <ThemedText
                    style={[
                      styles.optionText,
                      filters.make === make && styles.optionTextSelected,
                    ]}
                  >
                    {make}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Price Range</ThemedText>
            <View style={styles.optionsGrid}>
              {PRICE_RANGES.map((range) => (
                <Pressable
                  key={range.label}
                  style={[
                    styles.optionButton,
                    filters.priceRange?.label === range.label && styles.optionButtonSelected,
                  ]}
                  onPress={() => handlePriceSelect(range)}
                >
                  <ThemedText
                    style={[
                      styles.optionText,
                      filters.priceRange?.label === range.label && styles.optionTextSelected,
                    ]}
                  >
                    {range.label}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Year</ThemedText>
            <View style={styles.optionsGrid}>
              {YEARS.slice(0, 10).map((year) => (
                <Pressable
                  key={year}
                  style={[
                    styles.optionButton,
                    filters.year === year && styles.optionButtonSelected,
                  ]}
                  onPress={() => handleYearSelect(year)}
                >
                  <ThemedText
                    style={[
                      styles.optionText,
                      filters.year === year && styles.optionTextSelected,
                    ]}
                  >
                    {year}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>

          <View style={styles.section}>
            <ThemedText style={styles.sectionTitle}>Transmission</ThemedText>
            <View style={styles.optionsGrid}>
              {TRANSMISSIONS.map((transmission) => (
                <Pressable
                  key={transmission}
                  style={[
                    styles.optionButton,
                    filters.transmission === transmission && styles.optionButtonSelected,
                  ]}
                  onPress={() => handleTransmissionSelect(transmission)}
                >
                  <ThemedText
                    style={[
                      styles.optionText,
                      filters.transmission === transmission && styles.optionTextSelected,
                    ]}
                  >
                    {transmission}
                  </ThemedText>
                </Pressable>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.applyButton} onPress={handleApply}>
            <ThemedText style={styles.applyButtonText}>Apply Filters</ThemedText>
          </Pressable>
        </View>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  clearButton: {
    padding: 8,
  },
  clearButtonText: {
    color: '#2563eb',
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  optionButton: {
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 4,
    minWidth: 80,
  },
  optionButtonSelected: {
    backgroundColor: '#2563eb',
  },
  optionText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#1f2937',
  },
  optionTextSelected: {
    color: '#fff',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  applyButton: {
    backgroundColor: '#2563eb',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 