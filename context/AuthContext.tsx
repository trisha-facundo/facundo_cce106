import { createContext, useEffect, useState, type ReactNode } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { ApiError, getProfile } from '@/lib/api';

export type User = {
  id?: string | number;
  name?: string;
  email?: string;
  role?: string;
};

type AuthContextValue = {
  token: string | null;
  user: User | null;
  authLoading: boolean;
  login: (accessToken: string, userData: User) => Promise<void>;
  logout: () => Promise<void>;
  restoreSession: () => Promise<void>;
};

const TOKEN_KEY = 'accessToken';

export const AuthContext =createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  // Starts true so the app waits for restoreSession() instead of flashing the wrong screen.
  const [authLoading, setAuthLoading] = useState(true);

  const login = async (accessToken: string, userData: User) => {
    // Only the token is saved, never the password.
    // SecureStore works on Android/iOS; on web it is unavailable, so the session stays in memory only.
    try {
      if (await SecureStore.isAvailableAsync()) {
        await SecureStore.setItemAsync(TOKEN_KEY, accessToken);
      }
    } catch {
      throw new Error('Could not save your session securely. Please try again.');
    }

    // Updating these two states is what makes the app treat the user as logged in.
    setToken(accessToken);
    setUser(userData);
  };

  const logout = async () => {
    try {
      // Delete the saved token so the session is not restored the next time the app starts.
      if (await SecureStore.isAvailableAsync()) {
        await SecureStore.deleteItemAsync(TOKEN_KEY);
      }
    } catch (error) {
      console.warn('Could not delete the saved token:', error);
    } finally {
      // Always log out in memory, even if the storage call failed.
      setToken(null);
      setUser(null);
      router.replace('/sign-in');
    }
  };

  const restoreSession = async () => {
    // Keep the app on its loading screen while we check for a saved session.
    setAuthLoading(true);

    try {
      // On web SecureStore is unavailable, so there is nothing to restore.
      if (!(await SecureStore.isAvailableAsync())) return;

      const savedToken = await SecureStore.getItemAsync(TOKEN_KEY);
      if (!savedToken) return;

      // Ask the API if the saved token is still valid (GET /profile with the Bearer token).
      const profile = await getProfile(savedToken);
      setToken(savedToken);
      setUser(profile);
    } catch (error) {
      if (error instanceof ApiError && error.status === 401) {
        // The token expired or the server forgot it: remove it and show the login screen.
        await SecureStore.deleteItemAsync(TOKEN_KEY).catch(() => {});
      }
      // Any other error (for example the API is offline): stay logged out, keep the token for next time.
    } finally {
      setAuthLoading(false);
    }
  };

  // Restore a saved session once when the app starts.
  useEffect(() => {
    restoreSession();

  }, []);

  return (
    <AuthContext.Provider value={{ token, user, authLoading, login, logout, restoreSession }}>
      {children}
    </AuthContext.Provider>
  );
}
