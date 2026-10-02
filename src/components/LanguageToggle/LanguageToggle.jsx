import React, {useMemo} from 'react';
import {Pressable, View} from 'react-native';
import Text from '../AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {createStyles} from './LanguageToggle.styles';

/**
 * LANGUAGE TOGGLE — the EN / اردو pill used in screen top bars.
 *
 *   <LanguageToggle />
 *
 * The ONLY toggle in the app: Dashboard, Appearance, About Us, the About
 * pages and Annual Reports all use this one, so they always look and behave
 * the same. It reads and sets the language through LanguageContext, so
 * switching here switches the whole app and is saved for the next launch.
 *
 * It stays at the top right in both languages on purpose — if the bar
 * flipped in Urdu, the toggle would jump away from the finger that just
 * tapped it.
 */
const LANGUAGES = [
  {code: 'en', label: 'EN', a11y: 'English'},
  {code: 'ur', label: 'اردو', a11y: 'Urdu'},
];

const LanguageToggle = ({style}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {lang, setLang} = useLanguage();

  return (
    <View style={[styles.toggle, style]} accessibilityRole="radiogroup">
      {LANGUAGES.map(l => {
        const active = lang === l.code;
        return (
          <Pressable
            key={l.code}
            onPress={() => !active && setLang(l.code)}
            hitSlop={4}
            accessibilityRole="radio"
            accessibilityState={{selected: active}}
            accessibilityLabel={l.a11y}
            style={[styles.option, active && styles.optionActive]}>
            <Text
              style={[styles.text, l.code === 'ur' && styles.textUrdu, active && styles.textActive]}
              numberOfLines={1}>
              {l.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default LanguageToggle;