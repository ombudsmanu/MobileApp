import {DefaultTheme} from '@react-navigation/native';

/** No visual chrome here, so this file owns the colour-bearing config. */

export const resolveBaseColor = theme =>
  theme.bgMode === 'solid' ? theme.solid : theme.bg[theme.bg.length - 1];

export const createNavTheme = baseColor => ({
  ...DefaultTheme,
  colors: {...DefaultTheme.colors, background: baseColor},
});

export const createScreenOptions = baseColor => ({
  headerShown: false,
  animation: 'fade',
  contentStyle: {backgroundColor: baseColor},
});

// The two opening screens (Splash = BrandIntro, SwipeUp) both sit on the
// SAME AppBackground gradient. The default 'fade' cross-faded them OVER the
// navigator's flat baseColor (the last gradient stop), so for a few frames
// that single flat colour showed instead of the full gradient — the blank
// "jerk" after the logo. 'none' swaps them instantly: with identical
// backgrounds an instant cut is seamless, and the crest's own fade still
// plays inside BrandIntro. Used going INTO SwipeUp (both cold start and
// returning to the opening screen), so there is no cross-fade either way.
export const introScreenOptions = {animation: 'none'};
export const swipeUpScreenOptions = {animation: 'none'};

export const loginScreenOptions = {
  animation: 'fade',
  animationDuration: 180,
};
export const dashboardScreenOptions = {animation: 'fade'};
export const appearanceScreenOptions = {animation: 'slide_from_right'};
export const colorPickerScreenOptions = {animation: 'slide_from_bottom'};
export const placeholderScreenOptions = {animation: 'slide_from_right'};