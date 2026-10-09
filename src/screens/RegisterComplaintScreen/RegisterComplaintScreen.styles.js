import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';
import {sideGutters, READING_WIDTH} from '../../theme/responsive';

/**
 * TYPOGRAPHY (MD3)
 *   Title Medium — screen title (the rows use SectionRow's own styling)
 *   Body Medium  — intro line
 */
export const createStyles = theme =>
  StyleSheet.create({
    // ---- Header: [back] [title] [EN / اردو] ----
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 48, height: 48},
    topTextWrap: {flex: 1},
    topTitle: {...theme.type.titleMedium},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},

    // Left/right padding: createDynamicStyles (centred reading column)
    // Certification badges across the top of the screen
    topBadges: {marginBottom: spacing.md},
    intro: {...theme.type.bodyMedium, marginBottom: spacing.sm},
    rowWrap: {marginTop: spacing.sm},
  });

/**
 * Space around the content. On a phone held upright: the usual side
 * padding. On a tablet or in landscape: a centred column no wider than
 * READING_WIDTH, and always clear of the notch and side navigation bar.
 */
export const createDynamicStyles = (insets, width) => {
  const gutters = sideGutters(width, insets, READING_WIDTH);
  return {
    topBarPad: {paddingTop: insets.top + spacing.sm, ...gutters},
    scrollPad: {paddingBottom: insets.bottom + spacing.xxl, ...gutters},
  };
};

export const BACK_RADIUS = radii.md;