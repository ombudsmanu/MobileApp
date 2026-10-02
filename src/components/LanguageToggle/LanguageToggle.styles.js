import {StyleSheet} from 'react-native';
import {radii} from '../../theme/tokens';

/**
 * Height of each option pill (EN / اردو).
 *
 * Both labels get a line box EXACTLY this tall, with Android's extra font
 * padding removed and the text centred inside it. Nastaleeq normally needs
 * a much taller line than English; giving both the same box means EN and
 * اردو always share one centre line and never overflow the pill.
 * (AppText keeps this value because it only ever raises a line height —
 * at 32 it is already enough for the Urdu label.)
 */
const OPTION_HEIGHT = 32;

/**
 * Optical nudge for the اردو label, in pixels (negative = up).
 * The box is centred, but Noto Nastaliq keeps a lot of empty room ABOVE its
 * letters for tall stacked words, so a short word like اردو sits low in it.
 * Tune by eye: if اردو still looks low, try -3; if it looks high, try -1.
 */
const URDU_NUDGE = -3;
/**
 * TYPOGRAPHY (MD3): Label Medium. Colours come from theme.control, so the
 * toggle stays readable whatever text colours the user picks in Appearance.
 */
export const createStyles = theme =>
  StyleSheet.create({
    toggle: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 3,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fillStrong,
    },
    option: {
      height: OPTION_HEIGHT,
      minWidth: 48,
      paddingHorizontal: 12,
      borderRadius: radii.pill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionActive: {backgroundColor: theme.accent},
    text: {
      ...theme.type.labelMedium,
      color: theme.control.label,
      lineHeight: OPTION_HEIGHT,
      textAlign: 'center',
      textAlignVertical: 'center',
      includeFontPadding: false,
      textShadowRadius: 0,
    },
    textActive: {color: theme.text.onAccent},
    textUrdu: {transform: [{translateY: URDU_NUDGE}]},
  });