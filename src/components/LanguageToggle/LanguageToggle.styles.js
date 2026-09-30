import {StyleSheet} from 'react-native';
import {radii} from '../../theme/tokens';

/**
 * Same look as the Dashboard / Appearance toggle.
 * TYPOGRAPHY (MD3): Label Medium. Colours come from theme.control, so the
 * toggle stays readable whatever text colours the user picks in Appearance.
 */
export const createStyles = theme =>
  StyleSheet.create({
    toggle: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 3,
      borderRadius: radii.pill,
      borderWidth: 1,
      borderColor: theme.glass.border,
      backgroundColor: theme.glass.fillStrong,
    },
    // Fixed height + centred content: EN and اردو line up even though
    // Nastaleeq needs a taller line than Latin text
    option: {
      height: 30,
      minWidth: 44,
      paddingHorizontal: 11,
      borderRadius: radii.pill,
      alignItems: 'center',
      justifyContent: 'center',
    },
    optionActive: {backgroundColor: theme.accent},
    text: {
      ...theme.type.labelMedium,
      color: theme.control.label,
      textShadowRadius: 0,
    },
    textActive: {color: theme.text.onAccent},
  });