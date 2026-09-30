import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {storage} from '../storage/storage';

const AuthContext = createContext(null);

/**
 * Turns a username into a readable name:
 *   "umer.qayyum"  → "Umer Qayyum"
 *   "ali_khan"     → "Ali Khan"
 *   "sara"         → "Sara"
 */
const toDisplayName = username =>
  username
    .split(/[._-]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(' ');

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [rememberedUsername, setRememberedUsername] = useState('');
  const [restoring, setRestoring] = useState(true);

  // ---- Restore any saved session on app start --------------------------
  useEffect(() => {
    (async () => {
      const [session, username] = await Promise.all([
        storage.getSession(),
        storage.getRememberedUsername(),
      ]);
      if (session) {
        setUser(session);
      }
      if (username) {
        setRememberedUsername(username);
      }
      setRestoring(false);
    })();
  }, []);

  /**
   * Sign in with username + password.
   * Today this is a local stub. When the OPMIS API is connected, replace
   * the marked block with the network call and store the returned token.
   */
  const signIn = useCallback(async ({username, password, remember}) => {
    const cleanUsername = username.trim();

    // --- replace with the real API call ---
    await new Promise(resolve => setTimeout(resolve, 900));
    if (!cleanUsername || !password) {
      return {ok: false, message: 'Invalid username or password.'};
    }
    // --------------------------------------

    const session = {
      type: 'user',
      username: cleanUsername.toLowerCase(),
      displayName: toDisplayName(cleanUsername),
      signedInAt: Date.now(),
    };

    setUser(session);
    await storage.saveSession(session);

    if (remember) {
      await storage.saveRememberedUsername(cleanUsername);
      setRememberedUsername(cleanUsername);
    } else {
      await storage.clearRememberedUsername();
      setRememberedUsername('');
    }

    return {ok: true};
  }, []);

  const signInAsGuest = useCallback(async () => {
    const session = {
      type: 'guest',
      username: null,
      displayName: 'Guest',
      signedInAt: Date.now(),
    };
    setUser(session);
    await storage.saveSession(session);
    return {ok: true};
  }, []);

  const signOut = useCallback(async () => {
    setUser(null);
    await storage.clearSession();
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isGuest: user?.type === 'guest',
      rememberedUsername,
      restoring,
      signIn,
      signInAsGuest,
      signOut,
    }),
    [user, rememberedUsername, restoring, signIn, signInAsGuest, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth() must be used inside an <AuthProvider>');
  }
  return ctx;
};