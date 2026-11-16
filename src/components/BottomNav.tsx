import { BarChart3, Home, ListChecks, PlusCircle } from 'lucide-react';
import type { Screen } from '../types';

interface Props {
  current: Screen['name'];
  onNavigate: (screen: Screen) => void;
}

const TABS = [
  { label: 'Menu', icon: Home, target: { name: 'home' } as Screen, match: ['home', 'detail'] },
  { label: 'Manage', icon: ListChecks, target: { name: 'manage' } as Screen, match: ['manage', 'edit'] },
  { label: 'Add', icon: PlusCircle, target: { name: 'add' } as Screen, match: ['add'] },
  { label: 'Stats', icon: BarChart3, target: { name: 'stats' } as Screen, match: ['stats'] },
];

export default function BottomNav({ current, onNavigate }: Props) {
  return (
    <nav
      aria-label="Main navigation"
      className="fixed bottom-0 left-1/2 z-20 flex w-full max-w-md -translate-x-1/2 border-t border-white/10 bg-nala-bg"
    >
      {TABS.map(({ label, icon: Icon, target, match }) => {
        const active = match.includes(current);
        return (
          <button
            key={label}
            onClick={() => onNavigate(target)}
            aria-current={active ? 'page' : undefined}
            className={`flex min-h-[56px] flex-1 flex-col items-center justify-center gap-1 text-xs ${
              active ? 'text-nala-gold' : 'text-white/60'
            }`}
          >
            <Icon size={20} />
            {label}
          </button>
        );
      })}
    </nav>
  );
}
