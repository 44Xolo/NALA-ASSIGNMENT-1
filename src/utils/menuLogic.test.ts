import { describe, expect, it } from 'vitest';
import { SEED_MENU } from '../data/seedMenu';
import { filterMenu } from './filter';
import { parseStoredMenu, restoreMissingSeedImages } from './menuStorage';
import { computeStats } from './stats';
import { emptyForm, validateForm } from './validation';

describe('filterMenu', () => {
  it('searches by name, case-insensitively', () => {
    expect(filterMenu(SEED_MENU, 'COQ', 'All').map((i) => i.name)).toEqual(['Coq au Vin']);
  });
  it('filters by course', () => {
    expect(filterMenu(SEED_MENU, '', 'Drink')).toHaveLength(4);
  });
  it('combines search and course', () => {
    expect(filterMenu(SEED_MENU, 'quiche', 'Main')).toHaveLength(0);
  });
  it('returns everything once cleared', () => {
    expect(filterMenu(SEED_MENU, '', 'All')).toHaveLength(SEED_MENU.length);
  });
});

describe('computeStats', () => {
  it('computes total, average and per-course counts', () => {
    const s = computeStats(SEED_MENU);
    expect(s.total).toBe(10);
    expect(s.averagePrice).toBeCloseTo(145.1);
    expect(s.perCourse).toEqual({ Starter: 2, Main: 3, Dessert: 1, Drink: 4 });
  });
  it('handles an empty menu', () => {
    const s = computeStats([]);
    expect(s.total).toBe(0);
    expect(s.averagePrice).toBe(0);
    expect(s.cheapest).toBeNull();
  });
});

describe('parseStoredMenu', () => {
  it('accepts a valid saved menu', () => {
    expect(parseStoredMenu(SEED_MENU)).toEqual(SEED_MENU);
  });

  it('rejects malformed entries and duplicate IDs', () => {
    expect(parseStoredMenu([{ id: 'broken' }])).toBeNull();
    expect(parseStoredMenu([SEED_MENU[0], { ...SEED_MENU[0] }])).toBeNull();
  });

  it('restores missing images for saved sample dishes without changing custom items', () => {
    const savedSample = SEED_MENU.map((item) => ({ ...item, image: undefined }));
    const customItem = { ...SEED_MENU[0], id: 'custom-item', image: undefined };

    expect(restoreMissingSeedImages(savedSample)).toEqual(SEED_MENU);
    expect(restoreMissingSeedImages([customItem])).toEqual([customItem]);
  });
});

describe('validateForm', () => {
  it('flags every required field on an empty form', () => {
    expect(Object.keys(validateForm(emptyForm, []))).toEqual(['name', 'description', 'course', 'price']);
  });
  it('rejects duplicate names and non-positive prices', () => {
    const errors = validateForm(
      { ...emptyForm, name: 'ratatouille', description: 'x', course: 'Main', price: '-5' },
      ['Ratatouille'],
    );
    expect(errors.name).toMatch(/already exists/);
    expect(errors.price).toMatch(/greater than 0/);
  });
  it('accepts a valid form', () => {
    expect(
      validateForm({ ...emptyForm, name: 'Tarte Tatin', description: 'Apple tart', course: 'Dessert', price: '95' }, []),
    ).toEqual({});
  });
});
