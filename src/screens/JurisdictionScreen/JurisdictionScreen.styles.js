import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/**
 * JURISDICTION screen — the grid of four section cards.
 *
 * The same header and spacing as About Us, so the two screens match. The
 * cards are laid out by ResponsiveGrid and styled by ModuleTile, so there
 * are no card styles here.
 *
 * Top bar: [back] [title — centred in the free space] [EN / اردو]
 */
export const createStyles = theme =>
  StyleSheet.create({
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 52, height: 52},
    // A box exactly as wide as its own words, centred between the back
    // button and the language button — in both languages.
    topTextWrap: {flex: 1, alignItems: 'center'},
    topTitle: {...theme.type.titleMedium},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},

    scroll: {paddingTop: spacing.sm},
    // Crest + Office name + certification badges across the top — the same
    // spacing as About Us, Register Complaint, Downloads and Annual Reports
    topBadges: {marginBottom: spacing.md},
  });

/**
 * Space around the content — the same as About Us: clear of the status
 * bar, the notch and the side navigation bar. The grid itself is NOT
 * narrowed to a reading column (a grid of cards should use the full width),
 * so this just pads by the safe-area insets.
 */
export const createDynamicStyles = insets => ({
  topBarPad: {
    paddingTop: insets.top + spacing.sm,
    paddingLeft: insets.left + spacing.lg,
    paddingRight: insets.right + spacing.lg,
  },
  scrollPad: {
    paddingBottom: insets.bottom + spacing.xxl,
    paddingLeft: insets.left + spacing.lg,
    paddingRight: insets.right + spacing.lg,
  },
});

export const BACK_RADIUS = radii.md;