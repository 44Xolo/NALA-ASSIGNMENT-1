import { useState, type FormEvent } from 'react';

interface Props {
  onLogin: (name: string) => void;
}

export default function LoginScreen({ onLogin }: Props) {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name to continue.');
      return;
    }
    onLogin(name.trim());
  };

  return (
    <div
      className="flex min-h-screen flex-col justify-center bg-cover bg-center px-6"
      style={{
        backgroundImage:
          "linear-gradient(rgba(12, 12, 12, 0.72), rgba(12, 12, 12, 0.88)), url('/images/restaurant-interior.jpg')",
      }}
    >
      <h1 className="text-center font-display text-5xl tracking-widest text-nala-gold">NALA</h1>
      <p className="mt-2 text-center text-white/60">Chef&apos;s Menu Manager</p>
      <form onSubmit={submit} noValidate className="mt-10 space-y-4">
        <div>
          <label htmlFor="login-name" className="mb-1 block text-sm text-white/80">
            Your name
          </label>
          <input
            id="login-name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError('');
            }}
            placeholder="e.g. Chef Christoffel"
            autoComplete="name"
            aria-invalid={!!error}
            aria-describedby={error ? 'login-error' : undefined}
            className="h-12 w-full rounded-xl bg-nala-card px-3 text-white placeholder-white/40 outline-none focus:ring-1 focus:ring-nala-gold"
          />
          {error && (
            <p id="login-error" role="alert" className="mt-1 text-xs text-red-400">
              {error}
            </p>
          )}
        </div>
        <button type="submit" className="h-12 w-full rounded-xl bg-nala-gold font-semibold text-black">
          Enter
        </button>
      </form>
    </div>
  );
}
