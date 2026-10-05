import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3) — each tile runs largest to smallest
 *   Title Medium — screen title, and the year (the headline of each tile)
 *   Body Small   — "Annual Report" under the year
 *   Label Small  — "Open PDF" / "Not available"
 *
 * LAYOUT — two tiles per row, in a column capped at COLUMN_MAX and centred,
 * so the grid does not stretch into very wide bands on a tablet.
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
    topTitle: {...theme.type.titleMedium},

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

    // ---- Grid ----
    // Years run newest-first in BOTH languages: the grid is not reversed
    // for Urdu, because reversing each row would put 2024 before 2025.
    grid: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'},
    // StaggerIn wraps each tile, so IT is the grid item and carries the width
    cardWrap: {width: '48.5%', marginBottom: spacing.sm},
  });

/**
 * One report tile, built from fixed rows so every tile lines up and the
 * pieces can never overlap:
 *
 *   EN  14 pad + badge 48 + 8 + year 26 + subtitle 26 + 6 + pill 30 + 14 = 172
 *   UR  the same, with the subtitle and pill slots taller — a Nastaleeq
 *       line needs about twice the height of a Latin one
 *
 * The Urdu tile is TALLER rather than its text SMALLER. Shrinking Urdu to
 * fit an English-sized slot made it unreadable and merged the dots on
 * letters like پ into the strokes.
 */
export const TILE = {
  height: 172,
  heightUrdu: 196,
  pad: 14,
  badge: 48,
  gap: 8,
  yearSlot: 26,
  subtitleSlot: 26,
  subtitleSlotUrdu: 36,
  pillSlot: 30,
  pillSlotUrdu: 38,
};

export const createTileStyles = theme =>
  StyleSheet.create({
    tile: {
      height: TILE.height,
      paddingVertical: TILE.pad,
      paddingHorizontal: spacing.sm,
      alignItems: 'center',
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
    tileUrdu: {height: TILE.heightUrdu},
    tileDisabled: {opacity: 0.55},
    // Thin colour accent along the top edge, inset to clear the corners
    tileAccent: {
      position: 'absolute',
      top: 0,
      left: 24,
      right: 24,
      height: 3,
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
    },

    // The shell casts the shadow; the gradient rounds ITSELF
    badgeShell: {
      width: TILE.badge,
      height: TILE.badge,
      borderRadius: 15,
      elevation: 4,
      shadowColor: '#000000',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: {width: 0, height: 3},
    },
    badge: {
      width: TILE.badge,
      height: TILE.badge,
      borderRadius: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Each slot is a fixed height with its text centred inside
    yearSlot: {
      height: TILE.yearSlot,
      marginTop: TILE.gap,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    year: {...theme.type.titleMedium, textAlign: 'center'},

    subtitleSlot: {height: TILE.subtitleSlot, alignSelf: 'stretch', justifyContent: 'center'},
    subtitleSlotUrdu: {height: TILE.subtitleSlotUrdu},
    subtitle: {...theme.type.bodySmall, textAlign: 'center'},

    pillSlot: {height: TILE.pillSlot, marginTop: 6, justifyContent: 'center'},
    pillSlotUrdu: {height: TILE.pillSlotUrdu},
    statusPill: {
      minHeight: TILE.pillSlot,
      paddingHorizontal: 10,
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