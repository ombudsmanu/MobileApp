import React, { useEffect, useMemo, useRef } from 'react';
import {
  Animated,
  Easing,
  Image,
  PanResponder,
  Pressable,
  View,
  useWindowDimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import Icon from '../../components/Icon/Icon';
import Text from '../../components/AppText/AppText';
import BrandCard from '../../components/BrandCard/BrandCard';
import {
  createStyles,
  createDynamicStyles,
  animationConfig,
  CERTIFICATIONS,
  PANEL_RADIUS,
  HINT_RADIUS,
} from './SplashScreen.styles';

const SplashScreen = ({ navigation }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const { isAuthenticated, restoring } = useAuth();
  const { height } = useWindowDimensions();
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
      navigation.reset({ index: 0, routes: [{ name: 'Dashboard' }] });
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
    // Static: the background never moves with the gesture
    <View style={styles.root} {...panResponder.panHandlers}>
      <AppBackground>
        <Animated.View
          renderToHardwareTextureAndroid
          style={[
            styles.content,
            dyn.contentPadding,
            {
              opacity: Animated.multiply(fadeIn, contentOpacity),
              transform: [
                // The drag — only the content travels
                { translateY: screenTranslate },
                // The entrance offset, composed on top
                {
                  translateY: fadeIn.interpolate({
                    inputRange: [0, 1],
                    outputRange: [animationConfig.fadeInOffset, 0],
                  }),
                },
                { scale: contentScale },
              ],
            },
          ]}
        >
          {/* ---- Crest — directly on the background, no card behind it ---- */}
          <View style={{ alignItems: 'center' }}>
            <Image
              source={require('../../assets/images/crest.png')}
              style={styles.crestImage}
            />
          </View>

          {/* ---- Brand card — shared with the login screen ---- */}
          <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>
            <BrandCard style={styles.brandCardSpacing} />
          </View>

          {/* ---- QMS + copyright + hint ---- */}
          <View style={{ alignSelf: 'stretch', alignItems: 'center' }}>
            <GlassSurface radius={PANEL_RADIUS} style={styles.qmsPanel}>
              {CERTIFICATIONS.map(c => (
                <View key={c.key} style={styles.certBlock}>
                  <Text style={styles.certTitle}>{c.title}</Text>
                  <Text style={styles.certStandard}>{c.standard}</Text>
                  <Text style={styles.certNumber}>{c.number}</Text>
                </View>
              ))}

              <View style={styles.qmsDivider} />

              <View style={styles.qmsLogoRow}>
                <Image
                  source={require('../../assets/images/iso-sgs.png')}
                  style={styles.qmsLogo}
                />
                <Image
                  source={require('../../assets/images/iso-sgs.png')}
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
            </GlassSurface>
            <Animated.View
              style={{
                opacity: hintOpacity,
                transform: [{ translateY: hintTranslate }],
              }}
            >
              <View style={styles.swipeWrap}>
                {/* Tappable as well as swipeable — some users tap a circle */}
                <Pressable onPress={() => goNextRef.current(-1.2)} hitSlop={12}>
                  <GlassSurface
                    strong
                    center
                    radius={HINT_RADIUS}
                    style={styles.swipeCircle}
                  >
                    <Icon
                      name="chevronUp"
                      size={20}
                      color={theme.brandGreen}
                      weight={2.5}
                    />
                  </GlassSurface>
                </Pressable>
                <Text style={styles.swipeTitle}>Swipe up to proceed</Text>
                <Text style={styles.swipeUrdu}>اوپر کی جانب سوائپ کریں</Text>
                <Text style={styles.swipeSub}>Continue to OPMIS App</Text>
              </View>
            </Animated.View>
          </View>
          <GlassSurface radius={HINT_RADIUS} style={styles.copyrightPill}>
            <Text style={styles.copyrightText}>
              {'\u00A9'} 2026 Office of the Ombudsman Punjab{'\n'}
              IT Infrastructure & Development Wing
            </Text>
          </GlassSurface>

          <GlassSurface radius={HINT_RADIUS} style={styles.versionPill}>
            <Text style={styles.versionText}>VERSION 1.10</Text>
          </GlassSurface>
        </Animated.View>
      </AppBackground>
    </View>
  );
};

export default SplashScreen;
