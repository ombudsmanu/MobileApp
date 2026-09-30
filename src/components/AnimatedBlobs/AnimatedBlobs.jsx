import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, Easing, View, useWindowDimensions} from 'react-native';
import {useTheme} from '../../context/ThemeContext';
import {
  createStyles,
  createBlobLayouts,
  RING_FACTORS,
  ringOpacity,
  BLOB_TIMINGS,
} from './AnimatedBlobs.styles';

const SoftBlob = ({size, color, styles}) => (
  <View pointerEvents="none" style={[styles.blobWrap, {width: size, height: size}]}>
    {RING_FACTORS.map((f, i) => (
      <View
        key={f}
        style={[
          styles.ring,
          {
            width: size * f,
            height: size * f,
            borderRadius: (size * f) / 2,
            backgroundColor: color,
            opacity: ringOpacity(i),
          },
        ]}
      />
    ))}
  </View>
);

/** Loops 0 → 1 → 0 forever on the native thread. */
const useFloatValue = (duration, delay) => {
  const value = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(value, {
          toValue: 1,
          duration,
          delay,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [value, duration, delay]);
  return value;
};

const AnimatedBlobs = () => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(), []);
  const {width, height} = useWindowDimensions();

  const v0 = useFloatValue(BLOB_TIMINGS[0].duration, BLOB_TIMINGS[0].delay);
  const v1 = useFloatValue(BLOB_TIMINGS[1].duration, BLOB_TIMINGS[1].delay);
  const v2 = useFloatValue(BLOB_TIMINGS[2].duration, BLOB_TIMINGS[2].delay);
  const v3 = useFloatValue(BLOB_TIMINGS[3].duration, BLOB_TIMINGS[3].delay);
  const values = [v0, v1, v2, v3];

  const size = Math.min(width, height) * 0.85;
  const layouts = useMemo(
    () => createBlobLayouts(width, height, size),
    [width, height, size],
  );

  return (
    <View style={styles.layer} pointerEvents="none">
      {layouts.map((layout, i) => {
        const v = values[i];
        const transform = [
          {translateY: v.interpolate({inputRange: [0, 1], outputRange: layout.translateY})},
        ];
        if (layout.translateX) {
          transform.push({
            translateX: v.interpolate({
              inputRange: [0, 1],
              outputRange: layout.translateX,
            }),
          });
        }
        transform.push({
          scale: v.interpolate({inputRange: [0, 1], outputRange: layout.scale}),
        });

        return (
          <Animated.View key={i} style={[layout.position, {transform}]}>
            <SoftBlob
              size={layout.size}
              color={theme.blobs[i % theme.blobs.length]}
              styles={styles}
            />
          </Animated.View>
        );
      })}
    </View>
  );
};

export default AnimatedBlobs;