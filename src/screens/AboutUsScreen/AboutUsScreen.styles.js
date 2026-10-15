import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3)
 *   Title Medium — "About Us", the banner title
 *   Label Small  — "SPECIAL SECTION"
 * The section cards use ModuleTile's own typography.
 *
 * Top bar: [back] [title — centred in the free space] [globe + language]
 */
export const createStyles = theme =>
  StyleSheet.create({
    // ---- Header ----
    // Left/right padding comes from createDynamicStyles (insets)
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 52, height: 52},
    // alignItems:'center' shrinks the title's box to the width of its own
    // words and centres it between the back button and the language button
    // — in BOTH languages, because a box that is exactly as wide as its
    // text has nothing for textAlign to push against.
    topTextWrap: {flex: 1, alignItems: 'center'},
    topTitle: {...theme.type.titleMedium},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},
    rowRTL: {flexDirection: 'row-reverse'},
    // Left/right padding comes from createDynamicStyles (insets).
    // The section cards are laid out by ResponsiveGrid.
    scroll: {paddingTop: spacing.sm},
    // Crest + Office name + certification badges across the top — the same
    // spacing as Register Complaint, Downloads and Annual Reports
    topBadges: {marginBottom: spacing.md},

    // ---- Special Section banner ----
    bannerPress: {marginTop: spacing.sm},
    bannerPressed: {opacity: 0.9, transform: [{scale: 0.98}]},
    // Colour comes from createBannerStyles; the gradient sits in-flow inside
    // it and rounds itself (on Android a gradient doesn't render inside a
    // parent that clips it)
    bannerShell: {
      borderRadius: radii.lg,
      elevation: 8,
      shadowColor: '#000000',
      shadowOpacity: 0.22,
      shadowRadius: 12,
      shadowOffset: {width: 0, height: 6},
    },
    banner: {
      borderRadius: radii.lg,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
    },
    bannerRow: {flexDirection: 'row', alignItems: 'center', columnGap: spacing.md},
    bannerIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
    },
    bannerText: {flex: 1, alignItems: 'flex-start'},
    bannerTextRTL: {alignItems: 'flex-end'},
    bannerLabel: {
      ...theme.type.labelSmall,
      color: 'rgba(255, 255, 255, 0.8)',
      textShadowRadius: 0,
    },
    // Letter spacing for the English label only — spacing out the letters
    // of a cursive script like Urdu breaks their joins
    bannerLabelSpaced: {letterSpacing: 1.2},
    bannerTitle: {
      ...theme.type.titleMedium,
      color: '#FFFFFF',
      marginTop: 2,
      textShadowRadius: 0,
    },
    bannerArrow: {
      width: 40,
      height: 40,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },
  });

/**
 * Space around the content. Left/right include the insets because in
 * landscape the camera notch and the 3-button navigation bar sit at the
 * sides — without them the cards would slide underneath.
 */
export const createDynamicStyles = insets => ({
  topBarPad: {
    paddingTop: insets.top + spacing.sm,
    paddingLeft: insets.left + spacing.lg,
    paddingRight: insets.right + spacing.lg,
  },
  scrollPad: {
    paddingBottom: insets.bottom + spacing.xxl,
    paddingLeft: insets.left + spacing.lg,
    paddingRight: insets.right + spacing.lg,
  },
});

/** The banner's colour — the featured section's own colour. */
export const createBannerStyles = color =>
  StyleSheet.create({
    shell: {backgroundColor: color},
  });

export const BACK_RADIUS = radii.md;