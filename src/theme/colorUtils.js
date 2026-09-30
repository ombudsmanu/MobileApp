/**
 * Colour helpers used to decide whether a background is dark, and to
 * recommend text colours that will read well on it.
 */

const cleanHex = hex => String(hex).replace('#', '').trim();

export const hexToRgb = hex => {
  const h = cleanHex(hex);
  const full = h.length === 3 ? h.split('').map(c => c + c).join('') : h.slice(0, 6);
  const n = parseInt(full, 16);
  return {r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255};
};

/** WCAG relative luminance: 0 = black, 1 = white. */
export const relativeLuminance = hex => {
  const {r, g, b} = hexToRgb(hex);
  const channel = v => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
};

export const isDarkColor = (hex, threshold = 0.4) => {
  if (!hex || !/^#?[0-9a-fA-F]{3,8}$/.test(String(hex))) {
    return false;
  }
  try {
    return relativeLuminance(hex) < threshold;
  } catch {
    return false;
  }
};

/** Text sets that pair with each kind of background. */
/** Text sets that pair with each kind of background. */
export const LIGHT_TEXT_SET = {
  headline: '#FFFFFF',
  title: '#E6F0E7',
  body: '#C9D6CB',
  label: '#A9B8AB',
};

export const DARK_TEXT_SET = {
  headline: '#153A22',
  title: '#24452C',
  body: '#3F4B43',
  label: '#5E6A61',
};

/**
 * Suggests a full text set for the background just chosen.
 * Returns {colors, reason}.
 */
/**
 * Suggests a full text set for the background just chosen.
 * Returns {colors, reason, reasonKey} — reasonKey for translation.
 */
export const recommendTextColors = ({solid = null, hasImage = false}) => {
  if (hasImage) {
    return {
      colors: DARK_TEXT_SET,
      reasonKey: 'reason.image',
      reason: 'Wallpapers sit under a light veil, so darker text stays readable.',
    };
  }
  if (solid && isDarkColor(solid)) {
    return {
      colors: LIGHT_TEXT_SET,
      reasonKey: 'reason.dark',
      reason: 'This background is dark, so light text reads best on it.',
    };
  }
  return {
    colors: DARK_TEXT_SET,
    reasonKey: 'reason.light',
    reason: 'This background is light, so darker text reads best on it.',
  };
};