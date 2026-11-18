import { FirebaseError } from '@firebase/app';

const authErrorMessages: Record<string, string> = {
  'auth/account-exists-with-different-credential':
    'An account already exists with this email. Sign in using its existing method.',
  'auth/captcha-check-failed': 'Phone verification failed. Please try again.',
  'auth/code-expired': 'That verification code has expired. Request a new one.',
  'auth/invalid-phone-number': 'Enter a valid phone number in international format.',
  'auth/invalid-verification-code': 'That verification code is incorrect. Check it and try again.',
  'auth/invalid-api-key': 'Firebase API configuration is invalid. Check your .env.local values.',
  'auth/missing-phone-number': 'Enter a phone number before requesting a verification code.',
  'auth/network-request-failed': 'A network error interrupted sign-in. Check your connection and try again.',
  'auth/operation-not-allowed': 'This sign-in method is not enabled in Firebase Authentication settings.',
  'auth/popup-blocked': 'Your browser blocked the Google sign-in window. Allow pop-ups and try again.',
  'auth/popup-closed-by-user': 'Google sign-in was cancelled.',
  'auth/too-many-requests': 'Too many attempts were made. Wait a little while before trying again.',
  'auth/unauthorized-domain': 'This website is not listed in Firebase Authentication authorized domains.',
};

export function getFirebaseAuthErrorMessage(error: unknown): string {
  if (error instanceof FirebaseError) {
    return authErrorMessages[error.code] ?? 'Sign-in failed. Check your details and Firebase settings, then try again.';
  }

  if (error instanceof Error) return error.message;
  return 'Sign-in failed. Please try again.';
}
