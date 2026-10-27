import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  emailAlreadyRegistered,
  registerUser,
  verifyCredentials,
} from '../services/authStore';
import {AuthActionResult, AuthUser} from '../types/auth';
import {validateLoginForm, validateSignupForm} from '../utils/validation';

type AuthContextValue = {
  user: AuthUser | null;
  login: (email: string, password: string) => AuthActionResult;
  signup: (name: string, email: string, password: string) => AuthActionResult;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({children}: {children: React.ReactNode}) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = useCallback((email: string, password: string): AuthActionResult => {
    const validation = validateLoginForm(email, password);
    if (!validation.valid) {
      return {success: false, message: validation.message, field: validation.field};
    }

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    const match = verifyCredentials(trimmedEmail, trimmedPassword);
    if (!match) {
      return {
        success: false,
        message: 'Incorrect email or password.',
      };
    }

    setUser({name: match.name, email: match.email});
    return {success: true};
  }, []);

  const signup = useCallback(
    (name: string, email: string, password: string): AuthActionResult => {
      const validation = validateSignupForm(name, email, password);
      if (!validation.valid) {
        return {success: false, message: validation.message, field: validation.field};
      }

      const trimmedName = name.trim();
      const trimmedEmail = email.trim();
      const trimmedPassword = password.trim();

      if (emailAlreadyRegistered(trimmedEmail)) {
        return {
          success: false,
          message: 'An account with this email already exists.',
          field: 'email',
        };
      }

      registerUser(trimmedName, trimmedEmail, trimmedPassword);
      return {success: true};
    },
    [],
  );

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({user, login, signup, logout}),
    [user, login, signup, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
