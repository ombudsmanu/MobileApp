import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {buildTheme} from '../theme/buildTheme';
import {normalizeBackground} from '../theme/backgrounds';
import {storage} from '../storage/storage';

const ThemeContext = createContext(null);

/**
 * Owns ALL appearance state and the rules for changing it.
 * Screens call one function per action — they never have to know that
 * a solid colour must clear the image, or that everything must persist.
 */
export const ThemeProvider = ({children}) => {
  const [overrides, setOverrides] = useState({});
  const [backgroundImage, setBackgroundImage] = useState(null);

  // ---- Restore saved choices on startup ---------------------------------
  useEffect(() => {
    (async () => {
      const [savedOverrides, savedBg] = await Promise.all([
        storage.getThemeOverrides(),
        storage.getBackgroundImage(),
      ]);
      if (savedOverrides) {
        setOverrides(savedOverrides);
      }
      const bg = normalizeBackground(savedBg);
      if (bg) {
        setBackgroundImage(bg);
      }
    })();
  }, []);

  const theme = useMemo(
    () => buildTheme(overrides, backgroundImage),
    [overrides, backgroundImage],
  );

  // ---- Text colours ------------------------------------------------------

  /** Set one override; pass undefined/null to remove it. */
  const setColorFor = useCallback((target, color) => {
    setOverrides(prev => {
      const next = {...prev};
      if (color === undefined || color === null) {
        delete next[target];
      } else {
        next[target] = color;
      }
      storage.saveThemeOverrides(next);
      return next;
    });
  }, []);

  const resetTextColors = useCallback(() => {
    setOverrides(prev => {
      const next = {...prev};
      delete next.title;
      delete next.heading;
      delete next.text;
      storage.saveThemeOverrides(next);
      return next;
    });
  }, []);

  // ---- Background --------------------------------------------------------

  /** Image: {type:'preset', key} or {type:'uri', uri}. Clears any solid colour. */
  const setBackgroundImg = useCallback(
    value => {
      const bg = normalizeBackground(value);
      setBackgroundImage(bg);
      if (bg) {
        storage.saveBackgroundImage(bg);
        setColorFor('background', undefined);
      } else {
        storage.clearBackgroundImage();
      }
    },
    [setColorFor],
  );

  /** Solid colour. Clears any image, because an image would outrank it. */
  const setSolidBackground = useCallback(
    color => {
      setBackgroundImage(null);
      storage.clearBackgroundImage();
      setColorFor('background', color);
    },
    [setColorFor],
  );

  /** Back to the official gradient. Keeps text colours. */
  const resetBackground = useCallback(() => {
    setBackgroundImage(null);
    storage.clearBackgroundImage();
    setColorFor('background', undefined);
  }, [setColorFor]);

  // ---- Everything --------------------------------------------------------

  const resetColors = useCallback(() => {
    setOverrides({});
    setBackgroundImage(null);
    storage.saveThemeOverrides({});
    storage.clearBackgroundImage();
  }, []);

  const value = useMemo(
    () => ({
      theme,
      overrides,
      backgroundImage,
      setColorFor,
      resetTextColors,
      setBackgroundImg,
      setSolidBackground,
      resetBackground,
      resetColors,
    }),
    [
      theme,
      overrides,
      backgroundImage,
      setColorFor,
      resetTextColors,
      setBackgroundImg,
      setSolidBackground,
      resetBackground,
      resetColors,
    ],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme() must be used inside a <ThemeProvider>');
  }
  return ctx;
};