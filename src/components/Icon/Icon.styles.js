import {StyleSheet} from 'react-native';

/**
 * Icons are composed from plain Views — no font file, no native rebuild.
 * Every shape scales from a single `size` prop and takes its colour from
 * the caller, so icons retint with the theme automatically.
 */
export const createStyles = (size, color, weight) =>
  StyleSheet.create({
    box: {width: size, height: size, alignItems: 'center', justifyContent: 'center'},
    bar: {backgroundColor: color, borderRadius: weight, position: 'absolute'},
    square: {borderColor: color, borderWidth: weight, borderRadius: weight * 1.5, position: 'absolute'},
    circle: {borderColor: color, borderWidth: weight, borderRadius: size, position: 'absolute'},
    fill: {backgroundColor: color, borderRadius: weight, position: 'absolute'},
  });