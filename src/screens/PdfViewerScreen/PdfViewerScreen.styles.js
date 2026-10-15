import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';
import {sideGutters} from '../../theme/responsive';

/**
 * TYPOGRAPHY (MD3)
 *   Title Medium — document title (top bar), status card heading
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
    // ---- Header: [back] [title + page counter] [globe + language] ----
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.md,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 48, height: 48},
    // Centred between the back button and the language button, like every
    // other screen's title (alignItems shrinks the text box to its words)
    topTextWrap: {flex: 1, alignItems: 'center'},
    // Title Medium, the same as the other top bars — it now shares the bar
    // with the language button, so Title Large would cut "Annual Report 2025"
    topTitle: {...theme.type.titleMedium},
    topSub: {...theme.type.bodySmall},
    textRTL: {textAlign: 'right', writingDirection: 'rtl'},

    // ---- Document ----
    body: {flex: 1, backgroundColor: PDF_BACKDROP},
    pdf: {flex: 1, backgroundColor: PDF_BACKDROP},

    // ---- Footer: the DOWNLOAD button, under the document ----
    // Only on documents the caller gave a file name (the affidavit and the
    // Downloads screen's forms). A frosted strip so it reads as part of the
    // app, not part of the grey document area above it.
    footer: {
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.glass.border,
      backgroundColor: theme.glass.fillStrong,
    },
    footerBtn: {width: '100%'},

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
    statusDetail: {...theme.type.labelSmall, marginTop: spacing.sm, textAlign: 'center', opacity: 0.7},
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

/**
 * Top bar: clear of the status bar and notch.
 * Document: as wide as the screen allows — the grey surround reaches the
 * edges, but the pages themselves stay out from under the notch and the
 * side navigation bar in landscape. react-native-pdf needs its width as a
 * number, so it is given the exact space between the two insets.
 * Footer: when there is one, IT keeps clear of the gesture bar, so the
 * document above it no longer needs a bottom inset of its own.
 */
export const createDynamicStyles = (insets, width) => ({
  topBarPad: {paddingTop: insets.top + spacing.sm, ...sideGutters(width, insets)},
  bodyPad: {
    paddingBottom: insets.bottom,
    paddingLeft: insets.left,
    paddingRight: insets.right,
  },
  bodyPadAboveFooter: {
    paddingLeft: insets.left,
    paddingRight: insets.right,
  },
  footerPad: {
    paddingBottom: insets.bottom + spacing.sm,
    ...sideGutters(width, insets),
  },
  pdfSize: {width: width - insets.left - insets.right},
});

export const BACK_RADIUS = radii.md;