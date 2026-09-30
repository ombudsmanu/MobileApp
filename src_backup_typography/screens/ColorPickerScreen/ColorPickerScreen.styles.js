import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

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
    topTitle: {...theme.type.title},
    topSub: {...theme.type.caption, marginTop: 2},

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
    previewLabel: {...theme.type.label},
    previewHex: {...theme.type.heading, color: theme.control.input, marginTop: 2},
    sampleBox: {
      marginTop: spacing.md,
      borderRadius: radii.md,
      padding: spacing.md,
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    sampleTitle: {...theme.type.title, fontSize: 22},
    sampleHeading: {...theme.type.heading, fontSize: 17, marginTop: 2},
    sampleSubheading: {...theme.type.subheading, marginTop: 2},
    sampleBody: {...theme.type.body, marginTop: 2},

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
    hexLabel: {...theme.type.label},
    hexInput: {
      flex: 1,
      marginLeft: spacing.sm,
      fontSize: 16,
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

export const WHEEL_CONFIG = {
  thumbSize: 34,
  sliderSize: 26,
  noSnap: true,
  row: false,
};