import React, {useMemo} from 'react';
import {Pressable, ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {useLayout} from '../../theme/responsive';
import {downloads} from '../../content/downloads';
import {useScreenReady} from '../../navigation/useScreenReady';
import {notify} from '../../utils/notify';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import GlassButton from '../../components/GlassButton/GlassButton';
import Icon from '../../components/Icon/Icon';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import StaggerIn from '../../components/StaggerIn/StaggerIn';
import CertificationBadges from '../../components/CertificationBadges/CertificationBadges';
import {
  createStyles,
  createDynamicStyles,
  BACK_RADIUS,
  DOWNLOAD_COLORS,
} from './DownloadsScreen.styles';

/**
 * One document: badge, title, description, and one action —
 *   VIEW  opens it in the app's PDF viewer. Saving it to the phone is done
 *         from INSIDE the viewer (the DOWNLOAD button in the footer under
 *         the document), so the user sees the document before keeping it.
 * The viewer gets the title as a KEY, so it follows the language button
 * inside the viewer too.
 * A document with no link yet says "Not available yet" instead of failing.
 */
const DownloadCard = ({item, styles, t, isRTL, navigation}) => {
  const title = t(item.titleKey, item.fallbackTitle);

  const notReady = () =>
    notify.dialog({
      type: 'warning',
      title: t('downloads.notReadyTitle'),
      message: t('downloads.notReadyMsg'),
      button: 'OK',
    });

  const view = () => {
    if (!item.url) {
      notReady();
      return;
    }
    navigation.navigate('PdfViewer', {
      url: item.url,
      titleKey: item.titleKey,
      title,
      cacheName: `download-${item.key}`,
      // Shows the DOWNLOAD footer inside the viewer
      fileName: item.fileName,
    });
  };

  return (
    <GlassSurface style={styles.card}>
      <View style={[styles.row, isRTL && styles.rowRTL]}>
        <View style={styles.badgeShell}>
          <LinearGradient
            colors={DOWNLOAD_COLORS}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            style={styles.badge}>
            <Icon name="doc" size={24} color="#FFFFFF" weight={2.5} />
          </LinearGradient>
        </View>
        <View style={[styles.textBlock, isRTL && styles.textBlockRTL]}>
          <Text style={[styles.title, isRTL && styles.textRTL]}>{title}</Text>
          <Text style={[styles.desc, isRTL && styles.textRTL]}>{t(item.descKey, '')}</Text>
        </View>
      </View>

      <View style={[styles.actions, isRTL && styles.rowRTL]}>
        <GlassButton
          label={t('downloads.view')}
          variant="info"
          onPress={view}
          style={styles.action}
        />
      </View>
    </GlassSurface>
  );
};

/**
 * DOWNLOADS — forms and documents the public can view or save.
 * The list lives in content/downloads.js; adding a document is one entry
 * there plus its two strings. Cards cascade in once the screen settles.
 */
const DownloadsScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const {width} = useLayout();
  const dyn = useMemo(() => createDynamicStyles(insets, width), [insets, width]);
  const {t, isRTL} = useLanguage();
  const ready = useScreenReady();

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
            {t('downloads.title')}
          </Text>
        </View>
        <LanguageToggle />
      </View>

      <ScrollView
        contentContainerStyle={dyn.scrollPad}
        showsVerticalScrollIndicator={false}>
        <CertificationBadges play={ready} startIndex={0} style={styles.topBadges} />
        <Text style={[styles.intro, isRTL && styles.textRTL]}>{t('downloads.intro')}</Text>

        {downloads.map((item, index) => (
          <StaggerIn key={item.key} index={index} play={ready} style={styles.cardWrap}>
            <DownloadCard
              item={item}
              styles={styles}
              t={t}
              isRTL={isRTL}
              navigation={navigation}
            />
          </StaggerIn>
        ))}
      </ScrollView>
    </AppBackground>
  );
};

export default DownloadsScreen;