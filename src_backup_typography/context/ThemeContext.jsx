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

const TEXT_KEYS = ['title', 'heading', 'subheading', 'text'];

/** Returns a copy with one key set — or removed when value is null/undefined. */
const withOverride = (source, key, value) => {
  const next = {...source};
  if (value === undefined || value === null) {
    delete next[key];
  } else {
    next[key] = value;
  }
  return next;
};

/** Copies the text keys from `from` onto `onto`, leaving other keys alone. */
const withTextFrom = (onto, from) =>
  TEXT_KEYS.reduce((o, k) => withOverride(o, k, from[k]), onto);

const sameText = (a, b) => TEXT_KEYS.every(k => (a[k] ?? null) === (b[k] ?? null));

const sameBackground = (a, b) => {
  if (!a && !b) {
    return true;
  }
  if (!a || !b) {
    return false;
  }
  return a.type === b.type && a.key === b.key && a.uri === b.uri;
};

/**
 * COMMITTED state → what the whole app renders with (persisted).
 * DRAFT state     → what the Appearance screen is editing.
 *
 * Text and background are separate parts of the draft, each with its
 * own apply and discard, so one can be applied without the other.
 */
export const ThemeProvider = ({children}) => {
  const [overrides, setOverrides] = useState({});
  const [backgroundImage, setBackgroundImage] = useState(null);
  const [draft, setDraft] = useState(null);

  // ---- Restore saved appearance on startup ------------------------------
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

  // ---- Committed -------------------------------------------------------
  const theme = useMemo(
    () => buildTheme(overrides, backgroundImage),
    [overrides, backgroundImage],
  );
  const committed = useMemo(
    () => ({overrides, backgroundImage}),
    [overrides, backgroundImage],
  );

  // ---- Draft -----------------------------------------------------------
  const editing = draft ?? committed;
  const draftTheme = useMemo(
    () => (draft ? buildTheme(draft.overrides, draft.backgroundImage) : theme),
    [draft, theme],
  );

  const isTextDirty = !!draft && !sameText(draft.overrides, overrides);
  const isBgDirty =
    !!draft &&
    ((draft.overrides.background ?? null) !== (overrides.background ?? null) ||
      !sameBackground(draft.backgroundImage, backgroundImage));
  const isDraftDirty = isTextDirty || isBgDirty;

  const startDraft = useCallback(() => setDraft(committed), [committed]);
  const endDraft = useCallback(() => setDraft(null), []);

  // ---- Text: apply / discard -------------------------------------------
  const applyText = useCallback(() => {
    if (!draft) {
      return;
    }
    setOverrides(prev => {
      const next = withTextFrom(prev, draft.overrides);
      storage.saveThemeOverrides(next);
      return next;
    });
  }, [draft]);

  const discardText = useCallback(() => {
    setDraft(d => (d ? {...d, overrides: withTextFrom(d.overrides, overrides)} : d));
  }, [overrides]);

  // ---- Background: apply / discard -------------------------------------
  const applyBackground = useCallback(() => {
    if (!draft) {
      return;
    }
    const image = normalizeBackground(draft.backgroundImage);
    const bgColor = image ? null : draft.overrides.background ?? null;

    setOverrides(prev => {
      const next = withOverride(prev, 'background', bgColor);
      storage.saveThemeOverrides(next);
      return next;
    });

    setBackgroundImage(image);
    if (image) {
      storage.saveBackgroundImage(image);
    } else {
      storage.clearBackgroundImage();
    }
  }, [draft]);

  const discardBackground = useCallback(() => {
    setDraft(d =>
      d
        ? {
            overrides: withOverride(d.overrides, 'background', overrides.background ?? null),
            backgroundImage,
          }
        : d,
    );
  }, [overrides, backgroundImage]);

  // ---- Draft edits (nothing reaches the app until applied) -------------
  const draftActions = useMemo(() => {
    const update = fn => setDraft(d => (d ? fn(d) : d));
    return {
      setColor: (target, color) =>
        update(d => ({...d, overrides: withOverride(d.overrides, target, color)})),
      resetText: () =>
        update(d => ({
          ...d,
          overrides: TEXT_KEYS.reduce((o, k) => withOverride(o, k, null), d.overrides),
        })),
      setSolid: color =>
        update(d => ({
          overrides: withOverride(d.overrides, 'background', color),
          backgroundImage: null,
        })),
      setImage: bg =>
        update(d => ({
          overrides: withOverride(d.overrides, 'background', null),
          backgroundImage: normalizeBackground(bg),
        })),
      resetBackground: () =>
        update(d => ({
          overrides: withOverride(d.overrides, 'background', null),
          backgroundImage: null,
        })),
    };
  }, []);

  // ---- Immediate actions -----------------------------------------------

  /** Applies a whole recommended text set at once (from the suggestion dialog). */
  const applyTextColors = useCallback(map => {
    const apply = source =>
      TEXT_KEYS.reduce((o, k) => withOverride(o, k, map[k] ?? null), source);
    setOverrides(prev => {
      const next = apply(prev);
      storage.saveThemeOverrides(next);
      return next;
    });
    setDraft(d => (d ? {...d, overrides: apply(d.overrides)} : d));
  }, []);

  const resetEverything = useCallback(() => {
    setOverrides({});
    storage.saveThemeOverrides({});
    setBackgroundImage(null);
    storage.clearBackgroundImage();
    setDraft(d => (d ? {overrides: {}, backgroundImage: null} : d));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      draft: editing,
      draftTheme,
      isTextDirty,
      isBgDirty,
      isDraftDirty,
      startDraft,
      endDraft,
      applyText,
      discardText,
      applyBackground,
      discardBackground,
      applyTextColors,
      draftActions,
      resetEverything,
    }),
    [
      theme,
      editing,
      draftTheme,
      isTextDirty,
      isBgDirty,
      isDraftDirty,
      startDraft,
      endDraft,
      applyText,
      discardText,
      applyBackground,
      discardBackground,
      applyTextColors,
      draftActions,
      resetEverything,
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