import React, {useEffect, useMemo, useRef} from 'react';
import {Animated, Easing, View} from 'react-native';
import {useIsFocused} from '@react-navigation/native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useTheme} from '../../context/ThemeContext';
import {useLanguage} from '../../context/LanguageContext';
import AppBackground from '../../components/AppBackground/AppBackground';
import {createStyles, createDynamicStyles, INTRO} from './BrandIntroScreen.styles';

const CREST = require('../../assets/images/crest.png');

/**
 * Has the brand intro already played in THIS app run? A module-level flag,
 * so it is false when the app process first starts and true ever after,
 * until the app is fully closed and reopened (a real cold start resets it).
 *
 * It is NOT React state and NOT storage on purpose: it must survive this
 * screen unmounting (it replaces itself with SwipeUp) but must NOT survive
 * the app being killed — "first time we open the app" means per launch.
 */
let introHasPlayed = false;

/**
 * BRAND INTRO — the opening screen.
 *
 * FIRST LAUNCH ONLY — the crest animation plays once, the first time the app
 * is opened. After that, whenever the app returns to this opening screen
 * (Logout from the sidebar, or Back from Login, both of which reset the
 * stack to "Splash"), the intro is SKIPPED: this screen hands straight over
 * to the swipe-up screen with no crest and no delay. So the branded intro is
 * a launch moment, not something the user sits through every time they log
 * out. Closing and reopening the app shows it again.
 *
 * NO BLANK GAP — on the first launch the hand-off to the swipe-up screen
 * fires the MOMENT the hold ends, while the crest is still fully on screen;
 * the crest's fade-out only softens it and is not waited on. Both screens
 * share the same AppBackground, and the Splash/SwipeUp navigator transition
 * is 'none', so nothing blank ever shows between them.
 *
 * ONLY WHILE FOCUSED — this screen can be MOUNTED under Login (the guest
 * "Sign in" resets the stack to [Splash, Login]). The isFocused guard and
 * the navigation.isFocused() check stop it from navigating while the user is
 * actually on Login.
 */
const BrandIntroScreen = ({navigation}) => {
  const {theme} = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);
  const {t} = useLanguage();
  const insets = useSafeAreaInsets();
  const dyn = useMemo(() => createDynamicStyles(insets), [insets]);
  const isFocused = useIsFocused();

  // One fade drives the screen; grow adds the small entrance movement.
  const fade = useRef(new Animated.Value(0)).current;
  const grow = useRef(new Animated.Value(INTRO.scaleFrom)).current;
  const moved = useRef(false);

  useEffect(() => {
    // Mounted but not the visible screen: stay still and stay quiet.
    if (!isFocused) {
      return undefined;
    }

    const goNext = () => {
      // Never move a user who has since left this screen.
      if (!moved.current && navigation.isFocused()) {
        moved.current = true;
        introHasPlayed = true;
        navigation.replace('SwipeUp');
      }
    };

    // ALREADY PLAYED THIS RUN — skip the animation and hand over at once, so
    // returning to the opening screen (Logout, Back from Login) goes straight
    // to the swipe-up screen with no intro.
    if (introHasPlayed) {
      goNext();
      return undefined;
    }

    // FIRST LAUNCH — play the crest animation once.
    fade.setValue(0);
    grow.setValue(INTRO.scaleFrom);
    moved.current = false;

    const appear = Animated.parallel([
      Animated.timing(fade, {
        toValue: 1,
        duration: INTRO.fadeInMs,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(grow, {
        toValue: 1,
        duration: INTRO.fadeInMs,
        easing: Easing.out(Easing.back(1.2)),
        useNativeDriver: true,
      }),
    ]);

    const leave = Animated.timing(fade, {
      toValue: 0,
      duration: INTRO.fadeOutMs,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    });

    // appear -> hold, THEN hand off (while the crest is still visible); the
    // fade-out runs alongside only to soften the hand-off, not before it.
    const run = Animated.sequence([appear, Animated.delay(INTRO.holdMs)]);

    run.start(({finished}) => {
      if (!finished) {
        return;
      }
      leave.start();
      goNext();
    });

    return () => {
      run.stop();
      leave.stop();
    };
  }, [isFocused, fade, grow, navigation]);

  const crestMotion = useMemo(
    () => ({opacity: fade, transform: [{scale: grow}]}),
    [fade, grow],
  );

  return (
    <AppBackground>
      <View style={[styles.screen, dyn.screen]}>
        <Animated.Image
          source={CREST}
          style={[styles.crest, crestMotion]}
          resizeMode="contain"
          accessibilityLabel={t('officeName')}
        />
      </View>
    </AppBackground>
  );
};

export default BrandIntroScreen;