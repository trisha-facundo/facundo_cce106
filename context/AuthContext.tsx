/* eslint-disable @typescript-eslint/no-unused-vars -- Setters and imports are reserved for exam TODOs. */
import { createContext, useEffect, useState, type ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

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
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  // False keeps the unfinished starter usable; no session has been restored yet.
  const [authLoading, setAuthLoading] = useState(false);

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
    // TODO EXAM: Delete the saved token using SecureStore.deleteItemAsync().
    // TODO EXAM: Clear token state and user state.
    // TODO EXAM: Handle storage errors and redirect to /sign-in after logout.
  };

  const restoreSession = async () => {
    // TODO EXAM: Set authLoading while restoring the session.
    // TODO EXAM: Read the saved token with SecureStore.getItemAsync().
    // TODO EXAM: Validate the token via GET /profile with a Bearer token.
    // TODO EXAM: Update token and user state for a valid session.
    // TODO EXAM: Handle 401 Unauthorized / expired sessions and clear invalid credentials.
    // TODO EXAM: Handle errors and stop authLoading in finally.
  };

  useEffect(() => {
    // TODO EXAM: Call restoreSession() on startup.
  }, []);

  // SecureStore is native-only. The web skeleton makes no storage calls.
  // TODO EXAM: Check platform availability before storage calls; test persistence on Android/iOS.
  return (
    <AuthContext.Provider value={{ token, user, authLoading, login, logout, restoreSession }}>
      {children}
    </AuthContext.Provider>
  );
}
