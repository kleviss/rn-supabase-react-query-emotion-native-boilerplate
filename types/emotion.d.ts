import '@emotion/react';
import { CustomTheme } from '@/constants/theme';

declare module '@emotion/react' {
  export interface Theme extends CustomTheme {}
}
