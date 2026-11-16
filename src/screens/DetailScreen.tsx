import { Clock, Pencil } from 'lucide-react';
import CourseBadge from '../components/CourseBadge';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import type { MenuItem } from '../types';
import { formatPrice } from '../utils/format';

interface Props {
  item?: MenuItem;
  onBack: () => void;
  onEdit: (id: string) => void;
}

export default function DetailScreen({ item, onBack, onEdit }: Props) {
  if (!item) {
    return (
      <>
        <Header title="Dish" onBack={onBack} />
        <EmptyState title="Dish not found" actionLabel="Back to menu" onAction={onBack} />
      </>
    );
  }
  return (
    <>
      <Header title={item.name} onBack={onBack} />
      {item.image && <img src={item.image} alt={item.name} className="h-56 w-full object-cover" />}
      <div className="space-y-4 p-4">
        <div className="flex items-center justify-between">
          <CourseBadge course={item.course} />
          <span className="text-xl font-semibold text-nala-gold">{formatPrice(item.price)}</span>
        </div>
        <p className="text-white/80">{item.description}</p>
        {item.prepTime > 0 && (
          <p className="flex items-center gap-2 text-sm text-white/60">
            <Clock size={16} /> {item.prepTime} min prep
          </p>
        )}
        {item.ingredients.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {item.ingredients.map((ing) => (
              <span key={ing} className="rounded-full bg-nala-card px-3 py-1 text-xs text-white/80">
                {ing}
              </span>
            ))}
          </div>
        )}
        <p className={item.isAvailable ? 'text-sm text-green-400' : 'text-sm text-red-400'}>
          {item.isAvailable ? 'Available today' : 'Currently unavailable'}
        </p>
        <button
          onClick={() => onEdit(item.id)}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-nala-gold font-semibold text-black"
        >
          <Pencil size={18} /> Edit dish
        </button>
      </div>
    </>
  );
}
