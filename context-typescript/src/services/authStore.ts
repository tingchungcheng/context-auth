type StoredUser = {
  name: string;
  email: string;
  password: string;
};

const users = new Map<string, StoredUser>();

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
