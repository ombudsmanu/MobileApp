import {StyleSheet} from 'react-native';

/** Four badges spread evenly across the row, each fitted inside 58 × 58. */
export const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  badge: {width: 58, height: 58},
});