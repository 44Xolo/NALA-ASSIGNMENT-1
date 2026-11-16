import type { Course } from '../types';

export default function CourseBadge({ course }: { course: Course }) {
  return (
    <span className="rounded-full border border-nala-gold/60 px-2 py-0.5 text-[11px] uppercase tracking-wide text-nala-gold">
      {course}
    </span>
  );
}
