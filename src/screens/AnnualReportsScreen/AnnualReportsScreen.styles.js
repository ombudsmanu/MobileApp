import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3) — each row runs largest to smallest
 *   Title Large  — screen title
 *   Title Medium — the year
 *   Body Small   — sub-lines
 *   Label Small  — "Open PDF" / "Not available"
 */
export const createStyles = theme =>
  StyleSheet.create({
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 48, height: 48},
    topTextWrap: {flex: 1},
    topTitle: {...theme.type.titleLarge, marginLeft: spacing.md},
    topSub: {...theme.type.bodySmall, marginLeft: spacing.md},

    scroll: {paddingHorizontal: spacing.lg},
    intro: {...theme.type.bodyMedium, marginBottom: spacing.sm},
    introRTL: {textAlign: 'right', writingDirection: 'rtl'},

    // ---- One report ----
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      padding: spacing.md,
      marginBottom: spacing.sm,
    },
    rowRTL: {flexDirection: 'row-reverse'},
    rowDisabled: {opacity: 0.55},
    // The shell casts the shadow; the gradient rounds ITSELF
    badgeShell: {
      width: 52,
      height: 52,
      borderRadius: 16,
      elevation: 3,
      shadowColor: '#000000',
      shadowOpacity: 0.18,
      shadowRadius: 5,
      shadowOffset: {width: 0, height: 2},
    },
    badge: {
      width: 52,
      height: 52,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowText: {flex: 1, alignItems: 'flex-start'},
    rowTextRTL: {alignItems: 'flex-end'},
    year: {...theme.type.titleMedium},
    reportLabel: {...theme.type.bodySmall},
    statusPill: {
      marginTop: 4,
      paddingHorizontal: 9,
      paddingVertical: 2,
      borderRadius: radii.pill,
      backgroundColor: 'rgba(212, 113, 28, 0.12)',
    },
    statusText: {...theme.type.labelSmall, color: theme.accent},
  });

export const createDynamicStyles = insets => ({
  topBarPad: {paddingTop: insets.top + spacing.sm},
  scrollPad: {paddingBottom: insets.bottom + spacing.xxl},
});

export const BACK_RADIUS = radii.md;

/** Teal, matching the module's badge on the Dashboard. */
export const REPORT_COLORS = ['#2FB5A8', '#157A71'];