import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Animated, Easing, Image, Pressable, ScrollView, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import Text from '../../components/AppText/AppText';
import {useTheme, PreviewThemeProvider} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import {notify} from '../../utils/notify';
import {radii} from '../../theme/tokens';
import {colorTargets, textSwatches, backgroundSwatches} from '../../theme/swatches';
import {presetBackgrounds} from '../../theme/backgrounds';
import {recommendTextColors} from '../../theme/colorUtils';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import GlassButton from '../../components/GlassButton/GlassButton';
import Icon from '../../components/Icon/Icon';
import LanguageToggle from '../../components/LanguageToggle/LanguageToggle';
import {
  createStyles,
  createDynamicStyles,
  BACK_RADIUS,
} from './AppearanceScreen.styles';

const SPECTRUM = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#007AFF', '#AF52DE'];



const TEXT_ROLES = ['headline', 'title', 'body', 'label'];

/** The one gradient shape proven to render: in-flow, own size and radius. */
const TILE_SHAPE = {
  width: 42,
  height: 42,
  borderRadius: radii.sm,
  marginHorizontal: 5,
  marginBottom: 10,
};
const TILE_OVERLAY = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: radii.sm,
};
const TILE_CENTER = {...TILE_OVERLAY, alignItems: 'center', justifyContent: 'center'};

// ---------------------------------------------------------------------------

const Chip = ({label, active, onPress, styles}) => (
  <Pressable
    onPress={onPress}
    style={[styles.chip, active ? styles.chipActive : styles.chipIdle]}>
    <Text style={[styles.chipText, active && styles.chipTextActive]}>{label}</Text>
  </Pressable>
);

const GradientTile = ({colors, active, onPress, theme, children}) => (
  <LinearGradient colors={colors} start={{x: 0, y: 0}} end={{x: 1, y: 1}} style={TILE_SHAPE}>
    <View
      pointerEvents="none"
      style={[
        TILE_OVERLAY,
        {
          borderWidth: active ? 3 : 1,
          borderColor: active ? theme.accent : theme.glass.border,
        },
      ]}
    />
    <Pressable onPress={onPress} style={TILE_CENTER}>
      {children}
    </Pressable>
  </LinearGradient>
);

const CustomTile = ({customColor, onPress, theme, styles}) => (
  <GradientTile
    colors={customColor ? [customColor, customColor] : SPECTRUM}
    active={!!customColor}
    onPress={onPress}
    theme={theme}>
    <View style={styles.customPlus}>
      {customColor ? (
        <Icon name="check" size={12} color="#1B3D20" weight={2} />
      ) : (
        <Text style={styles.customPlusText}>+</Text>
      )}
    </View>
  </GradientTile>
);

