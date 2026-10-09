import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import Text from '../../../components/AppText/AppText';
import GlassField from '../../../components/GlassField/GlassField';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {createFieldStyles} from './parts.styles';

/**
 * FORM FIELD — a labelled text input, built on the app's GlassField so it
 * matches the Login screen and the rest of the app.
 *
 *   label     the field label (already translated)
 *   required  shows a red asterisk after the label
 *   helper    small grey line under the label (e.g. a format hint)
 *   error     red line under the field; also turns the border red
 *   value / onChangeText and any other TextInput props pass straight through
 *
 * The label and helper align to the right in Urdu automatically.
 */
const FormField = ({
  label,
  required = false,
  helper,
  error,
  value,
  onChangeText,
  style,
  ...inputProps
}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createFieldStyles(theme), [theme]);
  const {isRTL} = useLanguage();
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.wrap, style]}>
      <Text style={[styles.label, isRTL && styles.rtl]}>
        {label}
        {required ? <Text style={styles.star}> *</Text> : null}
      </Text>
      {helper ? (
        <Text style={[styles.helper, isRTL && styles.rtl]}>{helper}</Text>
      ) : null}
      <GlassField
        focused={focused}
        errored={!!error}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholderTextColor={theme.control.placeholder}
        {...inputProps}
      />
      {error ? (
        <Text style={[styles.error, isRTL && styles.rtl]}>{error}</Text>
      ) : null}
    </View>
  );
};

export default FormField;