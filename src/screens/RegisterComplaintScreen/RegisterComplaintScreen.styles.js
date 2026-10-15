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
    // ---- Header: [back] [title] [globe + language] ----
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 48, height: 48},
    // alignItems:'center' shrinks the title's box to the width of its own
    // words and centres it between the back button and the language button
    // — in BOTH languages, because a box that is exactly as wide as its
    // text has nothing for textAlign to push against.
    topTextWrap: {flex: 1, alignItems: 'center'},
    topTitle: {...theme.type.titleMedium},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},

    // Left/right padding: createDynamicStyles (centred reading column)
    // Crest + certification badges across the top of the screen
    topBadges: {marginBottom: spacing.md},
    intro: {...theme.type.bodyMedium, marginBottom: spacing.sm},
    rowWrap: {marginTop: spacing.sm},
  });

/**
 * Space around the content. On a phone held upright: the usual side
 * padding. On a tablet or in landscape: a centred column no wider than
 * READING_WIDTH, and always clear of the notch and side navigation bar.
 *
 * flexGrow + justifyContent:'center' vertically CENTRE the content when it
 * is shorter than the screen (this one is — crest, badges, intro, 2 rows),
 * and leave it top-aligned and scrollable when it is taller.
 */
export const createDynamicStyles = (insets, width) => {
  const gutters = sideGutters(width, insets, READING_WIDTH);
  return {
    topBarPad: {paddingTop: insets.top + spacing.sm, ...gutters},
    scrollPad: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingBottom: insets.bottom + spacing.xxl,
      ...gutters,
    },
  };
};

export const BACK_RADIUS = radii.md;