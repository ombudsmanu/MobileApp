import {StyleSheet} from 'react-native';
import {radii, spacing, typography} from '../../theme/tokens';
/**
 * TYPOGRAPHY (MD3)
 *   Title Large  — screen title
 *   Title Medium — selected hex
 *   Body Small   — sub-line
 *   Label        — "SELECTED", "HEX"
 * The sample shows one line per colour family.
 */
export const createStyles = theme =>
  StyleSheet.create({
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 52, height: 52},
    topTextWrap: {flex: 1, marginLeft: spacing.md},
    topTitle: {...theme.type.titleLarge},
    topSub: {...theme.type.bodySmall},

    body: {flex: 1, paddingHorizontal: spacing.lg},

    previewCard: {padding: spacing.md},
    previewRow: {flexDirection: 'row', alignItems: 'center'},
    previewChip: {
      width: 48,
      height: 48,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: theme.glass.border,
      marginRight: spacing.md,
    },
    previewLabel: {...theme.type.labelSmall},
    previewHex: {...theme.type.titleMedium, color: theme.control.input},

    sampleBox: {
      marginTop: spacing.md,
      borderRadius: radii.md,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    sampleHeadline: {...theme.type.headlineSmall, textShadowRadius: 0},
    sampleTitle: {...theme.type.titleMedium, textShadowRadius: 0},
    sampleBody: {...theme.type.bodyMedium},
    sampleLabel: {...theme.type.labelMedium, marginTop: 4, textShadowRadius: 0},

    // Plain View (not GlassSurface) so the wheel gets a real flex:1 height
    wheelCard: {
      flex: 1,
      marginTop: spacing.md,
      padding: spacing.md,
      borderRadius: radii.lg,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fill,
    },
    wheelWrap: {flex: 1},

    hexRow: {flexDirection: 'row', alignItems: 'center', marginTop: spacing.md},
    hexLabel: {...theme.type.labelMedium},
    hexInput: {
      flex: 1,
      marginLeft: spacing.sm,
      ...typography.input,
            color: theme.control.input,
      borderWidth: 1,
      borderColor: theme.glass.border,
      borderRadius: radii.md,
      paddingHorizontal: spacing.sm,
      paddingVertical: 8,
      backgroundColor: theme.glass.fillStrong,
    },

    footer: {flexDirection: 'row', paddingHorizontal: spacing.lg, paddingTop: spacing.md},
    footerBtn: {flex: 1},
    footerGap: {marginLeft: spacing.sm},
  });

export const createDynamicStyles = insets => ({
  topBarPad: {paddingTop: insets.top + spacing.sm},
  footerPad: {paddingBottom: insets.bottom + spacing.md},
});

export const BACK_RADIUS = radii.md;

export const WHEEL_CONFIG = {thumbSize: 34, sliderSize: 26, noSnap: true, row: false};