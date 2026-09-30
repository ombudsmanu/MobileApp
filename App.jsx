import React, {useMemo} from 'react';
import {StatusBar, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider, useTheme} from './src/context/ThemeContext';
import {AuthProvider} from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import {createStyles, createStatusBarConfig} from './App.styles';
import AlertRoot from './src/components/AlertRoot/AlertRoot';
import {LanguageProvider} from './src/context/LanguageContext';
/** Inside the providers so useTheme() is available. */
const AppShell = () => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(), []);
  const statusBar = useMemo(() => createStatusBarConfig(theme), [theme]);

  return (
    <View style={styles.root}>
      <StatusBar {...statusBar} />
      <RootNavigator />
      {/* Mounted once at the root so it can open over ANY screen */}
    </View>
  );
};

const App = () => (
  <ThemeProvider>
    <SafeAreaProvider>
      <AlertRoot>
        <LanguageProvider>
          <AuthProvider>
            <AppShell />
          </AuthProvider>
        </LanguageProvider>
      </AlertRoot>
    </SafeAreaProvider>
  </ThemeProvider>
);
export default App;