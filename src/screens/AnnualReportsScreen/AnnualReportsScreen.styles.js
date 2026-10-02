import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3) — each card runs largest to smallest
 *   Title Large  — screen title
 *   Title Medium — the year (the headline of each card)
 *   Body Small   — "Annual Report" under the year
 *   Label Small  — "Open PDF" / "Not available"
 *
 * LAYOUT — one card per row, in a column capped at COLUMN_MAX and centred,
 * so the cards do not stretch into very wide bands on a tablet.
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

    // StaggerIn wraps each card and carries the spacing between rows
    cardWrap: {marginBottom: spacing.sm},
  });

/**
 * One report card. A row, so each language gets the height its text needs:
 * the card grows for Nastaleeq's taller lines instead of clipping them.
 */
export const createTileStyles = theme =>
  StyleSheet.create({
    tile: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.md,
      backgroundColor: theme.glass.fillStrong,
      borderWidth: 1,
      borderColor: theme.glass.border,
      borderRadius: radii.lg,
      elevation: 6,
      shadowColor: theme.glass.shadow,
      shadowOpacity: 0.35,
      shadowRadius: 14,
      shadowOffset: {width: 0, height: 6},
    },
    tileDisabled: {opacity: 0.55},
    // Thin colour accent along the top edge, inset to clear the corners
    tileAccent: {
      position: 'absolute',
      top: 0,
      left: 28,
      right: 28,
      height: 3,
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
    },

    row: {flexDirection: 'row', alignItems: 'center', columnGap: spacing.md},
    rowRTL: {flexDirection: 'row-reverse'},

    // The shell casts the shadow; the gradient rounds ITSELF
    badgeShell: {
      width: 54,
      height: 54,
      borderRadius: 16,
      elevation: 4,
      shadowColor: '#000000',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: {width: 0, height: 3},
    },
    badge: {
      width: 54,
      height: 54,
      borderRadius: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // The year is the headline — English digits in both languages
    text: {flex: 1, alignItems: 'flex-start'},
    textRTLBlock: {alignItems: 'flex-end'},
    year: {...theme.type.titleMedium},
    subtitle: {...theme.type.bodySmall},
    subtitleRTL: {textAlign: 'right', writingDirection: 'rtl'},

    statusPill: {
      paddingHorizontal: 10,
      paddingVertical: 3,
      borderRadius: radii.pill,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(212, 113, 28, 0.12)',
    },
    statusPillMuted: {backgroundColor: 'rgba(120, 120, 120, 0.14)'},
    statusText: {...theme.type.labelSmall, color: theme.accent, textAlign: 'center'},
    statusTextMuted: {color: theme.text.muted},
  });

export const createDynamicStyles = insets => ({
  topBarPad: {paddingTop: insets.top + spacing.sm},
  scrollPad: {paddingBottom: insets.bottom + spacing.xxl},
});

export const BACK_RADIUS = radii.md;

/** Teal, matching the module's badge on the Dashboard. */
export const REPORT_COLORS = ['#2FB5A8', '#157A71'];