import BottomSheet, { BottomSheetBackdrop, BottomSheetView } from '@gorhom/bottom-sheet';
import { View } from 'react-native';
import { filterCars } from '@/components/SearchFilters';
import { useCallback, useMemo, useRef, useState, useEffect } from 'react';
import { useVehicles } from '@/services/supabase.api';
import { CarCard } from '@/components/CarCard';
import type { CustomTheme } from '@/constants/theme';
import { FontAwesome } from '@expo/vector-icons';
import { MOCK_CARS } from '@/constants/mock-data';
import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { FiltersBottomSheet, type FilterOption } from '@/components/ui/FiltersBottomSheet';

const StyledContainer = styled.View(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
}));

const StyledScrollView = styled.ScrollView({
  flex: 1,
});

const ScrollContent = styled.View({
  padding: 16,
  flexGrow: 1,
});

const PageHeader = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  position: 'relative',
  zIndex: 1,
});

const TitleContainer = styled.View({
  flex: 1,
  marginRight: 16,
  position: 'relative',
});

const Title = styled.Text(({ theme }) => ({
  fontSize: 24,
  fontWeight: 'bold',
  color: theme.colors.text,
  marginBottom: 0,
  marginTop: 8,
}));

const Subtitle = styled.Text(({ theme }) => ({
  fontSize: 16,
  color: theme.colors.textSecondary,
  marginTop: 18,
  width: '166%',
}));

const FilterButton = styled.Pressable(({ theme }) => ({
  backgroundColor: theme.colors.background,
  borderWidth: 1,
  borderColor: theme.colors.textSecondary,
  paddingHorizontal: 16,
  paddingVertical: 8,
  borderRadius: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
}));

const FilterButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: 16,
  fontWeight: '600',
}));

const FiltersScroll = styled.ScrollView({
  marginBottom: 2,
});

const FilterChip = styled.Pressable(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  borderRadius: 20,
  paddingVertical: 6,
  paddingLeft: 12,
  paddingRight: 8,
  marginRight: 8,
  flexDirection: 'row',
  alignItems: 'center',
}));

const FilterChipText = styled.Text({
  color: '#fff',
  fontSize: 14,
  marginRight: 4,
});

const ResultsContainer = styled.View({
  marginTop: 32,
});

const ResultsTitle = styled.Text(({ theme }) => ({
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 16,
  color: theme.colors.text,
}));

