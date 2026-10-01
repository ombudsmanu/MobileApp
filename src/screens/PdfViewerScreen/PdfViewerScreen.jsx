import React, {useCallback, useMemo, useState} from 'react';
import {ActivityIndicator, Linking, Pressable, View, useWindowDimensions} from 'react-native';
import Pdf from 'react-native-pdf';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import GlassButton from '../../components/GlassButton/GlassButton';
import Icon from '../../components/Icon/Icon';
import {notify} from '../../utils/notify';
import {
  createStyles,
  createDynamicStyles,
  BACK_RADIUS,
  CACHE_DAYS,
} from './PdfViewerScreen.styles';

/**
 * PDF VIEWER — shows a PDF from the web inside the app.
 *
 * Route params:
 *   url        the PDF's web address
 *   title      shown in the top bar ("Annual Report 2025")
 *   cacheName  file name for the saved copy ("annual-report-2025")
 *
 * CACHING — the first open downloads the file and keeps a copy on the phone
 * for CACHE_DAYS. Every later open reads that copy: instant, and it works
 * with no internet.
 *
 * STATES — loading (progress card) → ready (page counter in the top bar),
 * or error (retry, or hand the link to the browser as a fallback).
 *
 * SECURITY — trustAllCerts={false}: the download only succeeds over a valid
 * HTTPS certificate. The library's default would accept any certificate,
 * including a forged one.
 */

// Anything after '#' is for web browsers only; dropping it keeps one clean
// address (and one cached copy) per report
const cleanUrl = url => (url || '').split('#')[0];

const PdfViewerScreen = ({navigation, route}) => {
  const {url, title, cacheName} = route.params ?? {};
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);
  const {t, isRTL} = useLanguage();
  const {width} = useWindowDimensions();

  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  // Changing the key remounts <Pdf>, which starts the download again
  const [attempt, setAttempt] = useState(0);
  // Technical reason for the last failure — shown only in development builds
  const [detail, setDetail] = useState('');
  const source = useMemo(
    () => ({
      uri: cleanUrl(url),
      cache: true,
      cacheFileName: cacheName,
      expiration: CACHE_DAYS * 24 * 60 * 60,
    }),
    [url, cacheName],
  );

    const retry = useCallback(() => {
    setDetail('');
    setProgress(0);
    setStatus('loading');
    setAttempt(a => a + 1);
  }, []);

  const openInBrowser = useCallback(async () => {
    try {
      await Linking.openURL(url);
    } catch {
      notify.error(t('reports.openFailed'), t('reports.openFailedMsg'));
    }
  }, [url, t]);

  const subtitle =
    status === 'ready'
      ? `${t('pdf.page', 'Page')} ${page} / ${pages}`
      : status === 'error'
      ? t('pdf.errorTitle', "Couldn't open this report")
      : t('pdf.loading', 'Loading report…');

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
            {title}
          </Text>
          <Text style={[styles.topSub, isRTL && styles.textRTL]} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>
      </View>

      <View style={[styles.body, dyn.bodyPad]}>
        {status !== 'error' && (
          <Pdf
            key={attempt}
            source={source}
            trustAllCerts={false}
            fitPolicy={0}
            spacing={8}
            renderActivityIndicator={() => null}
            onLoadProgress={p => setProgress(p)}
            onLoadComplete={numberOfPages => {
              setPages(numberOfPages);
              setStatus('ready');
            }}
            onPageChanged={(current, total) => {
              setPage(current);
              setPages(total);
            }}
            onError={error => {
              const message = String(error?.message ?? error);
              console.warn('[PdfViewer] could not load', source.uri, message);
              setDetail(message);
              setStatus('error');
            }}
            style={[styles.pdf, {width}]}
          />
        )}

        {status === 'loading' && (
          <View style={styles.overlay} pointerEvents="none">
            <GlassSurface strong style={styles.statusCard} contentStyle={styles.statusContent}>
              <ActivityIndicator size="large" color={theme.accent} />
              <Text style={styles.statusTitle}>{t('pdf.loading', 'Loading report…')}</Text>
              <View style={styles.progressTrack}>
                <View
                  style={[
                    styles.progressFill,
                    {width: `${Math.max(4, Math.round(progress * 100))}%`},
                  ]}
                />
              </View>
              <Text style={styles.statusText}>
                {t(
                  'pdf.loadingHint',
                  'The first time takes a moment. After that it opens instantly, even offline.',
                )}
              </Text>
            </GlassSurface>
          </View>
        )}

        {status === 'error' && (
          <View style={styles.overlay}>
            <GlassSurface strong style={styles.statusCard} contentStyle={styles.statusContent}>
              <Icon name="doc" size={34} color={theme.icon.muted} weight={2.5} />
              <Text style={styles.statusTitle}>
                {t('pdf.errorTitle', "Couldn't open this report")}
              </Text>
              <Text style={styles.statusText}>
                {t(
                  'pdf.errorMsg',
                  'Check your internet connection and try again, or open it in the browser.',
                )}
              </Text>
             {__DEV__ && !!detail && (
                <Text style={styles.statusDetail} selectable>
                  {detail}
                </Text>
              )}
              <View style={styles.buttons}>
                <GlassButton
                  label={t('pdf.retry', 'TRY AGAIN')}
                  variant="primary"
                  onPress={retry}
                  style={styles.button}
                />
                <GlassButton
                  label={t('pdf.openBrowser', 'OPEN IN BROWSER')}
                  variant="info"
                  onPress={openInBrowser}
                  style={styles.button}
                />
              </View>
            </GlassSurface>
          </View>
        )}
      </View>
    </AppBackground>
  );
};

export default PdfViewerScreen;