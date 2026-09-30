import React, {useEffect, useMemo, useState} from 'react';
import {Image, StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../context/ThemeContext';
import {resolveBackgroundSource} from '../../theme/backgrounds';
import AnimatedBlobs from '../AnimatedBlobs/AnimatedBlobs';

const BG_IMAGE_OPACITY = 0.3;

const GRADIENT = {
  locations: [0, 0.55, 1],
  start: {x: 0.15, y: 0},
  end: {x: 0.85, y: 1},
};

/**
 * Simple layered background. Uses zIndex to GUARANTEE draw order on Android.
 *
 *   zIndex 0  — gradient or solid colour (always present)
 *   zIndex 1  — faded image (only when an image is set)
 *   zIndex 2  — blobs
 *   zIndex 3  — children (the actual screen content)
 */
const AppBackground = ({children}) => {
  const {theme} = useTheme();

  const [imageFailed, setImageFailed] = useState(false);
  const imageSource = resolveBackgroundSource(theme.backgroundImage);

  useEffect(() => {
    setImageFailed(false);
  }, [theme.backgroundImage]);

  const isSolid = theme.bgMode === 'solid';
  const showImage = theme.bgMode === 'image' && !!imageSource && !imageFailed;

  return (
    <View style={[styles.root, isSolid && {backgroundColor: theme.solid}]}>
      {/* LAYER 0 — base gradient */}
      {!isSolid && (
        <LinearGradient
          colors={theme.bg}
          locations={GRADIENT.locations}
          start={GRADIENT.start}
          end={GRADIENT.end}
          style={[styles.abs, {zIndex: 0}]}
          pointerEvents="none"
        />
      )}

      {/* LAYER 1 — faded background image */}
      {showImage && (
        <Image
          source={imageSource}
          style={[styles.abs, {zIndex: 1, opacity: BG_IMAGE_OPACITY}]}
          resizeMode="cover"
          pointerEvents="none"
          onError={() => setImageFailed(true)}
        />
      )}

      {/* LAYER 2 — blobs */}
      <View style={[styles.abs, {zIndex: 2}]} pointerEvents="none">
        <AnimatedBlobs />
      </View>

      {/* LAYER 3 — screen content. zIndex 3 guarantees it draws on top. */}
      <View style={styles.content} pointerEvents="box-none">
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  abs: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    flex: 1,
    zIndex: 3,
  },
});

export default AppBackground;