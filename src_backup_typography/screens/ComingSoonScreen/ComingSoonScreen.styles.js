import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

export const createStyles = theme =>
  StyleSheet.create({
    topBar: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: spacing.lg,
      paddingBottom: spacing.md,
    },
    backBtn: {width: 44, height: 44},
    topTitle: {...theme.type.title, flex: 1, marginLeft: spacing.md},

    content: {flex: 1, justifyContent: 'center', paddingHorizontal: spacing.lg},
    card: {paddingVertical: spacing.xl, paddingHorizontal: spacing.lg},
    inner: {alignItems: 'center'},

    iconRing: {
      width: 84,
      height: 84,
      borderRadius: 42,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: spacing.md,
      backgroundColor: 'rgba(232, 145, 58, 0.12)',
      borderWidth: 2,
      borderColor: 'rgba(232, 145, 58, 0.35)',
    },
    iconRingDenied: {
      backgroundColor: 'rgba(192, 57, 43, 0.10)',
      borderColor: 'rgba(192, 57, 43, 0.35)',
    },
    heading: {...theme.type.heading, textAlign: 'center'},
    message: {...theme.type.body, textAlign: 'center', marginTop: spacing.xs},
    backCta: {marginTop: spacing.lg, alignSelf: 'stretch'},
  });

export const createDynamicStyles = insets => ({
  topBarPad: {paddingTop: insets.top + spacing.sm},
  bottomPad: {paddingBottom: insets.bottom + spacing.xl},
});

export const BACK_RADIUS = radii.md;