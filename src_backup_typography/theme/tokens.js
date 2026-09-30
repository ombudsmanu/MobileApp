/**
 * DESIGN TOKENS — measurements and font family. No colours.
 *
 * ANDROID FONT NOTE
 * On Android, a font weight is a separate FILE, not a numeric weight.
 * Setting fontWeight: '700' on Poppins-Regular does NOT produce bold —
 * Android fakes it and it looks wrong. So every role names its exact
 * font file, and fontWeight is left out entirely.
 */

export const fonts = {
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  semibold: 'Poppins-SemiBold',
  bold: 'Poppins-Bold',
  extrabold: 'Poppins-ExtraBold',
};

export const spacing = {xs: 6, sm: 12, md: 18, lg: 26, xl: 36, xxl: 52};

export const radii = {sm: 10, md: 16, lg: 24, xl: 32, pill: 999};

export const typography = {
  // ---- The four customisable text roles ----
  title: {fontFamily: fonts.extrabold, fontSize: 26, letterSpacing: 0.2},
  heading: {fontFamily: fonts.bold, fontSize: 19, letterSpacing: 0.2},
  subheading: {fontFamily: fonts.semibold, fontSize: 16, letterSpacing: 0.2},
  body: {fontFamily: fonts.regular, fontSize: 14, lineHeight: 22},

  // ---- Fixed supporting roles ----
  label: {fontFamily: fonts.bold, fontSize: 12, letterSpacing: 0.8},
  caption: {fontFamily: fonts.medium, fontSize: 11, letterSpacing: 0.3},

  // ---- Controls ----
  input: {fontFamily: fonts.regular, fontSize: 16},
  button: {fontFamily: fonts.bold, fontSize: 15, letterSpacing: 0.6},

  // ---- Legacy aliases ----
  display: {fontFamily: fonts.extrabold, fontSize: 34, letterSpacing: 0.4},
  subtitle: {fontFamily: fonts.semibold, fontSize: 16, letterSpacing: 0.2},
};

export default {fonts, spacing, radii, typography};