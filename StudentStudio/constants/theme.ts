/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const primaryBlue = '#3b82f6';
const lightBlue = '#60a5fa';
const veryLightBlue = '#dbeafe';
const paleBlue = '#eff6ff';

export const Colors = {
  light: {
    text: '#1f2937',
    background: '#ffffff',
    tint: primaryBlue,
    icon: '#6b7280',
    tabIconDefault: '#9ca3af',
    tabIconSelected: primaryBlue,
    primary: primaryBlue,
    secondary: lightBlue,
    accent: '#60a5fa',
    warning: '#93c5fd',
    surface: paleBlue,
    border: '#e5e7eb',
    cardBackground: '#ffffff',
    lightAccent: veryLightBlue,
  },
  dark: {
    text: '#1f2937',
    background: '#ffffff',
    tint: primaryBlue,
    icon: '#6b7280',
    tabIconDefault: '#9ca3af',
    tabIconSelected: primaryBlue,
    primary: primaryBlue,
    secondary: lightBlue,
    accent: '#60a5fa',
    warning: '#93c5fd',
    surface: paleBlue,
    border: '#e5e7eb',
    cardBackground: '#ffffff',
    lightAccent: veryLightBlue,
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