const NoResults = styled.Text(({ theme }) => ({
  textAlign: 'center',
  color: theme.colors.textSecondary,
  marginTop: 20,
  fontSize: 16,
}));


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
  const theme = useTheme() as CustomTheme;
  const [bottomSheetIndex, setBottomSheetIndex] = useState(-1);
  const [activeFilters, setActiveFilters] = useState<Filters>({});
  const [filteredCars, setFilteredCars] = useState(MOCK_CARS);
  const [filters, setFilters] = useState<Filters>({});

  // Data Fetching
  const { data: vehicles, isLoading, error } = useVehicles();

  // Debugging react query (TODO: use the data later after Database is seeded)
  console.log({ vehicles, isLoading, error });

  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%", "75%"], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('[SearchScreen] Sheet index changed:', index);
    setBottomSheetIndex(index);
  }, []);

  const handleOpenFilters = useCallback(() => {
    console.log('[SearchScreen] Opening filters, current index:', bottomSheetIndex);
    console.log('[SearchScreen] BottomSheet ref exists:', !!bottomSheetRef.current);
    setBottomSheetIndex(0);
  }, [bottomSheetIndex]);

  const handleCloseFilters = useCallback(() => {
    console.log('[SearchScreen] Closing filters');
    setBottomSheetIndex(-1);
  }, []);

  // Effect to log state changes
  useEffect(() => {
    console.log('[SearchScreen] Bottom sheet index changed to:', bottomSheetIndex);
  }, [bottomSheetIndex]);

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

  const filterSections = useMemo(() => [
    {
      title: 'Make',
      options: MAKES.map(make => ({ label: make, value: make })),
      selectedValue: filters.make,
      onSelect: (value: string | number) => handleMakeSelect(value as string),
    },
    {
      title: 'Price Range',
      options: PRICE_RANGES.map(range => ({ label: range.label, value: range.label })),
      selectedValue: filters.priceRange?.label,
      onSelect: (value: string | number) => {
        const range = PRICE_RANGES.find(r => r.label === value);
        if (range) handlePriceSelect(range);
      },
    },
    {
      title: 'Year',
      options: YEARS.slice(0, 10).map(year => ({ label: String(year), value: year })),
      selectedValue: filters.year,
      onSelect: (value: string | number) => handleYearSelect(value as number),
    },
    {
      title: 'Transmission',
      options: TRANSMISSIONS.map(trans => ({ label: trans, value: trans })),
      selectedValue: filters.transmission,
      onSelect: (value: string | number) => handleTransmissionSelect(value as string),
    },
  ], [filters]);

  return (
    <StyledContainer>
      <StyledScrollView
        contentContainerStyle={{ minHeight: '100%' }}>
        <ScrollContent>
          <PageHeader>
            <TitleContainer>
              <Title>Find Your Perfect Car</Title>
              <Subtitle>
                Browse through our extensive collection of quality vehicles and find the perfect one for you.
              </Subtitle>
            </TitleContainer>
            <View>
              <FilterButton
                onPress={() => {
                  console.log('[SearchScreen] Filter button pressed');
                  handleOpenFilters();
                }}
                hitSlop={8}
              >
                <FilterButtonText>🔍 Filters</FilterButtonText>
              </FilterButton>
            </View>
          </PageHeader>

          {Object.keys(activeFilters).length > 0 && (
            <FiltersScroll
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingRight: -16, marginTop: 6 }}
            >
              {activeFilters.make && (
                <FilterChip onPress={() => handleRemoveFilter('make')}>
                  <FilterChipText>{activeFilters.make}</FilterChipText>
                  <FontAwesome name="times" size={12} color="#fff" style={{ marginLeft: 4 }} />
                </FilterChip>
              )}
              {activeFilters.priceRange && (
                <FilterChip onPress={() => handleRemoveFilter('priceRange')}>
                  <FilterChipText>{activeFilters.priceRange.label}</FilterChipText>
                  <FontAwesome name="times" size={12} color="#fff" style={{ marginLeft: 4 }} />
                </FilterChip>
              )}
              {activeFilters.year && (
                <FilterChip onPress={() => handleRemoveFilter('year')}>
                  <FilterChipText>{activeFilters.year}</FilterChipText>
                  <FontAwesome name="times" size={12} color="#fff" style={{ marginLeft: 4 }} />
                </FilterChip>
              )}
              {activeFilters.transmission && (
                <FilterChip onPress={() => handleRemoveFilter('transmission')}>
                  <FilterChipText>{activeFilters.transmission}</FilterChipText>
                  <FontAwesome name="times" size={12} color="#fff" style={{ marginLeft: 4 }} />
                </FilterChip>
              )}
            </FiltersScroll>
          )}

          <ResultsContainer>
            <ResultsTitle>
              {filteredCars.length === MOCK_CARS.length
                ? 'Available Cars'
                : `${filteredCars.length} cars found`}
            </ResultsTitle>
            {filteredCars.map((car) => (
              <CarCard key={car.id} {...car} />
            ))}
            {filteredCars.length === 0 && (
              <NoResults>
                No cars match your filters. Try adjusting your search criteria.
              </NoResults>
            )}
          </ResultsContainer>
        </ScrollContent>
      </StyledScrollView>

      <FiltersBottomSheet
        ref={bottomSheetRef}
        sections={filterSections}
        onApply={() => {
          console.log('[SearchScreen] Applying filters');
          handleApply();
        }}
        onClose={() => {
          console.log('[SearchScreen] Bottom sheet closing');
          handleCloseFilters();
        }}
        index={bottomSheetIndex}
        onChange={handleSheetChanges}
      />
    </StyledContainer>
  );
} 