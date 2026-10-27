import {loadUserRegistry, saveUserRegistry} from './authStorage';

type StoredUser = {
  name: string;
  email: string;
  password: string;
};

const users = new Map<string, StoredUser>();

async function persistUsers(): Promise<void> {
  const list = Array.from(users.values());
  await saveUserRegistry(list);
}

export async function hydrateUserRegistry(): Promise<void> {
  const list = await loadUserRegistry();
  users.clear();
  for (const entry of list) {
    users.set(entry.email.toLowerCase(), {
      name: entry.name,
      email: entry.email.toLowerCase(),
      password: entry.password,
    });
  }
}

export function registerUser(
  name: string,
  email: string,
  password: string,
): void {
  users.set(email.toLowerCase(), {
    name: name.trim(),
    email: email.toLowerCase(),
    password,
  });
  persistUsers().catch(() => {});
}

export function findUser(email: string): StoredUser | undefined {
  return users.get(email.toLowerCase());
}

export function verifyCredentials(
  email: string,
  password: string,
): StoredUser | undefined {
  const user = findUser(email);
  if (!user || user.password !== password) {
    return undefined;
  }
  return user;
}

export function emailAlreadyRegistered(email: string): boolean {
  return users.has(email.toLowerCase());
}
