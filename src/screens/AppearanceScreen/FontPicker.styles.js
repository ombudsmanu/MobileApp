import { StyleSheet } from 'react-native';
import { radii, spacing } from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3)
 *   Title Medium — card title
 *   Body Medium  — the closed dropdown, each option
 *   Body Small   — hint and note
 *   Label Medium — group headings
 */
export const createStyles = theme =>
  StyleSheet.create({
    card: { padding: spacing.md, marginTop: spacing.md },
    cardTitle: { ...theme.type.titleMedium, textAlign: 'center' },
    cardSub: { ...theme.type.bodySmall, textAlign: 'center' },
    rowRTL: { flexDirection: 'row-reverse' },
    textRTL: { textAlign: 'right', writingDirection: 'rtl' },

    // ---- The closed dropdown ----
    trigger: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: spacing.sm,
      marginTop: spacing.md,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fillStrong,
    },
    triggerText: { ...theme.type.bodyMedium, flex: 1 },
    chevronClosed: { transform: [{ rotate: '180deg' }] },
    chevronOpen: { transform: [{ rotate: '0deg' }] },

    // ---- The open list ----
    list: { marginTop: spacing.sm },
    groupTitle: {
      ...theme.type.labelMedium,
      textTransform: 'uppercase',
      writingDirection: 'rtl',
      marginTop: spacing.sm,
      marginBottom: spacing.xs,
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      columnGap: spacing.sm,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.md,
      borderRadius: radii.md,
      borderWidth: 1,
      borderColor: 'transparent',
    },
    optionSelected: {
      borderColor: theme.accent,
      backgroundColor: theme.glass.fillStrong,
    },
    optionPressed: { opacity: 0.8 },
    optionLabel: { ...theme.type.bodyMedium },
    note: { ...theme.type.bodySmall, marginTop: spacing.sm },
  });
