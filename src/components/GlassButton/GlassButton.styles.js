import {StyleSheet} from 'react-native';
import {radii, spacing, typography} from '../../theme/tokens';

/**
 * Gradient buttons use the ONE shape proven to render on this device:
 * an in-flow LinearGradient with its own borderRadius — never stretched
 * with absolute positioning, never inside a parent with overflow:hidden.
 */
export const createStyles = theme =>
  StyleSheet.create({
    outer: {borderRadius: radii.md},
    gradientShadow: {
      elevation: 5,
      shadowColor: '#000000',
      shadowOpacity: 0.22,
      shadowRadius: 10,
      shadowOffset: {width: 0, height: 5},
    },
    highlight: {
      position: 'absolute',
      top: 0,
      left: 12,
      right: 12,
      height: 1.5,
      borderRadius: 1,
      backgroundColor: 'rgba(255, 255, 255, 0.45)',
    },

    press: {
      paddingVertical: 14,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    pressedOnGradient: {backgroundColor: 'rgba(0, 0, 0, 0.14)'},
    pressedOnGlass: {backgroundColor: 'rgba(0, 0, 0, 0.05)'},

    frostedFace: {
      backgroundColor: theme.glass.fill,
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    softDangerFace: {
      backgroundColor: 'rgba(192, 57, 43, 0.12)',
      borderWidth: 1,
      borderColor: 'rgba(192, 57, 43, 0.40)',
    },

    disabled: {opacity: 0.55},
    iconSlot: {marginRight: spacing.sm},

    labelOnGradient: {...typography.button, color: '#FFFFFF'},
    labelFrosted: {...typography.button, color: theme.control.label},
    labelSoftDanger: {...typography.button, color: theme.danger},
  });

/** Vertical: lighter top, deeper bottom — reads as a lit, raised button. */
export const GRADIENT_DIRECTION = {start: {x: 0, y: 0}, end: {x: 0, y: 1}};

/** Colour psychology — fixed colours, so buttons keep their meaning. */
export const BUTTON_GRADIENTS = {
  primary: ['#F2A04C', '#D4711C'], // orange — start an action
  confirm: ['#43A35A', '#1F6B33'], // green  — confirm, save
  info: ['#4A90D9', '#1F5C9E'], // blue   — settings, navigation
  destructive: ['#E4564A', '#B02A21'], // red    — reset, delete, exit
  neutral: ['#8D9AA9', '#5C6878'], // slate  — cancel, back
};