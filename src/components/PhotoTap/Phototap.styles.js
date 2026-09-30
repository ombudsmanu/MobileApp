import {StyleSheet} from 'react-native';
import {spacing} from '../../theme/tokens';

/**
 * The viewer is always dark, whatever background the user has chosen in
 * Appearance — a photo reads best on a dark surround, the same way every
 * phone gallery works. So its colours are fixed; only the type scale comes
 * from the theme.
 *
 * TYPOGRAPHY (MD3): Title Large (name) → Body Medium (caption) → Body Small (hint)
 */
export const VIEWER = {
  maxSize: 440, // the photo's longest side never exceeds this (tablets)
  sideGap: 24, // space either side of the photo on a phone
  maxHeightShare: 0.55, // leaves room below the photo for name + caption
  maxUpscale: 2.5, // a small photo is enlarged at most this many times
  radius: 16,
};

export const createStyles = theme =>
  StyleSheet.create({
    thumbPressed: {opacity: 0.8, transform: [{scale: 0.96}]},

    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(8, 12, 10, 0.92)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    stage: {
      alignItems: 'center',
      paddingHorizontal: VIEWER.sideGap,
    },
    photo: {
      borderRadius: VIEWER.radius,
      backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    name: {
      ...theme.type.titleLarge,
      color: '#FFFFFF',
      marginTop: spacing.lg,
      textAlign: 'center',
      textShadowColor: 'transparent',
    },
    caption: {
      ...theme.type.bodyMedium,
      color: 'rgba(255, 255, 255, 0.75)',
      marginTop: 4,
      textAlign: 'center',
      textShadowColor: 'transparent',
    },

    closeBtn: {
      position: 'absolute',
      width: 44,
      height: 44,
      borderRadius: 22,
      backgroundColor: 'rgba(255, 255, 255, 0.14)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeRight: {right: 16},
    closeLeft: {left: 16},

    hint: {
      ...theme.type.bodySmall,
      position: 'absolute',
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'rgba(255, 255, 255, 0.55)',
      textShadowColor: 'transparent',
    },
  });