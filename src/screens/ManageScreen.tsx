import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';
import ConfirmDialog from '../components/ConfirmDialog';
import CourseBadge from '../components/CourseBadge';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import SearchFilterBar from '../components/SearchFilterBar';
import { useMenuFilters } from '../hooks/useMenuFilters';
import type { MenuItem } from '../types';
import { formatPrice } from '../utils/format';

interface Props {
  items: MenuItem[];
  onEdit: (id: string) => void;
  onDelete: (item: MenuItem) => void;
  onAdd: () => void;
  onReset: () => void;
}

export default function ManageScreen({ items, onEdit, onDelete, onAdd, onReset }: Props) {
  const f = useMenuFilters(items);
  const [pendingDelete, setPendingDelete] = useState<MenuItem | null>(null);

  return (
    <>
      <Header title="Manage Menu" />
      <SearchFilterBar
        query={f.query}
        course={f.course}
        isFiltering={f.isFiltering}
        resultCount={f.filtered.length}
        onQueryChange={f.setQuery}
        onCourseChange={f.setCourse}
        onClear={f.clear}
      />

      {items.length === 0 ? (
        <EmptyState
          title="Your menu is empty"
          hint="Add a dish, or restore the original NALA menu."
          actionLabel="Add a dish"
          onAction={onAdd}
        />
      ) : f.filtered.length === 0 ? (
        <EmptyState title="No dishes found" actionLabel="Clear search & filter" onAction={f.clear} />
      ) : (
        <ul className="space-y-2 px-4">
          {f.filtered.map((item) => (
            <li key={item.id} className="flex items-center gap-3 rounded-xl bg-nala-card p-3">
              <div className="min-w-0 flex-1">
                <p className="truncate font-display text-white">{item.name}</p>
                <div className="mt-1 flex items-center gap-2">
                  <CourseBadge course={item.course} />
                  <span className="text-sm text-nala-gold">{formatPrice(item.price)}</span>
                </div>
              </div>
              <button
                onClick={() => onEdit(item.id)}
                aria-label={`Edit ${item.name}`}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/40 text-nala-gold"
              >
                <Pencil size={18} />
              </button>
              <button
                onClick={() => setPendingDelete(item)}
                aria-label={`Delete ${item.name}`}
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/40 text-red-400"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="px-4 pt-6">
        <button onClick={onReset} className="min-h-[44px] text-sm text-white/50 underline">
          Restore original menu
        </button>
      </div>

      {pendingDelete && (
        <ConfirmDialog
          title="Delete this dish?"
          message={`"${pendingDelete.name}" will be removed from the menu.`}
          confirmLabel="Delete"
          onCancel={() => setPendingDelete(null)}
          onConfirm={() => {
            onDelete(pendingDelete);
            setPendingDelete(null);
          }}
        />
      )}
    </>
  );
}
