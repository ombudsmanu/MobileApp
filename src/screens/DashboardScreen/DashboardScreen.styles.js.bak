import {StyleSheet} from 'react-native';
import {spacing, radii} from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3)
 *   Headline Small — welcome name on the slider (white)
 *   Title Large    — "OPMIS" top bar
 *   Title Medium   — "MODULES" header
 *   Body Small     — org name under OPMIS
 *   Label Medium   — "WELCOME BACK"
 * The module cards use ModuleTile's own typography.
 */

/**
 * Each module's colour, by colour psychology.
 * Fixed colours, so a module is recognisable on any background.
 */
export const MODULE_COLORS = {
  dashboard: ['#4A90D9', '#1F5C9E'], // blue    — overview, trust
  complaints: ['#F2A04C', '#D4711C'], // orange  — take action
  downloads: ['#6C8FD6', '#3B5BA5'], // indigo  — documents to take away
  dms: ['#43A35A', '#1F6B33'], // green   — organised, safe
  cases: ['#9B6FD6', '#5B3AA0'], // purple  — formal, authority
  reports: ['#2FB5A8', '#157A71'], // teal    — clarity, analysis
  hearings: ['#E4564A', '#B02A21'], // red     — dates, deadlines
  directory: ['#5A8DEE', '#2F55B8'], // blue    — people, contact
  search: ['#8D9AA9', '#5C6878'], // slate   — neutral utility
  notices: ['#F0B43A', '#C28410'], // amber   — attention
  settings: ['#6B7C8F', '#3E4C5C'], // grey    — configuration
  about: ['#5FA98C', '#2E6B56'], // sage    — institutional, informative
  annualReports: ['#2FB5A8', '#157A71'], // teal — records, analysis
};
export const MODULE_FALLBACK = ['#43A35A', '#1F6B33'];

/**
 * SLIDER HEIGHT by screen:
 *   phone, portrait   200 — as before
 *   phone, landscape  160 — the screen is only ~390dp tall, so a 200 slider
 *                           would push the module cards almost off it
 *   tablet            280 — a wide tablet slider looks squashed at 200
 */
export const SLIDER_HEIGHT = {phone: 200, phoneLandscape: 160, tablet: 280};

export const sliderHeightFor = ({isTablet, isLandscape}) => {
  if (isTablet) {
    return SLIDER_HEIGHT.tablet;
  }
  return isLandscape ? SLIDER_HEIGHT.phoneLandscape : SLIDER_HEIGHT.phone;
};

export const createStyles = theme =>
  StyleSheet.create({
    flex: {flex: 1},

    // ---- Top bar ---- (left/right padding: createDynamicStyles)
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: spacing.md,
    },
    menuBtn: {width: 48, height: 48},
    topTextWrap: {flex: 1, marginHorizontal: spacing.sm},
    topTitle: {...theme.type.titleLarge, letterSpacing: 0.5},
    topSub: {...theme.type.bodySmall},
    // English: the name is drawn as two lines ("Ombudsman Punjab" /
    // "Management Information System"), each one line long, so neither is
    // ever cut with "…". The block between the menu button and the toggle
    // is narrow, so a line may shrink slightly (adjustsFontSizeToFit).
    topSubEn: {...theme.type.labelMedium, lineHeight: 15, textAlign: 'left'},
    // Urdu: one line, shrunk to fit, starting at the center
    topSubUr: {...theme.type.labelMedium,textAlign: 'center'},

    // ---- Slider overlay (on a photo → fixed white) ----
    sliderOverlay: {
      position: 'absolute',
      left: spacing.md,
      right: spacing.md,
      bottom: spacing.xl,
    },
    // Both lines span the overlay's full width (no alignSelf), so the edge is
    // set by aligning the TEXT, not by pushing each box around. In Urdu the
    // name and the label therefore end on exactly the same right edge.
    sliderName: {
      ...theme.type.headlineSmall,
      color: '#FFFFFF',
      textAlign: 'left',
      textShadowColor: 'rgba(0, 0, 0, 0.55)',
      textShadowOffset: {width: 0, height: 1},
      textShadowRadius: 4,
    },
    sliderLabel: {
      ...theme.type.labelMedium,
      color: 'rgba(255, 255, 255, 0.88)',
      textAlign: 'left',
      marginTop: 2,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: {width: 0, height: 1},
      textShadowRadius: 3,
    },
    sliderTextRTL: {textAlign: 'right'},

    // ---- Section header ----
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.sm,
      marginTop: spacing.xl,
      marginBottom: spacing.md,
      alignSelf: 'stretch',
    },
    sectionHeaderRTL: {flexDirection: 'row-reverse'},
    sectionBar: {width: 4, height: 22, borderRadius: 2, backgroundColor: theme.accent},
    sectionTitle: {
      ...theme.type.titleMedium,
      textTransform: 'uppercase',
      letterSpacing: 1.5,
      flexShrink: 1,
    },
    sectionRule: {flex: 1, height: 1, backgroundColor: theme.glass.border},
  });

/**
 * Space around the content. Left/right include the insets because in
 * landscape the camera notch and the 3-button navigation bar sit at the
 * sides — without them the cards would slide underneath.
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

export const MENU_RADIUS = radii.md;