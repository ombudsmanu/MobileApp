import {StyleSheet} from 'react-native';
import {radii, spacing, typography} from '../../theme/tokens';

export const createStyles = theme =>
  StyleSheet.create({
    root: {flex: 1},
    content: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: spacing.lg,
    },

    crestPanel: {width: 118, height: 118, marginBottom: spacing.md},
    crestText: {fontSize: 26, fontWeight: '800', letterSpacing: 2, color: theme.text.title},
    crestImage: {width: 92, height: 92, resizeMode: 'contain'},

    officeLine: {
      ...typography.heading,
      fontSize: 15,
      color: theme.text.title,
      textAlign: 'center',
      letterSpacing: 0.8,
    },

    welcome: {
      ...typography.title,
      color: theme.text.heading,
      textAlign: 'center',
      marginTop: spacing.lg,
      letterSpacing: 1.2,
    },

    opmisPanel: {
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
      marginTop: spacing.md,
      alignItems: 'center',
      alignSelf: 'stretch',
    },
    opmisText: {
      ...typography.heading,
      fontSize: 17,
      color: theme.text.title,
      textAlign: 'center',
      lineHeight: 26,
    },

    footerPanel: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
      alignSelf: 'stretch',
    },
    copyright: {
      ...typography.caption,
      color: theme.text.body,
      textAlign: 'center',
      lineHeight: 17,
    },
    version: {
      ...typography.caption,
      color: theme.text.muted,
      marginTop: spacing.sm,
      letterSpacing: 1,
    },

    hintPill: {
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      alignItems: 'center',
      marginTop: spacing.md,
    },
    hintText: {...typography.label, color: theme.text.muted, marginTop: 4},
        crestPanel: {
      width: 182,
      height: 182,
      marginBottom: spacing.md,
      padding: spacing.sm,
    },
    crestImage: {
      width: 154,
      height: 154,
      resizeMode: 'contain',
    },
        crestPlate: {
      width: 162,
      height: 162,
      borderRadius: radii.lg,
      backgroundColor: 'rgba(255, 255, 255, 0.92)',
      alignItems: 'center',
      justifyContent: 'center',
    },
        qmsPanel: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      alignSelf: 'stretch',
      alignItems: 'center',
      marginTop: spacing.md,
    },
    qmsTitle: {
      ...typography.label,
      fontSize: 12,
      color: theme.text.title,
      letterSpacing: 1.2,
      textAlign: 'center',
    },
    qmsSub: {
      ...typography.caption,
      color: theme.text.muted,
      marginTop: 3,
      textAlign: 'center',
    },
    qmsLogoRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      alignSelf: 'stretch',
      marginTop: spacing.sm,
      paddingHorizontal: spacing.xs,
    },
    qmsLogo: {
      width: 62,
      height: 46,
      resizeMode: 'contain',
    },
    qmsDivider: {
      height: 1,
      alignSelf: 'stretch',
      backgroundColor: theme.glass.rim,
      marginTop: spacing.sm,
      marginBottom: spacing.xs,
    },
    qmsCert: {
      ...typography.label,
      fontSize: 12,
      color: theme.accent,
      textAlign: 'center',
    },

    copyrightText: {
      ...typography.caption,
      color: theme.text.body,
      textAlign: 'center',
      lineHeight: 17,
    },
    versionPill: {
      paddingVertical: 5,
      paddingHorizontal: spacing.md,
      marginTop: spacing.sm,
     marginBottom: spacing.xxl,

      alignSelf: 'center',
    },
    versionText: {
      ...typography.caption,
      fontSize: 10,
      color: theme.accent,
      letterSpacing: 1,
      fontWeight: '700',
    },
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
  // Commit thresholds — more forgiving than before
  swipeDistanceThreshold: 300,
  swipeVelocityThreshold: -0.45,
  gestureClaimThreshold: -6,

  // Downward rubber-band resistance (0.12 = very stiff)
  downwardResistance: 0.22,

  // Exit
  exitStiffness: 90,
  exitDamping: 20,

  // Snap-back
  snapStiffness: 180,
  snapDamping: 22,

  // Entrance
  fadeInDuration: 750,
  fadeInOffset: 24,

  // Hint pulse
  hintLoopDuration: 900,
  hintTravel: -10,
  hintOpacityRange: [0.55, 1],

  // How far the drag travels before content fully fades
  dragFadeDistance: 260,
};