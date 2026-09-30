import {StyleSheet} from 'react-native';
import {radii, spacing, typography} from '../../theme/tokens';

export const createStyles = theme =>
  StyleSheet.create({
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 44, height: 44},
    topTextWrap: {flex: 1, marginLeft: spacing.md},
    topTitle: {...typography.heading, color: theme.text.title},
    topSub: {...typography.caption, color: theme.text.muted, marginTop: 2},

    body: {flex: 1, paddingHorizontal: spacing.lg},

    // ---- Preview ----
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
    previewLabel: {...typography.caption, color: theme.text.muted},
    previewHex: {...typography.heading, color: theme.text.title, marginTop: 2},
    sampleBox: {
      marginTop: spacing.md,
      borderRadius: radii.md,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    sampleTitle: {...typography.heading, fontSize: 20},
    sampleHeading: {...typography.subtitle, marginTop: 2},
    sampleBody: {...typography.body, marginTop: 2},

    // ---- Wheel ----
    // A plain View, NOT GlassSurface: the wheel needs a real flex:1
    // height, and GlassSurface's inner content layer would collapse it.
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
    hexLabel: {...typography.label, color: theme.text.muted},
    hexInput: {
      flex: 1,
      marginLeft: spacing.sm,
      ...typography.input,
      color: theme.text.heading,
      borderWidth: 1,
      borderColor: theme.glass.border,
      borderRadius: radii.md,
      paddingHorizontal: spacing.sm,
      paddingVertical: 8,
      backgroundColor: theme.glass.fillStrong,
    },

    // ---- Footer ----
    footer: {flexDirection: 'row', paddingHorizontal: spacing.lg, paddingTop: spacing.md},
    footerBtn: {flex: 1},
    footerGap: {marginLeft: spacing.sm},
  });

export const createDynamicStyles = insets => ({
  topBarPad: {paddingTop: insets.top + spacing.sm},
  footerPad: {paddingBottom: insets.bottom + spacing.md},
});

export const BACK_RADIUS = radii.md;

/** Wheel settings — tweak sizes here, not in the component. */
export const WHEEL_CONFIG = {
  thumbSize: 34,
  sliderSize: 26,
  noSnap: true,
  row: false,
};