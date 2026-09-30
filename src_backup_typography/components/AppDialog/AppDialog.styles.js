import {StyleSheet} from 'react-native';
import {fonts, radii, spacing} from '../../theme/tokens';
export const createStyles = theme =>
  StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(12, 20, 14, 0.5)',
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.lg,
    },
    cardWrap: {width: '100%', maxWidth: 380},
    card: {paddingVertical: spacing.lg, paddingHorizontal: spacing.lg},

    closeBtn: {
      position: 'absolute',
      top: spacing.xs,
      right: spacing.xs,
      width: 30,
      height: 30,
      borderRadius: 15,
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
    iconGlyph: {fontFamily: fonts.extrabold, fontSize: 32, lineHeight: 38},
    title: {...theme.type.heading, fontSize: 20, textAlign: 'center'},
    message: {...theme.type.body, textAlign: 'center', marginTop: spacing.xs},

    // Suggested-colour chips
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
    swatchLabel: {...theme.type.caption, marginTop: 4},

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
      return make(theme.text.title, {glyph: 'i'});
  }
};