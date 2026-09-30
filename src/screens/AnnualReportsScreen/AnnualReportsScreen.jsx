import React, {useMemo} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {annualReports} from '../../content/annualReports';
import {notify} from '../../utils/notify';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import Icon from '../../components/Icon/Icon';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import {
  createStyles,
  createDynamicStyles,
  BACK_RADIUS,
  REPORT_COLORS,
} from './AnnualReportsScreen.styles';

/**
 * ANNUAL REPORTS — one row per year.
 *
 * Tapping a year opens its PDF inside the app (PdfViewer screen): scroll,
 * pinch-zoom and a page counter, with the file kept on the phone after the
 * first open so it reopens instantly, even offline.
 *
 * A year with no link yet is shown as unavailable rather than failing.
 *
 * LAYOUT NOTE — every row lays itself out inside its OWN <View>, not on the
 * GlassSurface. GlassSurface puts its children in an inner content view, so
 * flexDirection passed through its `style` prop lands on the wrong element.
 */
const AnnualReportsScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);
  const {t, isRTL} = useLanguage();

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
          <Text style={[styles.topTitle, isRTL && styles.textRTL]} numberOfLines={1}>
            {t('reports.title')}
          </Text>
          <Text style={[styles.topSub, isRTL && styles.textRTL]} numberOfLines={2}>
            {t('reports.subtitle')}
          </Text>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, dyn.scrollPad]}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.intro, isRTL && styles.textRTL]}>{t('reports.intro')}</Text>

        {annualReports.map(report => {
          const available = !!report.url;
          return (
            <Pressable
              key={report.year}
              onPress={() => openReport(report)}
              style={({pressed}) => [styles.cardPress, pressed && styles.cardPressed]}>
              <GlassSurface style={[styles.card, !available && styles.cardDisabled]}>
                <View style={[styles.row, isRTL && styles.rowRTL]}>
                  <View style={[styles.badgeShell, {backgroundColor: REPORT_COLORS[1]}]}>
                    <LinearGradient
                      colors={REPORT_COLORS}
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 1}}
                      style={styles.badge}>
                      <Icon name="doc" size={24} color="#FFFFFF" weight={2.5} />
                    </LinearGradient>
                  </View>

                  <View style={[styles.rowText, isRTL && styles.rowTextRTL]}>
                    <Text style={[styles.year, isRTL && styles.textRTL]} numberOfLines={1}>
                      {report.year}
                    </Text>
                    <Text style={[styles.reportLabel, isRTL && styles.textRTL]} numberOfLines={1}>
                      {t('reports.report')}
                    </Text>
                  </View>

                  <View style={[styles.rowEnd, isRTL && styles.rowEndRTL]}>
                    <View style={[styles.statusPill, !available && styles.statusPillMuted]}>
                      <Text
                        style={[styles.statusText, !available && styles.statusTextMuted]}
                        numberOfLines={1}>
                        {available ? t('reports.open') : t('reports.unavailable')}
                      </Text>
                    </View>
                    <Icon
                      name={isRTL ? 'chevronLeft' : 'chevronRight'}
                      size={18}
                      color={theme.icon.muted}
                      weight={2.5}
                    />
                  </View>
                </View>
              </GlassSurface>
            </Pressable>
          );
        })}
      </ScrollView>
    </AppBackground>
  );
};

export default AnnualReportsScreen;