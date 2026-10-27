export type ValidationResult =
  | {valid: true}
  | {valid: false; message: string; field?: 'name' | 'email' | 'password'};

const EMAIL_PATTERN =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateEmail(email: string): ValidationResult {
  const trimmed = email.trim();
  if (!trimmed) {
    return {valid: false, message: 'Email is required.', field: 'email'};
  }
  if (!EMAIL_PATTERN.test(trimmed)) {
    return {
      valid: false,
      message: 'Enter a valid email address.',
      field: 'email',
    };
  }
  return {valid: true};
}

export function validatePassword(password: string): ValidationResult {
  const trimmed = password.trim();
  if (!trimmed) {
    return {valid: false, message: 'Password is required.', field: 'password'};
  }
  if (trimmed.length < 6) {
    return {
      valid: false,
      message: 'Password must be at least 6 characters.',
      field: 'password',
    };
  }
  return {valid: true};
}

export function validateLoginForm(
  email: string,
  password: string,
): ValidationResult {
  const emailResult = validateEmail(email);
  if (!emailResult.valid) {
    return emailResult;
  }
  return validatePassword(password);
}

export function validateSignupForm(
  name: string,
  email: string,
  password: string,
): ValidationResult {
  if (!name.trim()) {
    return {valid: false, message: 'Name is required.', field: 'name'};
  }
  const emailResult = validateEmail(email);
  if (!emailResult.valid) {
    return emailResult;
  }
  return validatePassword(password);
}
