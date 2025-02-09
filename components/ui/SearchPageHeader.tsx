import { ScrollView, View } from 'react-native';

import type { CustomTheme } from '@/constants/theme';
import { FontAwesome } from '@expo/vector-icons';
import styled from '@emotion/native';
import { useTheme } from '@emotion/react';

// Types
interface Filters {
  make?: string;
  priceRange?: { min: number; max: number; label: string };
  year?: number;
  transmission?: string;
}

interface SearchPageHeaderProps {
  activeFilters: Filters;
  onOpenFilters: () => void;
  onRemoveFilter: (key: keyof Filters) => void;
}

// Styled Components
const Container = styled.View({
  // paddingHorizontal: 16,
  paddingTop: 8,
  backgroundColor: 'transparent',
});

const HeaderContent = styled.View({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
});

const TitleContainer = styled.View({
  flex: 1,
  marginRight: 16,
});

const Title = styled.Text(({ theme }) => ({
  fontSize: 24,
  fontWeight: 'bold',
  color: theme.colors.text,
  marginBottom: 8,
}));

const Subtitle = styled.Text(({ theme }) => ({
  fontSize: 16,
  color: theme.colors.textSecondary,
  marginTop: 16,
  marginBottom: 16,
  width: '180%',
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
  marginTop: -6,
}));

const FilterButtonText = styled.Text(({ theme }) => ({
  color: theme.colors.text,
  fontSize: 16,
  fontWeight: '600',
}));

const FiltersScrollView = styled.ScrollView({
  marginTop: 16,
  marginBottom: 8,
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

// Component
export function SearchPageHeader({
  activeFilters,
  onOpenFilters,
  onRemoveFilter
}: SearchPageHeaderProps) {
  const theme = useTheme() as CustomTheme;

  const renderFilterChips = () => {
    if (Object.keys(activeFilters).length === 0) return null;

    return (
      <FiltersScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {activeFilters.make && (
          <FilterChip onPress={() => onRemoveFilter('make')}>
            <FilterChipText>{activeFilters.make}</FilterChipText>
            <FontAwesome name="times" size={12} color="#fff" />
          </FilterChip>
        )}
        {activeFilters.priceRange && (
          <FilterChip onPress={() => onRemoveFilter('priceRange')}>
            <FilterChipText>{activeFilters.priceRange.label}</FilterChipText>
            <FontAwesome name="times" size={12} color="#fff" />
          </FilterChip>
        )}
        {activeFilters.year && (
          <FilterChip onPress={() => onRemoveFilter('year')}>
            <FilterChipText>{activeFilters.year}</FilterChipText>
            <FontAwesome name="times" size={12} color="#fff" />
          </FilterChip>
        )}
        {activeFilters.transmission && (
          <FilterChip onPress={() => onRemoveFilter('transmission')}>
            <FilterChipText>{activeFilters.transmission}</FilterChipText>
            <FontAwesome name="times" size={12} color="#fff" />
          </FilterChip>
        )}
      </FiltersScrollView>
    );
  };

  return (
    <Container>
      <HeaderContent>
        <TitleContainer>
          <Title>Find Your Perfect Car</Title>
          <Subtitle>
            Browse through our extensive collection of quality vehicles and find the perfect one for you.
          </Subtitle>
        </TitleContainer>
        <FilterButton
          onPress={onOpenFilters}
          hitSlop={8}
        >
          <FilterButtonText>🔍 Filters</FilterButtonText>
        </FilterButton>
      </HeaderContent>
      {renderFilterChips()}
    </Container>
  );
}
