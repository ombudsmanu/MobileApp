import { basePalette } from './palette';
import { normalizeBackground } from './backgrounds';
import { isDarkColor } from './colorUtils';
import {
  DEFAULT_FONTS,
  makeTypography,
  urduFamilyFor,
  weightFor,
} from './tokens';

/** Which colour role each MD3 style takes. Colour follows the type family. */
const STYLE_ROLE = {
  headlineMedium: 'headline',
  headlineSmall: 'headline',
  titleLarge: 'title',
  titleMedium: 'title',
  titleSmall: 'title',
  bodyLarge: 'body',
  bodyMedium: 'body',
  bodySmall: 'body',
  labelLarge: 'label',
  labelMedium: 'label',
  labelSmall: 'label',
};

/**
 * Merges the palette with the user's choices into ONE flat theme.
 * Background priority: image → solid colour → default gradient.
 *
 * theme.type.<style> = size + weight + line height + colour, ready to
 * spread:  cardTitle: {...theme.type.titleMedium}
 */
export const buildTheme = (
  overrides = {},
  backgroundImage = null,
  fonts = DEFAULT_FONTS,
) => {
  // The chosen fonts decide the type scale (and, for Urdu, AppText's family)
  const typography = makeTypography(fonts.latin);
  const p = basePalette;
  const image = normalizeBackground(backgroundImage);
  const solidOverride = overrides.background ?? null;

  let bgMode = 'gradient';
  if (image) {
    bgMode = 'image';
  } else if (solidOverride) {
    bgMode = 'solid';
  }
  const onWallpaper = bgMode === 'image';
  const onDark = bgMode === 'solid' && isDarkColor(solidOverride);

  // Defaults adapt to the background; the user's overrides always win
  const base = onDark
    ? p.textOnDark
    : onWallpaper
    ? { ...p.text, ...p.textOnWallpaper }
    : p.text;

  const text = {
    headline: overrides.headline ?? base.headline,
    title: overrides.title ?? base.title,
    body: overrides.body ?? base.body,
    label: overrides.label ?? base.label,
    muted: base.muted,
    faint: base.faint,
    onAccent: p.text.onAccent,
  };
  // Legacy aliases for any not-yet-migrated file
  text.heading = text.title;
  text.subheading = text.title;

  // Soft shadow lifts text off a photo; body text sits on cards
  const halo = onWallpaper
    ? {
        textShadowColor: 'rgba(12, 20, 14, 0.40)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 3,
      }
    : null;

  const type = {};
  Object.entries(STYLE_ROLE).forEach(([style, role]) => {
    type[style] = {
      ...typography[style],
      color: text[role],
      ...(role === 'body' ? null : halo),
    };
  });
  // Legacy aliases
  type.title = type.headlineSmall;
  type.heading = type.titleLarge;
  type.subheading = type.titleMedium;
  type.body = type.bodyMedium;
  type.label = type.labelMedium;
  type.caption = type.labelSmall;

  let glass = p.glass;
  if (onDark) {
    glass = { ...p.glass, ...p.glassOnDark };
  } else if (onWallpaper) {
    glass = { ...p.glass, ...p.glassOnWallpaper };
  }

  return {
    name: p.name,
    isLight: !onDark,
    // Fonts — `weight` lets a style file pick the right file for a weight,
    // and `urduFont` is the family AppText uses for Urdu
    fonts,
    weight: weightFor(fonts.latin),
    urduFont: urduFamilyFor(fonts.urdu),

    bgMode,
    bg: p.bg,
    solid: solidOverride ?? p.solid,
    backgroundImage: image,
    wallpaper: p.wallpaper,
    isDarkBackground: onDark,

    blobs: p.blobs,
    accent: p.accent,
    accentPressed: p.accentPressed,
    brandGreen: onDark ? '#9FC4A3' : p.brandGreen,
    success: p.success,
    danger: p.danger,

    text,
    type,
    icon: onDark ? p.iconOnDark : p.icon,
    control: onDark ? p.controlOnDark : p.control,

    glass,
  };
};
