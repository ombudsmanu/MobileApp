import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';
import {sideGutters, READING_WIDTH} from '../../theme/responsive';

/**
 * TRACK STATUS — the one card that holds the crest, title, instruction,
 * number box and Track button. `accent` is the screen's colour: it tints the
 * title, the small box icon and the error line.
 */
export const createStyles = (theme, accent) =>
  StyleSheet.create({
    // ---- Header: [back] [title] [globe + language] ----
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 48, height: 48},
    topTextWrap: {flex: 1, alignItems: 'center'},
    topTitle: {...theme.type.titleMedium},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},

    // ---- The card ----
    card: {padding: spacing.lg, alignItems: 'center'},
    cardContent: {alignItems: 'center', alignSelf: 'stretch'},
    crest: {width: 96, height: 96, alignSelf: 'center', marginBottom: spacing.md},
    title: {
      ...theme.type.titleMedium,
      color: accent,
      textAlign: 'center',
      marginBottom: spacing.sm,
    },
    subtitle: {
      ...theme.type.bodyMedium,
      color: theme.text.muted,
      textAlign: 'center',
      marginBottom: spacing.lg,
    },

    // ---- The number box ----
    // minHeight guarantees a full line of room, so the placeholder is never clipped.
    field: {alignSelf: 'stretch', minHeight: 54},
    // Shared: vertical centring (Android sits the text too high otherwise)
    input: {textAlignVertical: 'center'},
    // English: icon on the LEFT, explicit Latin font. paddingRight is reset
    // to the normal gutter (GlassField reserves 68 for a trailing action, but
    // our icon is on the left) so the placeholder fits on one line.
    inputLTR: {
      paddingLeft: 40,
      paddingRight: spacing.md,
      textAlign: 'left',
      writingDirection: 'ltr',
      ...theme.inputType,
    },
    // Urdu: icon on the RIGHT, right-aligned, the app's Urdu font
    // (theme.urduFont). If the user chose "Urdu default" (null), the Latin
    // input font stays as the base.
    inputRTL: {
      paddingRight: 40,
      paddingLeft: spacing.md,
      textAlign: 'right',
      writingDirection: 'rtl',
      ...theme.inputType,
      ...(theme.urduFont ? {fontFamily: theme.urduFont} : null),
    },

    // The small box icon, on the left for English and the right for Urdu
    fieldIcon: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      alignItems: 'center',
      justifyContent: 'center',
    },
    fieldIconLTR: {left: spacing.sm},
    fieldIconRTL: {right: spacing.sm},

    error: {
      ...theme.type.bodySmall,
      color: theme.danger,
      alignSelf: 'stretch',
      marginTop: spacing.xs,
    },

    // ---- Track button ----
    trackBtn: {alignSelf: 'stretch', marginTop: spacing.lg},

    // ---- Certification logos ----
    badges: {marginTop: spacing.md},
  });

export const createDynamicStyles = (insets, width) => {
  const gutters = sideGutters(width, insets, READING_WIDTH);
  return {
    topBarPad: {paddingTop: insets.top + spacing.sm, ...gutters},
    scrollPad: {
      paddingTop: spacing.sm,
      paddingBottom: insets.bottom + spacing.xxl,
      ...gutters,
    },
  };
};

export const BACK_RADIUS = radii.md;