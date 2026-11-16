import type { CourseFilter, MenuItem } from '../types';

/** Returns items whose name contains the query (case-insensitive) and match the course filter. */
export function filterMenu(items: MenuItem[], query: string, course: CourseFilter): MenuItem[] {
  const q = query.trim().toLowerCase();
  return items.filter(
    (item) =>
      (course === 'All' || item.course === course) &&
      (q === '' || item.name.toLowerCase().includes(q)),
  );
}
