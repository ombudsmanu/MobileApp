import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Thin wrapper over AsyncStorage — THE ONLY FILE THAT TOUCHES STORAGE.
 *
 * SECURITY NOTE: AsyncStorage is UNENCRYPTED. We store only the username,
 * a session marker and display preferences — never a password. When the
 * real OPMIS API is connected, store the returned TOKEN here. For
 * production, swap this file for react-native-keychain (Android Keystore);
 * nothing else in the app needs to change.
 */

const KEYS = {
  session: '@opmis/session',
  rememberedUsername: '@opmis/rememberedUsername',
  themeOverrides: '@opmis/themeOverrides',
  backgroundImage: '@opmis/backgroundImage',
  language: '@opmis/language',
  fonts: '@opmis/fonts',
};

const readJson = async key => {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const writeJson = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

const readText = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeText = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
};

const remove = async key => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
};

export const storage = {
  // ---- Session ----
  getSession: () => readJson(KEYS.session),
  saveSession: session => writeJson(KEYS.session, session),
  clearSession: () => remove(KEYS.session),

  // ---- Remember me ----
  getRememberedUsername: () => readText(KEYS.rememberedUsername),
  saveRememberedUsername: username =>
    writeText(KEYS.rememberedUsername, username),
  clearRememberedUsername: () => remove(KEYS.rememberedUsername),

  // ---- Appearance ----
  getThemeOverrides: () => readJson(KEYS.themeOverrides),
  saveThemeOverrides: overrides => writeJson(KEYS.themeOverrides, overrides),

  getBackgroundImage: () => readJson(KEYS.backgroundImage),
  saveBackgroundImage: bg => writeJson(KEYS.backgroundImage, bg),
  clearBackgroundImage: () => remove(KEYS.backgroundImage),
  // ---- Language ----
  getLanguage: () => readText(KEYS.language),
  saveLanguage: lang => writeText(KEYS.language, lang),

  // ---- Fonts ----
  getFonts: () => readJson(KEYS.fonts),
  saveFonts: fonts => writeJson(KEYS.fonts, fonts),
};

export default storage;
