import { CustomTheme } from '@/constants/theme';
import { useTheme as useEmotionTheme } from '@emotion/react';

export function useEmotionStyledTheme() {
  return useEmotionTheme() as CustomTheme;
}
