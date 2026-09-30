import {StyleSheet} from 'react-native';
import {radii, spacing, weight} from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3)
 *   Headline Medium — "Ombudsman Punjab"
 *   Title Medium    — MIS line (accent), "Swipe Up To Proceed"
 *   Title Small     — office line (bold), certification titles
 *   Body Small      — certification numbers, copyright
 *   Label Large     — "WELCOME TO", OPMIS pill
 *   Label Medium/Small — "Continue to OPMIS", standards, version
 */
export const CERTIFICATIONS = [
  {
    key: 'iso27001',
    standard: 'ISO/IEC 27001:2022',
    title: 'Information Security Management System',
    number: 'Certification Number: PK26/00000111',
  },
  {
    key: 'iso9001',
    standard: 'ISO 9001:2015',
    title: 'QUALITY MANAGEMENT SYSTEM',
    number: 'Certification Number: PK25/00000138',
  },
];

export const createStyles = theme =>
  StyleSheet.create({
    root: {flex: 1},
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
    },

    // ---- Crest ----
    crestPanel: {width: 132, height: 132, marginBottom: spacing.xs, padding: spacing.xs},
    crestPlate: {
      width: 120,
      height: 120,
      borderRadius: radii.lg,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    crestImage: {width: 112, height: 112, resizeMode: 'contain'},

    // ---- Brand card ----
    brandCard: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      marginTop: spacing.xs,
      alignItems: 'center',
      alignSelf: 'stretch',
    },
    officeLine: {
      ...theme.type.titleSmall,
      ...weight(800),
      textAlign: 'center',
      letterSpacing: 1,
    },
        welcome: {...theme.type.labelLarge, textAlign: 'center', letterSpacing: 2, marginTop: 2},
    officeDivider: {
      width: 40,
      height: 3,
      borderRadius: 2,
      backgroundColor: theme.accent,
      marginVertical: spacing.sm,
    },
        // Headline Medium at Black weight with tighter tracking — the brand
    // name is the one place on the splash that should feel heaviest
    orgName: {
      ...theme.type.headlineMedium,
      ...weight(900),
      letterSpacing: -0.3,
      textAlign: 'center',
    },
    misLine: {
      ...theme.type.titleMedium,
      color: theme.accent,
      textAlign: 'center',
      marginTop: 2,
    },
    opmisPill: {
      alignSelf: 'center',
      marginTop: spacing.sm,
      paddingVertical: 8,
      paddingHorizontal: spacing.xl,
      borderRadius: radii.pill,
      // Fixed brand green — theme.brandGreen turns pale on dark backgrounds
      backgroundColor: '#326B38',    },
    opmisPillText: {
      ...theme.type.labelLarge,
      color: '#FFFFFF',
      letterSpacing: 3,
      textShadowRadius: 0,
    },

    // ---- Certifications ----
    qmsPanel: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      alignSelf: 'stretch',
      alignItems: 'center',
      marginTop: spacing.sm,
    },
    certBlock: {alignItems: 'center', marginBottom: spacing.xs},
        // Body Small · accent — same size as the number line (14 → 12 → 12)
    certStandard: {
      ...theme.type.bodySmall,
      color: theme.accent,
      textAlign: 'center',
      marginTop: 1,
    },
    certTitle: {...theme.type.titleSmall, textAlign: 'center'},
    certNumber: {...theme.type.bodySmall, color: theme.accent, textAlign: 'center'},
    qmsDivider: {
      height: 1,
      alignSelf: 'stretch',
      backgroundColor: theme.glass.rim,
      marginTop: spacing.xs,
      marginBottom: spacing.sm,
    },
    qmsLogoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      alignSelf: 'stretch',
    },
    qmsLogo: {width: 48, height: 38, resizeMode: 'contain'},

    // ---- Swipe control ----
    swipeWrap: {alignItems: 'center', marginTop: spacing.sm},
    swipeCircle: {width: 56, height: 56},
    swipeTitle: {...theme.type.titleMedium, marginTop: spacing.xs},
    swipeSub: {...theme.type.labelMedium, color: theme.accent},

    // ---- Footer ----
    copyrightPill: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      marginTop: spacing.sm,
      alignSelf: 'center',
    },
    copyrightText: {...theme.type.bodySmall, textAlign: 'center'},
    versionPill: {
      paddingVertical: 4,
      paddingHorizontal: spacing.md,
      marginTop: spacing.xs,
      marginBottom: spacing.md,
      alignSelf: 'center',
    },
    versionText: {...theme.type.labelSmall, color: theme.accent, letterSpacing: 1},
  });

export const createDynamicStyles = insets => ({
  contentPadding: {
    paddingTop: insets.top + spacing.lg,
    paddingBottom: insets.bottom + spacing.md,
  },
});

export const PANEL_RADIUS = radii.xl;
export const HINT_RADIUS = radii.pill;
export const CREST_RADIUS = radii.xl;

export const animationConfig = {
  swipeDistanceThreshold: 300,
  swipeVelocityThreshold: -0.45,
  gestureClaimThreshold: -6,
  downwardResistance: 0.22,
  exitStiffness: 90,
  exitDamping: 20,
  snapStiffness: 180,
  snapDamping: 22,
  fadeInDuration: 750,
  fadeInOffset: 24,
  hintLoopDuration: 900,
  hintTravel: -10,
  hintOpacityRange: [0.55, 1],
  dragFadeDistance: 260,
};