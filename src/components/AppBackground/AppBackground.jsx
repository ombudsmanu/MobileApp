import React, {useEffect, useState} from 'react';
import {Image, StyleSheet, useWindowDimensions, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../context/ThemeContext';
import {resolveBackgroundSource} from '../../theme/backgrounds';
import AnimatedBlobs from '../AnimatedBlobs/AnimatedBlobs';

const GRADIENT = {
  locations: [0, 0.55, 1],
  start: {x: 0.15, y: 0},
  end: {x: 0.85, y: 1},
};

/**
 * THREE BACKGROUND MODES
 *   gradient — official gradient + animated blobs
 *   solid    — flat colour, no blobs
 *   image    — full-screen wallpaper + readability veil, no blobs
 *
 * The wallpaper is given the screen's EXACT width and height. With only
 * absolute positioning, Android sometimes measures the image against the
 * content height instead of the screen and stops drawing partway down.
 *
 * zIndex guarantees draw order: background below, content always on top.
 */
const AppBackground = ({children, previewTheme}) => {
  const {theme: appTheme} = useTheme();
  const theme = previewTheme ?? appTheme;
  const {width, height} = useWindowDimensions();

  const [imageFailed, setImageFailed] = useState(false);
  const imageSource = resolveBackgroundSource(theme.backgroundImage);

  useEffect(() => {
    setImageFailed(false);
  }, [theme.backgroundImage]);

  let mode = 'gradient';
  if (theme.bgMode === 'image' && imageSource && !imageFailed) {
    mode = 'image';
  } else if (theme.bgMode === 'solid') {
    mode = 'solid';
  }

  const baseColor = mode === 'solid' ? theme.solid : theme.bg[theme.bg.length - 1];

  return (
    <View style={[styles.root, {backgroundColor: baseColor}]}>
      {mode === 'gradient' && (
        <>
          <LinearGradient
            colors={theme.bg}
            locations={GRADIENT.locations}
            start={GRADIENT.start}
            end={GRADIENT.end}
            style={[styles.abs, styles.z0]}
            pointerEvents="none"
          />
          <View style={[styles.abs, styles.z1]} pointerEvents="none">
            <AnimatedBlobs />
          </View>
        </>
      )}

            {mode === 'image' && (
        <>
          {/* Explicit width/height — this is what fixes the half-screen crop */}
          <Image
            source={imageSource}
            style={[styles.wallpaper, styles.z0, {width, height}]}
            resizeMode="cover"
            fadeDuration={0}
            onError={() => setImageFailed(true)}
          />
          {/* Even wash: takes the edge off busy photos without hiding them */}
          <View
            style={[
              styles.abs,
              styles.z1,
              {width, height, backgroundColor: theme.wallpaper.scrim},
            ]}
            pointerEvents="none"
          />
          {/* Directional fade: strong at the top, clear through the middle */}
          <LinearGradient
            colors={theme.wallpaper.veil}
            locations={theme.wallpaper.locations}
            style={[styles.abs, styles.z1, {width, height}]}
            pointerEvents="none"
          />
        </>
      )}

      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {flex: 1, overflow: 'hidden'},
  abs: {position: 'absolute', top: 0, left: 0, right: 0, bottom: 0},
  wallpaper: {position: 'absolute', top: 0, left: 0},
  z0: {zIndex: 0},
  z1: {zIndex: 1},
  content: {flex: 1, zIndex: 3},
});

export default AppBackground;