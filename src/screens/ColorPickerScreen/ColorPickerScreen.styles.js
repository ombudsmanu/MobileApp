import {StyleSheet} from 'react-native';
import {radii, spacing, typography} from '../../theme/tokens';
import {sideGutters, READING_WIDTH} from '../../theme/responsive';
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
    // Left/right padding of the top bar, body and footer: createDynamicStyles
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: spacing.md,
    },
    backBtn: {width: 52, height: 52},
    topTextWrap: {flex: 1, marginLeft: spacing.md},
    topTitle: {...theme.type.titleLarge},
    topSub: {...theme.type.bodySmall},

    body: {flex: 1},
    // Landscape: preview and wheel side by side
    bodyRow: {flexDirection: 'row', columnGap: spacing.md},
    side: {flex: 1},

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
    // Landscape: the wheel takes the right half, level with the preview
    wheelCardSide: {marginTop: 0},
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

    footer: {flexDirection: 'row', paddingTop: spacing.md},
    footerBtn: {flex: 1},
    footerGap: {marginLeft: spacing.sm},
  });

/**
 * Space around the content: clear of the bars and the notch, and on a
 * tablet a centred column no wider than READING_WIDTH (the top bar, the
 * body and the footer all share the same sidePad, so they line up).
 */
export const createDynamicStyles = (insets, width) => {
  const sidePad = sideGutters(width, insets, READING_WIDTH);
  return {
    topBarPad: {paddingTop: insets.top + spacing.sm, ...sidePad},
    sidePad,
    footerPad: {paddingBottom: insets.bottom + spacing.md},
  };
};

/**
 * The colours being previewed. They change as the wheel turns, so they
 * are built with useMemo in the screen instead of written inline.
 */
export const createSampleStyles = ({picked, background, headline, title, body, label}) =>
  StyleSheet.create({
    chip: {backgroundColor: picked},
    box: {backgroundColor: background},
    headline: {color: headline},
    title: {color: title},
    body: {color: body},
    label: {color: label},
  });

export const BACK_RADIUS = radii.md;

export const WHEEL_CONFIG = {thumbSize: 34, sliderSize: 26, noSnap: true, row: false};