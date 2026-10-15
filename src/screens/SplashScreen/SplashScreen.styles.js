import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3)
 *   Headline Medium — "Ombudsman Punjab"
 *   Title Medium    — MIS line (accent), "Swipe up to proceed"
 *   Title Small     — office line (bold), certification titles
 *   Body Small      — certification numbers, copyright
 *   Label Large     — "WELCOME TO", OPMIS pill
 *   Label Medium/Small — "Continue to OPMIS App", version
 *
 * RESPONSIVE LAYOUT
 *   Portrait  — one column, spread from top to bottom. Capped at
 *               LAYOUT.columnMax so it does not stretch across a tablet.
 *   Landscape — two columns side by side, each capped at LAYOUT.sideMax:
 *               left  = crest + brand card
 *               right = certifications, swipe control, copyright + version
 *               Only when the window is at least LAYOUT.twoColumnMin wide,
 *               so a narrow split-screen window keeps the single column.
 *
 * FITTING — see useSplashFit.js. The splash never scrolls, so it always
 * shows the first of these that fits the screen:
 *   1. Full    — everything, as designed
 *   2. Compact — smaller crest; certification text hidden, the 4 logos stay
 *   3. Scaled  — compact, shrunk evenly (never below FIT.minScale)
 */
export const CERTIFICATIONS = [
  {
    key: 'iso27001',
    standard: 'ISO/IEC 27001:2022',
    title: 'INFORMATION SECURITY MANAGEMENT SYSTEM',
    number: 'Certification Number: PK26/00000111',
  },
  {
    key: 'iso9001',
    standard: 'ISO 9001:2015',
    title: 'QUALITY MANAGEMENT SYSTEM',
    number: 'Certification Number: PK25/00000138',
  },
];

export const LAYOUT = {
  columnMax: 520, // portrait column width cap (tablets)
  sideMax: 440, // each landscape column's width cap
  twoColumnMin: 600, // narrower than this, landscape keeps one column
  crest: 96,
  crestCompact: 72,
};

/**
 * SWIPE LINE — English and Urdu sit side by side, so they must look the
 * same size AND the same weight.
 *   Size   — Nastaleeq draws much taller than Latin at the same font size,
 *            so the Urdu gets a smaller number (AppText then adds ×1.1).
 *   Weight — Nastaleeq has only a regular weight (AppText never bolds it),
 *            so the English uses the regular weight too.
 */
export const SWIPE_EN_SIZE = 17;
export const SWIPE_UR_SIZE = 13;
export const SWIPE_EN_WEIGHT = 350;

export const FIT = {
  tolerance: 1, // dp — ignore sub-pixel differences
  // Scaling only happens on very small screens or the largest system font
  // sizes; there the text is already enlarged, so half size stays readable
  minScale: 0.5,
};

