import React, {useMemo, useRef, useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import {useTheme} from '../../context/ThemeContext';
import {notify} from '../../utils/notify';
import {colorTargets, textSwatches, backgroundSwatches} from '../../theme/swatches';
import {presetBackgrounds} from '../../theme/backgrounds';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import GlassButton from '../../components/GlassButton/GlassButton';
import Icon from '../../components/Icon/Icon';
import {
  createStyles,
  createDynamicStyles,
  CHIP_RADIUS,
  BACK_RADIUS,
} from './AppearanceScreen.styles';

/** Rainbow used for the "custom colour" tile. */
const SPECTRUM = ['#FF3B30', '#FF9500', '#FFCC00', '#34C759', '#007AFF', '#AF52DE'];

const Chip = ({label, active, onPress, styles}) => (
  <Pressable onPress={onPress}>
    {active ? (
      <View style={[styles.chip, styles.chipActive]}>
        <Text style={[styles.chipText, styles.chipTextActive]}>{label}</Text>
      </View>
    ) : (
      <GlassSurface radius={CHIP_RADIUS} center style={styles.chip}>
        <Text style={styles.chipText}>{label}</Text>
      </GlassSurface>
    )}
  </Pressable>
);

/**
 * Last tile in a swatch row. Shows a rainbow + "+" normally; once a
 * custom colour is in use, shows that colour with a tick.
 */
const CustomTile = ({customColor, onPress, styles}) => (
  <Pressable
    onPress={onPress}
    style={[styles.customSwatch, customColor && styles.swatchActive]}>
    {customColor ? (
      <View style={[styles.fillAbsolute, {backgroundColor: customColor}]} />
    ) : (
      <LinearGradient
        colors={SPECTRUM}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.fillAbsolute}
      />
    )}
    <View style={styles.customPlus}>
      {customColor ? (
        <Icon name="check" size={12} color="#1B3D20" weight={2} />
      ) : (
        <Text style={styles.customPlusText}>+</Text>
      )}
    </View>
  </Pressable>
);

