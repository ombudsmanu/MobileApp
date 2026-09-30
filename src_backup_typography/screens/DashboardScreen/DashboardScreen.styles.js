import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/**
 * TYPOGRAPHY STANDARD
 *   Heading    — "OPMIS" in the top bar
 *   Subheading — module tile names
 *   Label      — "MODULES", language toggle
 *   Caption    — org name under OPMIS, "COMING SOON" (orange)
 * The slider's welcome text is fixed white — it sits on a photo.
 */
export const createStyles = theme =>
  StyleSheet.create({
    flex: {flex: 1},

    // ---- Top bar ----
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    menuBtn: {width: 48, height: 48},
    topTextWrap: {flex: 1, marginHorizontal: spacing.md},
    topTitle: {...theme.type.heading, letterSpacing: 0.5},
    topSub: {...theme.type.caption, marginTop: 2},

    // ---- Language toggle (EN | اردو) ----
    langToggle: {
      flexDirection: 'row',
      padding: 3,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fillStrong,
    },
    langOption: {
      paddingVertical: 6,
      paddingHorizontal: 12,
      borderRadius: radii.pill,
    },
    langOptionActive: {backgroundColor: theme.accent},
    langText: {...theme.type.label, color: theme.control.label, textShadowRadius: 0},
    langTextActive: {color: theme.text.onAccent},

    scroll: {paddingHorizontal: spacing.lg},

    // ---- Welcome overlay on the slider ----
    sliderOverlay: {
      position: 'absolute',
      left: spacing.md,
      right: spacing.md,
      bottom: spacing.lg,
    },
    sliderLabel: {
      ...theme.type.label,
      color: 'rgba(255, 255, 255, 0.85)',
      textShadowColor: 'rgba(0,0,0,0.5)',
      textShadowOffset: {width: 0, height: 1},
      textShadowRadius: 3,
    },
    sliderName: {
      ...theme.type.title,
      color: '#FFFFFF',
      marginTop: 2,
      textShadowColor: 'rgba(0,0,0,0.55)',
      textShadowOffset: {width: 0, height: 1},
      textShadowRadius: 4,
    },

    // ---- Section label ----
    sectionTitle: {
      ...theme.type.label,
      textTransform: 'uppercase',
      marginTop: spacing.xl,
      marginBottom: spacing.sm,
      alignSelf: 'flex-start',
      paddingVertical: 5,
      paddingHorizontal: spacing.sm,
      borderRadius: radii.pill,
      overflow: 'hidden',
      backgroundColor: theme.bgMode === 'image' ? theme.glass.fillStrong : 'transparent',
    },
    sectionTitleRTL: {alignSelf: 'flex-end'},

    // ---- Module tiles ----
    tileGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    tileGridRTL: {flexDirection: 'row-reverse'},
    tileOuter: {width: '48.5%', marginBottom: spacing.sm},
    tile: {
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.md,
      minHeight: 172,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      backgroundColor: theme.bgMode === 'image' ? theme.glass.fillStrong : theme.glass.fill,
      borderWidth: 1,
      borderColor: theme.glass.border,
      borderRadius: radii.lg,
    },
    tileRTL: {alignItems: 'flex-end'},
    tileDisabled: {opacity: 0.72},
    tileIcon: {
      width: 44,
      height: 44,
      borderRadius: radii.md,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
      backgroundColor: theme.isDarkBackground
        ? 'rgba(255, 255, 255, 0.10)'
        : 'rgba(232, 145, 58, 0.12)',
    },
    tileLabel: {...theme.type.subheading, lineHeight: 21},
    // Urdu glyphs are taller, so they need more line height
    tileLabelUrdu: {lineHeight: 30, textAlign: 'right', writingDirection: 'rtl'},
    tileSoon: {
      ...theme.type.caption,
      color: theme.accent,
      marginTop: 4,
      letterSpacing: 0.6,
    },

    rtlText: {textAlign: 'right', writingDirection: 'rtl'},
  });

export const createDynamicStyles = insets => ({
  topBarPad: {paddingTop: insets.top + spacing.sm},
  scrollPad: {paddingBottom: insets.bottom + spacing.xxl},
});

export const MENU_RADIUS = radii.md;