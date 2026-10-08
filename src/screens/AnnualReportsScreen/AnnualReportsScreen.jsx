import React, {useMemo} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {annualReports} from '../../content/annualReports';
import {useScreenReady} from '../../navigation/useScreenReady';
import {notify} from '../../utils/notify';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import Icon from '../../components/Icon/Icon';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import StaggerIn from '../../components/StaggerIn/StaggerIn';
import ReportTile from './ReportTile';
import {createStyles, createDynamicStyles, BACK_RADIUS} from './AnnualReportsScreen.styles';

/**
 * ANNUAL REPORTS — a two-column grid of year tiles.
 *
 * Tapping a year opens its PDF inside the app (PdfViewer screen): scroll,
 * pinch-zoom and a page counter, with the file kept on the phone after the
 * first open so it reopens instantly, even offline.
 *
 * A year with no link yet is faded and says "Not available" rather than
 * failing when tapped.
 *
 * Years run newest-first in both languages. The tiles wait until the
 * screen has finished sliding in, then cascade in from the first tile.
 *
 * Each tile is drawn by ReportTile.jsx — keep that code in its own file.
 */
const AnnualReportsScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);
  const {t, isRTL} = useLanguage();
  const ready = useScreenReady();

  const openReport = report => {
    if (!report.url) {
      notify.dialog({
        type: 'warning',
        title: t('reports.notReadyTitle'),
        message: t('reports.notReadyMsg'),
        button: 'OK',
      });
      return;
    }
    navigation.navigate('PdfViewer', {
      url: report.url,
      title: `${t('reports.report')} ${report.year}`,
      cacheName: `annual-report-${report.year}`,
    });
  };

  return (
    <AppBackground>
      <View style={[styles.topBar, dyn.topBarPad]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <GlassSurface strong center radius={BACK_RADIUS} style={styles.backBtn}>
            <Icon name="chevronLeft" size={30} color={theme.icon.heading} weight={3} />
          </GlassSurface>
        </Pressable>
        <View style={styles.topTextWrap}>
          <Text style={[styles.topTitle, isRTL && styles.textRTL]} numberOfLines={2}>
            {t('reports.title')}
          </Text>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, dyn.scrollPad]}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.intro, isRTL && styles.textRTL]}>{t('reports.intro')}</Text>

        <View style={styles.grid}>
          {annualReports.map((report, index) => (
            <StaggerIn key={report.year} index={index} play={ready} style={styles.cardWrap}>
              <ReportTile
                year={report.year}
                available={!!report.url}
                subtitle={t('reports.report')}
                openLabel={t('reports.open')}
                soonLabel={t('reports.unavailable')}
                onPress={() => openReport(report)}
              />
            </StaggerIn>
          ))}
        </View>
      </ScrollView>
    </AppBackground>
  );
};

export default AnnualReportsScreen;