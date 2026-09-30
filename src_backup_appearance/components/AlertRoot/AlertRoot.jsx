import React, {useMemo} from 'react';
import {AlertNotificationRoot} from 'react-native-alert-notification';
import {useTheme} from '../../context/ThemeContext';
import {createAlertColors, dialogConfig, toastConfig} from './AlertRoot.styles';

/**
 * Wraps the library's root so its colours follow our live theme.
 * Mounted once in App.jsx.
 */
const AlertRoot = ({children}) => {
  const {theme} = useTheme();
  const colors = useMemo(() => createAlertColors(theme), [theme]);

  return (
    <AlertNotificationRoot
      theme={theme.isLight ? 'light' : 'dark'}
      colors={colors}
      dialogConfig={dialogConfig}
      toastConfig={toastConfig}>
      {children}
    </AlertNotificationRoot>
  );
};

export default AlertRoot;