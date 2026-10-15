import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import Text from '../../../components/AppText/AppText';
import GlassField from '../../../components/GlassField/GlassField';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {createFieldStyles, MULTILINE_LINES} from './parts.styles';

/** Any Arabic-script letter — the same test AppText uses to spot Urdu. */
const ARABIC_SCRIPT =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

/**
 * FORM FIELD — a labelled text input, built on the app's GlassField so it
 * matches the Login screen and the rest of the app.
 *
 *   label     the field label (already translated)
 *   required  shows a red asterisk after the label
 *   helper    small grey line under the label (e.g. a format hint)
 *   error     red line under the field; also turns the border red
 *   prefix    fixed text in a grey box IN FRONT of the input that the user
 *             cannot edit — the dialling code "00966" on International
 *             Mobile / Landline. The value holds only what was typed.
 *   value / onChangeText and any other TextInput props pass straight through
 *
 * URDU — the label, helper and error align right, and so does the text in
 * the box: EVERY field, whether it holds Urdu, a phone number or an email,
 * starts on the right, so the column of fields reads as one straight edge.
 * The one exception is a field with a PREFIX: a phone number reads left to
 * right in every language, so the prefix stays on the left and the number
 * follows straight after it ("00966 512345678"), never mirrored.
 *
 * SAME FONT AS THE LABEL — when the app is in Urdu and the field's
 * placeholder is Urdu (the name fields, the addresses, Subject), the box
 * uses the Nastaleeq label font, so it matches its label. Number and email
 * fields have Latin placeholders (03000000000) and keep the input font in
 * both languages.
 *
 * The font is decided by the LANGUAGE and the placeholder — never by what
 * the user is typing — so it can only change when the language button is
 * pressed, not in the middle of typing.
 *
 * FRESH BOX ON A FONT CHANGE — Android does not fully reset a text box
 * whose font is changed while it is on screen: it keeps the tall Nastaleeq
 * line measurements, and after switching back to English the placeholder
 * was drawn too high, its top cut off. So the box is keyed by its font
 * ('urdu' / 'latin'): switching language swaps in a brand-new native text
 * box. Nothing typed is lost — the value lives in the form, not the box.
 *
 * onFocus / onBlur — a screen may pass its own; they run AFTER the field's
 * focus-border handling instead of replacing it (the complaint forms use
 * onBlur to check the entry as soon as the user leaves the box).
 *
 * MULTI-LINE — a field given `multiline` (Subject, the addresses) opens
 * MULTILINE_LINES (4) lines tall with the text starting at the top.
 * Everything else is FIELD_HEIGHT tall, the same as a Dropdown.
 */
const FormField = ({
  label,
  required = false,
  helper,
  error,
  prefix,
  value,
  onChangeText,
  onFocus,
  onBlur,
  style,
  ...inputProps
}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createFieldStyles(theme), [theme]);
  const {isRTL} = useLanguage();
  const [focused, setFocused] = useState(false);

  const multiline = !!inputProps.multiline;
  const hasPrefix = !!prefix;
  // Nastaleeq only in Urdu, and only for a field whose placeholder is Urdu.
  // Depends on nothing the user types, so it cannot flip mid-typing.
  const urduFont =
    isRTL && ARABIC_SCRIPT.test(String(inputProps.placeholder ?? ''));
  // A prefixed number always runs left to right, right after its prefix
  const alignRight = isRTL && !hasPrefix;

  const field = (
    <GlassField
      // A new native text box whenever the font changes — see FRESH BOX
      key={urduFont ? 'urdu' : 'latin'}
      style={hasPrefix && styles.prefixedField}
      focused={focused}
      errored={!!error}
      value={value}
      onChangeText={onChangeText}
      // The field's own focus border, THEN the screen's handler (the forms
      // check the entry when the user leaves the box). Taken out of
      // inputProps above, so the spread below can't replace these.
      onFocus={e => {
        setFocused(true);
        onFocus?.(e);
      }}
      onBlur={e => {
        setFocused(false);
        onBlur?.(e);
      }}
      placeholderTextColor={theme.control.placeholder}
      // Four lines tall for a multi-line field; a screen can still pass
      // its own numberOfLines, which comes later and wins
      numberOfLines={multiline ? MULTILINE_LINES : undefined}
      inputStyle={[
        styles.input,
        multiline && styles.inputMultiline,
        urduFont && styles.inputUrdu,
        alignRight ? styles.inputRTL : styles.inputLTR,
      ]}
      {...inputProps}
    />
  );

  return (
    <View style={[styles.wrap, style]}>
      <Text style={[styles.label, isRTL && styles.rtl]}>
        {label}
        {required ? <Text style={styles.star}> *</Text> : null}
      </Text>
      {helper ? (
        <Text style={[styles.helper, isRTL && styles.rtl]}>{helper}</Text>
      ) : null}

      {hasPrefix ? (
        // Prefix box on the left in BOTH languages (see URDU above)
        <View style={styles.prefixRow}>
          <View style={styles.prefixBox}>
            <Text style={styles.prefixText} numberOfLines={1}>
              {prefix}
            </Text>
          </View>
          {field}
        </View>
      ) : (
        field
      )}

      {error ? (
        <Text style={[styles.error, isRTL && styles.rtl]}>{error}</Text>
      ) : null}
    </View>
  );
};

export default FormField;