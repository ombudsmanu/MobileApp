import React, {useMemo} from 'react';
import {View} from 'react-native';
import {GRID, useGridColumns} from '../../theme/responsive';
import {createGridStyles} from './ResponsiveGrid.styles';

/**
 * RESPONSIVE GRID — lays its children out as cards in rows. How many per
 * row depends on the screen (GRID in theme/responsive.js):
 *   phone 2 · tablet 3 · landscape 4
 *
 *   <ResponsiveGrid rtl={isRTL}>
 *     {items.map(item => <ModuleTile key={item.key} … />)}
 *   </ResponsiveGrid>
 *
 *   rtl      fill each row from the right (Urdu)
 *   columns  force a number per row (optional — normally left out)
 *   style    spacing around the grid
 *
 * Every child sits in its own cell and the CELL decides the width, so a
 * card inside must not set a width of its own — it simply fills its cell.
 *
 * Gaps are equal across and down. A short last row starts at the row's
 * start (left, or right in Urdu) instead of being pulled apart.
 */
const ResponsiveGrid = ({columns, rtl = false, style, children}) => {
  const autoColumns = useGridColumns();
  const count = columns ?? autoColumns;
  const grid = useMemo(() => createGridStyles(count, GRID.gap), [count]);

  return (
    <View style={[grid.grid, rtl && grid.gridRTL, style]}>
      {React.Children.map(children, child =>
        child ? <View style={grid.cell}>{child}</View> : null,
      )}
    </View>
  );
};

export default ResponsiveGrid;