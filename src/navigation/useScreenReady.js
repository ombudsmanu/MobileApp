import {useCallback, useEffect, useRef, useState} from 'react';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

/**
 * SCREEN READY — true once this screen has finished arriving, EVERY time.
 *
 *   const ready = useScreenReady();
 *   <ModuleTile play={ready} … />
 *
 * Entrance animations that start while the screen is still sliding in are
 * mostly over before anyone can see them: the first row of cards finished
 * during the slide, so the cascade seemed to begin at row two. Waiting for
 * `ready` makes it start from the very first card, once the screen is still.
 *
 * It resets to false whenever the screen loses focus, so coming back from
 * another screen replays the entrance instead of showing a static grid.
 * A screen the user returns to often (the Dashboard) therefore animates
 * each time, not only after login.
 *
 * React Navigation reports the end of the slide with 'transitionEnd'. If
 * that event never arrives (the first screen in the app, returning to a
 * screen that never slides, or animations turned off on the phone), the
 * fallback timer marks the screen ready anyway, so the content always
 * appears.
 */
export const useScreenReady = (fallbackMs = 600) => {
  const navigation = useNavigation();
  const [ready, setReady] = useState(false);
  const doneRef = useRef(false);

  // Arm on focus, disarm on blur — so the next return replays it
  useFocusEffect(
    useCallback(() => {
      doneRef.current = false;
      setReady(false);
      return () => {
        doneRef.current = false;
        setReady(false);
      };
    }, []),
  );

  useEffect(() => {
    const finish = () => {
      if (!doneRef.current) {
        doneRef.current = true;
        setReady(true);
      }
    };

    // Our own slide finished (not the slide-out when leaving)
    const unsubscribe = navigation.addListener('transitionEnd', e => {
      if (!e?.data?.closing) {
        finish();
      }
    });
    const timer = setTimeout(finish, fallbackMs);

    return () => {
      unsubscribe();
      clearTimeout(timer);
    };
  }, [navigation, fallbackMs, ready]);

  return ready;
};