import {StyleSheet} from 'react-native';
import {radii} from '../../theme/tokens';

export const createStyles = theme =>
  StyleSheet.create({
       surface: {
      backgroundColor: theme.glass.fill,
      borderWidth: 1,
      borderColor: theme.glass.border,
      borderRadius: radii.lg,
      overflow: 'hidden',
      // A wallpaper is busy, so cards need a stronger shadow to separate
      // from it. On flat backgrounds a softer shadow looks cleaner.
      elevation: theme.bgMode === 'image' ? 14 : 10,
      shadowColor: theme.glass.shadow,
      shadowOpacity: theme.bgMode === 'image' ? 0.45 : 0.3,
      shadowRadius: theme.bgMode === 'image' ? 26 : 20,
      shadowOffset: {width: 0, height: theme.bgMode === 'image' ? 12 : 10},
    },
    centered: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    strong: {backgroundColor: theme.glass.fillStrong},
    sheen: {...StyleSheet.absoluteFillObject},
    topHighlight: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 1.5,
      backgroundColor: theme.glass.highlight,
    },
    bottomRim: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      height: 1,
      backgroundColor: theme.glass.rim,
    },
    content: {position: 'relative', flexShrink: 1},
    centeredContent: {
      ...StyleSheet.absoluteFillObject,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export const SHEEN_GEOMETRY = {
  locations: [0, 0.55, 1],
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
};