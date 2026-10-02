import {useEffect, useRef} from 'react';
import {AccessibilityInfo, Animated, Easing} from 'react-native';

/**
 * PULSE — a single zoom-in-and-settle on a tile's badge as the card arrives.
 *
 *   const scale = usePulse(index, play);
 *   <Animated.View style={{transform: [{scale}]}}>…badge…</Animated.View>
 *
 * Returns an Animated value that eases 1 → PULSE_MAX → 1 once per arrival
 * and then stays at 1. It runs on the card's entrance, staggered so the
 * badges pop one after another down the grid rather than together, and
 * replays whenever the screen is returned to.
 *
 * It is skipped when the phone's "Reduce motion" setting is on (constant or
 * sudden movement is a real accessibility problem, not only a taste
 * question), and when PULSE_ENABLED is false — one switch to turn the
 * effect off app-wide.
 *
 * `play` holds the animation until the screen has finished sliding in, the
 * same signal the card's own entrance uses; otherwise the first row would
 * pop unseen during the slide.
 */
export const PULSE_ENABLED = true;
export const PULSE_MAX = 1.12; // a single pop can be bigger than a repeating one
export const PULSE_MS = 420; // half the pop, so ~0.84s in and out
export const PULSE_STAGGER_MS = 90; // matches the card entrance stagger

export const usePulse = (index = 0, play = true) => {
    const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Plays once each time `play` turns true — so it replays when the
    // screen is returned to, but never twice on one visit
    if (!play || !PULSE_ENABLED) {
      // Back to normal size, so the next arrival has something to animate
      // FROM. Without this the badge is already at 1 and the pop is
      // invisible on every visit after the first.
      scale.setValue(1);
      return undefined;
    }

    let animation;
    let cancelled = false;

    AccessibilityInfo.isReduceMotionEnabled()
      .catch(() => false)
      .then(reduceMotion => {
        if (cancelled || reduceMotion) {
          return;
        }
        // Start from normal size every time, whatever state the value
        // was left in by a previous visit or an interrupted animation
        scale.setValue(1);
        animation = Animated.sequence([
          Animated.delay(PULSE_STAGGER_MS * index),
          Animated.timing(scale, {
            toValue: PULSE_MAX,
            duration: PULSE_MS,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          // Spring back, so it settles with a little life instead of stopping dead
          Animated.spring(scale, {
            toValue: 1,
            friction: 5,
            tension: 90,
            useNativeDriver: true,
          }),
        ]);
        animation.start();
      });

    return () => {
      cancelled = true;
      animation?.stop();
      scale.setValue(1); // leave the badge at its normal size
    };
  }, [scale, index, play]);

  return scale;
};