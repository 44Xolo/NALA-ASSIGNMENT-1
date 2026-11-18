import { getApps, initializeApp, type FirebaseOptions } from '@firebase/app';
import { getAuth } from '@firebase/auth';

const appName = 'nala-menu-manager';

const firebaseConfig: FirebaseOptions = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
};

const requiredConfig = [
  ['VITE_FIREBASE_API_KEY', firebaseConfig.apiKey],
  ['VITE_FIREBASE_AUTH_DOMAIN', firebaseConfig.authDomain],
  ['VITE_FIREBASE_PROJECT_ID', firebaseConfig.projectId],
  ['VITE_FIREBASE_APP_ID', firebaseConfig.appId],
] as const;

export function getFirebaseAuth() {
  const missing = requiredConfig
    .filter(([, value]) => !value?.trim() || value.toLowerCase().includes('your-'))
    .map(([name]) => name);

  if (missing.length > 0) {
    throw new Error(
      `Firebase is not configured. Replace the placeholder values for ${missing.join(', ')} in .env.local, then restart Vite.`,
    );
  }

  const app = getApps().find((candidate) => candidate.name === appName) ?? initializeApp(firebaseConfig, appName);
  return getAuth(app);
}
