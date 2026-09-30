import {basePalette} from './palette';
import {normalizeBackground} from './backgrounds';

/**
 * Merges the palette with the user's choices into ONE flat theme.
 *
 * Background priority:
 *   1. image chosen        → bgMode 'image'
 *   2. solid colour chosen → bgMode 'solid'
 *   3. neither             → bgMode 'gradient' (official default)
 */
export const buildTheme = (overrides = {}, backgroundImage = null) => {
  const p = basePalette;
  const image = normalizeBackground(backgroundImage);
  const solidOverride = overrides.background ?? null;

  let bgMode = 'gradient';
  if (image) {
    bgMode = 'image';
  } else if (solidOverride) {
    bgMode = 'solid';
  }

  return {
    name: p.name,
    isLight: p.isLight,

    bgMode,
    bg: p.bg,
    solid: solidOverride ?? p.solid,
    backgroundImage: image,

    blobs: p.blobs,
    accent: p.accent,
    accentPressed: p.accentPressed,
    brandGreen: p.brandGreen ?? p.text.title,
    success: p.success,
    danger: p.danger,

    text: {
      title: overrides.title ?? p.text.title,
      heading: overrides.heading ?? p.text.heading,
      body: overrides.text ?? p.text.body,
      muted: p.text.muted,
      faint: p.text.faint,
      onAccent: p.text.onAccent,
    },

    glass: p.glass,
  };
};