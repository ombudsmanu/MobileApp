import React, {createContext, useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {strings} from '../i18n/strings';
import {storage} from '../storage/storage';

const LanguageContext = createContext(null);

/**
 * Holds the current language, persists it, and provides t(key).
 *   t('modules')                   → 'MODULES' or 'ماڈیولز'
 *   t('module.dms', 'Fallback')    → uses the fallback if the key is missing
 */
export const LanguageProvider = ({children}) => {
  const [lang, setLangState] = useState('en');

  useEffect(() => {
    (async () => {
      const saved = await storage.getLanguage();
      if (saved === 'en' || saved === 'ur') {
        setLangState(saved);
      }
    })();
  }, []);

  const setLang = useCallback(next => {
    setLangState(next);
    storage.saveLanguage(next);
  }, []);

  const t = useCallback(
    (key, fallback) => strings[lang]?.[key] ?? strings.en[key] ?? fallback ?? key,
    [lang],
  );

  const value = useMemo(
    () => ({lang, setLang, t, isRTL: lang === 'ur'}),
    [lang, setLang, t],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage() must be used inside a <LanguageProvider>');
  }
  return ctx;
};