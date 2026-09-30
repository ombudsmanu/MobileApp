import React, {useMemo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../context/ThemeContext';
import {createStyles, SHEEN_GEOMETRY} from './GlassSurface.styles';
import {StyleSheet, View} from 'react-native';
import {radii} from '../../theme/tokens';
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
        style={[styles.sheen, {borderRadius: cornerRadius}]}      />
      <View pointerEvents="none" style={styles.topHighlight} />
      <View pointerEvents="none" style={styles.bottomRim} />
      {center ? children : <View style={[styles.content, contentStyle]}>{children}</View>}
    </View>
  );
};

export default GlassSurface;