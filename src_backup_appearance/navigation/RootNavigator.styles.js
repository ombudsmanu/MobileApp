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

export const loginScreenOptions = {
  animation: 'fade',
  animationDuration: 180,
};
export const dashboardScreenOptions = {animation: 'fade'};
export const appearanceScreenOptions = {animation: 'slide_from_right'};
export const colorPickerScreenOptions = {animation: 'slide_from_bottom'};