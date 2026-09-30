import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

export const createStyles = theme =>
  StyleSheet.create({
    flex: {flex: 1},
    fillAbsolute: {...StyleSheet.absoluteFillObject},

    // ---- Top bar: equal side slots keep the title truly centred ----
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 44, height: 44},
    topTextWrap: {flex: 1, alignItems: 'center'},
    topTitle: {...theme.type.title, textAlign: 'center'},
    topSub: {...theme.type.caption, textAlign: 'center', marginTop: 2},
      sideSlot: {width: 96},
    sideSlotEnd: {width: 96, alignItems: 'flex-end'},
     // ---- Language toggle (replaces RESET ALL in the top bar) ----
    langToggle: {
      flexDirection: 'row',
      padding: 3,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fillStrong,
    },
    langOption: {paddingVertical: 6, paddingHorizontal: 11, borderRadius: radii.pill},
    langOptionActive: {backgroundColor: theme.accent},
    langText: {...theme.type.label, color: theme.control.label, textShadowRadius: 0},
    langTextActive: {color: theme.text.onAccent},

    scroll: {paddingHorizontal: spacing.lg},

    // ---- Cards ----
    card: {padding: spacing.md, marginTop: spacing.md},
    cardTitle: {...theme.type.heading, textAlign: 'center'},
    cardSub: {...theme.type.caption, textAlign: 'center', marginTop: 2},

    // ---- Preview ----
    previewTitle: {...theme.type.title, textAlign: 'center'},
    previewHeading: {...theme.type.heading, textAlign: 'center', marginTop: 6},
    previewSubheading: {...theme.type.subheading, textAlign: 'center', marginTop: 4},
    previewBody: {...theme.type.body, textAlign: 'center', marginTop: 4},
    previewCaption: {...theme.type.caption, textAlign: 'center', marginTop: spacing.sm},

    sectionTitle: {
      ...theme.type.label,
      textTransform: 'uppercase',
      textAlign: 'center',
      marginTop: spacing.md,
      marginBottom: spacing.sm,
    },
    // Symmetric margins so wrapped rows centre evenly
    row: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'},

    // ---- Chips ----
    chip: {
      paddingVertical: 9,
      paddingHorizontal: spacing.md,
      borderRadius: radii.pill,
      marginHorizontal: 4,
      marginBottom: spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },
    chipActive: {backgroundColor: theme.accent, borderWidth: 1, borderColor: theme.accent},
    chipText: {...theme.type.label, color: theme.control.label, textShadowRadius: 0},
    chipTextActive: {color: theme.text.onAccent},

    // ---- Swatches ----
    swatch: {
      width: 42,
      height: 42,
      borderRadius: radii.sm,
      marginHorizontal: 5,
      marginBottom: 10,
      borderWidth: 1,
      borderColor: theme.glass.border,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    swatchActive: {borderWidth: 3, borderColor: theme.accent},
    swatchTick: {
      width: 22,
      height: 22,
      borderRadius: 11,
      backgroundColor: theme.accent,
      alignItems: 'center',
      justifyContent: 'center',
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
      ...theme.type.heading,
      fontSize: 16,
      lineHeight: 18,
      color: '#2F4A33',
      textShadowRadius: 0,
    },

    // ---- Wallpaper grid ----
    presetGrid: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'},
    presetTile: {
      width: '30%',
      marginHorizontal: '1.5%',
      aspectRatio: 0.56,
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
      ...theme.type.caption,
      color: theme.control.label,
      textAlign: 'center',
      marginTop: 6,
    },

    // ---- Buttons: compact and centred ----
    sectionResetBtn: {
      marginTop: spacing.sm,
      alignSelf: 'center',
      paddingVertical: 9,
      paddingHorizontal: spacing.lg,
      minHeight: 0,
    },
    applyStatus: {
      ...theme.type.caption,
      textAlign: 'center',
      marginTop: spacing.md,
      marginBottom: spacing.xs,
    },
    applyStatusDirty: {color: theme.accent},
    applyRow: {flexDirection: 'row', justifyContent: 'center'},
    applyBtn: {paddingVertical: 9, paddingHorizontal: spacing.md, minHeight: 0},
    applyGap: {marginLeft: spacing.sm},
  });

export const createDynamicStyles = insets => ({
  topBarPad: {paddingTop: insets.top + spacing.sm},
  scrollPad: {paddingBottom: insets.bottom + spacing.xxl},
});

export const CHIP_RADIUS = radii.pill;
export const BACK_RADIUS = radii.md;