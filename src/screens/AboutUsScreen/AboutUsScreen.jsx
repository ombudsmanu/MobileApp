import React, {useMemo} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {aboutSections} from '../../content/aboutSections';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import ModuleTile from '../../components/ModuleTile/ModuleTile';
import Icon from '../../components/Icon/Icon';
import {createStyles, createDynamicStyles, BACK_RADIUS} from './AboutUsScreen.styles';

/** The About Us sections as cards — the same cards as the Dashboard modules. */
const AboutUsScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);
  const {t, isRTL} = useLanguage();

  return (
    <AppBackground>
      <View style={[styles.topBar, dyn.topBarPad]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <GlassSurface strong center radius={BACK_RADIUS} style={styles.backBtn}>
            <Icon name="chevronLeft" size={24} color={theme.icon.heading} weight={3} />
          </GlassSurface>
        </Pressable>
        <View style={styles.topTextWrap}>
          <Text style={styles.topTitle}>{t('about.title')}</Text>
          <Text style={styles.topSub}>{t('officeName')}</Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, dyn.scrollPad]}
        showsVerticalScrollIndicator={false}>
        <View style={[styles.grid, isRTL && styles.gridRTL]}>
          {aboutSections.map((section, index) => (
            <ModuleTile
              key={section.key}
              icon={section.icon}
              colors={section.colors}
              label={t(`about.${section.key}`, section.label)}
              index={index}
              isRTL={isRTL}
              onPress={() => navigation.navigate('AboutSection', {key: section.key})}
            />
          ))}
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default AboutUsScreen;