import {basePalette} from './palette';
import {normalizeBackground} from './backgrounds';
import {isDarkColor} from './colorUtils';
import {typography} from './tokens';

/**
 * Merges the palette with the user's choices into ONE flat theme.
 *
 * Background priority: image → solid colour → default gradient.
 *
 * If the chosen solid colour is DARK, the app automatically switches to
 * dark glass, light icons and light control text. Icons still never
 * follow the user's TEXT customisation — they follow the background.
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

  const onWallpaper = bgMode === 'image';
  const onDark = bgMode === 'solid' && isDarkColor(solidOverride);

  const text = {
    title: overrides.title ?? p.text.title,
    heading: overrides.heading ?? p.text.heading,
    subheading: overrides.subheading ?? p.text.subheading,
    body: overrides.text ?? p.text.body,
    // Labels and captions often sit OUTSIDE cards, directly on the photo.
    // On a wallpaper they go much darker so they hold their own.
    muted: onDark ? '#93A395' : onWallpaper ? '#33423６' : p.text.muted,
    faint: onDark ? '#6F7D71' : onWallpaper ? '#4C594F' : p.text.faint,
    onAccent: p.text.onAccent,
  };

  // Faint white glow behind headings so they stay legible over photos
   /**
   * On a wallpaper, headings get a soft DARK shadow rather than a white
   * glow. A white glow on a light photo looks blurred; a dark shadow
   * lifts the text off the image and keeps the letterforms crisp.
   * Text outside cards is what needs it — inside cards the frost handles it.
   */
   /**
   * On a wallpaper, a soft dark shadow lifts text off the image and
   * keeps letterforms crisp. Labels and captions get it too, because
   * they're the ones most often sitting on bare photo.
   */
  const halo = onWallpaper
    ? {
        textShadowColor: 'rgba(12, 20, 14, 0.45)',
        textShadowOffset: {width: 0, height: 1},
        textShadowRadius: 4,
      }
    : null;

  const type = {
    title: {...typography.title, color: text.title, ...halo},
    heading: {...typography.heading, color: text.heading, ...halo},
    subheading: {...typography.subheading, color: text.subheading, ...halo},
    body: {...typography.body, color: text.body},
    label: {...typography.label, color: text.muted, ...halo},
    caption: {...typography.caption, color: text.muted, ...halo},
  };

  let glass = p.glass;
  if (onDark) {
    glass = {...p.glass, ...p.glassOnDark};
  } else if (onWallpaper) {
    glass = {...p.glass, ...p.glassOnWallpaper};
  }

  return {
    name: p.name,
    isLight: !onDark,

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