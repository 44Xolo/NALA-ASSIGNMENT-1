import { LogOut } from 'lucide-react';
import EmptyState from '../components/EmptyState';
import Header from '../components/Header';
import MenuCard from '../components/MenuCard';
import SearchFilterBar from '../components/SearchFilterBar';
import { useMenuFilters } from '../hooks/useMenuFilters';
import type { MenuItem } from '../types';

interface Props {
  items: MenuItem[];
  userName: string;
  onOpen: (id: string) => void;
  onAdd: () => void;
  onSignOut: () => void;
}

export default function HomeScreen({ items, userName, onOpen, onAdd, onSignOut }: Props) {
  const f = useMenuFilters(items);
  return (
    <>
      <Header
        title="NALA"
        right={
          <button
            onClick={onSignOut}
            aria-label="Sign out"
            className="flex h-11 w-11 items-center justify-center rounded-xl bg-nala-card text-white/70"
          >
            <LogOut size={18} />
          </button>
        }
      />
      <p className="px-4 pb-3 text-white/70">
        Welcome back, <span className="text-white">{userName}</span>
      </p>
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
          hint="Add your first dish to get started."
          actionLabel="Add a dish"
          onAction={onAdd}
        />
      ) : f.filtered.length === 0 ? (
        <EmptyState
          title="No dishes found"
          hint="Try a different name or course."
          actionLabel="Clear search & filter"
          onAction={f.clear}
        />
      ) : (
        <div className="grid grid-cols-2 gap-3 px-4">
          {f.filtered.map((item) => (
            <MenuCard key={item.id} item={item} onOpen={onOpen} />
          ))}
        </div>
      )}
    </>
  );
}
