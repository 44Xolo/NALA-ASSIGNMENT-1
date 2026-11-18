import { describe, expect, it } from 'vitest';
import { normalizePhoneNumber, normalizeVerificationCode } from './authValidation';

describe('normalizePhoneNumber', () => {
  it('accepts international numbers and removes formatting characters', () => {
    expect(normalizePhoneNumber('+27 (82) 123-4567')).toBe('+27821234567');
  });

  it('rejects numbers without a valid international prefix', () => {
    expect(normalizePhoneNumber('082 123 4567')).toBeNull();
    expect(normalizePhoneNumber('+01234567')).toBeNull();
    expect(normalizePhoneNumber('+123')).toBeNull();
  });
});

describe('normalizeVerificationCode', () => {
  it('trims and accepts six-digit SMS codes', () => {
    expect(normalizeVerificationCode(' 012345 ')).toBe('012345');
  });

  it('rejects codes that are not six digits', () => {
    expect(normalizeVerificationCode('12345')).toBeNull();
    expect(normalizeVerificationCode('12a456')).toBeNull();
  });
});
