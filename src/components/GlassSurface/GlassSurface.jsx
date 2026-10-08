import React, {useMemo} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../context/ThemeContext';
import {radii} from '../../theme/tokens';
import {createStyles, SHEEN_GEOMETRY} from './GlassSurface.styles';

/**
 * GLASS SURFACE — the frosted card used throughout the app.
 *
 *   style         the card's own size, padding, margins
 *   contentStyle  layout for the children (they sit in an inner view, so a
 *                 flexDirection on `style` would land on the wrong element)
 *   strong        a more opaque fill, for cards over busy backgrounds
 *   radius        corner radius (defaults to the style's, then radii.lg)
 *   center        centre a single child, with no inner content view
 *
 * Layers, back to front: the fill, border and shadow, a diagonal sheen
 * gradient, then the content. The thin decorative lines that used to run
 * along the top and bottom edges were removed for a cleaner look.
 */
const GlassSurface = ({
  children,
  style,
  contentStyle,
  strong = false,
  radius,
  center = false,
}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  // The sheen must round ITSELF — on Android a gradient doesn't render
  // inside a parent that clips it
  const cornerRadius = radius ?? StyleSheet.flatten(style)?.borderRadius ?? radii.lg;

  return (
    <View
      style={[
        styles.surface,
        strong && styles.strong,
        center && styles.centered,
        radius != null && {borderRadius: radius},
        style,
      ]}>
      <LinearGradient
        pointerEvents="none"
        colors={[theme.glass.sheenFrom, 'transparent', theme.glass.sheenTo]}
        locations={SHEEN_GEOMETRY.locations}
        start={SHEEN_GEOMETRY.start}
        end={SHEEN_GEOMETRY.end}
        style={[styles.sheen, {borderRadius: cornerRadius}]}
      />
      {center ? children : <View style={[styles.content, contentStyle]}>{children}</View>}
    </View>
  );
};

export default GlassSurface;