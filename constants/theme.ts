import { DarkTheme, DefaultTheme, Theme as NavigationTheme } from '@react-navigation/native';

// Base palette
const palette = {
  blue: {
    light: '#0a7ea4',
    dark: '#ffffff',
  },
  text: {
    light: '#11181C',
    dark: '#ECEDEE',
  },
  grey: {
    100: '#ECEDEE',
    200: '#9BA1A6',
    300: '#687076',
  },
  background: {
    light: '#ffffff',
    dark: '#151718',
  },
  success: '#008000',
  error: '#FF0000',
} as const;

// Semantic tokens
const tokens = {
  light: {
    text: palette.text.light,
    textSecondary: palette.grey[300],
    textSuccess: palette.success,
    textError: palette.error,
    textContrast: palette.text.dark,
    background: palette.background.light,
    tint: palette.blue.light,
    primary: palette.blue.light,
    icon: palette.grey[300],
    tabIconDefault: palette.grey[300],
    tabIconSelected: palette.blue.light,
  },
  dark: {
    text: palette.text.dark,
    textSecondary: palette.grey[200],
    textSuccess: palette.success,
    textError: palette.error,
    textContrast: palette.text.light,
    background: palette.background.dark,
    tint: palette.blue.dark,
    primary: palette.blue.dark,
    icon: palette.grey[200],
    tabIconDefault: palette.grey[200],
    tabIconSelected: palette.blue.dark,
  },
} as const;

// Theme interface
export interface CustomColors {
  text: string;
  textSecondary: string;
  textContrast: string;
  textSuccess: string;
  textError: string;
  background: string;
  tint: string;
  primary: string;
  icon: string;
  tabIconDefault: string;
  tabIconSelected: string;
}

export interface CustomTheme extends NavigationTheme {
  colors: CustomColors & NavigationTheme['colors'];
}

// Theme objects
export const lightTheme: CustomTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...tokens.light,
  },
};

export const darkTheme: CustomTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    ...tokens.dark,
  },
};

// Export tokens for direct usage if needed
export const Colors = tokens;
