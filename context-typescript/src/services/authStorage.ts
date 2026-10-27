import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthUser} from '../types/auth';

const SESSION_KEY = '@context-auth/session';
const USERS_KEY = '@context-auth/users';

export type PersistedUser = {
  name: string;
  email: string;
  password: string;
};

export async function loadSession(): Promise<AuthUser | null> {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as AuthUser;
    if (parsed?.email && parsed?.name) {
      return {name: parsed.name, email: parsed.email};
    }
  } catch {
    await AsyncStorage.removeItem(SESSION_KEY);
  }
  return null;
}

export async function saveSession(user: AuthUser): Promise<void> {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
}

export async function loadUserRegistry(): Promise<PersistedUser[]> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  if (!raw) {
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as PersistedUser[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    await AsyncStorage.removeItem(USERS_KEY);
    return [];
  }
}

export async function saveUserRegistry(users: PersistedUser[]): Promise<void> {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
}
