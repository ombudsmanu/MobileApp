/**
 * BACKGROUND IMAGE REGISTRY
 *
 * A background is stored as one of two shapes:
 *   {type: 'preset', key: 'bg1'}          → bundled image from this list
 *   {type: 'uri',    uri: 'file://...'}   → photo picked from the gallery
 *
 * Presets use static require() because React Native bundles images at
 * BUILD time — Metro must know every asset path before the app is built.
 *
 * TO ADD A PRESET: drop a file in src/assets/backgrounds/ and add a line.
 */
export const presetBackgrounds = [
  {key: 'bg1', label: 'Preset 1', source: require('../assets/backgrounds/bg1.jpg')},
  {key: 'bg2', label: 'Preset 2', source: require('../assets/backgrounds/bg2.jpg')},
  {key: 'bg3', label: 'Preset 3', source: require('../assets/backgrounds/bg3.png')},
  {key: 'bg4', label: 'Preset 4', source: require('../assets/backgrounds/bg4.jpg')},
  {key: 'bg5', label: 'Preset 5', source: require('../assets/backgrounds/bg5.png')},
];

/**
 * Normalises anything we might find in storage into the current shape.
 * Handles the old format too — earlier builds saved a bare URI string.
 */
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