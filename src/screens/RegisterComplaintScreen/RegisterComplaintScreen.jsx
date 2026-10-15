import { useMemo } from 'react';
import React from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useLayout } from '../../theme/responsive';
import { useScreenReady } from '../../navigation/useScreenReady';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import Icon from '../../components/Icon/Icon';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import SectionRow from '../../components/SectionRow/SectionRow';
import StaggerIn from '../../components/StaggerIn/StaggerIn';
import CertificationBadges from '../../components/CertificationBadges/CertificationBadges';
import { CREST_SIZE_LARGE } from '../../components/CertificationBadges/CertificationBadges.styles';
import {
  createStyles,
  createDynamicStyles,
  BACK_RADIUS,
} from './RegisterComplaintScreen.styles';

/**
 * The two ways to register a complaint, as wide rows — the same design as
 * Our Team's Head Office / Regional Office rows (shared SectionRow).
 *
 * Each row's label is two lines:
 *   Register a Complaint            ← the screen title string
 *   (Pakistani National)            ← `sub`, who the form is for
 * `sub` is kept here in both languages, the same {en, ur} way the form's
 * radio options are. SectionRow already allows a two-line label.
 *
 * NO ICONS on the rows — the coloured bar and the coloured text already
 * tell the two apart. `icon` stays in the data only because the
 * "Coming Soon" fallback below uses it for an option that has no form yet.
 */
const OPTIONS = [
  {
    key: 'pakistan',
    labelKey: 'complaint.pakistan',
    fallback: 'Pakistan Nationals',
    sub: { en: '(Pakistani National)', ur: '(پاکستانی شہری)' },
    color: '#2E6B56', // green
    icon: 'user',
  },
  {
    key: 'overseas',
    labelKey: 'complaint.overseas',
    fallback: 'Overseas Nationals',
    sub: { en: '(Overseas Pakistani)', ur: '(سمندر پار پاکستانی)' },
    color: '#C2610F', // orange
    icon: 'users',
  },
];

const RegisterComplaintScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const { width } = useLayout();
  const dyn = useMemo(() => createDynamicStyles(insets, width), [insets, width]);
  const { lang, t, isRTL } = useLanguage();
  const ready = useScreenReady();

  // Each option goes to its own form
  const ROUTES = {
    pakistan: 'ComplaintFormPakistan',
    overseas: 'ComplaintFormOverseas',
  };

  // "Register a Complaint" on the first line, "(Pakistani National)" on the second
  const labelFor = option =>
    `${t('screen.registerComplaint')}\n${option.sub[lang] ?? option.sub.en}`;

  const open = option => {
    const route = ROUTES[option.key];
    if (route) {
      navigation.navigate(route);
      return;
    }
    // Anything added later without a form yet falls back to the placeholder
    navigation.navigate('ComplaintForm', {
      titleKey: option.labelKey,
      fallbackTitle: option.fallback,
      icon: option.icon,
    });
  };

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
          {/* ONE line, shrunk to fit — on a narrower phone (the Redmi is
              ~20dp narrower than the Pixel emulator) it no longer wraps */}
          <Text
            style={[styles.topTitle, isRTL && styles.textRTL]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
          >
            {t('screen.registerComplaint')}
          </Text>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView
        contentContainerStyle={dyn.scrollPad}
        showsVerticalScrollIndicator={false}
      >
        {/* Crest, Office name and certification badges.
            This screen's content is vertically CENTRED (scrollPad has
            flexGrow + justifyContent: 'center'), so it has empty space above
            the block — the crest is drawn larger here to fill the top of the
            screen. Only the crest grows; the name and badges stay standard. */}
        <CertificationBadges
          play={ready}
          startIndex={0}
          style={styles.topBadges}
          crestSize={CREST_SIZE_LARGE}
        />

        {OPTIONS.map((option, index) => (
          <StaggerIn
            key={option.key}
            index={index}
            play={ready}
            style={styles.rowWrap}
          >
            {/* No icon prop: SectionRow then draws the row exactly like
                Our Team's — the coloured bar and a centred label */}
            <SectionRow
              label={labelFor(option)}
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