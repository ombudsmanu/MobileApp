import React, {useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '../context/ThemeContext';
import BrandIntroScreen from '../screens/BrandIntroScreen/BrandIntroScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen/DashboardScreen';
import ColorPickerScreen from '../screens/ColorPickerScreen/ColorPickerScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen/ComingSoonScreen';
import {placeholderScreenOptions} from './RootNavigator.styles';
import AboutUsScreen from '../screens/AboutUsScreen/AboutUsScreen';
import AnnualReportsScreen from '../screens/AnnualReportsScreen/AnnualReportsScreen';
import AboutSectionScreen from '../screens/AboutSectionScreen/AboutSectionScreen';
import PdfViewerScreen from '../screens/PdfViewerScreen/PdfViewerScreen';
import DownloadsScreen from '../screens/DownloadsScreen/DownloadsScreen';
import RegisterComplaintScreen from '../screens/RegisterComplaintScreen/RegisterComplaintScreen';
import ComplaintFormScreen from '../screens/ComplaintFormScreen/ComplaintFormScreen';
import OverseasComplaintFormScreen from '../screens/OverseasComplaintFormScreen/OverseasComplaintFormScreen';

import {
  resolveBaseColor,
  createNavTheme,
  createScreenOptions,
  introScreenOptions,
  swipeUpScreenOptions,
  loginScreenOptions,
  dashboardScreenOptions,
  appearanceScreenOptions,
  colorPickerScreenOptions,
} from './RootNavigator.styles';
import AppearanceScreen from '../screens/AppearanceScreen/AppearanceScreen';

const Stack = createNativeStackNavigator();

/**
 * THE TWO OPENING SCREENS — read this before renaming anything.
 *
 *   "Splash"   BrandIntroScreen — crest + Office name, about 2.4 seconds,
 *              then it replaces itself with "SwipeUp".
 *   "SwipeUp"  SplashScreen — the swipe-up-to-continue screen.
 *
 * The route is called "Splash" because that is what every other screen
 * already resets to (the sidebar's Logout, Back from Login). Keeping the
 * name means the brand intro plays at app start AND every time the app
 * returns to the opening screen, with no change anywhere else.
 *
 * ADDING A MODULE SCREEN:
 *   import YourScreen from '../screens/YourScreen/YourScreen';
 *   <Stack.Screen name="YourRoute" component={YourScreen} />
 * The `name` must match the `route` value in navigation/modules.js.
 */
const RootNavigator = () => {
  const {theme} = useTheme();

  const baseColor = useMemo(() => resolveBaseColor(theme), [theme]);
  const navTheme = useMemo(() => createNavTheme(baseColor), [baseColor]);
  const screenOptions = useMemo(() => createScreenOptions(baseColor), [baseColor]);

  return (
    <NavigationContainer theme={navTheme}>
      <Stack.Navigator initialRouteName="Splash" screenOptions={screenOptions}>
        <Stack.Screen
          name="Splash"
          component={BrandIntroScreen}
          options={introScreenOptions}
        />
        <Stack.Screen
          name="SwipeUp"
          component={SplashScreen}
          options={swipeUpScreenOptions}
        />
        <Stack.Screen name="Login" component={LoginScreen} options={loginScreenOptions} />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={dashboardScreenOptions}
        />
        <Stack.Screen
          name="Appearance"
          component={AppearanceScreen}
          options={appearanceScreenOptions}
        />
        <Stack.Screen
          name="ColorPicker"
          component={ColorPickerScreen}
          options={colorPickerScreenOptions}
        />
        {/* Placeholders — swap `component` for the real screen when it's built */}
        <Stack.Screen
          name="AdminDashboard"
          component={ComingSoonScreen}
          options={placeholderScreenOptions}
          initialParams={{
            titleKey: 'screen.adminDashboard',
            fallbackTitle: 'Admin Dashboard',
            icon: 'grid',
            requireAdmin: true,
          }}
        />
        <Stack.Screen
          name="RegisterComplaint"
          component={RegisterComplaintScreen}
          options={placeholderScreenOptions}
        />
        {/* The two complaint forms. ComplaintForm stays registered as a
            placeholder for any other option added later. */}
        <Stack.Screen
          name="ComplaintFormPakistan"
          component={ComplaintFormScreen}
          options={placeholderScreenOptions}
        />
        <Stack.Screen
          name="ComplaintFormOverseas"
          component={OverseasComplaintFormScreen}
          options={placeholderScreenOptions}
        />
        <Stack.Screen
          name="ComplaintForm"
          component={ComingSoonScreen}
          options={placeholderScreenOptions}
        />
        <Stack.Screen
          name="AboutUs"
          component={AboutUsScreen}
          options={placeholderScreenOptions}
        />
        <Stack.Screen
          name="AnnualReports"
          component={AnnualReportsScreen}
          options={placeholderScreenOptions}
        />
        <Stack.Screen
          name="AboutSection"
          component={AboutSectionScreen}
          options={placeholderScreenOptions}
        />
        <Stack.Screen
          name="PdfViewer"
          component={PdfViewerScreen}
          options={placeholderScreenOptions}
        />
        <Stack.Screen
          name="Downloads"
          component={DownloadsScreen}
          options={placeholderScreenOptions}
        />
        {/* Future module screens go here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;