import { ArrowLeft } from 'lucide-react';
import type { ReactNode } from 'react';

interface Props {
  title: string;
  onBack?: () => void;
  right?: ReactNode;
}

export default function Header({ title, onBack, right }: Props) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 bg-nala-bg/95 px-4 py-3 backdrop-blur">
      {onBack && (
        <button
          onClick={onBack}
          aria-label="Go back"
          className="flex h-11 w-11 items-center justify-center rounded-xl bg-nala-card text-white"
        >
          <ArrowLeft size={20} />
        </button>
      )}
      <h1 className="flex-1 font-display text-2xl text-nala-gold">{title}</h1>
      {right}
    </header>
  );
}
