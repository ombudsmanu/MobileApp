/**
 * DESIGN TOKENS — measurements and type. No colours.
 *
 * TYPOGRAPHY: Material Design 3 type scale (Android's standard).
 * Sizes, line heights and letter spacing are MD3 exact. Headlines and
 * titles use MD3's emphasised (bolder) weights.
 */

/**
 * Set to TRUE only if Poppins was installed (fonts in
 * src/assets/fonts + `npx react-native-asset` + rebuild).
 * FALSE uses the system font (Roboto) with real weights.
 */
/**
 * Font for ALL Urdu text. Must match the .ttf file name (without .ttf)
 * in src/assets/fonts. To switch to Noto Nastaliq Urdu, change this
 * name and the file.
 */
export const URDU_FONT = 'NotoNastaliqUrdu-Regular';
/**
 * FONTS — the choices offered in Appearance.
 *
 * LATIN_FONTS style English (and digits); URDU_FONTS style Urdu. They are
 * chosen separately because one font cannot do both scripts: Poppins has
 * no Urdu letters, and Nastaliq has no Latin ones.
 *
 * `families` maps a weight to a FILE name. On Android every weight of a
 * custom font is its own file, and asking for fontWeight on top of a
 * custom family gives a smeared fake bold — so the file is chosen instead.
 * `families: null` means the system font, which does have real weights.
 *
 * Each name must match a .ttf in src/assets/fonts (without .ttf), linked
 * with `npx react-native-asset` and a rebuild.
 */
const CARLITO = {
  400: 'Carlito-Regular',
  500: 'Carlito-Regular',
  600: 'Carlito-Bold',
  700: 'Carlito-Bold',
  800: 'Carlito-Bold',
  900: 'Carlito-Bold',
};
const POPPINS = {
  400: 'Poppins-Regular',
  500: 'Poppins-Medium',
  600: 'Poppins-SemiBold',
  700: 'Poppins-Bold',
  800: 'Poppins-Bold',
  900: 'Poppins-Bold',
};
const OPEN_SANS = {
  400: 'OpenSans-Regular',
  500: 'OpenSans-Medium',
  600: 'OpenSans-SemiBold',
  700: 'OpenSans-Bold',
  800: 'OpenSans-Bold',
  900: 'OpenSans-Bold',
};

export const LATIN_FONTS = {
  system: {labelKey: 'font.system', label: 'System default', families: null},
  // Carlito is metric-compatible with Calibri and openly licensed —
  // Calibri itself is licensed with Windows and may not be shipped in an app
  carlito: {labelKey: 'font.calibri', label: 'Calibri (Carlito)', families: CARLITO},
  poppins: {labelKey: 'font.poppins', label: 'Poppins', families: POPPINS},
  opensans: {labelKey: 'font.sansSerif', label: 'Sans Serif', families: OPEN_SANS},
};

export const URDU_FONTS = {
  nastaliq: {labelKey: 'font.nastaliq', label: 'Nastaliq', family: 'NotoNastaliqUrdu-Regular'},
  // null = the phone's own Arabic-script font (Naskh, not Nastaliq)
  system: {labelKey: 'font.urduDefault', label: 'Urdu default', family: null},
};

export const DEFAULT_FONTS = {latin: 'system', urdu: 'nastaliq'};

/** The weight helper for one Latin font: a file name, or a real weight. */
export const weightFor = latinKey => {
  const families = (LATIN_FONTS[latinKey] ?? LATIN_FONTS.system).families;
  return w => (families ? {fontFamily: families[w]} : {fontWeight: String(w)});
};

/** The Urdu font file for a choice (null = the system's own). */
export const urduFamilyFor = urduKey =>
  (URDU_FONTS[urduKey] ?? URDU_FONTS.nastaliq).family;

/** Static default, for styles built outside the theme. */
export const weight = weightFor(DEFAULT_FONTS.latin);

export const spacing = {xs: 6, sm: 12, md: 18, lg: 26, xl: 36, xxl: 52};

export const radii = {sm: 10, md: 16, lg: 24, xl: 32, pill: 999};

/**
 * CARD SHADOW — the one shadow every card in the app uses.
 *
 * Drawn with boxShadow (React Native's New Architecture), not elevation.
 * Android's elevation shadow is very faint under see-through glass cards
 * and ignores shadowOpacity, so the old shadows were close to invisible.
 * Two layers: a soft, wide one for depth and a tight one for a crisp edge.
 * Android draws boxShadow on Android 9 (API 28) and newer.
 */
export const CARD_SHADOW =
  '0px 8px 22px rgba(18, 40, 24, 0.14), 0px 2px 6px rgba(18, 40, 24, 0.10)';
/** Stronger version for cards over a busy photo wallpaper. */
export const CARD_SHADOW_STRONG =
  '0px 10px 28px rgba(10, 22, 13, 0.28), 0px 3px 8px rgba(10, 22, 13, 0.18)';
/** The MD3 type scale, built with one font's weight method. */
const makeScale = weight => ({
  // ---- Headline family ----
  headlineMedium: {fontSize: 28, lineHeight: 36, letterSpacing: 0, ...weight(700)},
  headlineSmall: {fontSize: 24, lineHeight: 32, letterSpacing: 0, ...weight(700)},
  // ---- Title family ----
  titleLarge: {fontSize: 22, lineHeight: 28, letterSpacing: 0, ...weight(600)},
  titleMedium: {fontSize: 16, lineHeight: 24, letterSpacing: 0.15, ...weight(600)},
  titleSmall: {fontSize: 14, lineHeight: 20, letterSpacing: 0.1, ...weight(600)},
  // ---- Body family ----
  bodyLarge: {fontSize: 16, lineHeight: 24, letterSpacing: 0.5, ...weight(400)},
  bodyMedium: {fontSize: 14, lineHeight: 20, letterSpacing: 0.25, ...weight(400)},
  bodySmall: {fontSize: 12, lineHeight: 16, letterSpacing: 0.4, ...weight(400)},
  // ---- Label family ----
  labelLarge: {fontSize: 14, lineHeight: 20, letterSpacing: 0.1, ...weight(600)},
  labelMedium: {fontSize: 12, lineHeight: 16, letterSpacing: 0.5, ...weight(600)},
    labelSmall: {fontSize: 11, lineHeight: 16, letterSpacing: 0.5, ...weight(500)},
});

/** Everything theme.type.* is built from, for one Latin font. */
export const makeTypography = (latinKey = DEFAULT_FONTS.latin) => {
  const weight = weightFor(latinKey);
  const scale = makeScale(weight);
  return {
  ...scale,
  // Controls
  // Controls. No lineHeight on input: Android's TextInput mis-positions
  // text when a lineHeight is set.
  input: {fontSize: 16, letterSpacing: 0.5, ...weight(400)},
    button: {...scale.labelLarge, letterSpacing: 0.6},

  // Legacy aliases — keep any not-yet-migrated file working
  display: scale.headlineMedium,
  title: scale.headlineSmall,
  heading: scale.titleLarge,
  subtitle: scale.titleMedium,
  subheading: scale.titleMedium,
  body: scale.bodyMedium,
  label: scale.labelMedium,
  caption: scale.labelSmall,
  };
};

/** The default typography, for anything built outside the theme. */
export const typography = makeTypography();

export default {spacing, radii, typography, weight};