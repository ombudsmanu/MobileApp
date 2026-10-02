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
export const CUSTOM_FONT = false;
/**
 * Font for ALL Urdu text. Must match the .ttf file name (without .ttf)
 * in src/assets/fonts. To switch to Noto Nastaliq Urdu, change this
 * name and the file.
 */
export const URDU_FONT = 'NotoNastaliqUrdu-Regular';
const FAMILY ={
  400: 'Poppins-Regular',
  500: 'Poppins-Medium',
  600: 'Poppins-SemiBold',
  700: 'Poppins-Bold',
  800: 'Poppins-ExtraBold',
  900: 'Poppins-ExtraBold', // heaviest Poppins file installed; system font uses true Black
};

/**
 * On Android a custom font's weight is a separate FILE — fontWeight on
 * it produces a smeared fake bold. This picks the right method.
 */
export const weight = w =>
  CUSTOM_FONT ? {fontFamily: FAMILY[w]} : {fontWeight: String(w)};

/** Kept for any file that still imports it. */
export const fonts = {
  regular: FAMILY[400],
  medium: FAMILY[500],
  semibold: FAMILY[600],
  bold: FAMILY[700],
  extrabold: FAMILY[800],
};

export const spacing = {xs: 6, sm: 12, md: 18, lg: 26, xl: 36, xxl: 52};

export const radii = {sm: 10, md: 16, lg: 24, xl: 32, pill: 999};

const scale = {
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
};

export const typography = {
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

export default {spacing, radii, typography, weight};