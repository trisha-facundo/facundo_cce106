import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';

import {
  AuthError,
  fetchProtectedProfile,
  forceExpireToken,
  login as apiLogin,
  type StudentProfile,
} from '@/lib/mock-auth-api';
import { deleteSecureItem, getSecureItem, setSecureItem } from '@/lib/storage';

const TOKEN_KEY = 'studentPortal.authToken';

interface AuthContextValue {
  user: StudentProfile | null;
  isLoading: boolean;
  isSubmitting: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;

  refreshProfile: () => Promise<void>;

  simulateExpiredSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<StudentProfile | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      const storedToken = await getSecureItem(TOKEN_KEY);
      if (!storedToken) {
        if (!cancelled) setIsLoading(false);
        return;
      }

      try {
        const profile = await fetchProtectedProfile(storedToken);
        if (cancelled) return;
        setToken(storedToken);
        setUser(profile);
      } catch {
        await deleteSecureItem(TOKEN_KEY);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    restoreSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const login = async (email: string, password: string) => {
    setIsSubmitting(true);
    try {
      const { token: newToken, user: profile } = await apiLogin(email, password);
      await setSecureItem(TOKEN_KEY, newToken);
      setToken(newToken);
      setUser(profile);
    } finally {
      setIsSubmitting(false);
    }
  };

  const logout = async () => {
    await deleteSecureItem(TOKEN_KEY);
    setToken(null);
    setUser(null);
  };

  const refreshProfile = async () => {
    if (!token) return;
    try {
      const profile = await fetchProtectedProfile(token);
      setUser(profile);
    } catch (error) {
      if (error instanceof AuthError && error.status === 401) {
        await logout();
      }
      throw error;
    }
  };

  const simulateExpiredSession = async () => {
    if (!token) return;
    const expiredToken = forceExpireToken(token);
    await setSecureItem(TOKEN_KEY, expiredToken);
    setToken(expiredToken);
    try {
      await fetchProtectedProfile(expiredToken);
    } catch (error) {
      if (error instanceof AuthError && error.status === 401) {
        await logout();
      }
    }
  };

  const value: AuthContextValue = {
    user,
    isLoading,
    isSubmitting,
    login,
    logout,
    refreshProfile,
    simulateExpiredSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
