import {StyleSheet} from 'react-native';
import {radii, spacing, typography} from '../../theme/tokens';

export const createStyles = theme =>
  StyleSheet.create({
    flex: {flex: 1},
    scroll: {flexGrow: 1, justifyContent: 'center', paddingHorizontal: spacing.lg},

    backButton: {
      flexDirection: 'row',
      alignItems: 'center',
      alignSelf: 'flex-start',
      marginBottom: spacing.md,
      paddingVertical: spacing.xs,
    },
    backText: {...typography.label, color: theme.text.muted, marginLeft: 4},

    header: {marginBottom: spacing.lg, paddingHorizontal: spacing.xs},
    heading: {...typography.display, fontSize: 26, color: theme.text.title},
    subheading: {...typography.body, color: theme.text.body, marginTop: spacing.xs},

    card: {padding: spacing.lg},
    label: {...typography.label, color: theme.text.muted, marginBottom: spacing.xs},
    labelSpaced: {marginTop: spacing.md},

    toggle: {
      position: 'absolute',
      right: spacing.sm,
      paddingHorizontal: spacing.xs,
      paddingVertical: 4,
    },
    toggleText: {...typography.label, fontSize: 11, color: theme.accent},

    error: {color: theme.danger, fontSize: 12, marginTop: 6, marginLeft: 2},

    optionsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: spacing.md,
    },
    rememberRow: {flexDirection: 'row', alignItems: 'center'},
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: radii.sm,
      borderWidth: 1.5,
      borderColor: theme.glass.border,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.xs,
    },
    checkboxOn: {backgroundColor: theme.accent, borderColor: theme.accent},
    rememberText: {...typography.label, color: theme.text.body},
    forgot: {...typography.label, color: theme.text.muted},

    submit: {marginTop: spacing.lg},

    dividerRow: {flexDirection: 'row', alignItems: 'center', marginVertical: spacing.md},
    dividerLine: {flex: 1, height: 1, backgroundColor: theme.glass.border},
    dividerText: {
      ...typography.caption,
      color: theme.text.faint,
      marginHorizontal: spacing.sm,
    },

    footer: {
      ...typography.caption,
      color: theme.text.faint,
      textAlign: 'center',
      marginTop: spacing.lg,
    },
  });

export const createDynamicStyles = insets => ({
  scrollPadding: {
    paddingTop: insets.top + spacing.xl,
    paddingBottom: insets.bottom + spacing.xl,
  },
});

export const animationConfig = {fadeInDuration: 600, fadeInOffset: 28};

/**
 * Username: starts with a letter, then letters, numbers, . _ or -
 * Recommended format: firstname.lastname
 */
export const validationRules = {
  usernamePattern: /^[A-Za-z][A-Za-z0-9._-]*$/,
  minUsernameLength: 3,
  maxUsernameLength: 30,
  minPasswordLength: 6,
};