import React, { useMemo } from 'react';
import { Animated, Pressable, ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { aboutSections } from '../../content/aboutSections';
import { useScreenReady } from '../../navigation/useScreenReady';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import ModuleTile from '../../components/ModuleTile/ModuleTile';
import Icon from '../../components/Icon/Icon';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import StaggerIn from '../../components/StaggerIn/StaggerIn';
import { usePulse } from '../../components/ModuleTile/usePulse';
import {
  createStyles,
  createDynamicStyles,
  createBannerStyles,
  BACK_RADIUS,
} from './AboutUsScreen.styles';
import CertificationBadges from '../../components/CertificationBadges/CertificationBadges';
/**
 * ABOUT US — the sections as cards, then a Special Section banner, then
 * the Office's certifications.
 *
 * SPECIAL SECTION — the Commissioner for Children is shown as a wide banner
 * under the grid instead of as a card in it. It is still an ordinary About
 * section (same data, same page when tapped); only its place on this
 * screen differs. Change SPECIAL_KEY to feature a different section.
 *
 * CERTIFICATIONS — the same badges as the splash screen.
 *
 * Everything waits until the screen has finished sliding in, then cascades
 * in: the grid first, then the banner, then the certifications.
 */
const SPECIAL_KEY = 'childrenCommissioner';
const GRID_SECTIONS = aboutSections.filter(s => s.key !== SPECIAL_KEY);
const SPECIAL_SECTION = aboutSections.find(s => s.key === SPECIAL_KEY);
const AboutUsScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);
  const { t, isRTL } = useLanguage();
  const ready = useScreenReady();
  const bannerColor = SPECIAL_SECTION?.colors[1] ?? theme.accent;
  const banner = useMemo(() => createBannerStyles(bannerColor), [bannerColor]);
  // The banner icon pops once after the last card, like the card icons
  const bannerPop = usePulse(GRID_SECTIONS.length, ready);
  const bannerIconMotion = useMemo(
    () => ({ transform: [{ scale: bannerPop }] }),
    [bannerPop],
  );
  const openSection = key => navigation.navigate('AboutSection', { key });
  const specialTitle = SPECIAL_SECTION
    ? t(`aboutTitle.${SPECIAL_KEY}`, SPECIAL_SECTION.label)
    : '';

  return (
    <AppBackground>
      <View style={[styles.topBar, dyn.topBarPad]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <GlassSurface
            strong
            center
            radius={BACK_RADIUS}
            style={styles.backBtn}
          >
            <Icon
              name="chevronLeft"
              size={30}
              color={theme.icon.heading}
              weight={3}
            />
          </GlassSurface>
        </Pressable>
        <View style={styles.topTextWrap}>
          <Text
            style={[styles.topTitle, isRTL && styles.textRTL]}
            numberOfLines={2}
          >
            {t('about.title')}
          </Text>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, dyn.scrollPad]}
        showsVerticalScrollIndicator={false}
      >
        {/* ---- Sections ---- */}
        <View style={[styles.grid, isRTL && styles.gridRTL]}>
          {GRID_SECTIONS.map((section, index) => (
            <ModuleTile
              key={section.key}
              icon={section.icon}
              colors={section.colors}
              label={t(`about.${section.key}`, section.label)}
              index={index}
              play={ready}
              onPress={() => openSection(section.key)}
            />
          ))}
        </View>

        {/* ---- Special Section banner ---- */}
        {SPECIAL_SECTION && (
          <StaggerIn index={GRID_SECTIONS.length} play={ready}>
            <Pressable
              onPress={() => openSection(SPECIAL_KEY)}
              accessibilityRole="button"
              accessibilityLabel={specialTitle}
              style={({ pressed }) => [
                styles.bannerPress,
                pressed && styles.bannerPressed,
              ]}
            >
              {/* Shell casts the shadow; the gradient rounds ITSELF */}
              <View style={[styles.bannerShell, banner.shell]}>
                <LinearGradient
                  colors={SPECIAL_SECTION.colors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.banner}
                >
                  <View style={[styles.bannerRow, isRTL && styles.rowRTL]}>
                    <Animated.View
                      style={[styles.bannerIcon, bannerIconMotion]}
                    >
                      <Icon
                        name={SPECIAL_SECTION.icon}
                        size={24}
                        color="#FFFFFF"
                        weight={2.5}
                      />
                    </Animated.View>

                    <View
                      style={[styles.bannerText, isRTL && styles.bannerTextRTL]}
                    >
                      <Text
                        style={[
                          styles.bannerLabel,
                          !isRTL && styles.bannerLabelSpaced,
                          isRTL && styles.textRTL,
                        ]}
                        numberOfLines={1}
                      >
                        {t('about.specialSection', 'SPECIAL SECTION')}
                      </Text>
                      <Text
                        style={[styles.bannerTitle, isRTL && styles.textRTL]}
                      >
                        {specialTitle}
                      </Text>
                    </View>

                    <View style={styles.bannerArrow}>
                      <Icon
                        name={isRTL ? 'chevronLeft' : 'chevronRight'}
                        size={36}
                        color={bannerColor}
                        weight={3}
                      />
                    </View>
                  </View>
                </LinearGradient>
              </View>
            </Pressable>
          </StaggerIn>
        )}

        {/* ---- Certifications & Accreditation ---- */}
        <StaggerIn index={GRID_SECTIONS.length + 1} play={ready}>
          <View style={[styles.sectionHeader, isRTL && styles.rowRTL]}>
            <View style={styles.sectionBar} />
            <Text style={[styles.sectionTitle, isRTL && styles.textRTL]}>
              {t('about.certifications', 'Certifications & Accreditation')}
            </Text>
          </View>

          <GlassSurface style={styles.certCard}>
            <View style={[styles.certCaptionRow, isRTL && styles.rowRTL]}>
              <Icon name="check" size={16} color={theme.accent} weight={3} />
              <Text style={styles.certCaption}>
                {t(
                  'about.certCaption',
                  'Certified to international standards.',
                )}
              </Text>
            </View>
            <CertificationBadges
              play={ready}
              startIndex={GRID_SECTIONS.length + 1}
              style={styles.badgeRow}
            />
          </GlassSurface>
        </StaggerIn>
      </ScrollView>
    </AppBackground>
  );
};

export default AboutUsScreen;
