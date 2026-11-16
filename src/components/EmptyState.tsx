interface Props {
  title: string;
  hint?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({ title, hint, actionLabel, onAction }: Props) {
  return (
    <div className="px-6 py-16 text-center">
      <p className="font-display text-xl text-white">{title}</p>
      {hint && <p className="mt-2 text-sm text-white/60">{hint}</p>}
      {actionLabel && onAction && (
        <button onClick={onAction} className="mt-5 h-11 rounded-xl bg-nala-gold px-6 font-semibold text-black">
          {actionLabel}
        </button>
      )}
    </div>
  );
}
