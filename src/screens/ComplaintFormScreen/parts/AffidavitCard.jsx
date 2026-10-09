import React, {useMemo, useState} from 'react';
import {View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Text from '../../../components/AppText/AppText';
import GlassSurface from '../../../components/GlassSurface/GlassSurface';
import GlassButton from '../../../components/GlassButton/GlassButton';
import Icon from '../../../components/Icon/Icon';
import {useTheme} from '../../../context/ThemeContext';
import {useLanguage} from '../../../context/LanguageContext';
import {notify} from '../../../utils/notify';
import {downloadToDevice} from '../../../utils/downloadFile';
import {createAffidavitStyles} from './parts.styles';

/**
 * AFFIDAVIT CARD — the affidavit with both actions, exactly as on the
 * Downloads screen:
 *   VIEW      opens it in the app's PDF viewer (cached after the first open)
 *   DOWNLOAD  saves it into the phone's Downloads folder
 *
 * Shared by the Pakistani and Overseas complaint forms, so the affidavit
 * behaves the same in both and the link lives in one place.
 */
export const AFFIDAVIT_URL = 'https://ombudsmanpunjab.gov.pk/system/files/Affidavit.pdf';
export const AFFIDAVIT_FILE = 'Ombudsman-Punjab-Affidavit.pdf';

const AffidavitCard = () => {
  const {theme} = useTheme();
  const styles = useMemo(() => createAffidavitStyles(theme), [theme]);
  const {t, isRTL} = useLanguage();
  const navigation = useNavigation();
  const [downloading, setDownloading] = useState(false);

  const view = () =>
    navigation.navigate('PdfViewer', {
      url: AFFIDAVIT_URL,
      title: t('downloads.affidavit'),
      cacheName: 'affidavit',
    });

  const download = async () => {
    setDownloading(true);
    try {
      await downloadToDevice({url: AFFIDAVIT_URL, fileName: AFFIDAVIT_FILE});
      notify.success(t('downloads.savedTitle'), t('downloads.savedMsg'));
    } catch (e) {
      if (__DEV__) {
        console.warn('[Affidavit] save failed', e?.message ?? e);
      }
      notify.error(t('downloads.failedTitle'), t('downloads.failedMsg'));
    } finally {
      setDownloading(false);
    }
  };

  return (
    <View style={styles.wrap}>
      <GlassSurface style={styles.card}>
        <View style={[styles.head, isRTL && styles.rowRTL]}>
          <Icon name="doc" size={20} color={theme.accent} weight={2.5} />
          <Text style={[styles.title, isRTL && styles.rtl]}>
            {t('cf.affidavitCardTitle')}
          </Text>
        </View>
        <Text style={[styles.desc, isRTL && styles.rtl]}>
          {t('cf.affidavitCardDesc')}
        </Text>
        <View style={[styles.actions, isRTL && styles.rowRTL]}>
          <GlassButton
            label={t('downloads.view')}
            variant="info"
            onPress={view}
            disabled={downloading}
            style={styles.btn}
          />
          <GlassButton
            label={t('downloads.download')}
            variant="confirm"
            onPress={download}
            loading={downloading}
            style={styles.btn}
          />
        </View>
      </GlassSurface>
    </View>
  );
};

export default AffidavitCard;