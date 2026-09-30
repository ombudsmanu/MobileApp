import React, {useMemo} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useTheme} from '../context/ThemeContext';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen/DashboardScreen';
import ColorPickerScreen from '../screens/ColorPickerScreen/ColorPickerScreen';
import ComingSoonScreen from '../screens/ComingSoonScreen/ComingSoonScreen';
import { placeholderScreenOptions } from './RootNavigator.styles';
import {
  resolveBaseColor,
  createNavTheme,
  createScreenOptions,
  loginScreenOptions,
  dashboardScreenOptions,
  appearanceScreenOptions,
  colorPickerScreenOptions,
} from './RootNavigator.styles';
import AppearanceScreen from '../screens/AppearanceScreen/AppearanceScreen';
const Stack = createNativeStackNavigator();

/**
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
        <Stack.Screen name="Splash" component={SplashScreen} />
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
          component={ComingSoonScreen}
          options={placeholderScreenOptions}
          initialParams={{
            titleKey: 'screen.registerComplaint',
            fallbackTitle: 'Register a Complaint',
            icon: 'inbox',
          }}
        />
        {/* Future module screens go here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;