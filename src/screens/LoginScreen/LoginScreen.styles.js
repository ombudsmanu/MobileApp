import { StyleSheet } from 'react-native';
import { radii, spacing } from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3)
 *   Headline Small — "Sign in"
 *   Body Medium    — intro sentence, "Remember me"
 *   Body Small     — field errors, footer
 *   Label Large    — Back
 *   Label Medium   — USERNAME / PASSWORD, SHOW/HIDE
 *   Label Small    — OR divider
 */
export const createStyles = theme =>
  StyleSheet.create({
    flex: { flex: 1 },
    scroll: {
      flexGrow: 1,
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },
    // Glass pill, matching the back button on every other screen.
    // The wrapper only positions it — GlassSurface draws the surface, and
    // its inner content view carries the row layout (a flexDirection set
    // on GlassSurface's own style would land on the wrong element).
    backWrap: { alignSelf: 'flex-start', marginBottom: spacing.md },
    backPressed: { opacity: 0.85, transform: [{ scale: 0.97 }] },
    backInner: {
      flexDirection: 'row',
      alignItems: 'center',
      columnGap: 6,
      height: 44,
      paddingLeft: spacing.sm,
      paddingRight: spacing.md,
    },
    backText: { ...theme.type.labelLarge, color: theme.text.heading },

    header: {
      alignSelf: 'stretch',
      marginBottom: spacing.lg,
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      borderRadius: radii.lg,
      backgroundColor: theme.glass.fillStrong,
      borderWidth: 1,
      borderColor: theme.glass.border,
    },
    heading: { ...theme.type.headlineSmall },
    subheading: { ...theme.type.bodyMedium, marginTop: spacing.xs },

    card: { padding: spacing.lg },
    label: { ...theme.type.labelMedium, marginBottom: spacing.xs },
    labelSpaced: { marginTop: spacing.md },

    // A square tap target for the eye icon, vertically centred in the field
    toggle: {
      position: 'absolute',
      right: spacing.xs,
      width: 40,
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    error: {
      ...theme.type.bodySmall,
      color: theme.danger,
      marginTop: 6,
      marginLeft: 2,
    },

    optionsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.md,
    },
    rememberRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
    },
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 7,
      borderWidth: 2,
      borderColor: theme.control.label,
      backgroundColor: theme.glass.fillStrong,
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: spacing.sm,
    },
    checkboxOn: {
      backgroundColor: theme.accent,
      borderColor: theme.accent,
      elevation: 3,
      shadowColor: theme.accent,
      shadowOpacity: 0.35,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
    },
    rememberText: { ...theme.type.bodyMedium, color: theme.control.label },

    submit: { marginTop: spacing.lg },

    dividerRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: spacing.md,
    },
    dividerLine: { flex: 1, height: 1, backgroundColor: theme.glass.border },
    dividerText: { ...theme.type.labelSmall, marginHorizontal: spacing.sm },

    footer: {
      ...theme.type.bodySmall,
      textAlign: 'center',
      marginTop: spacing.xxl,
    },
  });

export const createDynamicStyles = insets => ({
  scrollPadding: {
    paddingTop: insets.top + spacing.xl,
    paddingBottom: insets.bottom + spacing.xl,
  },
});

export const animationConfig = { fadeInDuration: 600, fadeInOffset: 28 };

/** Username: starts with a letter, then letters, numbers, . _ or - */
export const validationRules = {
  usernamePattern: /^[A-Za-z][A-Za-z0-9._-]*$/,
  minUsernameLength: 3,
  maxUsernameLength: 30,
  minPasswordLength: 6,
};
/** Corner radius of the back pill — fully rounded. */
export const BACK_RADIUS = radii.pill;
