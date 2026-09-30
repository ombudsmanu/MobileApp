import React, {useMemo} from 'react';
import {Linking, Pressable, ScrollView, View} from 'react-native';
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
import {
  createStyles,
  createDynamicStyles,
  BACK_RADIUS,
  REPORT_COLORS,
} from './AnnualReportsScreen.styles';

/**
 * ANNUAL REPORTS — one row per year.
 *
 * Tapping a year hands its PDF to the phone, which opens it in the browser
 * or a PDF app. That keeps downloading, zooming and sharing in the hands of
 * the tool the person already uses, and adds no library to the app.
 *
 * A year with no link yet is shown as unavailable rather than failing.
 */
const AnnualReportsScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);
  const {t, isRTL} = useLanguage();

  const openReport = async report => {
    if (!report.url) {
      notify.dialog({
        type: 'warning',
        title: t('reports.notReadyTitle'),
        message: t('reports.notReadyMsg'),
        button: 'OK',
      });
      return;
    }
    try {
      await Linking.openURL(report.url);
    } catch {
      notify.error(t('reports.openFailed'), t('reports.openFailedMsg'));
    }
  };

  return (
    <AppBackground>
      <View style={[styles.topBar, dyn.topBarPad]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
          <GlassSurface strong center radius={BACK_RADIUS} style={styles.backBtn}>
            <Icon name="chevronLeft" size={22} color={theme.icon.heading} weight={3} />
          </GlassSurface>
        </Pressable>
        <View style={styles.topTextWrap}>
          <Text style={styles.topTitle} numberOfLines={1}>
            {t('reports.title')}
          </Text>
          <Text style={styles.topSub} numberOfLines={1}>
            {t('reports.subtitle')}
          </Text>
        </View>
      </View>

      <ScrollView
        contentContainerStyle={[styles.scroll, dyn.scrollPad]}
        showsVerticalScrollIndicator={false}>
        <Text style={[styles.intro, isRTL && styles.introRTL]}>{t('reports.intro')}</Text>

        {annualReports.map(report => {
          const available = !!report.url;
          return (
            <Pressable key={report.year} onPress={() => openReport(report)}>
              <GlassSurface style={[styles.row, isRTL && styles.rowRTL, !available && styles.rowDisabled]}>
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
                  <Text style={styles.year}>{report.year}</Text>
                  <Text style={styles.reportLabel}>{t('reports.report')}</Text>
                  <View style={styles.statusPill}>
                    <Text style={styles.statusText}>
                      {available ? t('reports.open') : t('reports.unavailable')}
                    </Text>
                  </View>
                </View>

                <Icon
                  name={isRTL ? 'chevronLeft' : 'chevronRight'}
                  size={18}
                  color={theme.icon.muted}
                />
              </GlassSurface>
            </Pressable>
          );
        })}
      </ScrollView>
    </AppBackground>
  );
};

export default AnnualReportsScreen;