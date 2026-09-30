/**
 * @format
 */

import { AppRegistry, I18nManager } from 'react-native';   // added I18nManager here
import App from './App';
import { name as appName } from './app.json';

// We control Urdu direction ourselves, so stop RN from auto-flipping left/right
I18nManager.allowRTL(false);
I18nManager.forceRTL(false);

AppRegistry.registerComponent(appName, () => App);
