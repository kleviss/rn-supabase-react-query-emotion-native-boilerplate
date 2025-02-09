import { ActivityIndicator, RefreshControl, View } from 'react-native';
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';

import { CarCard } from '@/components/CarCard';
import type { CustomTheme } from '@/constants/theme';
import FiltersBottomSheet from '@/components/ui/FiltersBottomSheet';
import { FlashList } from '@shopify/flash-list';
import { MOCK_CARS } from '@/constants/mock-data';
import { SearchPageHeader } from '@/components/ui/SearchPageHeader';
import { StyleSheet } from 'react-native';
import { filterCars } from '@/components/SearchFilters';
import styled from '@emotion/native';
import { useTheme } from '@emotion/react';
import { useVehicles } from '@/services/supabase.api';

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

const SearchScreen = () => {
  const theme = useTheme() as CustomTheme;
  const [activeFilters, setActiveFilters] = useState<Filters>({});
  const [filteredCars, setFilteredCars] = useState(MOCK_CARS);
  const [filters, setFilters] = useState<Filters>({});

  // Data Fetching
  // const { data: vehicles, isLoading, error, refetch } = useVehicles();
  // In order to not hurt my poor modest supabase account, I'm using mock data for now
  // from mock-data.ts

  const vehicles = MOCK_CARS;
  const isLoading = false;
  const error = null;
  const refetch = () => { }; // refetch is not needed for mock data

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["100%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleCloseFilters = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);
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
    setActiveFilters(filters);
    const filtered = filterCars(MOCK_CARS, filters);
    setFilteredCars(filtered);
    bottomSheetModalRef.current?.close();
    handleCloseFilters();
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

  const emptyText = 'No cars match your filters. Try adjusting your search criteria.';

  // renders
  const renderBackdrop = useCallback(
    (props_: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props_}
        pressBehavior="close"
        opacity={0.5}
        disappearsOnIndex={-1}
      />
    ),
    []
  );

  const handleRefresh = useCallback(() => {
    refetch();
  }, []);

  return (
    <StyledContainer>
      <StyledScrollView
        contentContainerStyle={{ minHeight: '100%' }}
        refreshControl={<RefreshControl refreshing={isLoading} onRefresh={handleRefresh} />}>
        <ScrollContent>
          {isLoading ? (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator size="large" color={theme.colors.primary} />
            </View>
          ) : (
            <FlashList
              data={filteredCars}
              renderItem={({ item }) => <CarCard key={item.id} {...item} />}
              estimatedItemSize={200}
              refreshing={isLoading}
              onRefresh={handleRefresh}
              ListEmptyComponent={<NoResults>{emptyText}</NoResults>}
              ListHeaderComponent={
                <SearchPageHeader
                  activeFilters={activeFilters}
                  onOpenFilters={handlePresentModalPress}
                  onRemoveFilter={handleRemoveFilter}
                />
              }
            />
          )}
        </ScrollContent>
      </StyledScrollView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={["80%"]}
        backdropComponent={renderBackdrop}
        enablePanDownToClose
      >
        <FiltersBottomSheet
          sections={filterSections}
          onApply={() => {
            handleApply();
            handleCloseFilters();
          }}
          onClose={handleCloseFilters}
        />
      </BottomSheetModal>
    </StyledContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "white",
    // flex: 1,
    padding: 16,
    // minHeight: 500,
  },
  itemContainer: {
    padding: 6,
    margin: 6,
    backgroundColor: "#eee",
  },
});

export default SearchScreen;