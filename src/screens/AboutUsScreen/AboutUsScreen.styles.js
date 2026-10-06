import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3)
 *   Title Medium — "About Us", the banner title, the Certifications heading
 *   Body Small   — certification caption
 *   Label Small  — "SPECIAL SECTION"
 * The section cards use ModuleTile's own typography.
 *
 * Top bar: [back] [title — takes the free space] [EN / اردو]
 */
export const createStyles = theme =>
  StyleSheet.create({
    // ---- Header ----
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 52, height: 52},
    topTextWrap: {flex: 1},
    topTitle: {...theme.type.titleMedium},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},
    rowRTL: {flexDirection: 'row-reverse'},

    scroll: {paddingHorizontal: spacing.lg, paddingTop: spacing.sm},

    // ---- Section cards ----
    grid: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'},
    gridRTL: {flexDirection: 'row-reverse'},

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
      display:'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
    },

    // ---- Certifications & Accreditation ----
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.sm,
      marginTop: spacing.lg,
      marginBottom: spacing.sm,
    },
    sectionBar: {width: 4, height: 20, borderRadius: 2, backgroundColor: theme.accent},
    sectionTitle: {...theme.type.titleMedium, flexShrink: 1},
    certCard: {padding: spacing.md},
    certCaptionRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: 6,
    },
    certCaption: {...theme.type.bodySmall},
       // Spacing only — the badge row's layout lives in CertificationBadges
    badgeRow: {marginTop: spacing.md},
  });

export const createDynamicStyles = insets => ({
  topBarPad: {paddingTop: insets.top + spacing.sm},
  scrollPad: {paddingBottom: insets.bottom + spacing.xxl},
});

/** The banner's colour — the featured section's own colour. */
export const createBannerStyles = color =>
  StyleSheet.create({
    shell: {backgroundColor: color},
  });

export const BACK_RADIUS = radii.md;