import React, {useMemo} from 'react';
import {Pressable, View} from 'react-native';
import Text from '../../../components/AppText/AppText';
import GlassSurface from '../../../components/GlassSurface/GlassSurface';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {createRadioStyles} from './parts.styles';

/**
 * RADIO GROUP — a label and a card of mutually-exclusive options, matching
 * the reference ("Complaint Type: General / Child").
 *
 *   label     the group label
 *   required  red asterisk
 *   options   [{value, en, ur}]
 *   value     the chosen value
 *   onChange  called with the new value
 */
const RadioRow = ({label, required = false, options = [], value, onChange}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createRadioStyles(theme), [theme]);
  const {lang, isRTL} = useLanguage();

  return (
    <View style={styles.wrap}>
      <Text style={[styles.label, isRTL && styles.rtl]}>
        {label}
        {required ? <Text style={styles.star}> *</Text> : null}
      </Text>

      <GlassSurface style={styles.card} contentStyle={styles.cardContent}>
        {options.map((o, i) => {
          const active = o.value === value;
          return (
            <Pressable
              key={o.value}
              onPress={() => onChange(o.value)}
              style={[
                styles.option,
                isRTL && styles.rowRTL,
                i > 0 && styles.optionDivider,
              ]}>
              <View style={[styles.ring, active && styles.ringActive]}>
                {active && <View style={styles.dot} />}
              </View>
              <Text style={[styles.optionText, isRTL && styles.rtl]}>
                {o[lang] ?? o.en}
              </Text>
            </Pressable>
          );
        })}
      </GlassSurface>
    </View>
  );
};

export default RadioRow;