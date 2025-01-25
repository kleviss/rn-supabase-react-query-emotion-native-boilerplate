import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SearchFilters, filterCars } from '@/components/SearchFilters';
import { useCallback, useMemo, useRef, useState } from 'react';

import { CarCard } from '@/components/CarCard';
import { FontAwesome } from '@expo/vector-icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { MOCK_CARS } from '@/constants/mock-data';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// Constants for filters
const MAKES = ['Toyota', 'Honda', 'BMW', 'Mercedes', 'Audi', 'Volkswagen', 'Ford', 'Chevrolet'];
const PRICE_RANGES = [
  { min: 0, max: 5000, label: 'Under $5,000' },
  { min: 5000, max: 10000, label: '$5,000 - $10,000' },
  { min: 10000, max: 20000, label: '$10,000 - $20,000' },
  { min: 20000, max: 30000, label: '$20,000 - $30,000' },
  { min: 30000, max: 50000, label: '$30,000 - $50,000' },
  { min: 50000, max: Infinity, label: 'Over $50,000' }
];
const YEARS = Array.from({ length: 30 }, (_, i) => new Date().getFullYear() - i);
const TRANSMISSIONS = ['Automatic', 'Manual'];

interface Filters {
  make?: string;
  priceRange?: { min: number; max: number; label: string };
  year?: number;
  transmission?: string;
}

