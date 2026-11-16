import { useMemo } from 'react';
import Header from '../components/Header';
import EmptyState from '../components/EmptyState';
import { COURSES, type MenuItem } from '../types';
import { formatPrice } from '../utils/format';
import { computeStats } from '../utils/stats';

function StatCard({ label, value, testId }: { label: string; value: string | number; testId?: string }) {
  return (
    <div className="rounded-2xl bg-nala-card p-4">
      <p className="text-sm text-white/60">{label}</p>
      <p className="mt-1 font-display text-3xl text-nala-gold" data-testid={testId}>
        {value}
      </p>
    </div>
  );
}

export default function StatsScreen({ items }: { items: MenuItem[] }) {
  const stats = useMemo(() => computeStats(items), [items]);
  const max = Math.max(1, ...Object.values(stats.perCourse));

  if (items.length === 0) {
    return (
      <>
        <Header title="Menu Statistics" />
        <EmptyState title="No statistics yet" hint="Add dishes to see totals and averages." />
      </>
    );
  }

  return (
    <>
      <Header title="Menu Statistics" />
      <div className="space-y-4 px-4">
        <div className="grid grid-cols-2 gap-3">
          <StatCard label="Total menu items" value={stats.total} testId="stat-total" />
          <StatCard label="Average price" value={formatPrice(stats.averagePrice)} testId="stat-average" />
        </div>

        <section aria-labelledby="per-course" className="rounded-2xl bg-nala-card p-4">
          <h2 id="per-course" className="mb-3 font-display text-lg text-white">
            Items per course
          </h2>
          <ul className="space-y-3">
            {COURSES.map((course) => (
              <li key={course}>
                <div className="mb-1 flex justify-between text-sm text-white/80">
                  <span>{course}s</span>
                  <span>
                    <span className="text-nala-gold">{stats.perCourse[course]}</span>
                    {stats.perCourse[course] > 0 && (
                      <span className="text-white/50"> · avg {formatPrice(stats.averagePerCourse[course])}</span>
                    )}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-black/40">
                  <div
                    className="h-full rounded-full bg-nala-gold"
                    style={{ width: `${(stats.perCourse[course] / max) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="insights" className="rounded-2xl bg-nala-card p-4">
          <h2 id="insights" className="mb-3 font-display text-lg text-white">
            Quick insights
          </h2>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-white/60">Available today</dt>
              <dd className="text-white">
                {stats.availableCount} of {stats.total}
              </dd>
            </div>
            {stats.unavailableCount > 0 && (
              <div className="flex justify-between">
                <dt className="text-white/60">Unavailable</dt>
                <dd className="text-red-400">{stats.unavailableCount}</dd>
              </div>
            )}
            {stats.cheapest && (
              <div className="flex justify-between gap-4">
                <dt className="text-white/60">Lowest price</dt>
                <dd className="text-right text-white">
                  {stats.cheapest.name} · {formatPrice(stats.cheapest.price)}
                </dd>
              </div>
            )}
            {stats.priciest && (
              <div className="flex justify-between gap-4">
                <dt className="text-white/60">Highest price</dt>
                <dd className="text-right text-white">
                  {stats.priciest.name} · {formatPrice(stats.priciest.price)}
                </dd>
              </div>
            )}
          </dl>
        </section>
      </div>
    </>
  );
}
