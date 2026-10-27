export type AuthUser = {
  name: string;
  email: string;
};

export type AuthActionResult = {
  success: boolean;
  message?: string;
};
