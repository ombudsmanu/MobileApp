import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';
import {sideGutters, READING_WIDTH} from '../../theme/responsive';

/**
 * TRACK A COMPLAINT — the landing screen (two option rows).
 *
 * The same header and centred layout as Register a Complaint, so the two
 * screens match. The rows themselves are styled by SectionRow.
 */
export const createStyles = theme =>
  StyleSheet.create({
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 48, height: 48},
    topTextWrap: {flex: 1, alignItems: 'center'},
    topTitle: {...theme.type.titleMedium},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},

    topBadges: {marginBottom: spacing.md},
    rowWrap: {marginTop: spacing.sm},
  });

/**
 * Space around the content. Side padding on a phone; a centred reading
 * column on a tablet / in landscape. flexGrow + justifyContent:'center'
 * vertically centre the short content (crest, badges, two rows), the same
 * as Register a Complaint.
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