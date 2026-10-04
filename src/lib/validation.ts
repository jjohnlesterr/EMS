export const EMPLOYEE_ID_PATTERN = /^EMP-\d{4}-\d{5}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface PasswordRule {
  label: string;
  test: (value: string) => boolean;
}

/** Rules shown under "New Password" on the profile Change Password form. */
export const PASSWORD_RULES: PasswordRule[] = [
  { label: "At least 8 Characters", test: (v) => v.length >= 8 },
  { label: "Include uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "Include number", test: (v) => /\d/.test(v) },
  { label: "Include special character", test: (v) => /[^A-Za-z0-9]/.test(v) },
];

export function passwordError(value: string): string | undefined {
  if (!value) return "Please enter a password.";
  const failed = PASSWORD_RULES.find((r) => !r.test(value));
  return failed ? `Password must meet all requirements: ${failed.label.toLowerCase()}.` : undefined;
}
