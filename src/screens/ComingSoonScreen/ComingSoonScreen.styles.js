import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';
import {sideGutters, FORM_WIDTH, READING_WIDTH} from '../../theme/responsive';

/**
 * TYPOGRAPHY (MD3)
 *   Title Large  — screen title
 *   Title Medium — "Coming soon" / "Access denied"
 *   Body Medium  — message
 */
export const createStyles = theme =>
  StyleSheet.create({
    flex: {flex: 1},

    // Left/right padding: createDynamicStyles
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: spacing.md,
    },
    backBtn: {width: 52, height: 52},
    topTitle: {...theme.type.titleLarge, flex: 1, marginLeft: spacing.md},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},

    // Centred when there is room; scrolls when there is not (landscape)
    content: {flexGrow: 1, justifyContent: 'center'},
    card: {paddingVertical: spacing.xl, paddingHorizontal: spacing.lg},
    inner: {alignItems: 'center'},

    iconRing: {
      width: 84,
      height: 84,
      borderRadius: 42,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.md,
      backgroundColor: 'rgba(232, 145, 58, 0.12)',
      borderWidth: 2,
      borderColor: 'rgba(232, 145, 58, 0.35)',
    },
    iconRingDenied: {
      backgroundColor: 'rgba(192, 57, 43, 0.10)',
      borderColor: 'rgba(192, 57, 43, 0.35)',
    },
    // Title Medium — same as every other card title in the app
    heading: {...theme.type.titleMedium, textAlign: 'center'},
    message: {...theme.type.bodyMedium, textAlign: 'center', marginTop: spacing.xs},
    backCta: {marginTop: spacing.lg, alignSelf: 'stretch'},
  });

/**
 * Top bar: the same centred column as the reading screens.
 * Card: a narrower centred column (FORM_WIDTH) — a single message card
 * looks lost when it is stretched across a tablet.
 */
export const createDynamicStyles = (insets, width) => ({
  topBarPad: {
    paddingTop: insets.top + spacing.sm,
    ...sideGutters(width, insets, READING_WIDTH),
  },
  contentPad: {
    paddingTop: spacing.sm,
    paddingBottom: insets.bottom + spacing.xl,
    ...sideGutters(width, insets, FORM_WIDTH),
  },
});

export const BACK_RADIUS = radii.md;