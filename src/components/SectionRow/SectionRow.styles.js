import {StyleSheet} from 'react-native';
import {spacing} from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3): Title Medium, in the row's own colour.
 * overflow:'hidden' trims the coloured bar to the card's rounded corners
 * (the card's shadow is not affected by it on Android).
 */
export const createStyles = theme =>
  StyleSheet.create({
    row: {paddingVertical: spacing.lg, paddingHorizontal: spacing.lg, overflow: 'hidden'},
    rowInner: {alignItems: 'center', justifyContent: 'center'},
    // Coloured bar on the leading edge, full height of the row
    bar: {position: 'absolute', top: -40, bottom: -40, width: 5},
    barStart: {left: -spacing.lg},
    barEnd: {right: -spacing.lg},
    label: {...theme.type.titleMedium, textAlign: 'center'},
  });