import React, {useMemo} from 'react';
import {ScrollView, View, Pressable} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {jurisdictionSections} from '../../content/jurisdictionSections';
import {useScreenReady} from '../../navigation/useScreenReady';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import ModuleTile from '../../components/ModuleTile/ModuleTile';
import Icon from '../../components/Icon/Icon';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import CertificationBadges from '../../components/CertificationBadges/CertificationBadges';
import ResponsiveGrid from '../../components/ResponsiveGrid/ResponsiveGrid';
import {createStyles, createDynamicStyles, BACK_RADIUS} from './JurisdictionScreen.styles';

/**
 * JURISDICTION — the crest and certification badges at the top (the same
 * block as every other screen), then the four Jurisdiction sections as
 * cards, laid out exactly like About Us.
 *
 *   Mandate, What We Can Do, How We Do, What We Can Not Do
 *
 * Each card opens JurisdictionDetail with its key; the detail screen builds
 * the page from jurisdictionContent.js. The cards use ModuleTile and
 * ResponsiveGrid — the app's existing design — so this screen matches the
 * rest of the app with no new card style.
 */
const JurisdictionScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);
  const {t, isRTL} = useLanguage();
  const ready = useScreenReady();

  const openSection = key => navigation.navigate('JurisdictionDetail', {key});

  return (
    <AppBackground>
      <View style={[styles.topBar, dyn.topBarPad]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <GlassSurface strong center radius={BACK_RADIUS} style={styles.backBtn}>
            <Icon name="chevronLeft" size={30} color={theme.icon.heading} weight={3} />
          </GlassSurface>
        </Pressable>
        <View style={styles.topTextWrap}>
          <Text
            style={[styles.topTitle, isRTL && styles.textRTL]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}>
            {t('jur.title', 'Jurisdiction')}
          </Text>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, dyn.scrollPad]}
        showsVerticalScrollIndicator={false}>
        {/* ---- Crest, Office name and certification badges ----
            The same block, in the same place, as the other screens */}
        <CertificationBadges
          play={ready}
          startIndex={0}
          style={styles.topBadges}
          showCrest={false}
        />

        {/* ---- The four sections ---- */}
        <ResponsiveGrid rtl={isRTL}>
          {jurisdictionSections.map((section, index) => (
            <ModuleTile
              key={section.key}
              icon={section.icon}
              colors={section.colors}
              label={t(`jur.${section.key}`, section.label)}
              index={index}
              play={ready}
              onPress={() => openSection(section.key)}
            />
          ))}
        </ResponsiveGrid>
      </ScrollView>
    </AppBackground>
  );
};

export default JurisdictionScreen;