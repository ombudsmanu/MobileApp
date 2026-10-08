import React, { useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import Text from '../../components/AppText/AppText';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import Icon from '../../components/Icon/Icon';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { LATIN_FONTS, URDU_FONTS } from '../../theme/tokens';
import { createStyles } from './FontPicker.styles';

/**
 * FONT PICKER — one dropdown holding both font groups.
 *
 * English and Urdu are chosen separately because no single font can do
 * both scripts: Poppins has no Urdu letters, Nastaliq has no Latin ones.
 * Picking from the "App font" group changes English text only; picking
 * from "Urdu font" changes Urdu only. Each applies and saves immediately.
 *
 * A plain list, not a native dropdown: it shows both groups at once with
 * each choice drawn in its own font, so the user sees what they are picking.
 */
const FontPicker = () => {
  const { theme, fonts, setFont } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { t, isRTL } = useLanguage();
  const [open, setOpen] = useState(false);

  const latin = LATIN_FONTS[fonts.latin] ?? LATIN_FONTS.system;
  const urdu = URDU_FONTS[fonts.urdu] ?? URDU_FONTS.nastaliq;
  const summary = `${t(latin.labelKey, latin.label)} · ${t(
    urdu.labelKey,
    urdu.label,
  )}`;

  const Option = ({ entry, selected, onPress, preview }) => (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      style={({ pressed }) => [
        styles.option,
        isRTL && styles.rowRTL,
        selected && styles.optionSelected,
        pressed && styles.optionPressed,
      ]}
    >
      <Text style={[styles.optionLabel, isRTL && styles.textRTL, preview]}>
        {t(entry.labelKey, entry.label)}
      </Text>
      {selected ? (
        <Icon name="check" size={18} color={theme.accent} weight={3} />
      ) : null}
    </Pressable>
  );

  return (
    <GlassSurface style={styles.card}>
      <Text style={styles.cardTitle}>{t('ap.font')}</Text>
      <Text style={styles.cardSub}>{t('ap.fontHint')}</Text>

      {/* The closed dropdown */}
      <Pressable
        onPress={() => setOpen(o => !o)}
        accessibilityRole="button"
        accessibilityState={{ expanded: open }}
        style={({ pressed }) => [
          styles.trigger,
          isRTL && styles.rowRTL,
          pressed && styles.optionPressed,
        ]}
      >
        <Text
          style={[styles.triggerText, isRTL && styles.textRTL]}
          numberOfLines={2}
        >
          {summary}
        </Text>
        <View style={open ? styles.chevronOpen : styles.chevronClosed}>
          <Icon name="chevronUp" size={18} color={theme.icon.body} weight={3} />
        </View>
      </Pressable>

      {open && (
        <View style={styles.list}>
          <Text style={[styles.groupTitle, isRTL && styles.textRTL]}>{t('ap.appFont')}</Text>
          {Object.entries(LATIN_FONTS).map(([key, entry]) => (
            <Option
              key={key}
              entry={entry}
              selected={fonts.latin === key}
              onPress={() => setFont('latin', key)}
              // Each option is drawn in its own font
              preview={
                entry.families ? { fontFamily: entry.families[400] } : null
              }
            />
          ))}

          <Text style={[styles.groupTitle, isRTL && styles.textRTL]}>{t('ap.urduFont')}</Text>
          {Object.entries(URDU_FONTS).map(([key, entry]) => (
            <Option
              key={key}
              entry={entry}
              selected={fonts.urdu === key}
              onPress={() => setFont('urdu', key)}
            />
          ))}

          <Text style={[styles.note, isRTL && styles.textRTL]}>{t('ap.fontNote')}</Text>
        </View>
      )}
    </GlassSurface>
  );
};

export default FontPicker;
