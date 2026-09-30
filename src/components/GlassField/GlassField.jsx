import React, {useMemo} from 'react';
import {TextInput, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useTheme} from '../../context/ThemeContext';
import {createStyles, SHEEN_GEOMETRY} from './GlassField.styles';
import {radii} from '../../theme/tokens';
const GlassField = ({focused, errored, action, style, ...inputProps}) => {
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
        style={[styles.input, action && styles.inputWithAction]}
        placeholderTextColor={theme.control.placeholder}
                {...inputProps}
      />
      {action}
    </View>
  );
};

export default GlassField;