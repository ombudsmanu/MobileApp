import React, {useMemo} from 'react';
import {TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../context/ThemeContext';
import {createStyles, SHEEN_GEOMETRY} from './GlassField.styles';
import {radii} from '../../theme/tokens';

/**
 * GLASS FIELD — the frosted text box used across the app (Login, forms).
 *
 *   style       the outer box (margins, width)
 *   inputStyle  the text inside it — alignment, height. The complaint forms
 *               pass right-alignment here in Urdu, so every field's text
 *               starts on the same side whether it holds Urdu, digits or
 *               an email address.
 *   focused / errored  border states
 *   action      an element on the trailing side (e.g. the password eye)
 *   any other TextInput prop passes straight through
 */
const GlassField = ({focused, errored, action, style, inputStyle, ...inputProps}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={[styles.wrap, focused && styles.focused, errored && styles.errored, style]}>
      <LinearGradient
        pointerEvents="none"
        colors={[theme.glass.sheenFrom, 'transparent']}
        start={SHEEN_GEOMETRY.start}
        end={SHEEN_GEOMETRY.end}
        style={[styles.sheen, {borderRadius: radii.md}]}
      />
      <View pointerEvents="none" style={styles.topHighlight} />
      <TextInput
        style={[styles.input, action && styles.inputWithAction, inputStyle]}
        placeholderTextColor={theme.control.placeholder}
        {...inputProps}
      />
      {action}
    </View>
  );
};

export default GlassField;