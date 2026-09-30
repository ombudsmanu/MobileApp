import {StyleSheet} from 'react-native';
import {radii, spacing, typography} from '../../theme/tokens';

export const createStyles = theme =>
  StyleSheet.create({
    flex: {flex: 1},
    fillAbsolute: {...StyleSheet.absoluteFillObject},

    // ---- Top bar ----
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 44, height: 44},
    topTextWrap: {flex: 1, marginLeft: spacing.md},
    topTitle: {...typography.heading, color: theme.text.title},
    topSub: {...typography.caption, color: theme.text.muted, marginTop: 2},
    resetAllBtn: {paddingHorizontal: spacing.sm, paddingVertical: 6},
    resetAllText: {...typography.label, color: theme.danger},

    scroll: {paddingHorizontal: spacing.lg},

    // ---- Cards ----
    card: {padding: spacing.md, marginTop: spacing.md},
    cardTitle: {...typography.heading, color: theme.text.heading},
    cardSub: {...typography.caption, color: theme.text.muted, marginTop: 2},

    // ---- Preview ----
    previewTitle: {...typography.title, color: theme.text.title},
    previewHeading: {...typography.heading, color: theme.text.heading, marginTop: 4},
    previewBody: {...typography.body, color: theme.text.body, marginTop: 4},

    sectionTitle: {
      ...typography.label,
      color: theme.text.muted,
      marginTop: spacing.md,
      marginBottom: spacing.sm,
      textTransform: 'uppercase',
    },
    row: {flexDirection: 'row', flexWrap: 'wrap'},

    // ---- Chips ----
    chip: {
      paddingVertical: 9,
      paddingHorizontal: spacing.md,
      borderRadius: radii.pill,
      marginRight: spacing.sm,
      marginBottom: spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },
    chipActive: {backgroundColor: theme.accent, borderWidth: 1, borderColor: theme.accent},
    chipText: {...typography.label, color: theme.text.body},
    chipTextActive: {color: theme.text.onAccent},

    // ---- Swatches (all tiles share the same 42×42 size) ----
    swatch: {
      width: 42,
      height: 42,
      borderRadius: radii.sm,
      marginRight: spacing.sm,
      marginBottom: spacing.sm,
      borderWidth: 1,
      borderColor: theme.glass.border,
      alignItems: 'center',
      justifyContent: 'center',
    },
    swatchActive: {borderWidth: 3, borderColor: theme.accent},

    gradientSwatch: {
      width: 42,
      height: 42,
      borderRadius: radii.sm,
      marginRight: spacing.sm,
      marginBottom: spacing.sm,
      borderWidth: 1,
      borderColor: theme.glass.border,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
    },
    swatchTickDark: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: theme.accent,
      alignItems: 'center',
      justifyContent: 'center',
    },

    customSwatch: {
      width: 42,
      height: 42,
      borderRadius: radii.sm,
      marginRight: spacing.sm,
      marginBottom: spacing.sm,
      overflow: 'hidden',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    customPlus: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    customPlusText: {
      fontSize: 16,
      fontWeight: '800',
      lineHeight: 18,
      color: theme.text.heading,
    },

    // ---- Background image grid ----
    presetGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    presetTile: {
      width: '31.5%',
      aspectRatio: 0.66,
      borderRadius: radii.md,
      overflow: 'hidden',
      marginBottom: spacing.sm,
      borderWidth: 2,
      borderColor: theme.glass.border,
    },
    presetTileActive: {borderWidth: 3, borderColor: theme.accent},
    presetImage: {width: '100%', height: '100%'},
    presetTick: {
      position: 'absolute',
      top: 6,
      right: 6,
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: theme.accent,
      alignItems: 'center',
      justifyContent: 'center',
    },
    galleryTile: {width: '100%', height: '100%', borderRadius: 0},
    galleryLabel: {
      ...typography.caption,
      color: theme.text.heading,
      marginTop: 6,
      fontWeight: '700',
    },

    sectionResetBtn: {marginTop: spacing.sm},
  });

export const createDynamicStyles = insets => ({
  topBarPad: {paddingTop: insets.top + spacing.sm},
  scrollPad: {paddingBottom: insets.bottom + spacing.xxl},
});

export const CHIP_RADIUS = radii.pill;
export const BACK_RADIUS = radii.md;