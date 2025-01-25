import { BottomSheet } from './BottomSheet';
import BottomSheetBase from '@gorhom/bottom-sheet';
import type { CustomTheme } from '@/constants/theme';
import { ScrollView } from 'react-native';
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
  index?: number;
  onChange?: (index: number) => void;
}

export const FiltersBottomSheet = forwardRef<BottomSheetBase, FiltersBottomSheetProps>(
  ({ sections, onApply, onClose, index = -1, onChange }, ref) => {
    console.log('[FiltersBottomSheet] Rendering with props:', {
      sectionsCount: sections.length,
      index,
      hasOnChange: !!onChange,
      hasOnClose: !!onClose,
      hasOnApply: !!onApply,
      hasRef: !!ref
    });

    return (
      <BottomSheet
        ref={ref}
        title="Filters"
        onClose={() => {
          console.log('[FiltersBottomSheet] Close button clicked');
          onClose();
        }}
        isFullScreen
        index={index}
        onChange={(newIndex) => {
          console.log('[FiltersBottomSheet] Sheet index changed to:', newIndex);
          onChange?.(newIndex);
        }}
      >
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
      </BottomSheet>
    );
  }
); 