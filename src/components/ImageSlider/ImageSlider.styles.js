import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/**
 * Caption chip: top corner. Dots: bottom corner, opposite the welcome text.
 *   English — caption top-LEFT,  dots bottom-RIGHT
 *   Urdu    — caption top-RIGHT, dots bottom-LEFT
 * Each side is its own style so exactly one is ever applied.
 */
export const createStyles = theme =>
  StyleSheet.create({
    wrap: {
      borderRadius: radii.lg,
      overflow: 'hidden',
      marginTop: spacing.sm,
      backgroundColor: '#1B2A1E',
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    image: {...StyleSheet.absoluteFillObject, width: '100%', height: '100%'},
    // Dark fade at the bottom so white text on top is always readable
    shade: {...StyleSheet.absoluteFillObject},

    // ---- Photo caption — small dark chip, top corner ----
    // Absolute with one side set → the chip hugs its text
    captionChip: {
      position: 'absolute',
      top: spacing.sm,
      maxWidth: '75%',
      height: 30,
      paddingHorizontal: spacing.sm,
      paddingVertical: 8,
      borderRadius: radii.pill,
      backgroundColor: 'rgba(12, 20, 14, 0.55)',
    },
    captionChipLTR: {left: spacing.sm},
    captionChipRTL: {right: spacing.sm},
    // Nastaleeq lines are already tall (AppText doubles line height), so the
    // chip drops its vertical padding to stay the same visual weight
    captionChipUrdu: {paddingVertical: 0, paddingHorizontal: spacing.sm + 2},
    // MD3 Label Medium — Label Small (11px) is too small on a photo
    captionText: {...theme.type.labelMedium, color: '#FFFFFF', textShadowRadius: 0},

    // ---- Position dots, bottom corner ----
    dots: {
      position: 'absolute',
      bottom: spacing.sm,
      flexDirection: 'row',
    },
    dotsLTR: {right: spacing.md},
    dotsRTL: {left: spacing.md},
    dot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      marginHorizontal: 3,
      backgroundColor: 'rgba(255, 255, 255, 0.45)',
    },
    dotActive: {width: 20, backgroundColor: '#FFFFFF'},
  });