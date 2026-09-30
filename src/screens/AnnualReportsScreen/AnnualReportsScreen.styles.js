import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3) — each row runs largest to smallest
 *   Title Large  — screen title
 *   Title Medium — the year
 *   Body Small   — sub-lines
 *   Label Small  — "Open PDF" / "Not available"
 *
 * LAYOUT — the whole screen is one column, capped at COLUMN_MAX and centred.
 * On a phone the cap never bites (the screen is narrower), so it costs
 * nothing there; on a tablet or a foldable it stops the rows stretching into
 * very wide, mostly empty bands.
 */
const COLUMN_MAX = 560;

export const createStyles = theme =>
  StyleSheet.create({
    // ---- Header ----
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      width: '100%',
      maxWidth: COLUMN_MAX,
      alignSelf: 'center',
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 48, height: 48},
    topTextWrap: {flex: 1},
    topTitle: {...theme.type.titleLarge},
    topSub: {...theme.type.bodySmall},

    // ---- Scroll column ----
    scroll: {
      width: '100%',
      maxWidth: COLUMN_MAX,
      alignSelf: 'center',
      paddingHorizontal: spacing.lg,
    },
    intro: {...theme.type.bodyMedium, marginBottom: spacing.md},

    // Right-to-left text (Urdu). One style, used everywhere.
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},

    // ---- One report ----
    cardPress: {marginBottom: spacing.sm},
    cardPressed: {opacity: 0.85, transform: [{scale: 0.99}]},
    card: {padding: spacing.md},
    cardDisabled: {opacity: 0.55},

    row: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
    },
    rowRTL: {flexDirection: 'row-reverse'},

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

    rowText: {flex: 1, alignItems: 'flex-start', rowGap: 2},
    rowTextRTL: {alignItems: 'flex-end'},
    year: {...theme.type.titleMedium},
    reportLabel: {...theme.type.bodySmall},

    // Status pill and chevron sit together at the end of the row
    rowEnd: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.sm,
    },
    rowEndRTL: {flexDirection: 'row-reverse'},
    statusPill: {
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: radii.pill,
      backgroundColor: 'rgba(212, 113, 28, 0.12)',
    },
    statusPillMuted: {backgroundColor: 'rgba(120, 120, 120, 0.14)'},
    statusText: {...theme.type.labelSmall, color: theme.accent},
    statusTextMuted: {color: theme.text.muted},
  });

export const createDynamicStyles = insets => ({
  topBarPad: {paddingTop: insets.top + spacing.sm},
  scrollPad: {paddingBottom: insets.bottom + spacing.xxl},
});

export const BACK_RADIUS = radii.md;

/** Teal, matching the module's badge on the Dashboard. */
export const REPORT_COLORS = ['#2FB5A8', '#157A71'];
