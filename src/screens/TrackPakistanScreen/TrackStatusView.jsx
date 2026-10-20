import React, {useMemo, useState} from 'react';
import {Image, Pressable, ScrollView, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Text from '../../components/AppText/AppText';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {useLayout} from '../../theme/responsive';
import {useScreenReady} from '../../navigation/useScreenReady';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import GlassField from '../../components/GlassField/GlassField';
import GlassButton from '../../components/GlassButton/GlassButton';
import Icon from '../../components/Icon/Icon';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import CertificationBadges from '../../components/CertificationBadges/CertificationBadges';
import {digitsOnly} from '../../utils/validation';
import {notify} from '../../utils/notify';
import {createStyles, createDynamicStyles, BACK_RADIUS} from './TrackStatusView.styles';

const CREST = require('../../assets/images/crest.png');

/** A tracking number is EXACTLY 15 digits. */
const TRACK_LENGTH = 15;
const isValidTracking = value => /^\d{15}$/.test(value);

/**
 * TRACK STATUS — the shared body of both track screens (Pakistani National
 * and Overseas Pakistani). The two screens differ only in the title and the
 * accent colour, so the look and behaviour live here once.
 *
 *   titleKey      the card's title string key (e.g. 'track.pakistan.title')
 *   fallbackTitle English fallback for that title
 *   accent        the screen's colour
 *
 * A single card: crest, title, a one-line instruction, a 15-digit number
 * box and a Track button. The box accepts digits only, capped at 15. Track
 * checks the number is exactly 15 digits — if not, a short error shows under
 * the box — then (until the tracking service is connected) a "coming soon"
 * dialog is shown.
 *
 * Both languages: the card mirrors for Urdu — the box icon sits on the right,
 * the placeholder is right-aligned and uses the app's Urdu font. Typed digits
 * still read left-to-right (Unicode keeps a run of digits LTR).
 */
const TrackStatusView = ({navigation, titleKey, fallbackTitle, accent}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme, accent), [theme, accent]);
  const insets = useSafeAreaInsets();
  const {width} = useLayout();
  const dyn = useMemo(() => createDynamicStyles(insets, width), [insets, width]);
  const {t, isRTL} = useLanguage();
  const ready = useScreenReady();

  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState(null); // an error KEY, translated when shown

  const onChange = next => {
    const clean = digitsOnly(next, TRACK_LENGTH);
    setValue(clean);
    // Once an error is showing, clear it the moment the number becomes valid
    if (error && isValidTracking(clean)) {
      setError(null);
    }
  };

  const onBlur = () => {
    setFocused(false);
    if (value.length > 0 && !isValidTracking(value)) {
      setError('track.err');
    }
  };

  const onTrack = () => {
    if (!isValidTracking(value)) {
      setError('track.err');
      return;
    }
    setError(null);
    // The online tracking service is not connected yet: tell the user it is
    // coming. When the API is ready, replace this block with the lookup and
    // a result screen.
    notify.dialog({
      type: 'success',
      title: t('track.soonTitle', 'Coming soon'),
      message: t('track.soonMsg', 'Online complaint tracking will be available soon.'),
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
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">
        

          {/* contentStyle centres the children: GlassSurface puts them in an
              inner view that does NOT centre on its own. */}
          <GlassSurface style={styles.card} contentStyle={styles.cardContent}>
            <Image source={CREST} style={styles.crest} resizeMode="contain" />

            <Text style={styles.title}>{t(titleKey, fallbackTitle)}</Text>
            <Text style={styles.subtitle}>
              {t(
                'track.enterHint',
                'Please enter your 15 digit Complaint Number below to track the status:',
              )}
            </Text>

            {/* key changes with the language, so switching English <-> Urdu
                builds a FRESH input. Android does not fully reset a live
                TextInput's placeholder when its font, alignment and direction
                change — it kept the Urdu (Nastaliq) metrics and alignment, so
                the English placeholder vanished after a toggle. A fresh input
                is set up exactly like the first open. The typed number is kept,
                because it lives in `value` state, not in the input. */}
            <GlassField
              key={isRTL ? 'track-input-ur' : 'track-input-en'}
              value={value}
              onChangeText={onChange}
              onFocus={() => setFocused(true)}
              onBlur={onBlur}
              focused={focused}
              errored={!!error}
              keyboardType="number-pad"
              maxLength={TRACK_LENGTH}
              placeholder={t('track.placeholder', 'Enter Complaint Number')}
              inputStyle={[styles.input, isRTL ? styles.inputRTL : styles.inputLTR]}
              style={styles.field}
              action={
                <View style={[styles.fieldIcon, isRTL ? styles.fieldIconRTL : styles.fieldIconLTR]}>
                  <Icon name="inbox" size={20} color={accent} weight={2} />
                </View>
              }
            />
            {error ? (
              <Text style={[styles.error, isRTL && styles.textRTL]}>{t(error)}</Text>
            ) : null}

            <GlassButton
              label={t('track.button', 'Track')}
              onPress={onTrack}
              variant="confirm"
              icon={<Icon name="chart" size={18} color="#FFFFFF" weight={2.5} />}
              style={styles.trackBtn}
            />
          </GlassSurface>
          <CertificationBadges
          play={ready}
          startIndex={0}
          style={styles.badges}
          showCrest={false}
        />
      </ScrollView>
    </AppBackground>
  );
};

export default TrackStatusView;