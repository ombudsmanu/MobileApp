import React, {useMemo, useState} from 'react';
import {Pressable, Text, TextInput, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import ColorPicker from 'react-native-wheel-color-picker';
import {useTheme} from '../../context/ThemeContext';
import {notify} from '../../utils/notify';
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

const LABELS = {title: 'Title', heading: 'Heading', text: 'Text', background: 'Background'};
const HEX_PATTERN = /^#[0-9A-Fa-f]{6}$/;
const FALLBACK = '#4E7D52';

/** The colour currently in use for a target, as a 6-digit hex. */
const currentColorFor = (theme, target) => {
  let color;
  if (target === 'background') {
    color = theme.bgMode === 'solid' ? theme.solid : '#FFFFFF';
  } else if (target === 'text') {
    color = theme.text.body;
  } else {
    color = theme.text[target];
  }
  return HEX_PATTERN.test(color ?? '') ? color.toUpperCase() : FALLBACK;
};

/**
 * Full-screen picker. Opened with:
 *   navigation.navigate('ColorPicker', {target: 'title' | 'heading' | 'text' | 'background'})
 * Nothing is applied until the user taps APPLY.
 */
const ColorPickerScreen = ({navigation, route}) => {
  const target = route.params?.target ?? 'title';
  const {theme, setColorFor, setSolidBackground} = useTheme();

  const styles = useMemo(() => createStyles(theme), [theme]);
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);

  // Captured once — the starting colour shouldn't shift while picking
  const [initial] = useState(() => currentColorFor(theme, target));
  const [draft, setDraft] = useState(initial);
  const [hexInput, setHexInput] = useState(initial);
  // Changing `key` remounts the wheel at a typed-in colour
  const [wheelSeed, setWheelSeed] = useState({key: 0, color: initial});

  const onWheelChange = color => {
    const hex = color.toUpperCase();
    setDraft(hex);
    setHexInput(hex);
  };

  const onHexSubmit = () => {
    let value = hexInput.trim();
    if (!value.startsWith('#')) {
      value = `#${value}`;
    }
    if (HEX_PATTERN.test(value)) {
      const hex = value.toUpperCase();
      setDraft(hex);
      setHexInput(hex);
      setWheelSeed(s => ({key: s.key + 1, color: hex}));
    } else {
      setHexInput(draft);
      notify.warningToast('Invalid colour', 'Use a 6-digit hex code, e.g. #4E7D52');
    }
  };

  const apply = () => {
    if (target === 'background') {
      setSolidBackground(draft);
    } else {
      setColorFor(target, draft);
    }
    notify.success(`${LABELS[target]} colour applied`, draft);
    navigation.goBack();
  };

  // Sample text colours: the draft replaces only the role being edited
  const sample = {
    title: target === 'title' ? draft : theme.text.title,
    heading: target === 'heading' ? draft : theme.text.heading,
    body: target === 'text' ? draft : theme.text.body,
  };
  const sampleBg = target === 'background' ? draft : theme.glass.fillStrong;

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
          <Text style={styles.topTitle}>{LABELS[target]} colour</Text>
          <Text style={styles.topSub}>Drag the wheel or type a hex code</Text>
        </View>
      </View>

      <View style={styles.body}>
        {/* ---------- PREVIEW ---------- */}
        <GlassSurface style={styles.previewCard}>
          <View style={styles.previewRow}>
            <View style={[styles.previewChip, {backgroundColor: draft}]} />
            <View>
              <Text style={styles.previewLabel}>SELECTED</Text>
              <Text style={styles.previewHex}>{draft}</Text>
            </View>
          </View>

          <View style={[styles.sampleBox, {backgroundColor: sampleBg}]}>
            <Text style={[styles.sampleTitle, {color: sample.title}]}>Ombudsman Punjab</Text>
            <Text style={[styles.sampleHeading, {color: sample.heading}]}>
              Section heading
            </Text>
            <Text style={[styles.sampleBody, {color: sample.body}]}>
              This is how your text will look.
            </Text>
          </View>
        </GlassSurface>

        {/* ---------- WHEEL ---------- */}
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
              placeholderTextColor={theme.text.faint}
            />
          </View>
        </View>
      </View>

      {/* ---------- FOOTER ---------- */}
      <View style={[styles.footer, dyn.footerPad]}>
        <GlassButton
          label="CANCEL"
          variant="glass"
          onPress={() => navigation.goBack()}
          style={styles.footerBtn}
        />
        <GlassButton
          label="APPLY"
          variant="solid"
          onPress={apply}
          style={[styles.footerBtn, styles.footerGap]}
        />
      </View>
    </AppBackground>
  );
};

export default ColorPickerScreen;