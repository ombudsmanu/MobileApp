import {StyleSheet} from 'react-native';

export const createStyles = () =>
  StyleSheet.create({
    layer: {...StyleSheet.absoluteFillObject},
    blobWrap: {alignItems: 'center', justifyContent: 'center'},
    ring: {position: 'absolute'},
  });

export const RING_FACTORS = [1, 0.82, 0.64, 0.46, 0.3];
export const ringOpacity = i => 0.08 + i * 0.04;
/** Mismatched periods stop them pulsing in lockstep. */
export const BLOB_TIMINGS = [
  {duration: 6200, delay: 0},
  {duration: 8400, delay: 400},
  {duration: 7300, delay: 900},
  {duration: 7800, delay: 600},
];

export const createBlobLayouts = (width, height, size) => [
  {
    position: {position: 'absolute', top: -size * 0.28, left: -size * 0.3},
    size,
    translateY: [0, 42],
    translateX: [0, 26],
    scale: [1, 1.1],
  },
  {
    position: {position: 'absolute', top: height * 0.24, right: -size * 0.42},
    size: size * 0.9,
    translateY: [0, -50],
    translateX: null,
    scale: [1.05, 0.92],
  },
  {
    position: {position: 'absolute', bottom: -size * 1.7, left: width * 0.01},
    size,
    translateY: [0, -34],
    translateX: [0, -28],
    scale: [0.7, 1.08],
  },
  {
    position: {position: 'absolute', bottom: -size * 3, left: (width - size) / 2},
    size,
    translateY: [0, -28],
    translateX: null,
    scale: [0.7, 1.2],
  },
];