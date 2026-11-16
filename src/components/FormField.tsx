import type { ReactNode } from 'react';

interface Props {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: ReactNode;
}

export default function FormField({ id, label, error, hint, children }: Props) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-sm text-white/80">
        {label}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-white/50">{hint}</p>}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export const inputClass = (hasError: boolean) =>
  `w-full rounded-xl bg-nala-card px-3 py-3 text-white placeholder-white/40 outline-none focus:ring-1 ${
    hasError ? 'ring-1 ring-red-500 focus:ring-red-500' : 'focus:ring-nala-gold'
  }`;
