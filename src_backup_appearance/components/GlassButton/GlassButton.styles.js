import {StyleSheet} from 'react-native';
import {radii, spacing, typography} from '../../theme/tokens';

export const createStyles = theme =>
  StyleSheet.create({
    base: {
      borderRadius: radii.md,
      paddingVertical: 14,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      borderWidth: 1,
      flexDirection: 'row',
    },
    solid: {
      backgroundColor: theme.accent,
      borderColor: theme.accent,
      elevation: 6,
      shadowColor: theme.glass.shadow,
      shadowOpacity: 0.3,
      shadowRadius: 12,
      shadowOffset: {width: 0, height: 6},
    },
    solidPressed: {
      backgroundColor: theme.accentPressed,
      borderColor: theme.accentPressed,
    },
    glass: {
      backgroundColor: theme.glass.fill,
      borderColor: theme.glass.border,
    },
    glassPressed: {backgroundColor: theme.glass.fillStrong},
    danger: {
      backgroundColor: 'rgba(255, 122, 110, 0.14)',
      borderColor: 'rgba(255, 122, 110, 0.45)',
    },
    dangerPressed: {backgroundColor: 'rgba(255, 122, 110, 0.24)'},
    pressedTransform: {transform: [{scale: 0.985}]},
    disabled: {opacity: 0.6},
    sheen: {...StyleSheet.absoluteFillObject},
    topHighlight: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1.2,
      backgroundColor: theme.glass.highlight,
    },
    labelSolid: {...typography.button, color: theme.text.onAccent},
    labelGlass: {...typography.button, color: theme.text.heading},
    labelDanger: {...typography.button, color: theme.danger},
    iconSlot: {marginRight: spacing.sm},
  });

export const SHEEN_GEOMETRY = {start: {x: 0, y: 0}, end: {x: 1, y: 1}};