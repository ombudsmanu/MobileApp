import React, {useMemo} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {useLayout} from '../../theme/responsive';
import {useScreenReady} from '../../navigation/useScreenReady';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import Icon from '../../components/Icon/Icon';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import SectionRow from '../../components/SectionRow/SectionRow';
import StaggerIn from '../../components/StaggerIn/StaggerIn';
import CertificationBadges from '../../components/CertificationBadges/CertificationBadges';
import {CREST_SIZE_LARGE} from '../../components/CertificationBadges/CertificationBadges.styles';
import {createStyles, createDynamicStyles, BACK_RADIUS} from './TrackComplaintScreen.styles';

/**
 * TRACK A COMPLAINT — the landing screen. Two wide rows, exactly like
 * Register a Complaint (shared SectionRow), one for each kind of complaint:
 *
 *   Track Status of Complaint
 *   (Pakistani National)        → TrackPakistan
 *
 *   Track Status of Complaint
 *   (Overseas Pakistani)        → TrackOverseas
 *
 * `sub` is kept here in both languages, the same {en, ur} way Register a
 * Complaint does it. The coloured bar and coloured text tell the two apart,
 * so the rows have no icon — matching Register a Complaint.
 */
const OPTIONS = [
  {
    key: 'pakistan',
    route: 'TrackPakistan',
    sub: {en: '(Pakistani National)', ur: '(پاکستانی شہری)'},
    color: '#2E6B56', // green
  },
  {
    key: 'overseas',
    route: 'TrackOverseas',
    sub: {en: '(Overseas Pakistani)', ur: '(سمندر پار پاکستانی)'},
    color: '#C2610F', // orange
  },
];

const TrackComplaintScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const {width} = useLayout();
  const dyn = useMemo(() => createDynamicStyles(insets, width), [insets, width]);
  const {lang, t, isRTL} = useLanguage();
  const ready = useScreenReady();

  // "Track Status of Complaint" on the first line, "(Pakistani National)" on the second
  const labelFor = option =>
    `${t('track.rowTitle', 'Track Status of Complaint')}\n${option.sub[lang] ?? option.sub.en}`;

  return (
    <AppBackground>
      <View style={[styles.topBar, dyn.topBarPad]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
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
            {t('track.title', 'Track Complaint')}
          </Text>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView
        contentContainerStyle={dyn.scrollPad}
        showsVerticalScrollIndicator={false}>
        {/* Crest, Office name and certification badges — crest drawn larger,
            like Register a Complaint, because the content is centred and has
            empty space above it. */}
        <CertificationBadges
          play={ready}
          startIndex={0}
          style={styles.topBadges}
          crestSize={CREST_SIZE_LARGE}
        />

        {OPTIONS.map((option, index) => (
          <StaggerIn key={option.key} index={index} play={ready} style={styles.rowWrap}>
            <SectionRow
              label={labelFor(option)}
              color={option.color}
              rtl={isRTL}
              onPress={() => navigation.navigate(option.route)}
            />
          </StaggerIn>
        ))}
      </ScrollView>
    </AppBackground>
  );
};

export default TrackComplaintScreen;