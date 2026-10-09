import {StyleSheet} from 'react-native';

/**
 * HOW THE CELLS ADD UP  (W = grid width, N = cards per row, G = gap)
 *
 *   The grid reaches G/2 past each side (negative margin) and every cell is
 *   (W + G) / N wide with G/2 padding on each side. So every card is
 *   (W − (N − 1) × G) / N wide — the full width shared out, minus the gaps —
 *   and the outer cards line up exactly with the screen's padding.
 *
 * Percent widths need no measuring, so the grid is right on the very first
 * frame and re-flows instantly when the phone is rotated.
 */
export const createGridStyles = (columns, gap) =>
  StyleSheet.create({
    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginHorizontal: -gap / 2,
    },
    gridRTL: {flexDirection: 'row-reverse'},
    cell: {
      width: `${100 / columns}%`,
      paddingHorizontal: gap / 2,
      marginBottom: gap,
    },
  });