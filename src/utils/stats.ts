import { COURSES, type Course, type MenuItem } from '../types';

export interface MenuStats {
  total: number;
  averagePrice: number;
  perCourse: Record<Course, number>;
  averagePerCourse: Record<Course, number>;
  availableCount: number;
  unavailableCount: number;
  cheapest: MenuItem | null;
  priciest: MenuItem | null;
}

export function computeStats(items: MenuItem[]): MenuStats {
  const perCourse = Object.fromEntries(COURSES.map((c) => [c, 0])) as Record<Course, number>;
  const sumPerCourse = { ...perCourse };
  let sum = 0;
  let cheapest: MenuItem | null = null;
  let priciest: MenuItem | null = null;

  for (const item of items) {
    perCourse[item.course] += 1;
    sumPerCourse[item.course] += item.price;
    sum += item.price;
    if (!cheapest || item.price < cheapest.price) cheapest = item;
    if (!priciest || item.price > priciest.price) priciest = item;
  }

  const averagePerCourse = Object.fromEntries(
    COURSES.map((c) => [c, perCourse[c] === 0 ? 0 : sumPerCourse[c] / perCourse[c]]),
  ) as Record<Course, number>;
  const availableCount = items.filter((i) => i.isAvailable).length;

  return {
    total: items.length,
    averagePrice: items.length === 0 ? 0 : sum / items.length,
    perCourse,
    averagePerCourse,
    availableCount,
    unavailableCount: items.length - availableCount,
    cheapest,
    priciest,
  };
}
