import { StyleSheet } from 'react-native';
import { radii, spacing } from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3)
 *   Headline Small — welcome name on the slider (white)
 *   Title Large    — "OPMIS" top bar
 *   Title Small    — "MODULES" header, module names
 *   Body Small     — org name under OPMIS
 *   Label Medium   — "WELCOME BACK", language toggle
 *   Label Small    — "COMING SOON"
 */

/**
 * Each module's colour, by colour psychology.
 * Fixed colours, so a module is recognisable on any background.
 */
export const MODULE_COLORS = {
  dashboard: ['#4A90D9', '#1F5C9E'], // blue    — overview, trust
  complaints: ['#F2A04C', '#D4711C'], // orange  — take action
  dms: ['#43A35A', '#1F6B33'], // green   — organised, safe
  cases: ['#9B6FD6', '#5B3AA0'], // purple  — formal, authority
  reports: ['#2FB5A8', '#157A71'], // teal    — clarity, analysis
  hearings: ['#E4564A', '#B02A21'], // red     — dates, deadlines
  directory: ['#5A8DEE', '#2F55B8'], // blue    — people, contact
  search: ['#8D9AA9', '#5C6878'], // slate   — neutral utility
  notices: ['#F0B43A', '#C28410'], // amber   — attention
  settings: ['#6B7C8F', '#3E4C5C'], // grey    — configuration
   about: ['#5FA98C', '#2E6B56'], // sage — institutional, informative
     annualReports: ['#2FB5A8', '#157A71'], // teal — records, analysis
};
export const MODULE_FALLBACK = ['#43A35A', '#1F6B33'];

/** Delay between each card's entrance, in milliseconds. */
export const TILE_STAGGER_MS = 90;

export const createStyles = theme =>
  StyleSheet.create({
    flex: { flex: 1 },

    // ---- Top bar ----
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    menuBtn: { width: 48, height: 48 },
    topTextWrap: { flex: 1, marginHorizontal: spacing.md },
    topTitle: { ...theme.type.titleLarge, letterSpacing: 0.5 },
    topSub: { ...theme.type.bodySmall },

    // ---- Language toggle ----
    langToggle: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 3,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fillStrong,
    },
    // Fixed height + centred content: EN and اردو line up even though
    // Nastaleeq needs a taller line than Latin text
    langOption: {
      height: 30,
      minWidth: 44,
      paddingHorizontal: 11,
      borderRadius: radii.pill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    langOptionActive: { backgroundColor: theme.accent },
    langText: {
      ...theme.type.labelMedium,
      color: theme.control.label,
      textShadowRadius: 0,
    },
    langTextActive: { color: theme.text.onAccent },

    scroll: { paddingHorizontal: spacing.lg },

    // ---- Slider overlay (on a photo → fixed white) ----
    sliderOverlay: {
      position: 'absolute',
      left: spacing.md,
      right: spacing.md,
      bottom: spacing.xl,
    },
    // In Urdu the whole block moves to the right edge
    // alignSelf on the child beats alignItems on the parent, so the name
    // and label land on the correct edge whatever the parent does
    sliderName: {
      ...theme.type.headlineSmall,
      color: '#FFFFFF',
      alignSelf: 'flex-start',
      textShadowColor: 'rgba(0, 0, 0, 0.55)',
      textShadowOffset: {width: 0, height: 1},
      textShadowRadius: 4,
    },
   sliderLabel: {
      ...theme.type.labelMedium,
      color: 'rgba(255, 255, 255, 0.88)',
      alignSelf: 'flex-start',
      marginTop: 2,
      textShadowColor: 'rgba(0, 0, 0, 0.5)',
      textShadowOffset: {width: 0, height: 1},
      textShadowRadius: 3,
    },
  sliderEnd: {alignSelf: 'flex-end'},
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
    sectionCount: {
      paddingHorizontal: 9,
      paddingVertical: 2,
      borderRadius: radii.pill,
      backgroundColor: theme.glass.fillStrong,
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    sectionCountText: {...theme.type.labelSmall, color: theme.accent},
    sectionRule: {flex: 1, height: 1, backgroundColor: theme.glass.border},

    // ---- Module cards ----
    tileGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    tileGridRTL: { flexDirection: 'row-reverse' },
    tileOuter: { width: '48.5%', marginBottom: spacing.sm },
         tile: {
      paddingTop: 18,
      paddingHorizontal: spacing.sm,
      height: 184,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: theme.glass.fillStrong,
      borderWidth: 1,
      borderColor: theme.glass.border,
      borderRadius: radii.lg,
      elevation: 6,
      shadowColor: theme.glass.shadow,
      shadowOpacity: 0.35,
      shadowRadius: 14,
      shadowOffset: {width: 0, height: 6},
    },
    // Rows sit closer; the name starts just under the badge rather than
    // floating in the middle of its box
    nameRow: {
      height: 52,
      marginTop: 6,
      alignSelf: 'stretch',
      alignItems: 'center',
      justifyContent: 'center',
    },
    // Thin colour accent along the top edge, inset to clear the corners
    tileAccent: {
      position: 'absolute',
      top: 0,
      left: 24,
      right: 24,
      height: 3,
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
    },
    // Badge: the shell casts the shadow, the gradient rounds ITSELF
    badgeShell: {
      width: 56,
      height: 56,
      borderRadius: 18,
      marginBottom: spacing.sm,
      elevation: 4,
      shadowColor: '#000000',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
    },
    badge: {
      width: 56,
      height: 56,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    /**
     * Title Medium (16) instead of Title Small (14): the module name is
     * the card's main content, so it takes the same style as a card title
     * elsewhere in the app. Urdu inherits this and AppText scales it up,
     * so both languages gain the same step.
     */
    tileLabel: {...theme.type.titleMedium, textAlign: 'center', lineHeight: 22},
    tileLabelUrdu: {
      ...theme.type.titleMedium,
      writingDirection: 'rtl',
      textAlign: 'center',
    },
    soonPill: {
      marginTop: 6,
      height: 26,
      paddingHorizontal: 10,
      borderRadius: radii.pill,
      backgroundColor: 'rgba(212, 113, 28, 0.12)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tileSoon: {
      ...theme.type.labelSmall,
      color: theme.accent,
      textAlign: 'center',
    },
    rtlText: { textAlign: 'right', writingDirection: 'rtl' },
  });

export const createDynamicStyles = insets => ({
  topBarPad: { paddingTop: insets.top + spacing.sm },
  scrollPad: { paddingBottom: insets.bottom + spacing.xxl },
});

export const MENU_RADIUS = radii.md;
