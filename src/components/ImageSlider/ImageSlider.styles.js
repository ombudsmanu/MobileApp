import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

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

    // Photo caption — a small dark chip, top corner
    captionChip:{
      position: 'absolute',
      top: spacing.sm,
      left: spacing.sm,
      alignSelf: 'flex-start',
      maxWidth: '75%',
      paddingHorizontal: spacing.sm,
      paddingVertical: 5,
      borderRadius: radii.pill,
      backgroundColor: 'rgba(12, 20, 14, 0.55)',
    },
    captionChipRTL: {left: undefined, right: spacing.sm, alignSelf: 'flex-end'},
    // MD3 Label Medium — Label Small (11px) is too small on a photo
    captionText: {...theme.type.labelMedium, color: '#FFFFFF', textShadowRadius: 0},
    // Position dots, bottom corner
    dots: {
      position: 'absolute',
      bottom: spacing.sm,
      right: spacing.md,
      flexDirection: 'row',
    },
    dotsRTL: {right: undefined, left: spacing.md},
    dot: {
      width: 7,
      height: 7,
      borderRadius: 4,
      marginHorizontal: 3,
      backgroundColor: 'rgba(255, 255, 255, 0.45)',
    },
    dotActive: {width: 20, backgroundColor: '#FFFFFF'},
  });