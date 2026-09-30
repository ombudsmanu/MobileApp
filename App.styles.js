import {StyleSheet} from 'react-native';

/** Root-level style companion — the analogue of app.css beside app.jsx. */

export const createStyles = () =>
  StyleSheet.create({
    root: {flex: 1},
  });

export const createStatusBarConfig = theme => ({
  barStyle: theme.isLight ? 'dark-content' : 'light-content',
  backgroundColor: 'transparent',
  translucent: true,
});