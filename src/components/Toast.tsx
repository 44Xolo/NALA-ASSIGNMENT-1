import { useEffect } from 'react';
import type { ToastState } from '../types';

interface Props {
  toast: ToastState | null;
  onDismiss: () => void;
}

export default function Toast({ toast, onDismiss }: Props) {
  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(onDismiss, toast.action ? 6000 : 2800);
    return () => clearTimeout(t);
  }, [toast, onDismiss]);

  if (!toast) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-20 left-1/2 z-40 flex w-[90%] max-w-sm -translate-x-1/2 items-center justify-between gap-3 rounded-xl px-4 py-3 text-sm font-medium shadow-lg ${
        toast.kind === 'success' ? 'bg-nala-gold text-black' : 'bg-red-600 text-white'
      }`}
    >
      <span>{toast.message}</span>
      {toast.action && (
        <button
          onClick={() => {
            toast.action?.onClick();
            onDismiss();
          }}
          className="min-h-[36px] shrink-0 rounded-lg bg-black/80 px-3 font-semibold text-nala-gold"
        >
          {toast.action.label}
        </button>
      )}
    </div>
  );
}
