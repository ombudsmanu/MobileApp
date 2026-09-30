import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Image, Pressable, ScrollView, Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {launchImageLibrary} from 'react-native-image-picker';
import {useTheme} from '../../context/ThemeContext';
import {notify} from '../../utils/notify';
import {colorTargets, textSwatches, backgroundSwatches} from '../../theme/swatches';
import {presetBackgrounds} from '../../theme/backgrounds';
import {recommendTextColors} from '../../theme/colorUtils';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import GlassButton from '../../components/GlassButton/GlassButton';
import Icon from '../../components/Icon/Icon';
import {useLanguage} from '../../context/LanguageContext';
import {
  createStyles,
  createDynamicStyles,
  CHIP_RADIUS,
  BACK_RADIUS,
} from './AppearanceScreen.styles';
const LANGUAGES = [
  {code: 'en', label: 'EN'},
  {code: 'ur', label: 'اردو'},
];
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

/** "+" tile: rainbow normally, or the custom colour with a tick once chosen. */
const CustomTile = ({customColor, onPress, styles}) => (
  <Pressable onPress={onPress} style={[styles.swatch, customColor && styles.swatchActive]}>
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

/** Status line + DISCARD / APPLY for one section. */
const ApplyBar = ({dirty, dirtyText, cleanText, onDiscard, onApply, styles, theme}) => (
  <>
    <Text style={[styles.applyStatus, dirty && styles.applyStatusDirty]}>
      {dirty ? dirtyText : cleanText}
    </Text>
    <View style={styles.applyRow}>
      <GlassButton
        label="DISCARD"
        variant="glass"
        disabled={!dirty}
        onPress={onDiscard}
        style={styles.applyBtn}
      />
      <GlassButton
        label="APPLY"
        variant="solid"
        disabled={!dirty}
        onPress={onApply}
        style={[styles.applyBtn, styles.applyGap]}
        icon={<Icon name="check" size={15} color={theme.icon.onAccent} weight={2} />}
      />
    </View>
  </>
);

/**
 * APPEARANCE — two independent drafts, each with its own Apply.
 *   Text colours → preview here, APPLY in the Text colours card.
 *   Background   → preview here, APPLY in the Background card.
 */
const AppearanceScreen = ({navigation}) => {
    const {lang, setLang} = useLanguage();
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

  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);

  const [target, setTarget] = useState('title');
  const scrollRef = useRef(null);

  // ---- Draft lifecycle ---------------------------------------------------
  useEffect(() => {
    startDraft();
    return endDraft;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Guard: don't lose unapplied changes on Back ----------------------
  const dirtyRef = useRef(false);
  const leavingRef = useRef(false);
  dirtyRef.current = isDraftDirty;

  useEffect(
    () =>
      navigation.addListener('beforeRemove', e => {
        if (!dirtyRef.current || leavingRef.current) {
          return;
        }
        e.preventDefault();
        notify.confirm({
          title: 'Discard changes?',
          message: 'You have changes that have not been applied yet.',
          confirmText: 'Discard',
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

  const hasTextOverrides = !!(
    overrides.title ||
    overrides.heading ||
    overrides.subheading ||
    overrides.text
  );

  // ---- Suggestion after a background is APPLIED --------------------------
  const suggestTextColours = ({solid = null, hasImage = false}) => {
    const {colors, reason} = recommendTextColors({solid, hasImage});
    notify.dialog({
      type: 'success',
      title: 'Background applied',
      message: `${reason} These text colours would suit it:`,
      swatches: [
        {label: 'Title', color: colors.title},
        {label: 'Heading', color: colors.heading},
        {label: 'Sub', color: colors.subheading},
        {label: 'Para', color: colors.text},
      ],
      button: 'Use these',
      onConfirm: () => {
        applyTextColors(colors);
        notify.success('Text colours updated', 'The suggested set has been applied.');
      },
    });
  };

  const openPicker = pickerTarget => navigation.navigate('ColorPicker', {target: pickerTarget});

  // ---- Background selections (draft only) --------------------------------
  const pickFromGallery = () => {
    launchImageLibrary(
      {mediaType: 'photo', quality: 0.9, maxWidth: 1440, maxHeight: 2560},
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
          draftActions.setImage({type: 'uri', uri: asset.uri});
        }
      },
    );
  };

  // ---- Apply / discard ------------------------------------------------
  const onApplyText = () => {
    applyText();
    notify.success('Text colours applied', 'Your changes are now active across the app.');
  };

  const onDiscardText = () => {
    discardText();
    notify.success('Changes discarded', 'Text colours are back to what is applied.');
  };

  const onApplyBackground = () => {
    // Read what is being applied BEFORE applying, for the suggestion
    const hasImage = !!backgroundImage;
    const solid = hasImage ? null : overrides.background ?? null;

    applyBackground();

    if (hasImage || solid) {
      suggestTextColours({solid, hasImage});
    } else {
      notify.success('Background applied', 'The official gradient has been restored.');
    }
  };

  const onDiscardBackground = () => {
    discardBackground();
    notify.success('Changes discarded', 'Background is back to what is applied.');
  };

  const RESET_QUESTION = 'Are you sure you want to reset the current theme settings?';

  const confirmResetText = () => {
    notify.confirm({
      title: 'Reset text colours?',
      message: `${RESET_QUESTION}\n\nText colours will return to the official defaults.`,
      confirmText: 'Reset',
      onConfirm: () => {
        draftActions.resetText();
        notify.success('Text colours reset', 'Tap APPLY in the Text colours card to use them.');
      },
    });
  };

  const confirmResetBackground = () => {
    notify.confirm({
      title: 'Reset background?',
      message: `${RESET_QUESTION}\n\nThe background will return to the official gradient.`,
      confirmText: 'Reset',
      onConfirm: () => {
        draftActions.resetBackground();
        notify.success('Background reset', 'Tap APPLY in the Background card to use it.');
      },
    });
  };

  // ---- Render -----------------------------------------------------------
  return (
    <AppBackground previewTheme={theme}>
      {/* ---------- TOP BAR ---------- */}
      <View style={[styles.topBar, dyn.topBarPad]}>
        <View style={styles.sideSlot}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
            <GlassSurface strong center radius={BACK_RADIUS} style={styles.backBtn}>
              <Icon name="chevronLeft" size={18} color={theme.icon.heading} weight={2.5} />
            </GlassSurface>
          </Pressable>
        </View>
        <View style={styles.topTextWrap}>
          <Text style={styles.topTitle}>Appearance</Text>
          <Text style={styles.topSub}>Colours & background</Text>
        </View>
                <View style={styles.sideSlotEnd}>
          <View style={styles.langToggle}>
            {LANGUAGES.map(l => {
              const active = lang === l.code;
              return (
                <Pressable
                  key={l.code}
                  onPress={() => setLang(l.code)}
                  style={[styles.langOption, active && styles.langOptionActive]}>
                  <Text style={[styles.langText, active && styles.langTextActive]}>
                    {l.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.flex}
        contentContainerStyle={[styles.scroll, dyn.scrollPad]}
        showsVerticalScrollIndicator={false}>

        {/* ---------- LIVE PREVIEW ---------- */}
        <GlassSurface style={styles.card}>
          <Text style={styles.previewTitle}>Title</Text>
          <Text style={styles.previewHeading}>Heading</Text>
          <Text style={styles.previewSubheading}>Subheading</Text>
          <Text style={styles.previewBody}>
            Paragraph text is used for descriptions and anything people read.
          </Text>
          <Text style={styles.previewCaption}>Caption — fixed colour, not customisable</Text>
        </GlassSurface>

        {/* ---------- TEXT COLOURS ---------- */}
        <GlassSurface style={styles.card}>
          <Text style={styles.cardTitle}>Text colours</Text>
          <Text style={styles.cardSub}>Preview here, then tap APPLY below</Text>

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
              styles={styles}
            />
          </View>

          <ApplyBar
            dirty={isTextDirty}
            dirtyText="Unsaved text changes"
            cleanText="Text colours are applied"
            onDiscard={onDiscardText}
            onApply={onApplyText}
            styles={styles}
            theme={theme}
          />

           <GlassButton
            label="RESET TEXT COLOURS"
            variant="dangerSolid"
            disabled={!hasTextOverrides}
            onPress={confirmResetText}
            style={styles.sectionResetBtn}
            icon={<Icon name="close" size={15} color="#FFFFFF" />}
          />
        </GlassSurface>

        {/* ---------- BACKGROUND ---------- */}
        <GlassSurface style={styles.card}>
          <Text style={styles.cardTitle}>Background</Text>
          <Text style={styles.cardSub}>Preview here, then tap APPLY below</Text>

          <Text style={styles.sectionTitle}>Solid colour</Text>
          <View style={styles.row}>
            <Pressable
              onPress={draftActions.resetBackground}
              style={[styles.swatch, isDefaultGradient && styles.swatchActive]}>
              <LinearGradient colors={theme.bg} style={styles.fillAbsolute} />
              {isDefaultGradient && (
                <View style={styles.swatchTick}>
                  <Icon name="check" size={12} color="#FFFFFF" weight={2} />
                </View>
              )}
            </Pressable>

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
              styles={styles}
            />
          </View>

          <Text style={styles.sectionTitle}>Wallpaper</Text>
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
                  <Text style={styles.galleryLabel}>Gallery</Text>
                </GlassSurface>
              )}
            </Pressable>
          </View>

          <ApplyBar
            dirty={isBgDirty}
            dirtyText="Background not applied yet"
            cleanText="Background is applied"
            onDiscard={onDiscardBackground}
            onApply={onApplyBackground}
            styles={styles}
            theme={theme}
          />

                   <GlassButton
            label="RESET BACKGROUND"
            variant="dangerSolid"
            disabled={isDefaultGradient}
            onPress={confirmResetBackground}
            style={styles.sectionResetBtn}
            icon={<Icon name="close" size={15} color="#FFFFFF" />}
          />
        </GlassSurface>
      </ScrollView>
    </AppBackground>
  );
};

export default AppearanceScreen;