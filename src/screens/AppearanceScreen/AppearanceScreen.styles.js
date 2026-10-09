import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';
import {sideGutters, READING_WIDTH} from '../../theme/responsive';
/**
 * TYPOGRAPHY (MD3)
 *   Title Large  — "Appearance"
 *   Title Medium — card titles
 *   Body Small   — sub-lines, status line
 *   Label Large  — chips
 *   Label Medium — section labels, language toggle
 */
export const createStyles = theme =>
  StyleSheet.create({
    flex: {flex: 1},
    fillAbsolute: {...StyleSheet.absoluteFillObject},

    // ---- Top bar ----
       // Left/right padding: createDynamicStyles (centred column)
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: spacing.md,
    },
    // Left: the back button. At run time it is made exactly as wide as the
    // right slot (createSideStyles), so the title sits in the true centre.
    sideSlot: {minWidth: 52},
    // Right: the language toggle at its natural width — measured, never
    // squeezed (a fixed 96 was narrower than the toggle, which then spilled
    // over the title; a wide font like Poppins made the clash visible)
    sideSlotEnd: {alignItems: 'flex-end'},
    backBtn: {width: 52, height: 52},
    // Small inner padding so the title never touches either slot
    topTextWrap: {flex: 1, alignItems: 'center', paddingHorizontal: spacing.xs},
    topTitle: {...theme.type.titleLarge, textAlign: 'center'},
    topSub: {...theme.type.bodySmall, textAlign: 'center'},

    // ---- Language toggle ----
        langToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 3,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fillStrong,
    },
    // Fixed height + centred content: EN and اردو line up even though
    // Nastaleeq needs a taller line than Latin text
    langOption: {
      height: 30,
      minWidth: 44,
      paddingHorizontal: 11,
      borderRadius: radii.pill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    langOptionActive: {backgroundColor: theme.accent},
    langText: {...theme.type.labelMedium, color: theme.control.label, textShadowRadius: 0},
    langTextActive: {color: theme.text.onAccent},


    // ---- Cards ----
    card: {padding: spacing.md, marginTop: spacing.md},
    cardTitle: {...theme.type.titleMedium, textAlign: 'center'},
    cardSub: {...theme.type.bodySmall, textAlign: 'center'},

    // ---- Preview: one line per family ----
    previewHeadline: {...theme.type.headlineSmall, textAlign: 'center'},
    previewTitle: {...theme.type.titleMedium, textAlign: 'center', marginTop: 4},
    previewBody: {...theme.type.bodyMedium, textAlign: 'center', marginTop: 4},
    previewLabel: {...theme.type.labelMedium, textAlign: 'center', marginTop: spacing.sm},

    sectionTitle: {
      ...theme.type.labelMedium,
      textTransform: 'uppercase',
      textAlign: 'center',
      marginTop: spacing.md,
      marginBottom: spacing.sm,
    },
    row: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center'},

    // ---- Chips (controls) ----
    chip: {
      paddingVertical: 8,
      paddingHorizontal: spacing.md,
      borderRadius: radii.pill,
      marginHorizontal: 4,
      marginBottom: spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
    },
    chipActive: {backgroundColor: theme.accent, borderWidth: 1, borderColor: theme.accent},
    chipText: {...theme.type.labelLarge, color: theme.control.label, textShadowRadius: 0},
    chipTextActive: {color: theme.text.onAccent},

    // ---- Plain colour swatches ----
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

    // ---- Gradient tiles ("+" and default) ----
    // Same size and spacing as a swatch, but NO border and NO overflow:hidden:
    // on Android a gradient won't render inside a parent that clips it, so the
    // gradient rounds itself and the border is a separate layer on top.
    gradientTile: {width: 42, height: 42, marginHorizontal: 5, marginBottom: 10},
    tileFill: {...StyleSheet.absoluteFillObject, borderRadius: radii.sm},
    tileBorder: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: radii.sm,
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    tileBorderActive: {borderWidth: 3, borderColor: theme.accent},
    // Touch layer over a tile
    swatchPress: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
    },
    customPlus: {
      width: 24,
      height: 24,
      borderRadius: 12,
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
      shadowColor: '#000000',
      shadowOpacity: 0.2,
      shadowRadius: 3,
      shadowOffset: {width: 0, height: 1},
    },
    customPlusText: {
      ...theme.type.titleMedium,
      lineHeight: 20,
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
      ...theme.type.labelMedium,
      color: theme.control.label,
      textAlign: 'center',
      marginTop: 6,
    },

    // ---- Buttons ----
    sectionResetBtn: {
      marginTop: spacing.sm,
      alignSelf: 'center',
      paddingVertical: 9,
      paddingHorizontal: spacing.lg,
      minHeight: 0,
    },
    applyStatus: {
      ...theme.type.bodySmall,
      textAlign: 'center',
      marginTop: spacing.md,
      marginBottom: spacing.xs,
    },
    applyStatusDirty: {color: theme.accent},
    applyRow: {flexDirection: 'row', justifyContent: 'center'},
    applyBtn: {paddingVertical: 9, paddingHorizontal: spacing.md, minHeight: 0},
    applyGap: {marginLeft: spacing.sm},
        // Inactive chip — a plain View in the PREVIEW theme's colours
    chipIdle: {
      backgroundColor: theme.glass.fillStrong,
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    // "The first tile returns to the official default"
    tileHint: {
      ...theme.type.bodySmall,
      textAlign: 'center',
      marginTop: -spacing.xs,
      marginBottom: spacing.sm,
    },
  });

/**
 * Space around the content. On a phone held upright: the usual side
 * padding. On a tablet or in landscape: a centred column no wider than
 * READING_WIDTH, and always clear of the notch and side navigation bar.
 */
export const createDynamicStyles = (insets, width) => {
  const gutters = sideGutters(width, insets, READING_WIDTH);
  return {
    topBarPad: {paddingTop: insets.top + spacing.sm, ...gutters},
    scrollPad: {paddingBottom: insets.bottom + spacing.xxl, ...gutters},
  };
};

/**
 * Equal side slots in the top bar: the left one gets the width the
 * language toggle actually measured on screen. Equal slots keep the title
 * centred, and since neither slot is narrower than what it holds, nothing
 * can spill over the title — whatever font or language is chosen.
 */
export const createSideStyles = toggleWidth => ({
  slot: toggleWidth > 0 ? {width: toggleWidth} : null,
});

export const CHIP_RADIUS = radii.pill;
export const BACK_RADIUS = radii.md;