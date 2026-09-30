import React, { useMemo, useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ColorPicker from 'react-native-wheel-color-picker';
import { notify } from '../../utils/notify';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import GlassButton from '../../components/GlassButton/GlassButton';
import Icon from '../../components/Icon/Icon';
import {
  createStyles,
  createDynamicStyles,
  BACK_RADIUS,
  WHEEL_CONFIG,
} from './ColorPickerScreen.styles';
import { useTheme, PreviewThemeProvider } from '../../context/ThemeContext';
const LABELS = {
  headline: 'Headline',
  title: 'Title',
  body: 'Body',
  label: 'Label',
  background: 'Background',
};
const HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;
const FALLBACK = '#4E7D52';

/** The colour this target currently has in the DRAFT, as 6-digit hex. */
const currentColorFor = (theme, draft, target) => {
  const color =
    target === 'background'
      ? draft.overrides.background ?? '#FFFFFF'
      : theme.text[target];
  return HEX_PATTERN.test(color ?? '') ? color.toUpperCase() : FALLBACK;
};

/**
 * Picks a colour for the Appearance DRAFT. Nothing reaches the app here —
 * the user still confirms with APPLY in the matching Appearance card.
 *
 * SELECT is green (confirm) · CANCEL is neutral.
 */
const ColorPickerScreen = ({ navigation, route }) => {
  const target = route.params?.target ?? 'title';
  const { draft, draftTheme: theme, draftActions } = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);

  const [initial] = useState(() => currentColorFor(theme, draft, target));
  const [picked, setPicked] = useState(initial);
  const [hexInput, setHexInput] = useState(initial);
  const [wheelSeed, setWheelSeed] = useState({ key: 0, color: initial });

  const onWheelChange = color => {
    const hex = color.toUpperCase();
    setPicked(hex);
    setHexInput(hex);
  };

  const onHexSubmit = () => {
    let value = hexInput.trim();
    if (!value.startsWith('#')) {
      value = `#${value}`;
    }
    if (HEX_PATTERN.test(value)) {
      const hex = value.toUpperCase();
      setPicked(hex);
      setHexInput(hex);
      setWheelSeed(s => ({ key: s.key + 1, color: hex }));
    } else {
      setHexInput(picked);
      notify.warningToast(
        'Invalid colour',
        'Use a 6-digit hex code, e.g. #4E7D52',
      );
    }
  };

  /** Writes the colour into the draft — APPLY on Appearance commits it. */
  const onSelect = () => {
    if (target === 'background') {
      draftActions.setSolid(picked);
      notify.success(
        'Background selected',
        'Tap APPLY in the Background card to use it.',
      );
    } else {
      draftActions.setColor(target, picked);
      notify.success(
        `${LABELS[target]} colour selected`,
        'Tap APPLY in the Text colours card to use it.',
      );
    }
    navigation.goBack();
  };

  // The sample: the picked colour replaces only the role being edited
  const sample = {
    headline: target === 'headline' ? picked : theme.text.headline,
    title: target === 'title' ? picked : theme.text.title,
    body: target === 'body' ? picked : theme.text.body,
    label: target === 'label' ? picked : theme.text.label,
  };
  const sampleBg = target === 'background' ? picked : theme.glass.fillStrong;

  return (
    <PreviewThemeProvider theme={theme}>
      <AppBackground previewTheme={theme}>
        <View style={[styles.topBar, dyn.topBarPad]}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={8}>
            <GlassSurface
              strong
              center
              radius={BACK_RADIUS}
              style={styles.backBtn}
            >
              <Icon
                name="chevronLeft"
                size={30}
                color={theme.icon.heading}
                weight={3}
              />
            </GlassSurface>
          </Pressable>
          <View style={styles.topTextWrap}>
            <Text style={styles.topTitle}>{LABELS[target]}</Text>
            <Text style={styles.topSub}>Drag the wheel or type a hex code</Text>
          </View>
        </View>

        <View style={styles.body}>
          <GlassSurface style={styles.previewCard}>
            <View style={styles.previewRow}>
              <View style={[styles.previewChip, { backgroundColor: picked }]} />
              <View>
                <Text style={styles.previewHex}>{picked}</Text>
                <Text style={styles.previewLabel}>SELECTED COLOUR</Text>
              </View>
            </View>

            <View style={[styles.sampleBox, { backgroundColor: sampleBg }]}>
              <Text style={[styles.sampleHeadline, { color: sample.headline }]}>
                Headline
              </Text>
              <Text style={[styles.sampleTitle, { color: sample.title }]}>
                Title
              </Text>
              <Text style={[styles.sampleBody, { color: sample.body }]}>
                Body text looks like this.
              </Text>
              <Text style={[styles.sampleLabel, { color: sample.label }]}>
                LABEL TEXT
              </Text>
            </View>
          </GlassSurface>

          <View style={styles.wheelCard}>
            <View style={styles.wheelWrap}>
              <ColorPicker
                key={wheelSeed.key}
                color={wheelSeed.color}
                onColorChange={onWheelChange}
                thumbSize={WHEEL_CONFIG.thumbSize}
                sliderSize={WHEEL_CONFIG.sliderSize}
                noSnap={WHEEL_CONFIG.noSnap}
                row={WHEEL_CONFIG.row}
                swatches={false}
                useNativeDriver={false}
              />
            </View>

            <View style={styles.hexRow}>
              <Text style={styles.hexLabel}>HEX</Text>
              <TextInput
                value={hexInput}
                onChangeText={setHexInput}
                onSubmitEditing={onHexSubmit}
                onEndEditing={onHexSubmit}
                autoCapitalize="characters"
                autoCorrect={false}
                maxLength={7}
                style={styles.hexInput}
                placeholder="#4E7D52"
                placeholderTextColor={theme.control.placeholder}
              />
            </View>
          </View>
        </View>

        <View style={[styles.footer, dyn.footerPad]}>
          <GlassButton
            label="CANCEL"
            variant="glass"
            onPress={() => navigation.goBack()}
            style={styles.footerBtn}
          />
          <GlassButton
            label="SELECT"
            variant="confirm"
            onPress={onSelect}
            style={[styles.footerBtn, styles.footerGap]}
          />
        </View>
      </AppBackground>
    </PreviewThemeProvider>
  );
};

export default ColorPickerScreen;
