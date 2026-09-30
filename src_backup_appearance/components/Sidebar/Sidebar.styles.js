import { StyleSheet } from 'react-native';
import { radii, spacing, typography } from '../../theme/tokens';

export const SIDEBAR_WIDTH = 288;

export const createStyles = theme =>
  StyleSheet.create({
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: '#000000' },
    panel: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: SIDEBAR_WIDTH,
      backgroundColor: theme.isLight
        ? 'rgba(250, 247, 241, 0.97)'
        : 'rgba(6, 30, 19, 0.95)',
      borderRightWidth: 1,
      borderRightColor: theme.glass.rim,
      elevation: 16,
      shadowColor: theme.glass.shadow,
      shadowOpacity: 0.3,
      shadowRadius: 20,
      shadowOffset: { width: 4, height: 0 },
    },
    sheen: { ...StyleSheet.absoluteFillObject },

    header: { paddingHorizontal: spacing.lg, paddingBottom: spacing.lg },
    brandRow: { flexDirection: 'row', alignItems: 'center' },
    crest: { width: 46, height: 46, marginRight: spacing.sm },
    crestText: {
      color: theme.brandGreen ?? theme.text.title,
      fontWeight: '800',
      fontSize: 12,
      letterSpacing: 1,
    },
    brandText: { flex: 1 },
    brandTitle: {
      ...typography.label,
      color: theme.accent,
      fontSize: 15,
      letterSpacing: 0.5,
    },
    brandSub: {
      ...typography.caption,
      color: theme.text.muted,
      marginTop: 1,
    },

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
    userInfo: {
      flex: 1,
      marginLeft: spacing.sm,
    },
    userCardContent: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    userInfo: {
      flex: 1,
    },
    avatar: {
      width: 38,
      height: 38,
      borderRadius: radii.pill,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.sm,
    },
    welcomeName: {
      marginLeft: 8,
    },
    userName: { ...typography.label, color: theme.text.heading },
    userRole: { ...typography.caption, color: theme.text.muted, marginTop: 1 },

    listWrap: { flex: 1 },
    list: { paddingHorizontal: spacing.md, paddingBottom: spacing.md },

    item: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      paddingHorizontal: spacing.sm,
      borderRadius: radii.md,
      marginBottom: 4,
    },
    itemActive: {
      backgroundColor: 'rgba(224, 123, 57, 0.14)',
    },
    itemPressed: {
      backgroundColor: 'rgba(31, 36, 32, 0.06)',
    },
    itemDisabled: { opacity: 0.5 },
    itemIcon: { width: 32, alignItems: 'flex-start' },
    itemLabel: {
      ...typography.body,
      fontSize: 14,
      color: theme.text.heading,
      flex: 1,
    },
    itemLabelActive: { color: theme.accent, fontWeight: '700' },
    soonTag: {
      ...typography.caption,
      fontSize: 8,
      color: theme.accent,
      borderWidth: 1,
      borderColor: 'rgba(224, 123, 57, 0.4)',
      borderRadius: radii.pill,
      paddingHorizontal: 6,
      paddingVertical: 2,
      overflow: 'hidden',
    },

    footer: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.sm,
      borderTopWidth: 1,
      borderTopColor: theme.glass.border,
    },
    footerBtn: { marginBottom: spacing.sm },
    version: {
      ...typography.caption,
      color: theme.text.faint,
      textAlign: 'center',
      marginBottom: spacing.sm,
    },
  });

export const createDynamicStyles = insets => ({
  headerPad: { paddingTop: insets.top + 18 },
  footerPad: { paddingBottom: insets.bottom + 12 },
});
