import {StyleSheet} from 'react-native';
import {radii, spacing, weight} from '../../theme/tokens';

export const SIDEBAR_WIDTH = 288;

/**
 * TYPOGRAPHY (MD3)
 *   Title Medium — brand name
 *   Title Small  — user's name
 *   Body Small   — @username
 *   Label Large  — menu items (MD3 navigation drawer standard)
 *   Label Small  — "OPMIS", SOON tags, version
 */
export const createStyles = theme =>
  StyleSheet.create({
    overlay: {...StyleSheet.absoluteFillObject, backgroundColor: '#000000'},
    panel: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: SIDEBAR_WIDTH,
      backgroundColor: theme.isLight ? 'rgba(250, 247, 241, 0.97)' : 'rgba(6, 30, 19, 0.95)',
      borderRightWidth: 1,
      borderRightColor: theme.glass.rim,
      elevation: 16,
      shadowColor: theme.glass.shadow,
      shadowOpacity: 0.3,
      shadowRadius: 20,
      shadowOffset: {width: 4, height: 0},
    },
    sheen: {...StyleSheet.absoluteFillObject},

    // ---- Header ----
    header: {paddingHorizontal: spacing.lg, paddingBottom: spacing.lg},
    brandRow: {flexDirection: 'row', alignItems: 'center'},
    crest: {width: 46, height: 46, marginRight: spacing.sm},
    crestText: {color: theme.brandGreen, fontSize: 12, letterSpacing: 1, ...weight(800)},
    brandText: {flex: 1},
    brandTitle: {...theme.type.titleMedium},
    brandSub: {...theme.type.bodySmall},
    // ---- User card ----
    userCard: {
      marginTop: spacing.md,
      padding: spacing.sm,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.glass.fill,
      borderWidth: 1,
      borderColor: theme.glass.border,
      borderRadius: radii.lg,
      overflow: 'hidden',
    },
    avatar: {
      width: 38,
      height: 38,
      borderRadius: radii.pill,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.sm,
    },
    userInfo: {flex: 1},
    userName: {...theme.type.titleSmall},
    userRole: {...theme.type.bodySmall},

    // ---- Menu ----
    listWrap: {flex: 1},
    list: {paddingHorizontal: spacing.md, paddingBottom: spacing.md},
    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: spacing.sm,
      borderRadius: radii.md,
      marginBottom: 4,
    },
    itemActive: {backgroundColor: 'rgba(232, 145, 58, 0.14)'},
    itemPressed: {backgroundColor: 'rgba(31, 36, 32, 0.06)'},
    itemDisabled: {opacity: 0.5},
    itemIcon: {width: 32, alignItems: 'flex-start'},
    itemLabel: {...theme.type.labelLarge, color: theme.text.body, flex: 1},
    itemLabelActive: {color: theme.accent, ...weight(700)},
    soonTag: {
      ...theme.type.labelSmall,
      color: theme.accent,
      borderWidth: 1,
      borderColor: 'rgba(232, 145, 58, 0.4)',
      borderRadius: radii.pill,
      paddingHorizontal: 6,
      paddingVertical: 1,
      overflow: 'hidden',
    },

    // ---- Footer ----
    footer: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.glass.border,
    },
    footerBtn: {marginBottom: spacing.sm},
    version: {...theme.type.labelSmall, textAlign: 'center', marginBottom: spacing.sm},
  });

export const createDynamicStyles = insets => ({
  headerPad: {paddingTop: insets.top + 18},
  footerPad: {paddingBottom: insets.bottom + 12},
});