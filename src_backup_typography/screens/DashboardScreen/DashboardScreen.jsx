import React, {useMemo, useState} from 'react';
import {Pressable, ScrollView, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';
import {useLanguage} from '../../context/LanguageContext';
import {modulesForRole} from '../../navigation/modules';
import {presetBackgrounds} from '../../theme/backgrounds';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
import {createStyles, createDynamicStyles, MENU_RADIUS} from './DashboardScreen.styles';
const LANGUAGES = [
  {code: 'en', label: 'EN'},
  {code: 'ur', label: 'اردو'},
];

const DashboardScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);

  const {user, isGuest,role} = useAuth();
  const {lang, setLang, t, isRTL} = useLanguage();

  const [drawerOpen, setDrawerOpen] = useState(false);

    // Modules the current role may see. The registry drives both this grid
  // and the sidebar, so a module added there appears in both.
  const tiles = useMemo(() => modulesForRole(role ?? 'guest'), [role]);

  // Slider shows the bundled background photos, captioned in the current language
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
  const rtl = isRTL ? styles.rtlText : null;

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
          <Text style={[styles.topSub, rtl]}>{t('orgName')}</Text>
        </View>

        {/* Language toggle, top right */}
        <View style={styles.langToggle}>
          {LANGUAGES.map(l => {
            const active = lang === l.code;
            return (
              <Pressable
                key={l.code}
                onPress={() => setLang(l.code)}
                style={[styles.langOption, active && styles.langOptionActive]}>
                <Text style={[styles.langText, active && styles.langTextActive]}>
                  {l.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={[styles.scroll, dyn.scrollPad]}
        showsVerticalScrollIndicator={false}>

        {/* ---------- IMAGE SLIDER ---------- */}
        <ImageSlider
          slides={slides}
          rtl={isRTL}
          overlay={
            <View style={styles.sliderOverlay} pointerEvents="none">
              <Text style={[styles.sliderLabel, rtl]}>{t('welcomeBack')}</Text>
              <Text style={[styles.sliderName, rtl]} numberOfLines={1}>
                {displayName}
              </Text>
            </View>
          }
        />
        {/* ---------- MODULES ---------- */}
        <Text style={[styles.sectionTitle, isRTL && styles.sectionTitleRTL]}>
          {t('modules')}
        </Text>

        <View style={[styles.tileGrid, isRTL && styles.tileGridRTL]}>
          {tiles.map(m => (
            <Pressable
              key={m.key}
              disabled={!m.enabled}
              onPress={() => navigation.navigate(m.route)}
              style={styles.tileOuter}>
              <View style={[styles.tile, isRTL && styles.tileRTL, !m.enabled && styles.tileDisabled]}>
                <View style={styles.tileIcon}>
                  <Icon name={m.icon} size={24} color={theme.icon.heading} weight={3} />
                </View>
                <Text
                  style={[styles.tileLabel, isRTL && styles.tileLabelUrdu]}
                  numberOfLines={2}>
                  {t(`module.${m.key}`, m.label)}
                </Text>
                {!m.enabled && (
                  <Text style={[styles.tileSoon, rtl]}>{t('comingSoon')}</Text>
                )}
              </View>
            </Pressable>
          ))}
        </View>
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