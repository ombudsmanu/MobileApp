import React, {useMemo, useState} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';
import {useLanguage} from '../../context/LanguageContext';
import {modulesForRole} from '../../navigation/modules';
import {presetBackgrounds} from '../../theme/backgrounds';
import {useLayout} from '../../theme/responsive';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
import ModuleTile from '../../components/ModuleTile/ModuleTile';
import ResponsiveGrid from '../../components/ResponsiveGrid/ResponsiveGrid';
import {useScreenReady} from '../../navigation/useScreenReady';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import {
  createStyles,
  createDynamicStyles,
  sliderHeightFor,
  MENU_RADIUS,
  MODULE_COLORS,
  MODULE_FALLBACK,
} from './DashboardScreen.styles';

/**
 * DASHBOARD — top bar, photo slider, then the modules as cards.
 *
 * RESPONSIVE
 *   Cards per row come from ResponsiveGrid: 2 on a phone, 3 on a tablet,
 *   4 in landscape. The slider is shorter on a phone in landscape (so the
 *   cards are not pushed off the screen) and taller on a tablet.
 *   Left/right padding includes the notch and the side navigation bar,
 *   which move to the sides of the screen in landscape.
 *
 * Each card is the shared ModuleTile (components/ModuleTile).
 */
const DashboardScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);
  const layout = useLayout();
  const sliderHeight = sliderHeightFor(layout);

  const {user, isGuest, role} = useAuth();
  const {lang, t, isRTL} = useLanguage();
  const ready = useScreenReady();
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Modules this role may see — the same registry drives the sidebar
  const tiles = useMemo(() => modulesForRole(role ?? 'guest'), [role]);

  const slides = useMemo(
    () =>
      presetBackgrounds.map(p => ({
        key: p.key,
        source: p.source,
        caption: p.caption?.[lang] ?? p.caption?.en ?? '',
      })),
    [lang],
  );

  const displayName = isGuest ? t('guest') : user?.displayName ?? '';

  return (
    <AppBackground>
      {/* ---------- TOP BAR ---------- */}
      <View style={[styles.topBar, dyn.topBarPad]}>
        <Pressable onPress={() => setDrawerOpen(true)} hitSlop={8}>
          <GlassSurface strong center radius={MENU_RADIUS} style={styles.menuBtn}>
            <Icon name="menu" size={24} color={theme.icon.heading} weight={3} />
          </GlassSurface>
        </Pressable>

        <View style={styles.topTextWrap}>
          <Text style={styles.topTitle}>OPMIS</Text>
          <Text
            style={[styles.topSub, isRTL ? styles.topSubUr : styles.topSubEn]}
            numberOfLines={2}>
            {t('orgName')}
          </Text>
        </View>

        <LanguageToggle />
      </View>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={dyn.scrollPad}
        showsVerticalScrollIndicator={false}>
        {/* ---------- IMAGE SLIDER ---------- */}
        <ImageSlider
          slides={slides}
          height={sliderHeight}
          rtl={isRTL}
          overlay={
            <View style={styles.sliderOverlay} pointerEvents="none">
              <Text
                style={[styles.sliderName, isRTL && styles.sliderTextRTL]}
                numberOfLines={1}>
                {displayName.trim()}
              </Text>
              <Text style={[styles.sliderLabel, isRTL && styles.sliderTextRTL]}>
                {t('welcomeBack')}
              </Text>
            </View>
          }
        />

        {/* ---------- MODULES ---------- */}
        <View style={[styles.sectionHeader, isRTL && styles.sectionHeaderRTL]}>
          <View style={styles.sectionBar} />
          <Text style={styles.sectionTitle}>{t('modules')}</Text>
          <View style={styles.sectionRule} />
        </View>

        <ResponsiveGrid rtl={isRTL}>
          {tiles.map((m, index) => (
            <ModuleTile
              key={m.key}
              icon={m.icon}
              colors={MODULE_COLORS[m.key] ?? MODULE_FALLBACK}
              label={t(`module.${m.key}`, m.label)}
              soonLabel={t('comingSoon')}
              enabled={m.enabled}
              index={index}
              play={ready}
              onPress={() => navigation.navigate(m.route)}
            />
          ))}
        </ResponsiveGrid>
      </ScrollView>

      <Sidebar
        visible={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        activeRoute="Dashboard"
        onNavigate={route => {
          setDrawerOpen(false);
          navigation.navigate(route);
        }}
      />
    </AppBackground>
  );
};

export default DashboardScreen;