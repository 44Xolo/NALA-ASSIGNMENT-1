import { COURSES, type MenuItem } from '../types';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isMenuItem(value: unknown): value is MenuItem {
  if (!isRecord(value)) return false;

  return (
    typeof value.id === 'string' &&
    value.id.length > 0 &&
    typeof value.name === 'string' &&
    typeof value.description === 'string' &&
    COURSES.some((course) => course === value.course) &&
    typeof value.price === 'number' &&
    Number.isFinite(value.price) &&
    value.price > 0 &&
    Array.isArray(value.ingredients) &&
    value.ingredients.every((ingredient) => typeof ingredient === 'string') &&
    typeof value.prepTime === 'number' &&
    Number.isInteger(value.prepTime) &&
    value.prepTime >= 0 &&
    typeof value.isAvailable === 'boolean' &&
    (value.image === undefined || typeof value.image === 'string') &&
    typeof value.dateCreated === 'string' &&
    typeof value.lastModified === 'string'
  );
}

export function parseStoredMenu(value: unknown): MenuItem[] | null {
  if (!Array.isArray(value)) return null;

  const items = value.filter(isMenuItem);
  if (items.length !== value.length) return null;
  return new Set(items.map((item) => item.id)).size === items.length ? items : null;
}
