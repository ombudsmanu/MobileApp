import {StyleSheet} from 'react-native';
import {spacing} from '../../theme/tokens';

/**
 * BRAND INTRO — timing and sizes in one place.
 *
 * The whole screen lasts fadeInMs + holdMs + fadeOutMs = about 2.4 seconds.
 * Change holdMs alone to make it linger longer or shorter.
 */
export const INTRO = {
  crestSize: 150,
  fadeInMs: 550,
  holdMs: 1500,
  fadeOutMs: 320,
  scaleFrom: 0.88, // the crest grows into place from 88%
  riseFrom: 14, // the heading slides up 14 dp as it fades in
};

export const createStyles = theme =>
  StyleSheet.create({
    screen: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: spacing.lg,
    },
    crest: {
      width: INTRO.crestSize,
      height: INTRO.crestSize,
      marginBottom: spacing.lg,
    },
    title: {
      ...theme.type.headlineMedium,
      color: theme.brandGreen,
      textAlign: 'center',
    },
    /** Urdu: right-to-left run order. Nastaleeq has no bold, so the weight
     *  drops back to normal — AppText does this too, set here for clarity. */
    titleRTL: {
      writingDirection: 'rtl',
      fontWeight: '400',
    },
  });

export const createDynamicStyles = insets =>
  StyleSheet.create({
    screen: {
      paddingTop: insets.top + spacing.lg,
      paddingBottom: insets.bottom + spacing.lg,
    },
  });