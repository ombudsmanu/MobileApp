import React, {useMemo} from 'react';
import {Pressable, View} from 'react-native';
import Text from '../../../components/AppText/AppText';
import GlassSurface from '../../../components/GlassSurface/GlassSurface';
import Icon from '../../../components/Icon/Icon';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {DECLARATIONS} from '../../../content/complaintForm';
import {createDeclarationStyles} from './parts.styles';

/**
 * DECLARATION — the "I solemnly declare" card: a title with a tick and an
 * on/off switch, then the lettered points (A, B, C…). The complaint can
 * only be created once this is switched on, which the screen enforces.
 *
 *   accepted   whether the switch is on
 *   onToggle   flips it
 *
 * The switch is a plain pressable (no native Switch component), so it keeps
 * the app's colours and needs no extra dependency.
 */
const Declaration = ({accepted, onToggle}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createDeclarationStyles(theme), [theme]);
  const {lang, t, isRTL} = useLanguage();

  return (
    <GlassSurface style={styles.card}>
      <View style={[styles.header, isRTL && styles.rowRTL]}>
        <View style={[styles.check, accepted && styles.checkOn]}>
          <Icon
            name="check"
            size={16}
            color={accepted ? theme.accent : theme.icon.muted}
            weight={3}
          />
        </View>
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
            <View style={[styles.switchThumb, accepted && styles.switchThumbOn]} />
          </View>
        </Pressable>
      </View>

      {DECLARATIONS.map(point => (
        <View key={point.key} style={[styles.point, isRTL && styles.rowRTL]}>
          <View style={styles.bullet}>
            <Text style={styles.bulletText}>{point.key}</Text>
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