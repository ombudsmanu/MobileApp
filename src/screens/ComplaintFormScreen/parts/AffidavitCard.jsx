import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Text from '../../../components/AppText/AppText';
import GlassSurface from '../../../components/GlassSurface/GlassSurface';
import GlassButton from '../../../components/GlassButton/GlassButton';
import Icon from '../../../components/Icon/Icon';
import { useTheme } from '../../../context/ThemeContext';
import { useLanguage } from '../../../context/LanguageContext';
import { createAffidavitStyles } from './parts.styles';

/**
 * AFFIDAVIT CARD — the affidavit, exactly as on the Downloads screen:
 *   VIEW  opens it in the app's PDF viewer (cached after the first open).
 *         Saving it to the phone is done from INSIDE the viewer — the
 *         DOWNLOAD button in the footer under the document — so the user
 *         sees the document before keeping it.
 *
 * The viewer gets the title as a KEY (titleKey), not as translated text,
 * so the title follows the language button inside the viewer too.
 *
 * Shared by the Pakistani and Overseas complaint forms, so the affidavit
 * behaves the same in both and the link lives in one place.
 */
export const AFFIDAVIT_URL =
  'https://ombudsmanpunjab.gov.pk/system/files/Affidavit.pdf';
export const AFFIDAVIT_FILE = 'Ombudsman-Punjab-Affidavit.pdf';

const AffidavitCard = () => {
  const { theme } = useTheme();
  const styles = useMemo(() => createAffidavitStyles(theme), [theme]);
  const { t, isRTL } = useLanguage();
  const navigation = useNavigation();

  const view = () =>
    navigation.navigate('PdfViewer', {
      url: AFFIDAVIT_URL,
      titleKey: 'downloads.affidavit',
      title: t('downloads.affidavit'),
      cacheName: 'affidavit',
      // Shows the DOWNLOAD footer inside the viewer
      fileName: AFFIDAVIT_FILE,
    });

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
            style={styles.btn}
          />
        </View>
      </GlassSurface>
    </View>
  );
};

export default AffidavitCard;