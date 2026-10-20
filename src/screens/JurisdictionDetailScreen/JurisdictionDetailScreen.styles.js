import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';
import {sideGutters, READING_WIDTH} from '../../theme/responsive';

/**
 * The palette the ICON-CARD badges cycle through — green, blue, orange,
 * pink, purple, teal — each a [light, deep] gradient pair. A card's colour
 * is picked by its position (index % length). Used by What We Can Do, How
 * We Do and What We Can Not Do.
 */
export const CARD_COLORS = [
  ['#43A35A', '#1F6B33'], // green
  ['#4A90D9', '#1F5C9E'], // blue
  ['#F2A04C', '#D4711C'], // orange
  ['#E86A9A', '#B83A6B'], // pink
  ['#9B6FD6', '#5B3AA0'], // purple
  ['#2FB5A8', '#157A71'], // teal
];

export const createStyles = theme =>
  StyleSheet.create({
    // ---- Top bar ----
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 52, height: 52},
    topTextWrap: {flex: 1, alignItems: 'center'},
    topTitle: {...theme.type.titleMedium},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},

    scroll: {paddingTop: spacing.xs},
    topBadges: {marginBottom: spacing.md},

    // ---- Centred page title (icon cards layout only) ----
    titleWrap: {alignItems: 'center', marginBottom: spacing.md},
    titleBadgeShell: {
      width: 56,
      height: 56,
      borderRadius: 18,
      marginBottom: spacing.sm,
      elevation: 4,
      shadowColor: '#000000',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: {width: 0, height: 3},
    },
    titleBadge: {
      width: 56,
      height: 56,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    pageTitle: {...theme.type.titleLarge, color: theme.text.title, textAlign: 'center'},
    titleRule: {width: 48, height: 3, borderRadius: 2, marginTop: spacing.sm},

    // ---- Text-card wrapper (Mandate: one card per heading) ----
    cardWrap: {marginBottom: spacing.md},

    langNote: {
      ...theme.type.bodySmall,
      textAlign: 'center',
      marginBottom: spacing.sm,
    },

    // ---- No content yet ----
    soonCard: {padding: spacing.lg, marginTop: spacing.md},
    soonText: {...theme.type.bodyMedium, textAlign: 'center'},
  });

/**
 * TEXT-CARD styles (Mandate) — the same look as the About Section text
 * cards: an icon badge beside each heading, paragraphs, and a coloured dot
 * before each bullet. One of these cards per heading.
 */
export const createTextStyles = theme =>
  StyleSheet.create({
    textCard: {padding: spacing.lg},
    rowRTL: {flexDirection: 'row-reverse'},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},

    headingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.sm,
      marginBottom: spacing.sm,
    },
    headingBar: {width: 4, height: 20, borderRadius: 2},
    headingBadgeShell: {
      width: 40,
      height: 40,
      borderRadius: 12,
      elevation: 3,
      shadowColor: '#000000',
      shadowOpacity: 0.18,
      shadowRadius: 5,
      shadowOffset: {width: 0, height: 2},
    },
    headingBadge: {
      width: 40,
      height: 40,
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
    },
    heading: {...theme.type.titleMedium, flexShrink: 1},
    bulletRow: {flexDirection: 'row', marginBottom: spacing.sm, columnGap: spacing.sm},
    bulletDot: {width: 7, height: 7, borderRadius: 4, marginTop: 7},
    bulletText: {...theme.type.bodyMedium, lineHeight: 22, flex: 1},
  });

/** The section's colour, for the text card's heading badges and bullet dots. */
export const createTextAccentStyles = accent =>
  StyleSheet.create({
    badgeShell: {backgroundColor: accent},
    fill: {backgroundColor: accent},
  });

/**
 * ICON-CARD styles (the other three pages). CLEAN glass cards — no colour
 * wash over the whole card; only the icon badge carries the colour, so the
 * text stays crisp and the cards read clearly over the background. The icon's
 * colour comes from CARD_COLORS, applied to the gradient in the component.
 */
export const createCardStyles = theme =>
  StyleSheet.create({
    rowRTL: {flexDirection: 'row-reverse'},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},

    pointWrap: {marginBottom: spacing.md},
    pointCard: {paddingVertical: spacing.md, paddingHorizontal: spacing.md},
    pointContent: {alignSelf: 'stretch'},
    pointRow: {flexDirection: 'row', alignItems: 'center', columnGap: spacing.md},

    // A soft square badge, like the heading badges and the Dashboard tiles
    pointBadgeShell: {
      width: 46,
      height: 46,
      borderRadius: 14,
      elevation: 3,
      shadowColor: '#000000',
      shadowOpacity: 0.18,
      shadowRadius: 5,
      shadowOffset: {width: 0, height: 2},
    },
    pointBadge: {
      width: 46,
      height: 46,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Body text at full strength, not muted — the card is clean glass now
    pointText: {...theme.type.bodyMedium, color: theme.text.body, lineHeight: 22, flex: 1},
  });

export const createDynamicStyles = (insets, width) => {
  const gutters = sideGutters(width, insets, READING_WIDTH);
  return {
    topBarPad: {paddingTop: insets.top + spacing.sm, ...gutters},
    scrollPad: {paddingBottom: insets.bottom + spacing.xxl, ...gutters},
  };
};

export const BACK_RADIUS = radii.md;