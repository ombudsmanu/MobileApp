/**
 * BACKGROUND IMAGE REGISTRY — used by the Appearance screen (wallpapers)
 * and the Dashboard slider.
 *
 * Stored background shapes:
 *   {type: 'preset', key: 'bg1'}          → bundled image from this list
 *   {type: 'uri',    uri: 'file://...'}   → photo picked from the gallery
 */
export const presetBackgrounds = [
  {
    key: 'bg1',
    label: 'Preset 1',
    source: require('../assets/backgrounds/bg1.png'),
    caption: {en: 'Office of the Ombudsman Punjab', ur: 'دفتر محتسب پنجاب'},
  },
  {
    key: 'bg2',
    label: 'Preset 2',
    source: require('../assets/backgrounds/bg2.png'),
    caption: {en: 'Conference Hall', ur: 'کانفرنس ہال'},
  },
  {
    key: 'bg3',
    label: 'Preset 3',
    source: require('../assets/backgrounds/bg3.png'),
    caption: {en: 'Ombudsman Office Okara', ur: 'دفتر محتسب اوکاڑہ'},
  },
  {
    key: 'bg4',
    label: 'Preset 4',
    source: require('../assets/backgrounds/bg4.png'),
    caption: {en: 'Regional Office', ur: 'علاقائی دفتر'},
  },
  {
    key: 'bg5',
    label: 'Preset 5',
    source: require('../assets/backgrounds/bg5.png'),
    caption: {en: 'Ombudsman Office Attock', ur: 'دفتر محتسب اٹک'},
  },
  {
    key: 'bg7',
    label: 'Preset 7',
    source: require('../assets/backgrounds/bg7.png'),
    caption: {en: 'Office of the Ombudsman Punjab', ur: 'دفتر محتسب پنجاب'},
  },
];

/** Accepts anything found in storage, including the old bare-string format. */
export const normalizeBackground = value => {
  if (!value) {
    return null;
  }
  if (typeof value === 'string') {
    return {type: 'uri', uri: value};
  }
  if (value.type === 'preset' || value.type === 'uri') {
    return value;
  }
  return null;
};

/** Turns a stored background into something <Image source> accepts. */
export const resolveBackgroundSource = value => {
  const bg = normalizeBackground(value);
  if (!bg) {
    return null;
  }
  if (bg.type === 'preset') {
    return presetBackgrounds.find(p => p.key === bg.key)?.source ?? null;
  }
  return {uri: bg.uri};
};