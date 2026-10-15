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
 * BRAND INTRO — the first thing the app shows.
 *
 * The crest alone on the app's own background: it grows into place, holds
 * for a moment, then the app moves to the swipe-up screen. No heading under
 * it — the swipe-up screen that follows carries the Office name, so
 * repeating it here only delayed the app.
 *
 * It replaces itself (navigation.replace), so Back from the swipe screen
 * never returns here.
 *
 * NO BLANK GAP ON COLD START — the hand-off to the swipe-up screen fires the
 * MOMENT the hold ends, while the crest is still fully on screen. The crest's
 * own fade-out runs at the same time, only to soften the hand-off; the app
 * does NOT wait for it. The old version navigated only after the crest had
 * faded to nothing, so on a fresh launch the screen went blank, then the
 * swipe-up screen faded in from nothing on top of it — a visible empty gap.
 * It looked fine when returning to an already-mounted swipe-up screen, which
 * is why it only showed on first open. Both screens share the same
 * AppBackground, so swapping behind a visible crest never flickers.
 *
 * ONLY WHILE FOCUSED — this screen can be MOUNTED without being the screen
 * the user is looking at. The sidebar's "Sign in" for a guest resets the
 * stack to [Splash, Login], which puts this screen underneath the Login
 * screen. Without the isFocused guard its timer would run behind Login and
 * then navigate on its own, throwing the user off the Login screen a couple
 * of seconds after they arrived. The guard also means that pressing Back
 * from Login plays the intro properly, because the screen is focused then.
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

    // Start from the beginning every time the screen is shown.
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

    // appear -> hold. Navigation is NOT the last step of the sequence: it
    // fires in the callback at the end of the HOLD, while the crest is still
    // fully on screen. The crest's fade-out (leave) runs AT THE SAME TIME,
    // only to soften the hand-off — the app does not wait for it.
    //
    // The old sequence was appear -> hold -> fade-to-nothing -> navigate, so
    // on a COLD START the crest faded to an empty background, THEN the app
    // navigated, THEN the swipe-up screen faded in from nothing: a visible
    // blank gap on first open. (It looked fine returning to an
    // already-mounted swipe-up screen, which is why it only showed on a
    // fresh launch.) Handing off while the crest is visible removes it.
    const run = Animated.sequence([appear, Animated.delay(INTRO.holdMs)]);

    const goNext = () => {
      // Never move a user who has since left this screen (app backgrounded,
      // focus lost, or the stack reset to show Login).
      if (!moved.current && navigation.isFocused()) {
        moved.current = true;
        navigation.replace('SwipeUp');
      }
    };

    run.start(({finished}) => {
      if (!finished) {
        return;
      }
      leave.start(); // soften the crest, but do not wait for it
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