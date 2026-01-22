// Fallback for using MaterialIcons on Android and web.

import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
import { ComponentProps } from 'react';
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
type IconSymbolName = keyof typeof MAPPING;

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  // Navigation icons
  'house.fill': 'home',
  'paperplane.fill': 'send',
  'chevron.left.forwardslash.chevron.right': 'code',
  'chevron.right': 'chevron-right',
  'chevron.left': 'chevron-left',
  'chevron.down': 'keyboard-arrow-down',
  
  // Study Hub icons
  'book.fill': 'book',
  'brain.head.profile': 'psychology',
  'person.3.fill': 'group',
  'timer': 'timer',
  'note.text': 'note',
  'calendar.badge.plus': 'event',
  'laptopcomputer': 'computer',
  'function': 'functions',
  'atom': 'science',
  'checkmark.circle': 'check-circle',
  'doc.text.fill': 'description',
  'play.circle.fill': 'play-circle-filled',
  'questionmark.circle.fill': 'help',
  'person.2.fill': 'group',
  
  // Mety AI icons
  'calendar': 'event',
  'doc.text': 'description',
  'lightbulb.fill': 'lightbulb',
  'person.fill': 'person',
  
  // Social icons
  'plus.circle.fill': 'add-circle',
  'person.badge.plus': 'person-add',
  'heart': 'favorite-border',
  'heart.fill': 'favorite',
  'message': 'message',
  'square.and.arrow.up': 'share',
  'figure.run': 'directions-run',
  'music.note': 'music-note',
  
  // Find Friends icons
  'magnifyingglass': 'search',
  'ellipsis': 'more-vert',
  'xmark': 'close',
  
  // Profile icons
  'person.circle.fill': 'account-circle',
  'gear': 'settings',
  'bell': 'notifications',
  'shield.checkered': 'security',
  'questionmark.circle': 'help-outline',
  'info.circle': 'info-outline',
  'arrow.right.square': 'logout',
  'star.fill': 'star',
  'trophy.fill': 'emoji-events',
  'chart.bar.fill': 'bar-chart',
  'pencil': 'edit',
  
  // Hobbies icons
  'camera.fill': 'camera-alt',
  'gamecontroller.fill': 'sports-esports',
  'airplane': 'flight',
} as IconMapping;

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function IconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
