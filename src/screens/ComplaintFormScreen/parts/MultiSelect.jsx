import React, {useMemo, useState} from 'react';
// RNText: the plain text component, matching Dropdown's value font
import {FlatList, Modal, Pressable, Text as RNText, TextInput, View} from 'react-native';
import Text from '../../../components/AppText/AppText';
import GlassSurface from '../../../components/GlassSurface/GlassSurface';
import Icon from '../../../components/Icon/Icon';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  createDropdownStyles,
  createMultiSelectStyles,
  PICKER_RADIUS,
} from './parts.styles';

/** Any Arabic-script letter — the same test AppText uses to spot Urdu. */
const ARABIC_SCRIPT =
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;

/**
 * MULTI SELECT — the Dropdown's twin, but the user can tick several options.
 *
 *   label        the field label (already translated)
 *   required     shows a red asterisk
 *   helper       small grey hint under the label
 *   placeholder  shown when nothing is picked ("Select District")
 *   options      [{value, en, ur}] — labels shown by language
 *   values       array of picked values. null / undefined are treated as [].
 *   onChange     called with the new array of values
 *   searchable   show a search box (auto for 8+ options)
 *   error        red line under the closed field
 *
 * It REUSES Dropdown's styles for the field and the whole picker (the same
 * header, search row, list and option rows), so the two look identical. The
 * only extras are: the closed field shows the picks as removable CHIPS, each
 * option row has a CHECKBOX, and the picker has a FOOTER with the Done
 * button. Those live in createMultiSelectStyles.
 *
 * DONE IN THE FOOTER — the Done button sits in a bar at the BOTTOM of the
 * picker, not in the header. The list scrolls between the header and that
 * bar, so Done stays put and within thumb reach however long the list is.
 * The header keeps only the title and the close X.
 *
 * URDU FONT — Urdu shown inside the closed field (the placeholder or a
 * chip) uses the Nastaleeq label font, like Dropdown and the text boxes,
 * so the field matches its label.
 *
 * NOTE on `values`: a draft saved before this field became multi-select may
 * come back as `null`. A `values = []` default only fires for UNDEFINED, not
 * null, so we normalise it ourselves below.
 */
const labelOf = (option, lang) => (option ? option[lang] ?? option.en : '');

