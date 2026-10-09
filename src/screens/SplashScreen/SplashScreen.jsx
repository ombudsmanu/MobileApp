import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {Animated, Easing, Image, PanResponder, Pressable, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../context/ThemeContext';
import {useAuth} from '../../context/AuthContext';
import {useLayout} from '../../theme/responsive';
import AppBackground from '../../components/AppBackground/AppBackground';
import GlassSurface from '../../components/GlassSurface/GlassSurface';
import Icon from '../../components/Icon/Icon';
import Text from '../../components/AppText/AppText';
import BrandCard from '../../components/BrandCard/BrandCard';
import useSplashFit from './useSplashFit';
import {
  createStyles,
  createDynamicStyles,
  createFitStyles,
  animationConfig,
  CERTIFICATIONS,
  LAYOUT,
  PANEL_RADIUS,
  HINT_RADIUS,
} from './SplashScreen.styles';

const CREST = require('../../assets/images/crest.png');

/** The four marks under the certifications, left to right — the same
 *  images as before. (The first one is iso-sgs.png; iso27001.png is also in
 *  assets if the ISO/IEC 27001 mark should appear there instead.) */
const QMS_LOGOS = [
  {key: 'iso27001', source: require('../../assets/images/iso-sgs.png')},
  {key: 'iso9001', source: require('../../assets/images/iso-sgs.png')},
  {key: 'ukas', source: require('../../assets/images/ukas.jpg')},
  {key: 'iaf', source: require('../../assets/images/iaf.png')},
];

const COPYRIGHT =
  '\u00A9 2026 Office of the Ombudsman Punjab\nIT Infrastructure & Development Wing';

/**
 * SPLASH — fits every screen, in portrait and landscape.
 *
 *   Portrait  — one column, spread from top to bottom
 *   Landscape — two columns: crest + brand card | certifications, swipe, footer
 *
 * The splash never scrolls (that would fight the swipe-up gesture), so
 * useSplashFit measures it and shows the full design, a compact one, or the
 * compact one shrunk to fit. See useSplashFit.js.
 *
 * Swipe up anywhere, or tap the arrow, to continue.
 */
const SplashScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {isAuthenticated, restoring} = useAuth();
  const {width, height, isLandscape} = useLayout();
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);

  const fit = useSplashFit();
  const fitStyles = useMemo(
    () => createFitStyles(fit.viewportHeight, fit.scale),
    [fit.viewportHeight, fit.scale],
  );

  // Two columns only when sideways AND wide enough (a narrow split-screen
  // window keeps the single column)
  const twoColumns = isLandscape && width >= LAYOUT.twoColumnMin;

  const dragY = useRef(new Animated.Value(0)).current;
  const fadeIn = useRef(new Animated.Value(0)).current;
  const hintBounce = useRef(new Animated.Value(0)).current;

  const navigating = useRef(false);

  /**
   * LIVE VALUES FOR THE GESTURE.
   * The PanResponder is created once, so any variable it reads directly
   * is frozen at its first-render value. These refs are updated after
   * every render, so the gesture handlers always see the CURRENT values —
   * including the new screen height after a rotation.
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

  // ---- Animated styles (all native-driven) ------------------------------
  // Built once per screen height, not on every render
  const contentMotion = useMemo(
    () => ({
      opacity: Animated.multiply(
        fadeIn,
        dragY.interpolate({
          inputRange: [-animationConfig.dragFadeDistance, 0],
          outputRange: [0.35, 1],
          extrapolate: 'clamp',
        }),
      ),
      transform: [
        // The drag — only the content travels, the background stays
        {
          translateY: dragY.interpolate({
            inputRange: [-height, 0, height],
            outputRange: [-height, 0, height * animationConfig.downwardResistance],
            extrapolate: 'clamp',
          }),
        },
        // The entrance offset, composed on top
        {
          translateY: fadeIn.interpolate({
            inputRange: [0, 1],
            outputRange: [animationConfig.fadeInOffset, 0],
          }),
        },
        {
          scale: dragY.interpolate({
            inputRange: [-animationConfig.dragFadeDistance, 0],
            outputRange: [0.965, 1],
            extrapolate: 'clamp',
          }),
        },
      ],
    }),
    [dragY, fadeIn, height],
  );

  const hintMotion = useMemo(
    () => ({
      opacity: hintBounce.interpolate({
        inputRange: [0, 1],
        outputRange: animationConfig.hintOpacityRange,
      }),
      transform: [
        {
          translateY: hintBounce.interpolate({
            inputRange: [0, 1],
            outputRange: [0, animationConfig.hintTravel],
          }),
        },
      ],
    }),
    [hintBounce],
  );

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

  // Tappable as well as swipeable — some users tap the circle
  const onTapContinue = useCallback(() => goNextRef.current(-1.2), []);

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
        // 300dp, or 30% of the screen height if that is less (landscape)
        const distance = Math.min(
          animationConfig.swipeDistanceThreshold,
          heightRef.current * animationConfig.swipeDistanceShare,
        );
        const far = g.dy < -distance;
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

  /**
   * Builds the splash. Called three times per render: two invisible copies
   * (full and compact) that are only measured, and the visible one.
   *
   *   compact  — smaller crest; certification text hidden, logos kept
   *   live     — the visible copy: the only one that animates and takes taps
   *   style    — the fit (height + scale) for the visible copy
   *   onLayout — reports the height of a measured copy
   */
  const renderSplash = ({compact, live, style, onLayout}) => {
    const crest = (
      <Image source={CREST} style={compact ? styles.crestCompact : styles.crest} />
    );

    // Shared with the login screen
    const brand = <BrandCard style={styles.brandCard} />;

    const certs = (
      <GlassSurface radius={PANEL_RADIUS} style={styles.qmsPanel}>
        {!compact &&
          CERTIFICATIONS.map(c => (
            <View key={c.key} style={styles.certBlock}>
              <Text style={styles.certTitle}>{c.title}</Text>
              <Text style={styles.certStandard}>{c.standard}</Text>
              <Text style={styles.certNumber}>{c.number}</Text>
            </View>
          ))}

        {!compact && <View style={styles.qmsDivider} />}

        <View style={styles.qmsLogoRow}>
          {QMS_LOGOS.map(logo => (
            <Image key={logo.key} source={logo.source} style={styles.qmsLogo} />
          ))}
        </View>
      </GlassSurface>
    );

    const swipeBody = (
      <View style={styles.swipeWrap}>
        <Pressable
          onPress={live ? onTapContinue : undefined}
          disabled={!live}
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Continue to OPMIS App">
          <GlassSurface strong center radius={HINT_RADIUS} style={styles.swipeCircle}>
            <Icon name="chevronUp" size={20} color={theme.brandGreen} weight={2.5} />
          </GlassSurface>
        </Pressable>
        <Text style={styles.swipeTitle}>Swipe up to proceed</Text>
        <Text style={styles.swipeUrdu}>اوپر کی جانب سوائپ کریں</Text>
        <Text style={styles.swipeSub}>Continue to OPMIS App</Text>
      </View>
    );

    // Only the visible copy runs the bounce
    const swipe = live ? (
      <Animated.View style={hintMotion}>{swipeBody}</Animated.View>
    ) : (
      swipeBody
    );

    const footer = (
      <View style={styles.footer}>
        <GlassSurface radius={HINT_RADIUS} style={styles.copyrightPill}>
          <Text style={styles.copyrightText}>{COPYRIGHT}</Text>
        </GlassSurface>
        <GlassSurface radius={HINT_RADIUS} style={styles.versionPill}>
          <Text style={styles.versionText}>VERSION 1.10</Text>
        </GlassSurface>
      </View>
    );

    if (twoColumns) {
      return (
        <View style={[styles.row, style]} onLayout={onLayout}>
          <View style={styles.side}>
            {crest}
            {brand}
          </View>
          <View style={styles.side}>
            {certs}
            {swipe}
            {footer}
          </View>
        </View>
      );
    }

       // Each part is its own child, so the spare height is shared out evenly
    // between ALL of them — including a gap between the certifications
    // card and the swipe control
    return (
      <View style={[styles.column, style]} onLayout={onLayout}>
        {crest}
        {brand}
        {certs}
        {swipe}
        {footer}
      </View>
    );
  };

  return (
    // Static: the background never moves with the gesture
    <View style={styles.root} {...panResponder.panHandlers}>
      <AppBackground>
        <Animated.View
          renderToHardwareTextureAndroid
          style={[styles.content, dyn.contentPadding, contentMotion]}>
          <View style={styles.viewport} onLayout={fit.handlers.onViewportLayout}>
            {/* ---- Invisible copies, only measured (see useSplashFit) ---- */}
            <View
              style={styles.measurer}
              pointerEvents="none"
              importantForAccessibility="no-hide-descendants"
              accessibilityElementsHidden>
              {renderSplash({compact: false, live: false, onLayout: fit.handlers.onFullLayout})}
            </View>
            <View
              style={styles.measurer}
              pointerEvents="none"
              importantForAccessibility="no-hide-descendants"
              accessibilityElementsHidden>
              {renderSplash({compact: true, live: false, onLayout: fit.handlers.onCompactLayout})}
            </View>

            {/* ---- The splash the user sees ---- */}
            {renderSplash({
              compact: fit.compact,
              live: true,
              style: [fitStyles.shown, !fit.ready && styles.pending],
            })}
          </View>
        </Animated.View>
      </AppBackground>
    </View>
  );
};

export default SplashScreen;