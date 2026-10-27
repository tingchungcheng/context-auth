import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthUser} from '../types/auth';

const SESSION_KEY = '@context-auth/session';
const USERS_KEY = '@context-auth/users';
const LOG_PREFIX = '[context-auth/storage]';

export type PersistedUser = {
  name: string;
  email: string;
  password: string;
};

function devLog(message: string, payload?: unknown) {
  if (__DEV__) {
    if (payload !== undefined) {
      console.log(LOG_PREFIX, message, payload);
    } else {
      console.log(LOG_PREFIX, message);
    }
  }
}

function usersForLog(users: PersistedUser[]) {
  return users.map(({name, email}) => ({name, email}));
}

export async function loadSession(): Promise<AuthUser | null> {
  const raw = await AsyncStorage.getItem(SESSION_KEY);
  if (!raw) {
    devLog('loadSession → empty', {key: SESSION_KEY});
    return null;
  }
  try {
    const parsed = JSON.parse(raw) as AuthUser;
    if (parsed?.email && parsed?.name) {
      const session = {name: parsed.name, email: parsed.email};
      devLog('loadSession → hit', session);
      return session;
    }
  } catch {
    await AsyncStorage.removeItem(SESSION_KEY);
    devLog('loadSession → invalid JSON, key removed', {key: SESSION_KEY});
  }
  return null;
}

export async function saveSession(user: AuthUser): Promise<void> {
  await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(user));
  devLog('saveSession', user);
}

export async function clearSession(): Promise<void> {
  await AsyncStorage.removeItem(SESSION_KEY);
  devLog('clearSession', {key: SESSION_KEY});
}

export async function loadUserRegistry(): Promise<PersistedUser[]> {
  const raw = await AsyncStorage.getItem(USERS_KEY);
  if (!raw) {
    devLog('loadUserRegistry → empty', {key: USERS_KEY});
    return [];
  }
  try {
    const parsed = JSON.parse(raw) as PersistedUser[];
    const users = Array.isArray(parsed) ? parsed : [];
    devLog('loadUserRegistry → hit', {
      count: users.length,
      users: usersForLog(users),
    });
    return users;
  } catch {
    await AsyncStorage.removeItem(USERS_KEY);
    devLog('loadUserRegistry → invalid JSON, key removed', {key: USERS_KEY});
    return [];
  }
}

export async function saveUserRegistry(users: PersistedUser[]): Promise<void> {
  await AsyncStorage.setItem(USERS_KEY, JSON.stringify(users));
  devLog('saveUserRegistry', {
    count: users.length,
    users: usersForLog(users),
  });
}
