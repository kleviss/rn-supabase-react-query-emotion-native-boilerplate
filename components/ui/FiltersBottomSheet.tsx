import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet';
import { ScrollView, View } from 'react-native';

import { StyleSheet } from 'react-native';
import { forwardRef } from 'react';
import styled from '@emotion/native';

const Section = styled.View({
  marginBottom: 24,
});

const SectionTitle = styled.Text(({ theme }) => ({
  fontSize: 16,
  fontWeight: '600',
  color: theme.colors.text,
  marginBottom: 12,
}));

const OptionsGrid = styled.View({
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginHorizontal: -4,
  maxHeight: 200,
});

const OptionButton = styled.Pressable<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  backgroundColor: isSelected ? theme.colors.primary : theme.colors.background,
  paddingHorizontal: 12,
  paddingVertical: 8,
  borderRadius: 8,
  margin: 4,
  minWidth: 80,
  alignItems: 'center',
  borderWidth: 1,
  borderColor: isSelected ? theme.colors.primary : theme.colors.textSecondary,
}));

const OptionText = styled.Text<{ isSelected?: boolean }>(({ theme, isSelected }) => ({
  color: isSelected ? theme.colors.textContrast : theme.colors.text,
  fontSize: 14,
}));

const Footer = styled.View({
  paddingTop: 16,
  borderTopWidth: 1,
  borderTopColor: '#e5e7eb',
  // paddingHorizontal: 16,
  paddingBottom: 56,
});


const ApplyButton = styled.Pressable(({ theme }) => ({
  backgroundColor: theme.colors.primary,
  paddingVertical: 12,
  borderRadius: 8,
  alignItems: 'center',
  width: '100%',
  paddingHorizontal: 12,
  marginTop: 4,
}));

const ApplyButtonText = styled.Text({
  color: '#ffffff',
  fontSize: 16,
  fontWeight: '600',
  textAlign: 'center',
});

export interface FilterOption {
  label: string;
  value: string | number;
}

export interface FiltersBottomSheetProps {
  sections: {
    title: string;
    options: FilterOption[];
    selectedValue?: string | number;
    onSelect: (value: string | number) => void;
  }[];
  onApply: () => void;
  onClose: () => void;
}

const FiltersBottomSheet = forwardRef<BottomSheetModal, FiltersBottomSheetProps>(
  ({ sections, onApply, onClose }, ref) => {


    return (
      <BottomSheetView style={styles.contentContainer}>
        <ScrollView>
          {sections.map((section, index) => (
            <Section key={index}>
              <SectionTitle>{section.title}</SectionTitle>
              <OptionsGrid>
                {section.options.map((option, optionIndex) => (
                  <OptionButton
                    key={optionIndex}
                    isSelected={section.selectedValue === option.value}
                    onPress={() => section.onSelect(option.value)}
                  >
                    <OptionText isSelected={section.selectedValue === option.value}>
                      {option.label}
                    </OptionText>
                  </OptionButton>
                ))}
              </OptionsGrid>
            </Section>
          ))}
        </ScrollView>

        <Footer>
          <ApplyButton onPress={onApply}>
            <ApplyButtonText>Apply Filters</ApplyButtonText>
          </ApplyButton>
        </Footer>
        <View style={{ height: 130 }} />
      </BottomSheetView>
    );
  }
);

const styles = StyleSheet.create({
  contentContainer: {
    padding: 16,
    flex: 1,
  },
});


export default FiltersBottomSheet;