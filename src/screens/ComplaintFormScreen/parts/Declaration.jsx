import React, {useMemo} from 'react';
import {Pressable, View} from 'react-native';
import Text from '../../../components/AppText/AppText';
import GlassSurface from '../../../components/GlassSurface/GlassSurface';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {DECLARATIONS} from '../../../content/complaintForm';
import {createDeclarationStyles} from './parts.styles';

/**
 * DECLARATION — the "I solemnly declare" card: a title and an on/off
 * switch, then the numbered points. The complaint can only be created once
 * this is switched on, which the screen enforces.
 *
 *   accepted   whether the switch is on
 *   onToggle   flips it
 *
 * NUMBERING — A, B, C… in English; 1, 2, 3… in Urdu. Digits are not Urdu
 * script, so they are drawn in the normal font and sit centred in their
 * circle exactly like A B C — no Nastaleeq adjustment needed.
 *
 * No tick next to the title: the switch already shows whether the
 * declaration is accepted, so the tick only repeated it.
 *
 * The switch is a plain pressable (no native Switch component), so it keeps
 * the app's colours and needs no extra dependency.
 */
const Declaration = ({accepted, onToggle}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createDeclarationStyles(theme), [theme]);
  const {lang, t, isRTL} = useLanguage();
  const urdu = lang === 'ur';

  return (
    <GlassSurface style={styles.card}>
      <View style={[styles.header, isRTL && styles.rowRTL]}>
        <Text style={[styles.title, isRTL && styles.rtl]}>
          {t('cf.declare.title')}
        </Text>
        <Pressable
          onPress={onToggle}
          hitSlop={8}
          accessibilityRole="switch"
          accessibilityState={{checked: accepted}}
          accessibilityLabel={t('cf.declare.title')}>
          <View style={[styles.switchTrack, accepted && styles.switchTrackOn]}>
            {/* Mirrored in Urdu: the thumb slides right-to-left when on */}
            <View
              style={[
                styles.switchThumb,
                isRTL ? styles.switchThumbRTL : null,
                accepted && (isRTL ? styles.switchThumbOnRTL : styles.switchThumbOn),
              ]}
            />
          </View>
        </Pressable>
      </View>

      {DECLARATIONS.map((point, i) => (
        <View key={point.key} style={[styles.point, isRTL && styles.rowRTL]}>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>
              {urdu ? String(i + 1) : point.key}
            </Text>
          </View>
          <Text style={[styles.pointText, isRTL && styles.rtl]}>
            {point[lang] ?? point.en}
          </Text>
        </View>
      ))}
    </GlassSurface>
  );
};

export default Declaration;