const ApplyBar = ({dirty, dirtyText, discardLabel, applyLabel, onDiscard, onApply, styles}) => {
  const appear = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (dirty) {
      appear.setValue(0);
      Animated.timing(appear, {
        toValue: 1,
        duration: 220,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [dirty, appear]);

  if (!dirty) {
    return null;
  }

  return (
    <Animated.View
      style={{
        opacity: appear,
        transform: [
          {translateY: appear.interpolate({inputRange: [0, 1], outputRange: [8, 0]})},
        ],
      }}>
      <Text style={[styles.applyStatus, styles.applyStatusDirty]}>{dirtyText}</Text>
      <View style={styles.applyRow}>
        <GlassButton
          label={discardLabel}
          variant="neutral"
          onPress={onDiscard}
          style={styles.applyBtn}
        />
        <GlassButton
          label={applyLabel}
          variant="confirm"
          onPress={onApply}
          style={[styles.applyBtn, styles.applyGap]}
          icon={<Icon name="check" size={15} color="#FFFFFF" weight={2} />}
        />
      </View>
    </Animated.View>
  );
};

// ---------------------------------------------------------------------------

const AppearanceScreen = ({navigation}) => {
  const {
    draft,
    draftTheme: theme,
    isTextDirty,
    isBgDirty,
    isDraftDirty,
    draftActions,
    startDraft,
    endDraft,
    applyText,
    discardText,
    applyBackground,
    discardBackground,
    applyTextColors,
  } = useTheme();
   const {t} = useLanguage();

  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);

  const [target, setTarget] = useState('title');

  useEffect(() => {
    startDraft();
    return endDraft;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Guard: don't lose unapplied changes on Back ----------------------
  const dirtyRef = useRef(false);
  const leavingRef = useRef(false);
  const tRef = useRef(t);
  dirtyRef.current = isDraftDirty;
  tRef.current = t;

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!dirtyRef.current || leavingRef.current) {
          return;
        }
        e.preventDefault();
        const tr = tRef.current;
        notify.confirm({
          title: tr('ap.discardTitle'),
          message: tr('ap.discardMsg'),
          confirmText: tr('ap.discardConfirm'),
          cancelText: tr('ap.cancel'),
          onConfirm: () => {
            leavingRef.current = true;
            navigation.dispatch(e.data.action);
          },
        });
      }),
    [navigation],
  );

  // ---- Derived state ----------------------------------------------------
  const {overrides, backgroundImage} = draft;

  const activeTextColor = overrides[target];
  const customTextColor =
    activeTextColor && !textSwatches.includes(activeTextColor) ? activeTextColor : null;

  const activePresetKey = backgroundImage?.type === 'preset' ? backgroundImage.key : null;
  const galleryUri = backgroundImage?.type === 'uri' ? backgroundImage.uri : null;
  const activeSolid = !backgroundImage ? overrides.background ?? null : null;
  const customBgColor =
    activeSolid && !backgroundSwatches.includes(activeSolid) ? activeSolid : null;
  const isDefaultGradient = !backgroundImage && !overrides.background;

  const hasTextOverrides = TEXT_ROLES.some(k => overrides[k]);

  // ---- Suggestion after a background is APPLIED --------------------------
  const suggestTextColours = ({solid = null, hasImage = false}) => {
    const {colors, reasonKey, reason} = recommendTextColors({solid, hasImage});
    notify.dialog({
      type: 'success',
      title: t('ap.bgApplied'),
      message: `${t(reasonKey, reason)} ${t('ap.suggestMsg')}`,
      swatches: TEXT_ROLES.map(k => ({label: t(`role.${k}`), color: colors[k]})),
      button: t('ap.useThese'),
      onConfirm: () => {
        applyTextColors(colors);
        notify.success(t('ap.textUpdated'), t('ap.textUpdatedMsg'));
      },
    });
  };

  const openPicker = pickerTarget => navigation.navigate('ColorPicker', {target: pickerTarget});

  const pickFromGallery = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 0.9, maxWidth: 1440, maxHeight: 2560},
      response => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode) {
          notify.error(t('ap.galleryError'), response.errorMessage ?? t('ap.galleryErrorMsg'));
          return;
        }
        const asset = response.assets?.[0];
        if (asset?.uri) {
          draftActions.setImage({type: 'uri', uri: asset.uri});
        }
      },
    );
  };

  // ---- Apply / discard ------------------------------------------------
  const onApplyText = () => {
    applyText();
    notify.success(t('ap.textApplied'), t('ap.textAppliedMsg'));
  };

  const onDiscardText = () => {
    discardText();
    notify.success(t('ap.discarded'), t('ap.textDiscardedMsg'));
  };

  const onApplyBackground = () => {
    const hasImage = !!backgroundImage;
    const solid = hasImage ? null : overrides.background ?? null;

    applyBackground();

    if (hasImage || solid) {
      suggestTextColours({solid, hasImage});
    } else {
      // Back to the official background: its official text colours come with it
      applyTextColors({});
      notify.success(t('ap.officialRestored'), t('ap.officialRestoredMsg'));
    }
  };

  const onDiscardBackground = () => {
    discardBackground();
    notify.success(t('ap.discarded'), t('ap.bgDiscardedMsg'));
  };

  // ---- Resets (confirmed first) ----------------------------------------
  const confirmResetText = () => {
    notify.confirm({
      title: t('ap.resetTextTitle'),
      message: `${t('ap.resetQuestion')}\n\n${t('ap.resetTextNote')}`,
      confirmText: t('ap.resetConfirm'),
      cancelText: t('ap.cancel'),
      onConfirm: () => {
        draftActions.resetText();
        notify.success(t('ap.resetTextDone'), t('ap.resetTextDoneMsg'));
      },
    });
  };

  const confirmResetBackground = () => {
    notify.confirm({
      title: t('ap.resetBgTitle'),
      message: `${t('ap.resetQuestion')}\n\n${t('ap.resetBgNote')}`,
      confirmText: t('ap.resetConfirm'),
      cancelText: t('ap.cancel'),
      onConfirm: () => {
        draftActions.resetBackground();
        notify.success(t('ap.resetBgDone'), t('ap.resetBgDoneMsg'));
      },
    });
  };

  // ---- Render -----------------------------------------------------------
  return (
    <PreviewThemeProvider theme={theme}>
      <AppBackground previewTheme={theme}>
        {/* ---------- TOP BAR ---------- */}
        <View style={[styles.topBar, dyn.topBarPad]}>
          <View style={styles.sideSlot}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
              <GlassSurface strong center radius={BACK_RADIUS} style={styles.backBtn}>
            <Icon name="chevronLeft" size={30} color={theme.icon.heading} weight={3} />
              </GlassSurface>
            </Pressable>
          </View>
          <View style={styles.topTextWrap}>
            <Text style={styles.topTitle}>{t('ap.title')}</Text>
            <Text style={styles.topSub}>{t('ap.subtitle')}</Text>
          </View>
          <View style={styles.sideSlotEnd}>
            <LanguageToggle />
          </View>
        </View>

        <ScrollView
          style={styles.flex}
          contentContainerStyle={[styles.scroll, dyn.scrollPad]}
          showsVerticalScrollIndicator={false}>

          {/* ---------- LIVE PREVIEW ---------- */}
          <GlassSurface style={styles.card}>
            <Text style={styles.previewHeadline}>{t('ap.previewHeadline')}</Text>
            <Text style={styles.previewTitle}>{t('ap.previewTitle')}</Text>
            <Text style={styles.previewBody}>{t('ap.previewBody')}</Text>
            <Text style={styles.previewLabel}>{t('ap.previewLabel')}</Text>
          </GlassSurface>

          {/* ---------- TEXT COLOURS ---------- */}
          <GlassSurface style={styles.card}>
            <Text style={styles.cardTitle}>{t('ap.textColours')}</Text>
            <Text style={styles.cardSub}>{t('ap.previewHint')}</Text>

            <Text style={styles.sectionTitle}>{t('ap.applyColourTo')}</Text>
            <View style={styles.row}>
              {colorTargets.map(r => (
                <Chip
                  key={r.key}
                  label={t(`role.${r.key}`, r.label)}
                  active={target === r.key}
                  onPress={() => setTarget(r.key)}
                  styles={styles}
                />
              ))}
            </View>

            <Text style={styles.sectionTitle}>{t('ap.colour')}</Text>
            <View style={styles.row}>
              {textSwatches.map(color => (
                <Pressable
                  key={color}
                  onPress={() => draftActions.setColor(target, color)}
                  style={[
                    styles.swatch,
                    {backgroundColor: color},
                    activeTextColor === color && styles.swatchActive,
                  ]}>
                  {activeTextColor === color && (
                    <Icon name="check" size={18} color="#FFFFFF" weight={2} />
                  )}
                </Pressable>
              ))}
              <CustomTile
                customColor={customTextColor}
                onPress={() => openPicker(target)}
                theme={theme}
                styles={styles}
              />
            </View>

            <ApplyBar
              dirty={isTextDirty}
              dirtyText={t('ap.unsavedText')}
              discardLabel={t('ap.discard')}
              applyLabel={t('ap.apply')}
              onDiscard={onDiscardText}
              onApply={onApplyText}
              styles={styles}
            />

            <GlassButton
              label={t('ap.resetText')}
              variant="destructive"
              disabled={!hasTextOverrides}
              onPress={confirmResetText}
              style={styles.sectionResetBtn}
              icon={<Icon name="close" size={15} color="#FFFFFF" />}
            />
          </GlassSurface>

          {/* ---------- BACKGROUND ---------- */}
          <GlassSurface style={styles.card}>
            <Text style={styles.cardTitle}>{t('ap.background')}</Text>
            <Text style={styles.cardSub}>{t('ap.previewHint')}</Text>

            <Text style={styles.sectionTitle}>{t('ap.solidColour')}</Text>
            <Text style={styles.tileHint}>{t('ap.tileHint')}</Text>
            <View style={styles.row}>
              <GradientTile
                colors={[theme.blobs[0], theme.blobs[1]]}
                active={isDefaultGradient}
                onPress={draftActions.resetBackground}
                theme={theme}>
                {isDefaultGradient && (
                  <View style={styles.swatchTick}>
                    <Icon name="check" size={12} color="#FFFFFF" weight={2} />
                  </View>
                )}
              </GradientTile>

              {backgroundSwatches.map(color => (
                <Pressable
                  key={color}
                  onPress={() => draftActions.setSolid(color)}
                  style={[
                    styles.swatch,
                    {backgroundColor: color},
                    activeSolid === color && styles.swatchActive,
                  ]}>
                  {activeSolid === color && (
                    <View style={styles.swatchTick}>
                      <Icon name="check" size={12} color="#FFFFFF" weight={2} />
                    </View>
                  )}
                </Pressable>
              ))}

              <CustomTile
                customColor={customBgColor}
                onPress={() => openPicker('background')}
                theme={theme}
                styles={styles}
              />
            </View>

            <Text style={styles.sectionTitle}>{t('ap.wallpaper')}</Text>
            <View style={styles.presetGrid}>
              {presetBackgrounds.map(p => {
                const active = activePresetKey === p.key;
                return (
                  <Pressable
                    key={p.key}
                    onPress={() => draftActions.setImage({type: 'preset', key: p.key})}
                    style={[styles.presetTile, active && styles.presetTileActive]}>
                    <Image source={p.source} style={styles.presetImage} resizeMode="cover" />
                    {active && (
                      <View style={styles.presetTick}>
                        <Icon name="check" size={13} color="#FFFFFF" weight={2} />
                      </View>
                    )}
                  </Pressable>
                );
              })}

              <Pressable
                onPress={pickFromGallery}
                style={[styles.presetTile, galleryUri && styles.presetTileActive]}>
                {galleryUri ? (
                  <>
                    <Image
                      source={{uri: galleryUri}}
                      style={styles.presetImage}
                      resizeMode="cover"
                    />
                    <View style={styles.presetTick}>
                      <Icon name="check" size={13} color="#FFFFFF" weight={2} />
                    </View>
                  </>
                ) : (
                  <GlassSurface center style={styles.galleryTile}>
                    <Icon name="folder" size={22} color={theme.icon.heading} />
                    <Text style={styles.galleryLabel}>{t('ap.gallery')}</Text>
                  </GlassSurface>
                )}
              </Pressable>
            </View>

            <ApplyBar
              dirty={isBgDirty}
              dirtyText={t('ap.bgNotApplied')}
              discardLabel={t('ap.discard')}
              applyLabel={t('ap.apply')}
              onDiscard={onDiscardBackground}
              onApply={onApplyBackground}
              styles={styles}
            />

            <GlassButton
              label={t('ap.resetBackground')}
              variant="destructive"
              disabled={isDefaultGradient}
              onPress={confirmResetBackground}
              style={styles.sectionResetBtn}
              icon={<Icon name="close" size={15} color="#FFFFFF" />}
            />
          </GlassSurface>
        </ScrollView>
      </AppBackground>
    </PreviewThemeProvider>
  );
};

export default AppearanceScreen;