import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3)
 *   Title Large  — report title (top bar)
 *   Title Medium — status card heading
 *   Body Small   — page counter, status text
 *
 * The document area is a fixed neutral grey in every theme: PDF pages are
 * white, and a grey surround is what separates one page from the next.
 */
const PDF_BACKDROP = '#E4E8E5';

/** How long a downloaded report is kept before it is fetched again. */
export const CACHE_DAYS = 30;

export const createStyles = theme =>
  StyleSheet.create({
    // ---- Header ----
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    topBarRTL: {flexDirection: 'row-reverse'},
    backBtn: {width: 48, height: 48},
    topTextWrap: {flex: 1},
    topTitle: {...theme.type.titleLarge},
    topSub: {...theme.type.bodySmall},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},

    // ---- Document ----
    body: {flex: 1, backgroundColor: PDF_BACKDROP},
    pdf: {flex: 1, backgroundColor: PDF_BACKDROP},

    // ---- Loading / error card ----
    overlay: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
      padding: spacing.lg,
    },
    statusCard: {width: '100%', maxWidth: 360, padding: spacing.lg},
    // GlassSurface puts children in an inner view — centre THAT, via contentStyle
    statusContent: {alignItems: 'center'},
    statusTitle: {...theme.type.titleMedium, marginTop: spacing.sm, textAlign: 'center'},
    statusText: {...theme.type.bodySmall, marginTop: spacing.xs, textAlign: 'center'},

    progressTrack: {
      width: '100%',
      height: 6,
      marginTop: spacing.md,
      borderRadius: radii.pill,
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
    },
    progressFill: {
      height: 6,
      borderRadius: radii.pill,
      backgroundColor: theme.accent,
    },

    buttons: {width: '100%', rowGap: spacing.sm, marginTop: spacing.lg},
    button: {width: '100%'},
  });

export const createDynamicStyles = insets => ({
  topBarPad: {paddingTop: insets.top + spacing.sm},
  bodyPad: {paddingBottom: insets.bottom},
});

export const BACK_RADIUS = radii.md;