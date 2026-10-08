import {StyleSheet} from 'react-native';
import {radii, spacing, weight} from '../../theme/tokens';
/** Card padding. The ✕ offset is derived from it, so they can't drift apart. */
const CARD_PADDING = spacing.sm;
/** How far the ✕ sits from the card's real corner. */
const CLOSE_INSET = 8;
/**
 * TYPOGRAPHY (MD3 dialog standard)
 *   Headline Small — dialog title
 *   Body Medium    — message
 *   Label Small    — colour-chip captions
 */
export const createStyles = theme =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(12, 20, 14, 0.5)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.lg,
    },
    cardWrap: {width: '100%', maxWidth: 350},
      card: {paddingVertical: CARD_PADDING, paddingHorizontal: CARD_PADDING},

    // The ✕ is positioned inside the card's padding, so subtracting that
    // padding places it CLOSE_INSET px from the card's actual corner
    closeBtn: {
      position: 'absolute',
      top: CLOSE_INSET - CARD_PADDING,
      right: CLOSE_INSET - CARD_PADDING,
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.glass.rim,
      zIndex: 5,
    },

    inner: {alignItems: 'center'},
    iconRing: {
      width: 68,
      height: 68,
      borderRadius: 34,
      borderWidth: 3,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.md,
      marginTop: spacing.xs,
    },
    iconGlyph: {fontSize: 32, lineHeight: 38, ...theme.weight(800)},

    title: {...theme.type.headlineSmall, textAlign: 'center', textShadowRadius: 0},
    message: {...theme.type.bodyMedium, textAlign: 'center', marginTop: spacing.xs},

    swatchRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: spacing.md,
    },
    swatchItem: {alignItems: 'center', marginHorizontal: spacing.xs},
    swatchChip: {
      width: 38,
      height: 38,
      borderRadius: radii.sm,
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    swatchLabel: {...theme.type.labelSmall, marginTop: 4, textShadowRadius: 0},

    buttonRow: {flexDirection: 'row', alignSelf: 'stretch', marginTop: spacing.lg},
    button: {flex: 1},
    buttonGap: {marginLeft: spacing.sm},
  });

/** Colour + symbol for each dialog type. */
export const resolveTone = (theme, type) => {
  const make = (color, extra) => ({color, ring: `${color}55`, soft: `${color}1A`, ...extra});
  switch (type) {
    case 'success':
      return make(theme.success, {icon: 'check'});
    case 'error':
      return make(theme.danger, {icon: 'close'});
    case 'warning':
      return make(theme.accent, {glyph: '!'});
        default:
      // brandGreen adapts: deep green on light backgrounds, pale on dark
      return make(theme.brandGreen, {glyph: 'i'});
  }
};