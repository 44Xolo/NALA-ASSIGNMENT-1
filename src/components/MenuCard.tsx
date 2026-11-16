import type { MenuItem } from '../types';
import { formatPrice } from '../utils/format';
import CourseBadge from './CourseBadge';

interface Props {
  item: MenuItem;
  onOpen: (id: string) => void;
}

export default function MenuCard({ item, onOpen }: Props) {
  return (
    <button
      onClick={() => onOpen(item.id)}
      className="overflow-hidden rounded-2xl bg-nala-card text-left"
      aria-label={`${item.name}, ${formatPrice(item.price)}`}
    >
      {item.image ? (
        <img src={item.image} alt="" className="h-28 w-full object-cover" loading="lazy" />
      ) : (
        <div className="flex h-28 w-full items-center justify-center bg-black/40 font-display text-3xl text-nala-gold/60">
          {item.name.charAt(0)}
        </div>
      )}
      <div className="space-y-2 p-3">
        <CourseBadge course={item.course} />
        <h3 className="font-display text-base leading-tight text-white">{item.name}</h3>
        <div className="flex items-center justify-between">
          <span className="font-semibold text-nala-gold">{formatPrice(item.price)}</span>
          {!item.isAvailable && <span className="text-xs text-red-400">Unavailable</span>}
        </div>
      </div>
    </button>
  );
}
