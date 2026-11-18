export function normalizePhoneNumber(value: string): string | null {
  const normalized = value.replace(/[\s()-]/g, '');
  return /^\+[1-9]\d{7,14}$/.test(normalized) ? normalized : null;
}

export function normalizeVerificationCode(value: string): string | null {
  const normalized = value.trim();
  return /^\d{6}$/.test(normalized) ? normalized : null;
}
