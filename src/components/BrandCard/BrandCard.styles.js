import {StyleSheet} from 'react-native';
import {radii, spacing, weight} from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3) — runs largest to smallest within each part
 *   Title Small (extra bold) — office line
 *   Label Large              — "WELCOME TO", OPMIS pill
 *   Headline Medium (black)  — "Ombudsman Punjab", the heaviest text
 *   Title Medium (accent)    — "Management Information System"
 */
export const BRAND_CARD_RADIUS = radii.xl;

export const createStyles = theme =>
  StyleSheet.create({
    card: {
      paddingVertical: spacing.md,
      paddingHorizontal: spacing.lg,
      alignSelf: 'stretch',
    },
    // Centres every piece, including the fixed-width divider and pill
    content: {alignItems: 'center'},

       officeLine: {
      ...theme.type.titleSmall,
      ...theme.weight(800),
      textAlign: 'center',
      letterSpacing: 1,
      marginTop: 2,
    },
    welcome: {...theme.type.labelLarge, textAlign: 'center', letterSpacing: 2},
    divider: {
      width: 40,
      height: 3,
      borderRadius: 2,
      backgroundColor: theme.accent,
      marginVertical: spacing.sm,
    },
    // Black weight with tighter tracking — the brand name is the one place
    // that should feel heaviest
    orgName: {
      ...theme.type.headlineMedium,
      ...theme.weight(900),
      letterSpacing: -0.3,
      textAlign: 'center',
    },
    misLine: {
      ...theme.type.titleMedium,
      color: theme.accent,
      textAlign: 'center',
      marginTop: 2,
    },
    opmisPill: {
      marginTop: spacing.sm,
      paddingVertical: 8,
      paddingHorizontal: spacing.xl,
      borderRadius: radii.pill,
      // Fixed brand green — theme.brandGreen turns pale on dark backgrounds
      backgroundColor: '#326B38',
    },
    opmisPillText: {
      ...theme.type.labelLarge,
      color: '#FFFFFF',
      letterSpacing: 3,
      textShadowRadius: 0,
    },
  });