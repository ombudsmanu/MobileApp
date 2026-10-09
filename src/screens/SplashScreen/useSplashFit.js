import {useMemo, useState} from 'react';
import {FIT} from './SplashScreen.styles';

/**
 * SPLASH FIT — makes the splash fit ANY screen, without scrolling.
 *
 * (The splash cannot scroll: a scroll would fight the swipe-up gesture.)
 *
 * Three heights are measured with onLayout:
 *   viewport — the space available: the screen minus the status bar,
 *              navigation bar and padding
 *   full     — the splash with EVERYTHING shown
 *   compact  — the splash with a smaller crest and no certification text
 *
 * "full" and "compact" are measured on two invisible copies, so both are
 * always known — even after rotating, or after the user changes the system
 * font size while the app is open.
 *
 * Measuring, instead of guessing from the screen size, automatically
 * accounts for everything that changes the height: the phone model,
 * portrait or landscape, the system font size, the font chosen in
 * Appearance, and the taller lines Urdu (Nastaleeq) needs.
 *
 * The first level that fits wins:
 *   1. full     fits → show everything
 *   2. compact  fits → show compact
 *   3. neither       → show compact, shrunk evenly (`scale`) until it fits
 *
 * Returns { ready, compact, scale, viewportHeight, handlers }
 *   ready     all three heights are known. The splash stays invisible until
 *             then, so nobody sees a wrong first frame.
 *   handlers  onViewportLayout / onFullLayout / onCompactLayout
 */
const heightOf = e => Math.round(e.nativeEvent.layout.height);

const useSplashFit = () => {
  const [viewportHeight, setViewportHeight] = useState(0);
  const [fullHeight, setFullHeight] = useState(0);
  const [compactHeight, setCompactHeight] = useState(0);

  // Created once. Setting a height to the same number again does not
  // re-render, so ordinary layout passes cost nothing.
  const handlers = useMemo(
    () => ({
      onViewportLayout: e => setViewportHeight(heightOf(e)),
      onFullLayout: e => setFullHeight(heightOf(e)),
      onCompactLayout: e => setCompactHeight(heightOf(e)),
    }),
    [],
  );

  return useMemo(() => {
    const ready = viewportHeight > 0 && fullHeight > 0 && compactHeight > 0;
    const limit = viewportHeight + FIT.tolerance;

    const compact = ready && fullHeight > limit;
    const scale =
      compact && compactHeight > limit
        ? Math.max(FIT.minScale, viewportHeight / compactHeight)
        : 1;

    return {ready, compact, scale, viewportHeight, handlers};
  }, [viewportHeight, fullHeight, compactHeight, handlers]);
};

export default useSplashFit;