const MultiSelect = ({
  label,
  required = false,
  helper,
  placeholder,
  options = [],
  values,
  onChange,
  searchable,
  error,
  searchPlaceholder,
  emptyText,
}) => {
  const safeValues = Array.isArray(values) ? values : [];

  const {theme} = useTheme();
  const styles = useMemo(() => createDropdownStyles(theme), [theme]);
  const m = useMemo(() => createMultiSelectStyles(theme), [theme]);
  const {lang, isRTL} = useLanguage();
  const insets = useSafeAreaInsets();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const picked = options.filter(o => safeValues.includes(o.value));
  const showSearch = searchable ?? options.length >= 8;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return options;
    }
    return options.filter(
      o =>
        (o.en ?? '').toLowerCase().includes(q) || (o.ur ?? '').includes(query.trim()),
    );
  }, [options, query]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const toggle = value => {
    if (safeValues.includes(value)) {
      onChange(safeValues.filter(v => v !== value));
    } else {
      onChange([...safeValues, value]);
    }
  };

  const removeChip = value => onChange(safeValues.filter(v => v !== value));

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, isRTL && styles.rtl]}>
        {label}
        {required ? <Text style={styles.star}> *</Text> : null}
      </Text>
      {helper ? (
        <Text style={[styles.helper, isRTL && styles.rtl]}>{helper}</Text>
      ) : null}

      {/* The closed field — tap anywhere to open; chips sit inside it */}
      <Pressable
        onPress={() => setOpen(true)}
        accessibilityRole="button"
        accessibilityLabel={label}
        style={({pressed}) => [
          styles.field,
          m.field, // taller, wraps chips onto new lines
          isRTL && styles.rowRTL,
          !!error && styles.fieldError,
          pressed && styles.fieldPressed,
        ]}>
        <View style={[m.chipArea, isRTL && styles.rowRTL]}>
          {picked.length === 0 ? (
            <RNText
              style={[
                styles.value,
                styles.placeholder,
                ARABIC_SCRIPT.test(placeholder ?? '') && styles.valueUrdu,
                isRTL ? styles.rtl : styles.valueLTR,
              ]}
              numberOfLines={1}>
              {placeholder}
            </RNText>
          ) : (
            picked.map(p => (
              <View key={p.value} style={[m.chip, isRTL && styles.rowRTL]}>
                <RNText
                  style={[
                    m.chipText,
                    ARABIC_SCRIPT.test(labelOf(p, lang)) && m.chipTextUrdu,
                  ]}
                  numberOfLines={1}>
                  {labelOf(p, lang)}
                </RNText>
                <Pressable
                  onPress={() => removeChip(p.value)}
                  hitSlop={8}
                  style={m.chipClose}>
                  <Icon name="close" size={11} color={theme.accent} weight={3} />
                </Pressable>
              </View>
            ))
          )}
        </View>
        <Icon name="chevronDown" size={20} color={theme.icon.muted} weight={2} />
      </Pressable>

      {error ? (
        <Text style={[styles.error, isRTL && styles.rtl]}>{error}</Text>
      ) : null}

      {open && (
        <Modal visible transparent animationType="fade" statusBarTranslucent onRequestClose={close}>
          <Pressable style={styles.backdrop} onPress={close}>
            <Pressable
              style={[styles.sheet, {marginTop: insets.top + 60, marginBottom: insets.bottom + 40}]}
              onPress={() => {}}>
              <GlassSurface strong radius={PICKER_RADIUS} style={styles.sheetCard} contentStyle={styles.sheetContent}>
                {/* Header: title on the leading side, close X on the other.
                    Done now lives in the FOOTER at the bottom of the sheet. */}
                <View style={[styles.sheetHeader, isRTL && styles.rowRTL]}>
                  <Text style={[styles.sheetTitle, isRTL && styles.rtl]} numberOfLines={1}>
                    {label}
                  </Text>
                  <Pressable onPress={close} hitSlop={10} style={styles.closeBtn}>
                    <Icon name="close" size={18} color={theme.icon.heading} weight={2.5} />
                  </Pressable>
                </View>

                {showSearch && (
                  <View style={[styles.searchRow, isRTL && styles.rowRTL]}>
                    <Icon name="search" size={18} color={theme.icon.muted} weight={2} />
                    <TextInput
                      value={query}
                      onChangeText={setQuery}
                      placeholder={searchPlaceholder}
                      placeholderTextColor={theme.control.placeholder}
                      style={[styles.searchInput, isRTL ? styles.rtl : styles.valueLTR]}
                      autoCorrect={false}
                    />
                  </View>
                )}

                <FlatList
                  data={filtered}
                  keyExtractor={o => o.value}
                  keyboardShouldPersistTaps="handled"
                  showsVerticalScrollIndicator={false}
                  style={styles.list}
                  ListEmptyComponent={<Text style={styles.empty}>{emptyText}</Text>}
                  renderItem={({item}) => {
                    const active = safeValues.includes(item.value);
                    return (
                      <Pressable
                        onPress={() => toggle(item.value)}
                        style={({pressed}) => [
                          styles.option,
                          isRTL && styles.rowRTL,
                          pressed && styles.optionPressed,
                        ]}>
                        {/* Checkbox on the leading side */}
                        <View
                          style={[
                            m.checkbox,
                            isRTL ? m.checkboxRTL : m.checkboxLTR,
                            active && m.checkboxOn,
                          ]}>
                          {active && (
                            <Icon name="check" size={13} color="#FFFFFF" weight={3} />
                          )}
                        </View>
                        <Text
                          style={[
                            styles.optionText,
                            active && styles.optionTextActive,
                            isRTL && styles.rtl,
                          ]}>
                          {labelOf(item, lang)}
                        </Text>
                      </Pressable>
                    );
                  }}
                />

                {/* ---- Footer: full-width Done, pinned at the bottom ---- */}
                <View style={[m.footer, isRTL && styles.rowRTL]}>
                  <Text style={[m.footerCount, isRTL && styles.rtl]} numberOfLines={1}>
                    {countLabel(lang, picked.length)}
                  </Text>
                  <Pressable
                    onPress={close}
                    accessibilityRole="button"
                    accessibilityLabel={t_done(lang)}
                    style={({pressed}) => [m.doneBtn, pressed && m.donePressed]}>
                    <Text style={m.doneLabel}>{t_done(lang)}</Text>
                  </Pressable>
                </View>
              </GlassSurface>
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

// "Done" without reaching into the form's t(): a tiny local label so this
// component needs no extra string wiring. (en / ur)
const t_done = lang => (lang === 'ur' ? 'مکمل' : 'Done');

// The little count on the left of the footer: "2 selected" / "none yet".
const countLabel = (lang, n) => {
  if (lang === 'ur') {
    return n === 0 ? 'کوئی منتخب نہیں' : `${n} منتخب`;
  }
  return n === 0 ? 'None selected' : `${n} selected`;
};

export default MultiSelect;