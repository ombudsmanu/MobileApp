import React, {useEffect, useMemo, useRef} from 'react';
import {Animated} from 'react-native';

/** Delay between one item's entrance and the next, in milliseconds. */
export const STAGGER_MS = 250;
/**
 * Items after this position all start together. A long list (29 annual
 * reports) would otherwise make far-down rows wait seconds for their turn,
 * long after anyone could see them start.
 */
export const MAX_STAGGER_INDEX = 12;

/**
 * STAGGER IN — fades and slides its content into place, staggered by
 * position, for lists that cascade in like the module cards.
 *
 *   <StaggerIn index={i} play={ready}>…row…</StaggerIn>
 *
 *   index  the item's position — item n starts n × STAGGER_MS after the first
 *   play   start the entrance; pass useScreenReady() so it waits until the
 *          screen has finished sliding in (otherwise the first rows animate
 *          unseen during the slide)
 *   style  optional layout style for the wrapper
 *
 * Same spring as ModuleTile's entrance, so lists and cards feel alike.
 * There is no styles file: the only styles here are the animated values,
 * which change every frame and cannot live in a StyleSheet.
 */
const StaggerIn = ({index = 0, play = true, style, children}) => {
  const appear = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Back to the start when the screen is left, so returning to it
    // replays the entrance — the same as ModuleTile
    if (!play) {
      appear.setValue(0);
      return;
    }
    Animated.spring(appear, {
      toValue: 1,
      delay: STAGGER_MS * Math.min(index, MAX_STAGGER_INDEX),
      // Matches ModuleTile's entrance, so lists and cards feel alike
      friction: 9,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [appear, index, play]);

  // Built once, outside the JSX: fade in, rise 18px, grow from 96%
  const motion = useMemo(
    () => ({
      opacity: appear,
      transform: [
        {translateY: appear.interpolate({inputRange: [0, 1], outputRange: [18, 0]})},
        {scale: appear.interpolate({inputRange: [0, 1], outputRange: [0.96, 1]})},
      ],
    }),
    [appear],
  );

  return <Animated.View style={[style, motion]}>{children}</Animated.View>;
};

export default StaggerIn;