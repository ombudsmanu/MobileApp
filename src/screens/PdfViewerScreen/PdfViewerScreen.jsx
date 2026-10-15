import React, {useCallback, useMemo, useState} from 'react';
import {ActivityIndicator, Linking, Pressable, View} from 'react-native';
import Pdf from 'react-native-pdf';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {useLayout} from '../../theme/responsive';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import GlassButton from '../../components/GlassButton/GlassButton';
import Icon from '../../components/Icon/Icon';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import {notify} from '../../utils/notify';
import {downloadToDevice, saveLocalFileToDevice} from '../../utils/downloadFile';
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
 *   url          the PDF's web address
 *   titleKey     the strings.js key for the title ("reports.report"). When
 *                given, the title is translated HERE, so it follows the
 *                language toggle in this screen's own top bar.
 *   titleSuffix  text after the translated title (the year: "2025")
 *   title        a ready-made title, used only when there is no titleKey
 *   cacheName    file name for the saved copy ("annual-report-2025")
 *   fileName     optional — the name to save it under in the phone's
 *                Downloads folder ("Ombudsman-Punjab-Affidavit.pdf"). When
 *                given, a DOWNLOAD button appears in a footer UNDER the
 *                document. Screens that pass none (Annual Reports) show no
 *                footer, and the document runs to the bottom of the screen.
 *
 * TOP BAR — back, the title, and the app's language button. Switching the
 * language here re-translates the title and the status texts at once.
 *
 * PAGE COUNTER — "Page 2 / 14" under the title, shown only for documents
 * with more than one page. A one-page document (the affidavit) has nothing
 * to count, so the line is left out rather than reading "Page 1 / 1".
 *
 * CACHING — the first open downloads the file and keeps a copy on the phone
 * for CACHE_DAYS. Every later open reads that copy: instant, and it works
 * with no internet.
 *
 * DOWNLOAD — once the document is on screen, its cached copy is copied
 * straight into Downloads: instant, and it works offline. If that copy
 * can't be used (still loading, or the cache was cleared), the file is
 * fetched from the web instead.
 *
 * STATES — loading (progress card) → ready, or error (retry, or hand the
 * link to the browser as a fallback).
 *
 * RESPONSIVE — the document uses the full width of the screen in every
 * orientation (minus the notch and side navigation bar in landscape), and
 * re-fits its pages when the phone is rotated.
 *
 * SECURITY — trustAllCerts={false}: the download only succeeds over a valid
 * HTTPS certificate. The library's default would accept any certificate,
 * including a forged one.
 */

// Anything after '#' is for web browsers only; dropping it keeps one clean
// address (and one cached copy) per report
const cleanUrl = url => (url || '').split('#')[0];

const PdfViewerScreen = ({navigation, route}) => {
  const {url, title, titleKey, titleSuffix, cacheName, fileName} = route.params ?? {};
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const {width} = useLayout();
  const dyn = useMemo(() => createDynamicStyles(insets, width), [insets, width]);
  const {t, isRTL} = useLanguage();

  const [status, setStatus] = useState('loading'); // 'loading' | 'ready' | 'error'
  const [progress, setProgress] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(0);
  // Changing the key remounts <Pdf>, which starts the download again
  const [attempt, setAttempt] = useState(0);
  // Technical reason for the last failure — shown only in development builds
  const [detail, setDetail] = useState('');
  // Where the viewer keeps the document on the phone (set once it loads)
  const [localPath, setLocalPath] = useState('');
  const [saving, setSaving] = useState(false);

  // Translated on every render, so the language button re-titles the page
  const shownTitle = titleKey
    ? [t(titleKey, title), titleSuffix].filter(Boolean).join(' ')
    : title;

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

  /** Save the document on screen into the phone's Downloads folder. */
  const save = useCallback(async () => {
    if (!fileName || saving) {
      return;
    }
    setSaving(true);
    try {
      try {
        // Fast path: the copy the viewer already has
        await saveLocalFileToDevice({path: localPath, fileName});
      } catch {
        // Not loaded yet, or the cache was cleared — fetch it from the web
        await downloadToDevice({url, fileName});
      }
      notify.success(t('downloads.savedTitle'), t('downloads.savedMsg'));
    } catch (e) {
      if (__DEV__) {
        console.warn('[PdfViewer] could not save', fileName, e?.message ?? e);
      }
      notify.error(t('downloads.failedTitle'), t('downloads.failedMsg'));
    } finally {
      setSaving(false);
    }
  }, [fileName, saving, localPath, url, t]);

  // The line under the title. Empty for a ready ONE-page document, so the
  // affidavit shows no "Page 1 / 1".
  const subtitle =
    status === 'error'
      ? t('pdf.errorTitle', "Couldn't open this report")
      : status === 'loading'
      ? t('pdf.loading', 'Loading report…')
      : pages > 1
      ? `${t('pdf.page', 'Page')} ${page} / ${pages}`
      : '';

  const hasFooter = !!fileName;

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
            minimumFontScale={0.8}>
            {shownTitle}
          </Text>
          {!!subtitle && (
            <Text style={[styles.topSub, isRTL && styles.textRTL]} numberOfLines={1}>
              {subtitle}
            </Text>
          )}
        </View>
        <LanguageToggle />
      </View>

      <View style={[styles.body, hasFooter ? dyn.bodyPadAboveFooter : dyn.bodyPad]}>
        {status !== 'error' && (
          <Pdf
            key={attempt}
            source={source}
            trustAllCerts={false}
            fitPolicy={0}
            spacing={8}
            renderActivityIndicator={() => null}
            onLoadProgress={p => setProgress(p)}
            onLoadComplete={(numberOfPages, filePath) => {
              setPages(numberOfPages);
              // The cached copy on the phone — DOWNLOAD copies this one
              setLocalPath(filePath ?? '');
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
            style={[styles.pdf, dyn.pdfSize]}
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

      {/* DOWNLOAD — in a footer under the document, only for documents
          the caller gave a file name */}
      {hasFooter && (
        <View style={[styles.footer, dyn.footerPad]}>
          <GlassButton
            label={t('downloads.download')}
            variant="confirm"
            onPress={save}
            loading={saving}
            disabled={saving}
            icon={<Icon name="download" size={18} color="#FFFFFF" weight={2.5} />}
            style={styles.footerBtn}
          />
        </View>
      )}
    </AppBackground>
  );
};

export default PdfViewerScreen;