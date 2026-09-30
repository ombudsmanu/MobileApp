import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3)
 *   Title Large — "About Us"
 *   Body Small  — office name under it
 * The cards use ModuleTile's own typography.
 *
 * Top bar: [back] [title — takes the free space] [EN / اردو]
 * columnGap spaces all three evenly, in both languages.
 */
export const createStyles = theme =>
  StyleSheet.create({
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 52, height: 52},
    topTextWrap: {flex: 1},
    topTitle: {...theme.type.titleLarge},
    topSub: {...theme.type.bodySmall},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},

    scroll: {paddingHorizontal: spacing.lg, paddingTop: spacing.sm},
    grid: {flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between'},
    gridRTL: {flexDirection: 'row-reverse'},
  });

export const createDynamicStyles = insets => ({
  topBarPad: {paddingTop: insets.top + spacing.sm},
  scrollPad: {paddingBottom: insets.bottom + spacing.xxl},
});

export const BACK_RADIUS = radii.md;