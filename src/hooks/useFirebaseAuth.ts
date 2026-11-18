import { onAuthStateChanged, type Auth, type User } from '@firebase/auth';
import { useEffect, useState } from 'react';
import { getFirebaseAuth } from '../lib/firebase';
import { getFirebaseAuthErrorMessage } from '../utils/firebaseAuthErrors';

interface FirebaseAuthState {
  auth: Auth | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

export function useFirebaseAuth(): FirebaseAuthState {
  const [state, setState] = useState<FirebaseAuthState>({
    auth: null,
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    try {
      const auth = getFirebaseAuth();
      unsubscribe = onAuthStateChanged(
        auth,
        (user) => setState({ auth, user, loading: false, error: null }),
        (error) => {
          console.error('Unable to check Firebase sign-in state.', error);
          setState((current) => ({ ...current, loading: false, error: getFirebaseAuthErrorMessage(error) }));
        },
      );
    } catch (error) {
      setState({
        auth: null,
        user: null,
        loading: false,
        error: getFirebaseAuthErrorMessage(error),
      });
    }

    return () => unsubscribe?.();
  }, []);

  return state;
}
