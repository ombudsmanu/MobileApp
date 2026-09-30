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
    labelGlass: {...typography.button, color: theme.control.label},
        labelDanger: {...typography.button, color: theme.danger},
    iconSlot: {marginRight: spacing.sm},
        // Solid red — for destructive actions that need to stand out
    dangerSolid: {
      backgroundColor: theme.danger,
      borderColor: theme.danger,
      elevation: 4,
      shadowColor: theme.danger,
      shadowOpacity: 0.3,
      shadowRadius: 10,
      shadowOffset: {width: 0, height: 4},
    },
    dangerSolidPressed: {backgroundColor: '#A93226', borderColor: '#A93226'},
    labelDangerSolid: {...typography.button, color: '#FFFFFF'},
        // Gradient buttons: the solid background matches the gradient's end
    // colour so Android can cast a proper shadow behind it.
    gradientFill: {
      borderColor: 'rgba(255, 255, 255, 0.28)',
      elevation: 6,
      shadowColor: '#000000',
      shadowOpacity: 0.25,
      shadowRadius: 10,
      shadowOffset: {width: 0, height: 5},
    },
    gradientPressed: {opacity: 0.88},
    labelOnGradient: {...typography.button, color: '#FFFFFF'},
  });
/**
 * Fixed button gradients, top-left → bottom-right.
 * Deliberately NOT theme colours: buttons are controls, so they keep
 * their colours on any background the user chooses.
 */
export const BUTTON_GRADIENTS = {
  brand: ['#4A9A52', '#1E5626'], // green — primary navigation
  accent: ['#F4A65A', '#D9722A'], // orange — primary action
  danger: ['#E0584B', '#A5281F'], // red — destructive action
};
export const SHEEN_GEOMETRY = {start: {x: 0, y: 0}, end: {x: 1, y: 1}};