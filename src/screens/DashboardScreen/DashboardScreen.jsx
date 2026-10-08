import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, ScrollView, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { modulesForRole } from '../../navigation/modules';
import { presetBackgrounds } from '../../theme/backgrounds';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import ImageSlider from '../../components/ImageSlider/ImageSlider';
import Icon from '../../components/Icon/Icon';
import Sidebar from '../../components/Sidebar/Sidebar';
import ModuleTile from '../../components/ModuleTile/ModuleTile';
import { useScreenReady } from '../../navigation/useScreenReady';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import {
  createStyles,
  createDynamicStyles,
  MENU_RADIUS,
  MODULE_COLORS,
  MODULE_FALLBACK,
  TILE_STAGGER_MS,
} from './DashboardScreen.styles';

/**
 * One module card.
 *   Entrance: springs up and in, staggered by its position in the grid.
 *   Press:    shrinks slightly under the finger, springs back on release.
 * Coming-soon cards stay visible but slightly faded.
 */
// const ModuleTile = ({module, index, label, soonLabel, isRTL, onPress, styles}) => {
//   const appear = useRef(new Animated.Value(0)).current;
//   const press = useRef(new Animated.Value(1)).current;

//   useEffect(() => {
//     Animated.spring(appear, {
//       toValue: 1,
//       delay: TILE_STAGGER_MS * index,
//       friction: 7,
//       tension: 60,
//       useNativeDriver: true,
//     }).start();
//   }, [appear, index]);

//   const pressTo = value =>
//     Animated.spring(press, {
//       toValue: value,
//       friction: 6,
//       tension: 180,
//       useNativeDriver: true,
//     }).start();

//   const colors = MODULE_COLORS[module.key] ?? MODULE_FALLBACK;
//   const entranceScale = appear.interpolate({inputRange: [0, 1], outputRange: [0.92, 1]});

//   return (
//     <Pressable
//       disabled={!module.enabled}
//       onPress={onPress}
//       onPressIn={() => pressTo(0.96)}
//       onPressOut={() => pressTo(1)}
//       style={styles.tileOuter}>
//       <Animated.View
//         style={[
//           styles.tile,
//           {
//             opacity: module.enabled ? appear : Animated.multiply(appear, 0.78),
//             transform: [
//               {translateY: appear.interpolate({inputRange: [0, 1], outputRange: [18, 0]})},
//               {scale: Animated.multiply(press, entranceScale)},
//             ],
//           },
//         ]}>
//         <View pointerEvents="none" style={[styles.tileAccent, {backgroundColor: colors[1]}]} />

//         <View style={[styles.badgeShell, {backgroundColor: colors[1]}]}>
//           <LinearGradient
//             colors={colors}
//             start={{x: 0, y: 0}}
//             end={{x: 1, y: 1}}
//             style={styles.badge}>
//             <Icon name={module.icon} size={26} color="#FFFFFF" weight={2.5} />
//           </LinearGradient>
//         </View>

//                <View style={styles.nameRow}>
//           <Text
//             style={[styles.tileLabel, isRTL && styles.tileLabelUrdu]}
//             numberOfLines={2}
//             adjustsFontSizeToFit
//             minimumFontScale={0.8}>
//             {label}
//           </Text>
//         </View>

//         {!module.enabled && (
//           <View style={styles.soonPill}>
//             <Text style={styles.tileSoon}>{soonLabel}</Text>
//           </View>
//         )}
//       </Animated.View>
//     </Pressable>
//   );
// };

const DashboardScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);

  const { user, isGuest, role } = useAuth();
  const { lang, t, isRTL } = useLanguage();
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
  const rtl = isRTL ? styles.rtlText : null;

  return (
    <AppBackground>
      {/* ---------- TOP BAR ---------- */}
      <View style={[styles.topBar, dyn.topBarPad]}>
        <Pressable onPress={() => setDrawerOpen(true)} hitSlop={8}>
          <GlassSurface
            strong
            center
            radius={MENU_RADIUS}
            style={styles.menuBtn}
          >
            <Icon name="menu" size={24} color={theme.icon.heading} weight={3} />
          </GlassSurface>
        </Pressable>

        <View style={styles.topTextWrap}>
          <Text style={styles.topTitle}>OPMIS</Text>
          <Text
            style={[styles.topSub, isRTL ? styles.topSubUr : styles.topSubEn]}
            numberOfLines={2}
          >
            {t('orgName')}
          </Text>
        </View>

        <LanguageToggle />
      </View>

      <ScrollView
        style={styles.flex}
        contentContainerStyle={[styles.scroll, dyn.scrollPad]}
        showsVerticalScrollIndicator={false}
      >
        {/* ---------- IMAGE SLIDER ---------- */}
        <ImageSlider
          slides={slides}
          rtl={isRTL}
          overlay={
            <View style={styles.sliderOverlay} pointerEvents="none">
              <Text
                style={[styles.sliderName, isRTL && styles.sliderTextRTL]}
                numberOfLines={1}
              >
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

        <View style={[styles.tileGrid, isRTL && styles.tileGridRTL]}>
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
              isRTL={isRTL}
              onPress={() => navigation.navigate(m.route)}
            />
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
