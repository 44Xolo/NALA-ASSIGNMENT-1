import { Search, X } from 'lucide-react';
import { COURSES, type CourseFilter } from '../types';

interface Props {
  query: string;
  course: CourseFilter;
  isFiltering: boolean;
  resultCount: number;
  onQueryChange: (q: string) => void;
  onCourseChange: (c: CourseFilter) => void;
  onClear: () => void;
}

const CHIPS: CourseFilter[] = ['All', ...COURSES];

export default function SearchFilterBar({
  query,
  course,
  isFiltering,
  resultCount,
  onQueryChange,
  onCourseChange,
  onClear,
}: Props) {
  return (
    <div className="space-y-3 px-4 pb-3">
      <div className="relative">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50" />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Search dishes by name"
          aria-label="Search dishes by name"
          className="h-11 w-full rounded-xl bg-nala-card pl-10 pr-10 text-white placeholder-white/40 outline-none focus:ring-1 focus:ring-nala-gold"
        />
        {query && (
          <button
            onClick={() => onQueryChange('')}
            aria-label="Clear search text"
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center text-white/60"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by course">
        {CHIPS.map((chip) => (
          <button
            key={chip}
            onClick={() => onCourseChange(chip)}
            aria-pressed={course === chip}
            className={`h-10 shrink-0 rounded-full px-4 text-sm ${
              course === chip ? 'bg-nala-gold font-semibold text-black' : 'bg-nala-card text-white/80'
            }`}
          >
            {chip === 'All' ? 'All' : `${chip}s`}
          </button>
        ))}
      </div>

      <div className="flex items-center justify-between text-sm text-white/60" aria-live="polite">
        <span>
          {resultCount} {resultCount === 1 ? 'dish' : 'dishes'} shown
        </span>
        {isFiltering && (
          <button onClick={onClear} className="min-h-[36px] text-nala-gold underline">
            Clear search &amp; filter
          </button>
        )}
      </div>
    </div>
  );
}
