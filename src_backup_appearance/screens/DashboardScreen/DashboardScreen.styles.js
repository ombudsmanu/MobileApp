import { StyleSheet } from 'react-native';
import { radii, spacing, typography } from '../../theme/tokens';

export const createStyles = theme =>
  StyleSheet.create({
    flex: { flex: 1 },

    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    menuBtn: {
      width: 48,
      height: 48,
      marginRight: spacing.md,
    },
    topTitle: {
      ...typography.heading,
      fontSize: 19,
      color: theme.accent,
      letterSpacing: 0.5,
    },
    topSub: {
      ...typography.caption,
      color: theme.text.muted,
      marginTop: 2,
    },
    scroll: { paddingHorizontal: spacing.lg },

    welcomeCard: {
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.lg,
      marginTop: spacing.sm,
      minHeight: 132,
      justifyContent: 'center',
    },
    welcomeLabel: {
      ...typography.caption,
      color: theme.text.muted,
      letterSpacing: 1.2,
    },
    welcomeName: {
      ...typography.display,
      fontSize: 26,
      color: theme.accent,
      marginTop: 6,
    },
    welcomeBody: {
      ...typography.body,
      color: theme.text.body,
      marginTop: spacing.xs,
      lineHeight: 20,
    },
    sectionTitle: {
      ...typography.label,
      color: theme.text.muted,
      textTransform: 'uppercase',
      marginTop: spacing.xl,
      marginBottom: spacing.sm,
    },

    tileGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    tileOuter: {
      width: '48.5%',
      marginBottom: spacing.sm,
    },
    tile: {
      paddingVertical: spacing.lg,
      paddingHorizontal: spacing.md,
      minHeight: 136,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    tileDisabled: { opacity: 0.58 },
    tileIcon: {
      width: 44,
      height: 44,
      borderRadius: radii.md,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.sm,
    },
    tileLabel: {
      ...typography.label,
      fontSize: 13,
      lineHeight: 17,
      color: theme.text.heading,
    },
    tileSoon: {
      ...typography.caption,
      fontSize: 9,
      color: theme.accent,
      marginTop: 4,
      letterSpacing: 0.6,
    },
    hint: {
      ...typography.caption,
      color: theme.text.faint,
      textAlign: 'center',
      marginTop: spacing.lg,
      lineHeight: 16,
    },
  });

export const createDynamicStyles = insets => ({
  topBarPad: { paddingTop: insets.top + spacing.sm },
  scrollPad: { paddingBottom: insets.bottom + spacing.xxl },
});

export const MENU_RADIUS = radii.md;
