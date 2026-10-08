import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3)
 *   Title Medium — screen title, document title
 *   Body Medium  — intro line
 *   Body Small   — document description
 * Buttons use GlassButton's own styling (VIEW = info blue, DOWNLOAD = green).
 */
export const DOWNLOAD_COLORS = ['#6C8FD6', '#3B5BA5'];

export const createStyles = theme =>
  StyleSheet.create({
    // ---- Header: [back] [title] [EN / اردو] ----
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 48, height: 48},
    topTextWrap: {flex: 1},
    topTitle: {...theme.type.titleMedium},

    scroll: {paddingHorizontal: spacing.lg},
        // Certification badges across the top of the screen
    topBadges: {marginBottom: spacing.md},
    intro: {...theme.type.bodyMedium, marginBottom: spacing.md},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},
    rowRTL: {flexDirection: 'row-reverse'},

    // ---- One document ----
    cardWrap: {marginBottom: spacing.sm},
    card: {padding: spacing.md},
    row: {flexDirection: 'row', alignItems: 'center', columnGap: spacing.md},
    // The shell casts the shadow; the gradient rounds ITSELF
    badgeShell: {
      width: 52,
      height: 52,
      borderRadius: 16,
      backgroundColor: DOWNLOAD_COLORS[1],
      boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.18)',
    },
    badge: {
      width: 52,
      height: 52,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    textBlock: {flex: 1, alignItems: 'flex-start'},
    textBlockRTL: {alignItems: 'flex-end'},
    title: {...theme.type.titleMedium},
    desc: {...theme.type.bodySmall, marginTop: 2},

    actions: {flexDirection: 'row', columnGap: spacing.sm, marginTop: spacing.md},
    action: {flex: 1},
  });

export const createDynamicStyles = insets => ({
  topBarPad: {paddingTop: insets.top + spacing.sm},
  scrollPad: {paddingBottom: insets.bottom + spacing.xxl},
});

export const BACK_RADIUS = radii.md;