import React, {useMemo} from 'react';
import {Pressable, View} from 'react-native';
import Text from '../AppText/AppText';
import Icon from '../Icon/Icon';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {createStyles, ICON_SIZE} from './LanguageToggle.styles';

/**
 * LANGUAGE TOGGLE — the one-tap language button used in screen top bars.
 *
 *   <LanguageToggle />
 *
 * A globe, then the language you would switch TO — not the one you are in.
 * While the app is in English the button reads 🌐 اردو, and while it is in
 * Urdu it reads 🌐 EN. One tap switches, so the button takes roughly half
 * the width the old EN | اردو pill did.
 *
 * No confirmation popup: the whole screen changing language IS the
 * confirmation, so a toast on top of it only got in the way.
 *
 * The ONLY toggle in the app: Dashboard, Appearance, About Us, the About
 * pages, Annual Reports, the forms and the PDF viewer all use this one, so
 * they always look and behave the same. It reads and sets the language
 * through LanguageContext, so switching here switches the whole app and is
 * saved for the next launch.
 *
 * It stays at the top right in both languages, and the globe stays on the
 * left of the label in both — if either jumped in Urdu, the button would
 * move away from the finger that just tapped it.
 */

/** Tapping while in the key language switches to the value language. */
const NEXT = {en: 'ur', ur: 'en'};

/** What the button reads, by the language it would switch TO. */
const LABEL = {en: 'EN', ur: 'اردو'};

/** Screen-reader description, by the language it would switch TO. */
const SPOKEN = {en: 'Switch to English', ur: 'Switch to Urdu'};

const LanguageToggle = ({style}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {lang, setLang} = useLanguage();

  // Falls back to Urdu so the button still works if lang is ever unset.
  const next = NEXT[lang] ?? 'ur';

  return (
    <Pressable
      onPress={() => setLang(next)}
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={SPOKEN[next]}
      style={({pressed}) => [styles.toggle, pressed && styles.pressed, style]}>
      <View style={styles.icon}>
        <Icon name="globe" size={ICON_SIZE} color={theme.accent} weight={1.6} />
      </View>
      <Text
        style={[styles.text, next === 'ur' && styles.textUrdu]}
        numberOfLines={1}>
        {LABEL[next]}
      </Text>
    </Pressable>
  );
};

export default LanguageToggle;