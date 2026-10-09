import React, {useMemo, useState} from 'react';
import {FlatList, Modal, Pressable, TextInput, View} from 'react-native';
import Text from '../../../components/AppText/AppText';
import GlassSurface from '../../../components/GlassSurface/GlassSurface';
import Icon from '../../../components/Icon/Icon';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createDropdownStyles, PICKER_RADIUS} from './parts.styles';

/**
 * DROPDOWN — a labelled select that opens a full-screen picker.
 *
 *   label        the field label (already translated)
 *   required     shows a red asterisk
 *   helper       small grey hint under the label
 *   placeholder  shown when nothing is picked ("Select District")
 *   options      [{value, en, ur}] — labels shown by language
 *   value        the picked option's value, or null
 *   onChange     called with the new value
 *   searchable   when true the picker shows a search box (for long lists
 *                like Agency); it is on automatically for 8+ options
 *   error        red line under the closed field
 *
 * The picker is a Modal — mounted only while open — with the options as a
 * FlatList, so even a long Agency list scrolls smoothly.
 */
const labelOf = (option, lang) => (option ? option[lang] ?? option.en : '');

const Dropdown = ({
  label,
  required = false,
  helper,
  placeholder,
  options = [],
  value,
  onChange,
  searchable,
  error,
  searchPlaceholder,
  emptyText,
}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createDropdownStyles(theme), [theme]);
  const {lang, isRTL} = useLanguage();
  const insets = useSafeAreaInsets();

  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');

  const selected = options.find(o => o.value === value) ?? null;
  const showSearch = searchable ?? options.length >= 8;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return options;
    }
    // Match either language, so an English search finds an item even when
    // the app is in Urdu, and vice versa
    return options.filter(
      o =>
        (o.en ?? '').toLowerCase().includes(q) || (o.ur ?? '').includes(query.trim()),
    );
  }, [options, query]);

  const close = () => {
    setOpen(false);
    setQuery('');
  };

  const pick = option => {
    onChange(option.value);
    close();
  };

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, isRTL && styles.rtl]}>
        {label}
        {required ? <Text style={styles.star}> *</Text> : null}
      </Text>
      {helper ? (
        <Text style={[styles.helper, isRTL && styles.rtl]}>{helper}</Text>
      ) : null}

      <Pressable
        onPress={() => setOpen(true)}
        style={({pressed}) => [
          styles.field,
          !!error && styles.fieldError,
          pressed && styles.fieldPressed,
        ]}>
        <Text
          style={[
            styles.value,
            !selected && styles.placeholder,
            isRTL && styles.rtl,
          ]}
          numberOfLines={1}>
          {selected ? labelOf(selected, lang) : placeholder}
        </Text>
        <Icon name="chevronDown" size={20} color={theme.icon.muted} weight={2} />
      </Pressable>

      {error ? (
        <Text style={[styles.error, isRTL && styles.rtl]}>{error}</Text>
      ) : null}

      {open && (
        <Modal visible transparent animationType="fade" statusBarTranslucent onRequestClose={close}>
          <Pressable style={styles.backdrop} onPress={close}>
            {/* Stop taps inside the sheet from closing it */}
            <Pressable
              style={[styles.sheet, {marginTop: insets.top + 60, marginBottom: insets.bottom + 40}]}
              onPress={() => {}}>
              <GlassSurface strong radius={PICKER_RADIUS} style={styles.sheetCard} contentStyle={styles.sheetContent}>
                <View style={[styles.sheetHeader, isRTL && styles.rowRTL]}>
                  <Text style={styles.sheetTitle} numberOfLines={1}>
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
                      style={[styles.searchInput, isRTL && styles.rtl]}
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
                  ListEmptyComponent={
                    <Text style={styles.empty}>{emptyText}</Text>
                  }
                  renderItem={({item}) => {
                    const active = item.value === value;
                    return (
                      <Pressable
                        onPress={() => pick(item)}
                        style={({pressed}) => [
                          styles.option,
                          isRTL && styles.rowRTL,
                          active && styles.optionActive,
                          pressed && styles.optionPressed,
                        ]}>
                        <Text
                          style={[
                            styles.optionText,
                            active && styles.optionTextActive,
                            isRTL && styles.rtl,
                          ]}>
                          {labelOf(item, lang)}
                        </Text>
                        {active && (
                          <Icon name="check" size={18} color={theme.accent} weight={2.5} />
                        )}
                      </Pressable>
                    );
                  }}
                />
              </GlassSurface>
            </Pressable>
          </Pressable>
        </Modal>
      )}
    </View>
  );
};

export default Dropdown;