const AppearanceScreen = ({navigation}) => {
  const {
    theme,
    overrides,
    backgroundImage,
    setColorFor,
    resetTextColors,
    setBackgroundImg,
    setSolidBackground,
    resetBackground,
    resetColors,
  } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);

  const [target, setTarget] = useState('title');

  const scrollRef = useRef(null);
  const coloursY = useRef(0);
  const hintShown = useRef(false);

  // ---- Derived state ----------------------------------------------------
  const activeTextColor = overrides[target];
  const customTextColor =
    activeTextColor && !textSwatches.includes(activeTextColor) ? activeTextColor : null;

  const activePresetKey = backgroundImage?.type === 'preset' ? backgroundImage.key : null;
  const galleryUri = backgroundImage?.type === 'uri' ? backgroundImage.uri : null;
  const activeSolid = !backgroundImage ? overrides.background ?? null : null;
  const customBgColor =
    activeSolid && !backgroundSwatches.includes(activeSolid) ? activeSolid : null;
  const isDefaultGradient = !backgroundImage && !overrides.background;

  const hasTextOverrides = !!(overrides.title || overrides.heading || overrides.text);

  // ---- Helpers ----------------------------------------------------------

  const scrollToColours = () => {
    scrollRef.current?.scrollTo({y: Math.max(coloursY.current - 12, 0), animated: true});
  };

  /** Readability suggestion — once per visit, not on every tap. */
  const suggestTextColours = () => {
    if (hintShown.current) {
      return;
    }
    hintShown.current = true;
    notify.dialog({
      type: 'success',
      title: 'Background updated',
      message:
        'For the best readability, please also adjust your Title, Heading and Text colours. Tap outside to skip.',
      button: 'Adjust colours',
      onConfirm: scrollToColours,
    });
  };

  const openPicker = pickerTarget =>
    navigation.navigate('ColorPicker', {target: pickerTarget});

  // ---- Background actions -----------------------------------------------

  const applySolid = color => {
    setSolidBackground(color);
    suggestTextColours();
  };

  const applyPreset = key => {
    setBackgroundImg({type: 'preset', key});
    suggestTextColours();
  };

  const pickFromGallery = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 0.85, maxWidth: 1920, maxHeight: 1920},
      response => {
        if (response.didCancel) {
          return;
        }
        if (response.errorCode) {
          notify.error(
            'Gallery unavailable',
            response.errorMessage ?? 'The photo gallery could not be opened.',
          );
          return;
        }
        const asset = response.assets?.[0];
        if (asset?.uri) {
          setBackgroundImg({type: 'uri', uri: asset.uri});
          suggestTextColours();
        }
      },
    );
  };

  // ---- Resets -----------------------------------------------------------

  const onResetText = () => {
    resetTextColors();
    notify.success('Text colours reset', 'Default title, heading and text restored.');
  };

  const onResetBackground = () => {
    resetBackground();
    notify.success('Background reset', 'The default gradient has been restored.');
  };

  const confirmResetAll = () => {
    notify.confirm({
      title: 'Reset everything?',
      message: 'All colours and the background will return to the official defaults.',
      confirmText: 'Reset all',
      onConfirm: () => {
        resetColors();
        hintShown.current = false;
        notify.success('Appearance reset', 'The official theme has been restored.');
      },
    });
  };

  // ---- Render -----------------------------------------------------------

  return (
    <AppBackground>
      {/* ---------- TOP BAR ---------- */}
      <View style={[styles.topBar, dyn.topBarPad]}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
          <GlassSurface strong center radius={BACK_RADIUS} style={styles.backBtn}>
            <Icon name="chevronLeft" size={18} color={theme.text.heading} weight={2.5} />
          </GlassSurface>
        </Pressable>
        <View style={styles.topTextWrap}>
          <Text style={styles.topTitle}>Appearance</Text>
          <Text style={styles.topSub}>Colours & background</Text>
        </View>
        <Pressable onPress={confirmResetAll} hitSlop={10} style={styles.resetAllBtn}>
          <Text style={styles.resetAllText}>RESET ALL</Text>
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.flex}
        contentContainerStyle={[styles.scroll, dyn.scrollPad]}
        showsVerticalScrollIndicator={false}>

        {/* ---------- LIVE PREVIEW ---------- */}
        <GlassSurface style={styles.card}>
          <Text style={styles.previewTitle}>Ombudsman Punjab</Text>
          <Text style={styles.previewHeading}>Section heading</Text>
          <Text style={styles.previewBody}>
            Body text renders in the colour you choose below.
          </Text>
        </GlassSurface>

        {/* ---------- TEXT COLOURS ---------- */}
        <View onLayout={e => (coloursY.current = e.nativeEvent.layout.y)}>
          <GlassSurface style={styles.card}>
            <Text style={styles.cardTitle}>Text colours</Text>
            <Text style={styles.cardSub}>Pick an element, then a colour — or tap + for any colour</Text>

            <Text style={styles.sectionTitle}>Apply colour to</Text>
            <View style={styles.row}>
              {colorTargets.map(t => (
                <Chip
                  key={t.key}
                  label={t.label}
                  active={target === t.key}
                  onPress={() => setTarget(t.key)}
                  styles={styles}
                />
              ))}
            </View>

            <Text style={styles.sectionTitle}>Colour</Text>
            <View style={styles.row}>
              {textSwatches.map(color => (
                <Pressable
                  key={color}
                  onPress={() => setColorFor(target, color)}
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
                styles={styles}
              />
            </View>

            <GlassButton
              label="RESET TEXT COLOURS"
              variant="glass"
              disabled={!hasTextOverrides}
              onPress={onResetText}
              style={styles.sectionResetBtn}
              icon={<Icon name="close" size={15} color={theme.text.heading} />}
            />
          </GlassSurface>
        </View>

        {/* ---------- BACKGROUND ---------- */}
        <GlassSurface style={styles.card}>
          <Text style={styles.cardTitle}>Background</Text>
          <Text style={styles.cardSub}>
            First tile = default gradient · + = any colour
          </Text>

          <Text style={styles.sectionTitle}>Solid colour</Text>
          <View style={styles.row}>
            <Pressable
              onPress={resetBackground}
              style={[styles.gradientSwatch, isDefaultGradient && styles.swatchActive]}>
              <LinearGradient colors={theme.bg} style={styles.fillAbsolute} />
              {isDefaultGradient && (
                <View style={styles.swatchTickDark}>
                  <Icon name="check" size={12} color="#FFFFFF" weight={2} />
                </View>
              )}
            </Pressable>

            {backgroundSwatches.map(color => (
              <Pressable
                key={color}
                onPress={() => applySolid(color)}
                style={[
                  styles.swatch,
                  {backgroundColor: color},
                  activeSolid === color && styles.swatchActive,
                ]}>
                {activeSolid === color && (
                  <View style={styles.swatchTickDark}>
                    <Icon name="check" size={12} color="#FFFFFF" weight={2} />
                  </View>
                )}
              </Pressable>
            ))}

            <CustomTile
              customColor={customBgColor}
              onPress={() => openPicker('background')}
              styles={styles}
            />
          </View>

          <Text style={styles.sectionTitle}>Image</Text>
          <View style={styles.presetGrid}>
            {presetBackgrounds.map(p => {
              const active = activePresetKey === p.key;
              return (
                <Pressable
                  key={p.key}
                  onPress={() => applyPreset(p.key)}
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
                  <Icon name="folder" size={22} color={theme.text.heading} />
                  <Text style={styles.galleryLabel}>Gallery</Text>
                </GlassSurface>
              )}
            </Pressable>
          </View>

          <GlassButton
            label="RESET BACKGROUND"
            variant="danger"
            disabled={isDefaultGradient}
            onPress={onResetBackground}
            style={styles.sectionResetBtn}
            icon={<Icon name="close" size={15} color={theme.danger} />}
          />
        </GlassSurface>
      </ScrollView>
    </AppBackground>
  );
};

export default AppearanceScreen;