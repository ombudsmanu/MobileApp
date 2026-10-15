import {StyleSheet} from 'react-native';
import {radii, spacing} from '../../theme/tokens';

/**
 * TYPOGRAPHY (MD3): Title Medium, in the row's own colour.
 * overflow:'hidden' trims the coloured bar to the card's rounded corners
 * (the card's shadow is not affected by it on Android).
 */
export const createStyles = theme =>
  StyleSheet.create({
    row: {paddingVertical: spacing.lg, paddingHorizontal: spacing.lg, overflow: 'hidden'},
    // A plain row with no icon centres the label (unchanged). With an icon
    // the badge leads and the label fills the rest, staying centred in it.
    rowInner: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
    // In Urdu the icon leads from the right
    rowInnerRTL: {flexDirection: 'row-reverse'},
    // Coloured bar on the leading edge, full height of the row
    bar: {position: 'absolute', top: -40, bottom: -40, width: 5},
    barStart: {left: -spacing.lg},
    barEnd: {right: -spacing.lg},
    // Round icon badge before the label
    badge: {
      width: 44,
      height: 44,
      borderRadius: radii.pill,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    label: {...theme.type.titleMedium, textAlign: 'center'},
    // When a badge is present the label takes the remaining width and stays
    // centred within it, so it reads as one balanced row
    labelWithIcon: {flex: 1, marginHorizontal: spacing.sm},
  });