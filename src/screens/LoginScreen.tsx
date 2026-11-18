import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Phone } from 'lucide-react';
import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
  type Auth,
  type ConfirmationResult,
} from '@firebase/auth';
import { getFirebaseAuthErrorMessage } from '../utils/firebaseAuthErrors';
import { normalizePhoneNumber, normalizeVerificationCode } from '../utils/authValidation';

interface Props {
  auth: Auth | null;
  authError: string | null;
}

export default function LoginScreen({ auth, authError }: Props) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [confirmation, setConfirmation] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState('');
  const [pending, setPending] = useState<'google' | 'phone' | 'code' | null>(null);
  const recaptchaContainer = useRef<HTMLDivElement>(null);
  const recaptchaVerifier = useRef<RecaptchaVerifier | null>(null);

  useEffect(
    () => () => {
      recaptchaVerifier.current?.clear();
    },
    [],
  );

  const clearRecaptcha = () => {
    recaptchaVerifier.current?.clear();
    recaptchaVerifier.current = null;
  };

  const signInWithGoogle = async () => {
    if (!auth) return;

    setPending('google');
    setError('');
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: 'select_account' });
      await signInWithPopup(auth, provider);
    } catch (signInError) {
      setError(getFirebaseAuthErrorMessage(signInError));
    } finally {
      setPending(null);
    }
  };

  const requestPhoneCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!auth) return;

    const normalizedPhone = normalizePhoneNumber(phoneNumber);
    if (!normalizedPhone) {
      setError('Enter a valid phone number with its country code, such as +27123456789.');
      return;
    }

    if (!recaptchaContainer.current) {
      setError('Phone verification could not start. Refresh the page and try again.');
      return;
    }

    setPending('phone');
    setError('');
    try {
      const verifier = new RecaptchaVerifier(auth, recaptchaContainer.current, { size: 'invisible' });
      recaptchaVerifier.current = verifier;
      const result = await signInWithPhoneNumber(auth, normalizedPhone, verifier);
      setPhoneNumber(normalizedPhone);
      setConfirmation(result);
    } catch (sendError) {
      setError(getFirebaseAuthErrorMessage(sendError));
      clearRecaptcha();
    } finally {
      setPending(null);
    }
  };

  const verifyPhoneCode = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!confirmation) return;

    const code = normalizeVerificationCode(verificationCode);
    if (!code) {
      setError('Enter the six-digit code sent to your phone.');
      return;
    }

    setPending('code');
    setError('');
    try {
      await confirmation.confirm(code);
    } catch (verifyError) {
      setError(getFirebaseAuthErrorMessage(verifyError));
    } finally {
      setPending(null);
    }
  };

  const changePhoneNumber = () => {
    clearRecaptcha();
    setConfirmation(null);
    setVerificationCode('');
    setError('');
  };

  return (
    <div
      className="flex min-h-screen flex-col justify-center bg-cover bg-center px-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(12, 12, 12, 0.72), rgba(12, 12, 12, 0.88)), url('/images/restaurant-interior.jpg')",
      }}
    >
      <div className="mx-auto w-full max-w-sm">
        <h1 className="text-center font-display text-5xl tracking-widest text-nala-gold">NALA</h1>
        <p className="mt-2 text-center text-white/60">Chef&apos;s Menu Manager</p>
        <p className="mt-8 text-center text-sm text-white/80">Sign in to manage your menu</p>

        {authError && (
          <p role="alert" className="mt-4 rounded-xl bg-black/60 p-3 text-sm text-red-300">
            {authError}
          </p>
        )}
        {error && (
          <p role="alert" className="mt-4 rounded-xl bg-black/60 p-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={() => void signInWithGoogle()}
          disabled={!auth || pending !== null}
          className="mt-6 flex h-12 w-full items-center justify-center gap-3 rounded-xl bg-white font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
        >
          <span aria-hidden="true" className="font-bold text-lg text-blue-600">G</span>
          {pending === 'google' ? 'Connecting to Google…' : 'Continue with Google'}
        </button>

        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-widest text-white/50">
          <span className="h-px flex-1 bg-white/20" />
          <span>or use your phone</span>
          <span className="h-px flex-1 bg-white/20" />
        </div>

        {confirmation ? (
          <form onSubmit={verifyPhoneCode} noValidate className="space-y-4">
            <p className="text-sm text-white/70">Enter the verification code sent to {phoneNumber}.</p>
            <div>
              <label htmlFor="verification-code" className="mb-1 block text-sm text-white/80">
                SMS verification code
              </label>
              <input
                id="verification-code"
                name="one-time-code"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                value={verificationCode}
                onChange={(event) => {
                  setVerificationCode(event.target.value.replace(/\D/g, '').slice(0, 6));
                  setError('');
                }}
                aria-invalid={!!error}
                className="h-12 w-full rounded-xl bg-nala-card px-3 text-white outline-none focus:ring-1 focus:ring-nala-gold"
              />
            </div>
            <button
              type="submit"
              disabled={pending !== null}
              className="h-12 w-full rounded-xl bg-nala-gold font-semibold text-black disabled:opacity-50"
            >
              {pending === 'code' ? 'Verifying…' : 'Verify and sign in'}
            </button>
            <button
              type="button"
              onClick={changePhoneNumber}
              disabled={pending !== null}
              className="min-h-11 w-full text-sm text-white/70 underline"
            >
              Use a different phone number
            </button>
          </form>
        ) : (
          <form onSubmit={requestPhoneCode} noValidate className="space-y-4">
            <div>
              <label htmlFor="phone-number" className="mb-1 block text-sm text-white/80">
                Phone number
              </label>
              <div className="relative">
                <Phone size={18} aria-hidden="true" className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
                <input
                  id="phone-number"
                  name="tel"
                  type="tel"
                  autoComplete="tel"
                  value={phoneNumber}
                  onChange={(event) => {
                    setPhoneNumber(event.target.value);
                    setError('');
                  }}
                  placeholder="+27 12 345 6789"
                  aria-invalid={!!error}
                  className="h-12 w-full rounded-xl bg-nala-card pl-10 pr-3 text-white placeholder-white/40 outline-none focus:ring-1 focus:ring-nala-gold"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={!auth || pending !== null}
              className="h-12 w-full rounded-xl bg-nala-gold font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {pending === 'phone' ? 'Sending code…' : 'Send SMS verification code'}
            </button>
          </form>
        )}
        <div ref={recaptchaContainer} />
      </div>
    </div>
  );
}
