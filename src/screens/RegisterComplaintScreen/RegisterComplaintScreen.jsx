import React, { useMemo } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useScreenReady } from '../../navigation/useScreenReady';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import Icon from '../../components/Icon/Icon';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import SectionRow from '../../components/SectionRow/SectionRow';
import StaggerIn from '../../components/StaggerIn/StaggerIn';
import CertificationBadges from '../../components/CertificationBadges/CertificationBadges';
import {
  createStyles,
  createDynamicStyles,
  BACK_RADIUS,
} from './RegisterComplaintScreen.styles';

/**
 * The two ways to register a complaint, as wide rows — the same design as
 * Our Team's Head Office / Regional Office rows (shared SectionRow).
 *
 * Each opens a "Coming soon" page for now (the ComplaintForm route). When
 * the forms are built, point each option at its form screen instead.
 */
const OPTIONS = [
  {
    key: 'pakistan',
    labelKey: 'complaint.pakistan',
    fallback: 'Pakistan Nationals',
    color: '#2E6B56', // green
    icon: 'user',
  },
  {
    key: 'overseas',
    labelKey: 'complaint.overseas',
    fallback: 'Overseas Nationals',
    color: '#C2610F', // orange
    icon: 'users',
  },
];

const RegisterComplaintScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);
  const { t, isRTL } = useLanguage();
  const ready = useScreenReady();

  const open = option =>
    navigation.navigate('ComplaintForm', {
      titleKey: option.labelKey,
      fallbackTitle: option.fallback,
      icon: option.icon,
    });

  return (
    <AppBackground>
      <View style={[styles.topBar, dyn.topBarPad]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
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
            {t('screen.registerComplaint')}
          </Text>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, dyn.scrollPad]}
        showsVerticalScrollIndicator={false}
      >
        <CertificationBadges
          play={ready}
          startIndex={0}
          style={styles.topBadges}
        />
        <Text style={[styles.intro, isRTL && styles.textRTL]}>
          {t('complaint.intro')}
        </Text>

        {OPTIONS.map((option, index) => (
          <StaggerIn
            key={option.key}
            index={index}
            play={ready}
            style={styles.rowWrap}
          >
            <SectionRow
              label={t(option.labelKey, option.fallback)}
              color={option.color}
              rtl={isRTL}
              onPress={() => open(option)}
            />
          </StaggerIn>
        ))}
      </ScrollView>
    </AppBackground>
  );
};

export default RegisterComplaintScreen;
