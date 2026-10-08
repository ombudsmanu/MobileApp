import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

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
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 48, height: 48},
    topTextWrap: {flex: 1},
    topTitle: {...theme.type.titleMedium},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},

    scroll: {paddingHorizontal: spacing.lg},
        // Certification badges across the top of the screen
    topBadges: {marginBottom: spacing.md},
    intro: {...theme.type.bodyMedium, marginBottom: spacing.sm},
    rowWrap: {marginTop: spacing.sm},
  });

export const createDynamicStyles = insets => ({
  topBarPad: {paddingTop: insets.top + spacing.sm},
  scrollPad: {paddingBottom: insets.bottom + spacing.xxl},
});

export const BACK_RADIUS = radii.md;