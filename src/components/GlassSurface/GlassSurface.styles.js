import {StyleSheet} from 'react-native';
import {CARD_SHADOW, CARD_SHADOW_STRONG, radii} from '../../theme/tokens';

export const createStyles = theme =>
  StyleSheet.create({
    surface: {
      backgroundColor: theme.glass.fill,
      borderWidth: 1,
      borderColor: theme.glass.border,
      borderRadius: radii.lg,
      // The app's shared card shadow (see CARD_SHADOW in tokens.js). A photo
      // wallpaper is busy, so cards over it get the stronger version.
      boxShadow: theme.bgMode === 'image' ? CARD_SHADOW_STRONG : CARD_SHADOW,
    },
    centered: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    strong: {backgroundColor: theme.glass.fillStrong},
    sheen: {...StyleSheet.absoluteFillObject},
    content: {position: 'relative', flexShrink: 1},
  });

export const SHEEN_GEOMETRY = {
  locations: [0, 0.55, 1],
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
};