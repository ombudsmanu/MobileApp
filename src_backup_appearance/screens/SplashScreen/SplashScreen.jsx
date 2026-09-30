import React, {useEffect, useMemo, useRef} from 'react';
import {
  Animated,
  Easing,
  Image,
  PanResponder,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import Icon from '../../components/Icon/Icon';
import {
  createStyles,
  createDynamicStyles,
  animationConfig,
  PANEL_RADIUS,
  HINT_RADIUS,
  CREST_RADIUS,
} from './SplashScreen.styles';

const SplashScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {isAuthenticated, restoring} = useAuth();
  const {height} = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);

  const dragY = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const hintBounce = useRef(new Animated.Value(0)).current;

  const navigating = useRef(false);

  /**
   * LIVE VALUES FOR THE GESTURE.
   * The PanResponder is created once, so any variable it reads directly
   * is frozen at its first-render value. These refs are updated after
   * every render, so the gesture handlers always see the CURRENT values.
   */
  const restoringRef = useRef(restoring);
  const authRef = useRef(isAuthenticated);
  const heightRef = useRef(height);

  useEffect(() => {
    restoringRef.current = restoring;
    authRef.current = isAuthenticated;
    heightRef.current = height;
  }, [restoring, isAuthenticated, height]);

  // ---- Entrance fade + looping hint pulse -------------------------------
  useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: animationConfig.fadeInDuration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(hintBounce, {
          toValue: 1,
          duration: animationConfig.hintLoopDuration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(hintBounce, {
          toValue: 0,
          duration: animationConfig.hintLoopDuration,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [fadeIn, hintBounce]);

  // ---- Derived transforms (all native-driven) ---------------------------
  const screenTranslate = dragY.interpolate({
    inputRange: [-height, 0, height],
    outputRange: [-height, 0, height * animationConfig.downwardResistance],
    extrapolate: 'clamp',
  });

  const contentOpacity = dragY.interpolate({
    inputRange: [-animationConfig.dragFadeDistance, 0],
    outputRange: [0.35, 1],
    extrapolate: 'clamp',
  });

  const contentScale = dragY.interpolate({
    inputRange: [-animationConfig.dragFadeDistance, 0],
    outputRange: [0.965, 1],
    extrapolate: 'clamp',
  });

  // ---- Navigation -------------------------------------------------------
  const goNext = velocity => {
    if (navigating.current) {
      return;
    }
    navigating.current = true;

    // Read the LIVE auth state, not the first-render value
    if (authRef.current) {
      navigation.reset({index: 0, routes: [{name: 'Dashboard'}]});
    } else {
      navigation.navigate('Login');
    }

    Animated.spring(dragY, {
      toValue: -heightRef.current,
      velocity,
      stiffness: animationConfig.exitStiffness,
      damping: animationConfig.exitDamping,
      mass: 1,
      overshootClamping: true,
      useNativeDriver: true,
    }).start(() => {
      dragY.setValue(0);
      navigating.current = false;
    });
  };

  // Keep the latest goNext reachable from the one-time PanResponder
  const goNextRef = useRef(goNext);
  goNextRef.current = goNext;

  // ---- Gesture ----------------------------------------------------------
  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_e, g) =>
        !restoringRef.current &&
        !navigating.current &&
        g.dy < animationConfig.gestureClaimThreshold &&
        Math.abs(g.dy) > Math.abs(g.dx),

      onPanResponderGrant: () => {
        dragY.stopAnimation();
      },

      onPanResponderMove: (_e, g) => {
        dragY.setValue(g.dy);
      },

      onPanResponderRelease: (_e, g) => {
        const far = g.dy < -animationConfig.swipeDistanceThreshold;
        const fast = g.vy < animationConfig.swipeVelocityThreshold;

        if (far || fast) {
          goNextRef.current(g.vy);
        } else {
          Animated.spring(dragY, {
            toValue: 0,
            velocity: g.vy,
            stiffness: animationConfig.snapStiffness,
            damping: animationConfig.snapDamping,
            mass: 1,
            useNativeDriver: true,
          }).start();
        }
      },

      onPanResponderTerminate: () => {
        Animated.spring(dragY, {
          toValue: 0,
          stiffness: animationConfig.snapStiffness,
          damping: animationConfig.snapDamping,
          useNativeDriver: true,
        }).start();
      },
    }),
  ).current;

  const hintTranslate = hintBounce.interpolate({
    inputRange: [0, 1],
    outputRange: [0, animationConfig.hintTravel],
  });
  const hintOpacity = hintBounce.interpolate({
    inputRange: [0, 1],
    outputRange: animationConfig.hintOpacityRange,
  });

  return (
    <Animated.View
      style={[styles.root, {transform: [{translateY: screenTranslate}]}]}
      renderToHardwareTextureAndroid
      {...panResponder.panHandlers}>
      <AppBackground>
        <Animated.View
          style={[
            styles.content,
            dyn.contentPadding,
            {
              opacity: Animated.multiply(fadeIn, contentOpacity),
              transform: [
                {
                  translateY: fadeIn.interpolate({
                    inputRange: [0, 1],
                    outputRange: [animationConfig.fadeInOffset, 0],
                  }),
                },
                {scale: contentScale},
              ],
            },
          ]}>

          {/* ---- Crest + office line ---- */}
          <View style={{alignItems: 'center'}}>
            <GlassSurface strong center radius={CREST_RADIUS} style={styles.crestPanel}>
              <View style={styles.crestPlate}>
                <Image
                  source={require('../../assets/images/crest.png')}
                  style={styles.crestImage}
                />
              </View>
            </GlassSurface>
            <Text style={styles.officeLine}>
              OFFICE OF THE{'\n'}OMBUDSMAN PUNJAB
            </Text>
          </View>

          {/* ---- Welcome + OPMIS ---- */}
          <View style={{alignSelf: 'stretch', alignItems: 'center'}}>
            <Text style={styles.welcome}>WELCOME TO</Text>
            <GlassSurface radius={PANEL_RADIUS} style={styles.opmisPanel}>
              <Text style={styles.opmisText}>
                Ombudsman Punjab{'\n'}Management Information System{'\n'}(OPMIS)
              </Text>
            </GlassSurface>
          </View>

          {/* ---- QMS + copyright + hint ---- */}
          <View style={{alignSelf: 'stretch', alignItems: 'center'}}>
            <GlassSurface radius={PANEL_RADIUS} style={styles.qmsPanel}>
              <Text style={styles.qmsTitle}>QUALITY MANAGEMENT SYSTEM</Text>
              <Text style={styles.qmsSub}>ISO (9001:2015/27001:2022) Certified</Text>

              <View style={styles.qmsLogoRow}>
                <Image
                  source={require('../../assets/images/iso-sgs.png')}
                  style={styles.qmsLogo}
                />
                  <Image
                  source={require('../../assets/images/iso27001.png')}
                  style={styles.qmsLogo}
                />
                <Image
                  source={require('../../assets/images/ukas.jpg')}
                  style={styles.qmsLogo}
                />
                <Image
                  source={require('../../assets/images/iaf.png')}
                  style={styles.qmsLogo}
                />
              
              </View>

              <View style={styles.qmsDivider} />
              <Text style={styles.qmsCert}>Certification: PK25/00000138</Text>
            </GlassSurface>
            <Animated.View
              style={{
                opacity: hintOpacity,
                transform: [{translateY: hintTranslate}],
              }}>
              <GlassSurface radius={HINT_RADIUS} center style={styles.hintPill}>
                <Icon name="chevronUp" size={18} color={theme.text.muted} />
                <Text style={styles.hintText}>Swipe up to continue</Text>
              </GlassSurface>
            </Animated.View>
          </View>
        </Animated.View>
        <Text style={styles.copyrightText}>
              {'\u00A9'} 2026 Office of the Ombudsman Punjab{'\n'}
              IT Infrastructure & Development Wing
            </Text>

            <GlassSurface radius={HINT_RADIUS} style={styles.versionPill}>
              <Text style={styles.versionText}>VERSION 1.10</Text>
            </GlassSurface>
      </AppBackground>
    </Animated.View>
  );
};

export default SplashScreen;