export default function SearchScreen() {
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Filters>({});
  const [filteredCars, setFilteredCars] = useState(MOCK_CARS);
  const [filters, setFilters] = useState<Filters>({});

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
    if (index === -1) {
      setIsFiltersVisible(false);
    } else {
      setIsFiltersVisible(true);
    }
  }, []);

  // renders
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  // const handleSheetChanges = useCallback((index: number) => {
  //   if (index === -1) {
  //     setIsFiltersVisible(false);
  //   }
  // }, []);

  // Filter handlers
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
    console.log('Applying filters:', filters);
    setActiveFilters(filters);
    const filtered = filterCars(MOCK_CARS, filters);
    setFilteredCars(filtered);
    bottomSheetRef.current?.close();
  };

  const handleClear = () => {
    console.log('Clearing filters');
    setFilters({});
    setActiveFilters({});
    setFilteredCars(MOCK_CARS);
    bottomSheetRef.current?.close();
  };

  const handleRemoveFilter = (key: keyof Filters) => {
    const newFilters = { ...activeFilters };
    delete newFilters[key];
    const filtered = filterCars(MOCK_CARS, newFilters);
    setActiveFilters(newFilters);
    setFilteredCars(filtered);
  };

  const handleOpenFilters = () => {
    console.log('Opening filters...');
    if (bottomSheetRef.current) {
      console.log('Bottom sheet ref is defined');
      bottomSheetRef.current.snapToIndex(0);
    } else {
      console.log('Bottom sheet ref is NOT defined');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={[
          styles.scrollContent,
          { minHeight: '100%' }
        ]}>
        <View style={styles.pageHeader}>
          <View style={styles.titleContainer}>
            <ThemedText style={styles.title}>Find Your Perfect Car</ThemedText>
            <ThemedText style={styles.subtitle}>
              Browse through our extensive collection of quality vehicles and find the perfect one for you.
            </ThemedText>
          </View>
          <View style={styles.filterButtonContainer}>
            <Pressable
              style={styles.filterButton}
              onPress={handleOpenFilters}
              hitSlop={8}>
              <ThemedText style={styles.filterButtonText}>🔍 Filters</ThemedText>
            </Pressable>
          </View>
        </View>

        {Object.keys(activeFilters).length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filtersScroll}
            contentContainerStyle={styles.filtersContainer}
          >
            {activeFilters.make && (
              <Pressable
                style={styles.filterChip}
                onPress={() => handleRemoveFilter('make')}
              >
                <ThemedText style={styles.filterChipText}>{activeFilters.make}</ThemedText>
                <FontAwesome name="times" size={12} color="#fff" style={styles.filterChipIcon} />
              </Pressable>
            )}
            {activeFilters.priceRange && (
              <Pressable
                style={styles.filterChip}
                onPress={() => handleRemoveFilter('priceRange')}
              >
                <ThemedText style={styles.filterChipText}>{activeFilters.priceRange.label}</ThemedText>
                <FontAwesome name="times" size={12} color="#fff" style={styles.filterChipIcon} />
              </Pressable>
            )}
            {activeFilters.year && (
              <Pressable
                style={styles.filterChip}
                onPress={() => handleRemoveFilter('year')}
              >
                <ThemedText style={styles.filterChipText}>{activeFilters.year}</ThemedText>
                <FontAwesome name="times" size={12} color="#fff" style={styles.filterChipIcon} />
              </Pressable>
            )}
            {activeFilters.transmission && (
              <Pressable
                style={styles.filterChip}
                onPress={() => handleRemoveFilter('transmission')}
              >
                <ThemedText style={styles.filterChipText}>{activeFilters.transmission}</ThemedText>
                <FontAwesome name="times" size={12} color="#fff" style={styles.filterChipIcon} />
              </Pressable>
            )}
          </ScrollView>
        )}

        <View style={styles.resultsContainer}>
          <ThemedText style={styles.resultsTitle}>
            {filteredCars.length === MOCK_CARS.length
              ? 'Available Cars'
              : `${filteredCars.length} cars found`}
          </ThemedText>
          {filteredCars.map((car) => (
            <CarCard key={car.id} {...car} />
          ))}
          {filteredCars.length === 0 && (
            <ThemedText style={styles.noResults}>
              No cars match your filters. Try adjusting your search criteria.
            </ThemedText>
          )}
        </View>
      </ScrollView>

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        enablePanDownToClose
        style={[styles.bottomSheet]}
        backgroundStyle={{ backgroundColor: '#fff' }}
        handleIndicatorStyle={{ backgroundColor: '#999' }}
        animateOnMount={false}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetView style={styles.bottomSheetContainer}>
          <View style={styles.header}>
            <ThemedText style={styles.bottomSheetTitle}>Filters</ThemedText>
            <Pressable onPress={handleClear} style={styles.clearButton}>
              <ThemedText style={styles.clearButtonText}>Clear All</ThemedText>
            </Pressable>
          </View>

          <ScrollView style={styles.bottomSheetContent}>
            {/* Make Section */}
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

            {/* Price Range Section */}
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

            {/* Year Section */}
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

            {/* Transmission Section */}
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
        </BottomSheetView>
      </BottomSheet>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    flexGrow: 1,
  },
  bottomSheetWrapper: {
    position: 'relative',
    backgroundColor: 'red',
  },
  bcontainer: {
    flex: 1,
    backgroundColor: 'transparent',
    padding: 24,
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // marginBottom: 8,
    position: 'relative',
    zIndex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  pageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    // marginBottom: 8,
    position: 'relative',
    zIndex: 1,
    // borderBottomWidth: 1,
    // borderBottomColor: '#e5e7eb',
  },
  titleContainer: {
    flex: 1,
    marginRight: 16,
    position: 'relative',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 0,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginTop: 18,
    width: '166%',
  },
  filterButtonContainer: {
    zIndex: 2,
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
  filtersScroll: {
    marginBottom: 2,
  },
  filtersContainer: {
    paddingRight: -16,
    marginTop: 6,
  },
  filterChip: {
    backgroundColor: '#2563eb',
    borderRadius: 20,
    paddingVertical: 6,
    paddingLeft: 12,
    paddingRight: 8,
    marginRight: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  filterChipText: {
    color: '#fff',
    fontSize: 14,
    marginRight: 4,
  },
  filterChipIcon: {
    marginLeft: 4,
  },
  resultsContainer: {
    marginTop: 32,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#1a1a1a',
  },
  noResults: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
    fontSize: 16,
  },
  // Bottom sheet styles
  bottomSheet: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  bottomSheetContainer: {
    flex: 1,
    padding: 16,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  bottomSheetContent: {
    flex: 1,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
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
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    margin: 4,
    minWidth: 80,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: '#2563eb',
  },
  optionText: {
    color: '#1f2937',
    fontSize: 14,
  },
  optionTextSelected: {
    color: '#ffffff',
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  clearButton: {
    paddingVertical: 0,
    paddingHorizontal: 12,
  },
  clearButtonText: {
    color: '#6b7280',
    fontSize: 14,
  },
  applyButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 12,
    marginTop: 4,
  },
  applyButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
    // zIndex: 10,
  },
}); 