export const createStyles = theme =>
  StyleSheet.create({
    root: {flex: 1},

    // The layer that fades in and follows the drag. Its padding (status bar,
    // navigation bar, notch) comes from createDynamicStyles.
    content: {flex: 1},

    // The space the splash must fit inside. Centres the splash, which also
    // keeps a scaled-down splash exactly in the middle.
    viewport: {flex: 1, alignItems: 'center', justifyContent: 'center'},

    // Invisible copies, only measured — never seen, never touched
    measurer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      alignItems: 'center',
      opacity: 0,
    },
    // The visible splash stays hidden until it has been measured
    pending: {opacity: 0},

    // ---- Portrait: one column ----
    column: {
      width: '100%',
      maxWidth: LAYOUT.columnMax,
      alignItems: 'center',
      justifyContent: 'space-between',
    },


    // ---- Landscape: two columns ----
    row: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'center',
      columnGap: spacing.lg,
    },
    side: {
      flex: 1,
      maxWidth: LAYOUT.sideMax,
      alignItems: 'center',
      justifyContent: 'space-evenly',
    },

    // ---- Crest — sits directly on the background (it has a transparent
    // background, so it needs no card behind it) ----
    crest: {
      width: LAYOUT.crest,
      height: LAYOUT.crest,
      resizeMode: 'contain',
      marginBottom: spacing.xs,
    },
    crestCompact: {
      width: LAYOUT.crestCompact,
      height: LAYOUT.crestCompact,
      resizeMode: 'contain',
      marginBottom: spacing.xs,
    },

    // ---- Brand card (the card itself is the shared BrandCard) ----
    brandCard: {marginTop: spacing.xs},

    // ---- Certifications ----
    qmsPanel: {
      paddingVertical: spacing.xs,
      paddingHorizontal: spacing.md,
      alignSelf: 'stretch',
      alignItems: 'center',
      marginTop: spacing.xs,
    },
    certBlock: {alignItems: 'center', marginBottom: 2},
    // Body Small · accent — same size as the number line
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
    // The arrow bounces UP by |hintTravel| (10dp). The gap above it is that
    // bounce plus 12dp, so even at the top of a bounce the circle stays
    // clear of the certifications card instead of riding over it.
    swipeWrap: {
      alignItems: 'center',
      marginTop: spacing.sm + Math.abs(animationConfig.hintTravel),
    },
    swipeCircle: {width:50, height: 50},
    // English and Urdu sit side by side on one line
    swipeLine: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      flexWrap: 'wrap',
      marginTop: 4,
    },
    // English invitation — regular weight (not Title Medium's semi-bold) so
    // it looks as light as the Urdu beside it, which is always regular
    swipeTitle: {
      ...theme.type.titleMedium,
      fontSize: SWIPE_EN_SIZE,
      ...theme.weight(SWIPE_EN_WEIGHT),
    },
    // The dot between the English and Urdu invitations
    swipeDot: {...theme.type.titleMedium, color: theme.accent, marginHorizontal: spacing.xs},
    // Urdu invitation beside the English one. AppText gives it the
    // Nastaleeq font and enlarges it ×1.1, and Nastaleeq letters are much
    // taller than Latin ones at the same size — so at the English size the
    // Urdu looked far bigger. A smaller base size makes the two read as
    // one line of equal weight.
    swipeUrdu: {
      ...theme.type.titleMedium,
      fontSize: SWIPE_UR_SIZE,
      lineHeight: SWIPE_UR_SIZE + 6,
      textAlign: 'center',
    },
    // "Continue to OPMIS App" — a small gap below the English/Urdu line so
    // the two lines don't touch (the Nastaleeq line is tall and sits close)
    swipeSub: {
      ...theme.type.labelMedium,
      color: theme.accent,
      textAlign: 'center',
      marginTop: spacing.sm,
    },
    // ---- Footer: copyright + version stay together ----
    footer: {alignItems: 'center'},
    copyrightPill: {
      paddingVertical: 4,
      paddingHorizontal: spacing.md,
      marginTop: spacing.xs,
      alignSelf: 'center',
    },
    copyrightText: {...theme.type.bodySmall, textAlign: 'center'},
    versionPill: {
      paddingVertical: 4,
      paddingHorizontal: spacing.md,
      marginTop: 4,
      alignSelf: 'center',
    },
    versionText: {...theme.type.labelSmall, color: theme.accent, letterSpacing: 1},
  });

/**
 * Padding that keeps the splash clear of the status bar, the navigation
 * bar and any notch. Left/right matter in landscape, where the camera
 * cutout and the 3-button navigation bar move to the sides.
 */
export const createDynamicStyles = insets => ({
  contentPadding: {
    paddingTop: insets.top + spacing.sm,
    paddingBottom: insets.bottom + spacing.xs,
    paddingLeft: insets.left + spacing.lg,
    paddingRight: insets.right + spacing.lg,
  },
});

/**
 * The visible splash: at least as tall as the viewport, so the column can
 * spread its parts from top to bottom, and scaled down only when even the
 * compact version does not fit (scale is then below 1).
 */
export const createFitStyles = (viewportHeight, scale) => ({
  shown: {minHeight: viewportHeight, transform: [{scale}]},
});

export const PANEL_RADIUS = radii.xl;
export const HINT_RADIUS = radii.pill;

export const animationConfig = {
  swipeDistanceThreshold: 300,
  // On a short screen (landscape) 300dp is most of the screen, so the
  // distance needed is also capped at this share of the screen height
  swipeDistanceShare: 0.3,
  swipeVelocityThreshold: -0.45,
  gestureClaimThreshold: -6,
  downwardResistance: 0.22,
  exitStiffness: 90,
  exitDamping: 20,
  snapStiffness: 180,
  snapDamping: 22,
    // Quick, gentle entrance — the intro hands off while its crest is still
  // on screen, so this screen must be PRESENT on arrival, not fading up from
  // a blank background. 260 ms reads as a soft settle, not an empty gap.
  // (Was 750 ms, which left the screen looking blank right after the intro.)
  fadeInDuration: 260,
  fadeInOffset: 14,
  hintLoopDuration: 900,
  hintTravel: -10,
  hintOpacityRange: [0.55, 1],
  dragFadeDistance: 260,
};