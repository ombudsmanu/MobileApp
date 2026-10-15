import {StyleSheet} from 'react-native';
import {radii} from '../../theme/tokens';

/**
 * Height of the label's line box.
 *
 * The label gets a line box EXACTLY this tall, with Android's extra font
 * padding removed and the text centred inside it. Nastaleeq normally needs
 * a much taller line than English; giving both labels the same box means EN
 * and اردو always share one centre line and never overflow the pill.
 */
const OPTION_HEIGHT = 32;

/**
 * Optical nudge for the اردو label, in pixels (negative = up).
 * The box is centred, but Noto Nastaliq keeps a lot of empty room ABOVE its
 * letters for tall stacked words, so a short word like اردو sits low in it.
 * Tune by eye: if اردو still looks low, try -3; if it looks high, try -1.
 */
const URDU_NUDGE = -3;

/** The globe mark's size, so the component and the gap agree on one value. */
export const ICON_SIZE = 18;

/**
 * TYPOGRAPHY (MD3): Label Medium. Colours come from theme.glass and
 * theme.accent, so the button stays readable whatever colours the user
 * picks in Appearance.
 *
 * ONE button, not two options — it is deliberately frosted-with-a-border
 * rather than filled with the accent colour. A filled pill reads as "this
 * is the language you are in"; an outlined one reads as "tap me to change
 * it", which is what this button actually does. The globe says what kind of
 * setting it is, so the label is free to name the language you'd switch TO.
 */
export const createStyles = theme =>
  StyleSheet.create({
    toggle: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      height: OPTION_HEIGHT + 6,
      paddingLeft: 9,
      paddingRight: 12,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fillStrong,
    },
    pressed: {opacity: 0.7},
    /** The Icon component takes no style prop, so it is wrapped to be spaced. */
    icon: {marginRight: 5},
    text: {
      ...theme.type.labelMedium,
      color: theme.accent,
      lineHeight: OPTION_HEIGHT,
      textAlign: 'center',
      textAlignVertical: 'center',
      includeFontPadding: false,
      textShadowRadius: 0,
    },
    textUrdu: {transform: [{translateY: URDU_NUDGE}]},
  });