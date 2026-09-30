import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/** Delay between each card's entrance, in milliseconds. */
export const TILE_STAGGER_MS = 90;

/**
 * FIXED ROWS — nothing can overflow:
 *   18 pad + badge 56 + 6 gap + name 52 + 6 gap + pill 26 = 164, card 184
 */
export const createStyles = theme =>
  StyleSheet.create({
    tileOuter: {width: '48.5%', marginBottom: spacing.sm},
    tile: {
      paddingTop: 18,
      paddingHorizontal: spacing.sm,
      height: 184,
      alignItems: 'center',
      justifyContent: 'flex-start',
      backgroundColor: theme.glass.fillStrong,
      borderWidth: 1,
      borderColor: theme.glass.border,
      borderRadius: radii.lg,
      elevation: 6,
      shadowColor: theme.glass.shadow,
      shadowOpacity: 0.35,
      shadowRadius: 14,
      shadowOffset: {width: 0, height: 6},
    },
    tileAccent: {
      position: 'absolute',
      top: 0,
      left: 24,
      right: 24,
      height: 3,
      borderBottomLeftRadius: 3,
      borderBottomRightRadius: 3,
    },
    // The shell casts the shadow; the gradient rounds ITSELF
    badgeShell: {
      width: 56,
      height: 56,
      borderRadius: 18,
      elevation: 4,
      shadowColor: '#000000',
      shadowOpacity: 0.2,
      shadowRadius: 6,
      shadowOffset: {width: 0, height: 3},
    },
    badge: {
      width: 56,
      height: 56,
      borderRadius: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    nameRow: {
      height: 52,
      marginTop: 6,
      alignSelf: 'stretch',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    tileLabel: {...theme.type.titleMedium, textAlign: 'center', lineHeight: 22, alignSelf: 'stretch'},
    tileLabelUrdu: {writingDirection: 'rtl', textAlign: 'center'},
    soonPill: {
      marginTop: 6,
      height: 26,
      paddingHorizontal: 10,
      borderRadius: radii.pill,
      backgroundColor: 'rgba(212, 113, 28, 0.12)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    tileSoon: {...theme.type.labelSmall, color: theme.accent, textAlign: 'center'},
  });