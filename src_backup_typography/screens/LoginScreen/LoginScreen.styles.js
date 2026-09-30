import {StyleSheet} from 'react-native';
import {fonts, radii, spacing} from '../../theme/tokens';
/**
 * TYPOGRAPHY STANDARD
 *   Title      — "Sign in"
 *   Paragraph  — intro sentence, "Remember me"
 *   Label      — Back, USERNAME / PASSWORD, SHOW/HIDE (orange),
 *                Forgot password? (orange — it's a link)
 *   Caption    — OR divider, footer
 */
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
    // LABEL
    backText: {...theme.type.heading, marginLeft: 4},

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
    heading: {...theme.type.title, ...(fonts?.extrabold ? {fontFamily: fonts.extrabold} : {fontWeight: '800'})},
    subheading: {...theme.type.body, marginTop: spacing.xs},

    card: {padding: spacing.lg},
  
    // LABEL
    label: {...theme.type.label, marginBottom: spacing.xs},
    labelSpaced: {marginTop: spacing.md},

    toggle: {
      position: 'absolute',
      right: spacing.sm,
      paddingHorizontal: spacing.xs,
      paddingVertical: 4,
    },
    // LABEL · orange
    toggleText: {...theme.type.label, color: theme.accent},

    error: {color: theme.danger, fontSize: 12, marginTop: 6, marginLeft: 2},

    optionsRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: spacing.md,
    },
    rememberRow: {flexDirection: 'row', alignItems: 'center'},
       rememberRow: {flexDirection: 'row', alignItems: 'center', paddingVertical: 4},
    checkbox: {
      width: 24,
      height: 24,
      borderRadius: 7,
      borderWidth: 2,
      // Control colour, not glass border: it stays clearly visible on any
      // background, and flips to light automatically on dark backgrounds
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
      shadowOffset: {width: 0, height: 2},
    },
    rememberText: {...theme.type.body, color: theme.control.label},
    submit: {marginTop: spacing.lg},

    dividerRow: {flexDirection: 'row', alignItems: 'center', marginVertical: spacing.md},
    dividerLine: {flex: 1, height: 1, backgroundColor: theme.glass.border},
    // CAPTION
    dividerText: {...theme.type.caption, marginHorizontal: spacing.sm},

    // CAPTION
    footer: {
      ...theme.type.caption,
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