import { useMemo, useState } from 'react';
import type { CourseFilter, MenuItem } from '../types';
import { filterMenu } from '../utils/filter';

export function useMenuFilters(items: MenuItem[]) {
  const [query, setQuery] = useState('');
  const [course, setCourse] = useState<CourseFilter>('All');
  const filtered = useMemo(() => filterMenu(items, query, course), [items, query, course]);
  const isFiltering = query.trim() !== '' || course !== 'All';
  const clear = () => {
    setQuery('');
    setCourse('All');
  };
  return { query, setQuery, course, setCourse, filtered, isFiltering, clear };
}
