import {StyleSheet} from 'react-native';
import {fonts, radii, spacing} from '../../theme/tokens';

/**
 * Bold helpers that work whether or not the Poppins step was applied.
 * With Poppins, a weight is a separate FONT FILE on Android; without it,
 * fontWeight is the correct way to bold. Optional chaining picks the
 * right one automatically.
 */
const BOLD = fonts?.bold ? {fontFamily: fonts.bold} : {fontWeight: '700'};
const EXTRABOLD = fonts?.extrabold ? {fontFamily: fonts.extrabold} : {fontWeight: '800'};

/**
 * The two certifications shown on the splash. Add a third here and it
 * renders automatically — no JSX change.
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
    crestPanel: {
      width: 132,
      height: 132,
      marginBottom: spacing.xs,
      padding: spacing.xs,
    },
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
    // SUBHEADING · extra bold · brand green
    officeLine: {
      ...theme.type.subheading,
      ...EXTRABOLD,
      color: theme.brandGreen,
      textAlign: 'center',
      letterSpacing: 0.5,
    },
    officeDivider: {
      width: 40,
      height: 3,
      borderRadius: 2,
      backgroundColor: theme.accent,
      marginTop: spacing.xs,
      marginBottom: spacing.xs,
    },
    // HEADING
    welcome: {...theme.type.heading, textAlign: 'center', letterSpacing: 1},
    // TITLE — the biggest line
    orgName: {...theme.type.title, ...EXTRABOLD, textAlign: 'center', marginTop: 2},
    // SUBHEADING · bold · accent
    misLine: {
      ...theme.type.subheading,
      ...BOLD,
      color: theme.accent,
      textAlign: 'center',
      marginTop: spacing.xs,
    },
    opmisPill: {
      alignSelf: 'center',
      marginTop: spacing.sm,
      paddingVertical: 8,
      paddingHorizontal: spacing.xl,
      borderRadius: radii.pill,
      backgroundColor: theme.brandGreen,
    },
    opmisPillText: {
      ...theme.type.label,
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
    // CAPTION · accent
    certStandard: {...theme.type.caption, color: theme.accent, textAlign: 'center'},
    // SUBHEADING · bold
    certTitle: {...theme.type.subheading, ...BOLD, textAlign: 'center', marginTop: 1},
    // CAPTION · accent
    certNumber: {
      ...theme.type.caption,
      color: theme.accent,
      textAlign: 'center',
      marginTop: 1,
    },
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
    // SUBHEADING · extra bold
    swipeTitle: {...theme.type.subheading, ...EXTRABOLD, marginTop: spacing.xs},
    // CAPTION · accent · bold
    swipeSub: {...theme.type.caption, ...BOLD, color: theme.accent, marginTop: 1},

    // ---- Footer ----
    copyrightPill: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      marginTop: spacing.sm,
      alignSelf: 'center',
    },
    copyrightText: {...theme.type.caption, textAlign: 'center', lineHeight: 17},
    versionPill: {
      paddingVertical: 4,
      paddingHorizontal: spacing.md,
      marginTop: spacing.xs,
      marginBottom: spacing.md,
      alignSelf: 'center',
    },
    versionText: {...theme.type.label, color: theme.accent, letterSpacing: 1},
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