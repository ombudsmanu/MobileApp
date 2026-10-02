import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/** Delay between each card's entrance, in milliseconds. */
export const TILE_STAGGER_MS = 90;

/**
 * LAYOUT — every card is built from the same fixed pieces, so badges and
 * names line up across a row whatever the label says:
 *
 *   badge 56 + gap 12 + name slot 48 = 116, centred in a 200 card
 *   (42 above, 42 below)
 *
 *   The "coming soon" pill (24 tall) sits in the space below, 12 from the
 *   bottom edge. It is positioned on its own, so showing it never pushes the
 *   badge up — a card with the pill lines up with its neighbour without.
 *
 * NAME SLOT (48) fits either language at the same height:
 *   English — up to 2 lines × 22 = 44
 *   Urdu    — 1 line × 44 (AppText doubles Nastaleeq line height); a long
 *             Urdu name shrinks slightly to stay on one line
 * The name is centred inside its slot, so a one-line name sits on the
 * card's centre line instead of hanging under the badge.
 */
export const TILE = {
  height: 210,
  badge: 56,
  gap: 12,
  nameSlot: 60,
  pillHeight: 30,
  pillBottom: 12,
};

export const createStyles = theme =>
  StyleSheet.create({
    tileOuter: {width: '48.5%', marginBottom: spacing.sm},
    tile: {
      height: TILE.height,
      paddingHorizontal: spacing.sm,
      alignItems: 'center',
      justifyContent: 'center',
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
      borderRadius: 18,
      elevation: 4,
      shadowColor: '#000000',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: {width: 0, height: 3},
    },
    badge: {
      width: TILE.badge,
      height: TILE.badge,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },

    // Fixed height, text centred inside — same box for EN and UR
    nameSlot: {
      height: TILE.nameSlot,
      marginTop: TILE.gap,
      alignSelf: 'stretch',
      justifyContent: 'center',
    },
    tileLabel: {...theme.type.titleMedium, lineHeight: 22, textAlign: 'center'},
    // AppText sets the Nastaleeq font, size and line height; this only keeps
    // the line centred under the badge
    tileLabelUrdu: {textAlign: 'center', writingDirection: 'rtl'},

    // "Coming soon" — docked to the bottom on its own, outside the centred group
    pillDock: {
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: TILE.pillBottom,
      alignItems: 'center',
    },
    soonPill: {
      minHeight: TILE.pillHeight,
      paddingHorizontal: 10,
      borderRadius: radii.pill,
      backgroundColor: 'rgba(212, 113, 28, 0.12)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tileSoon: {...theme.type.labelSmall, color: theme.accent, textAlign: 'center'},
  });