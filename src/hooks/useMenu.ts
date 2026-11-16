import { useCallback, useEffect, useState } from 'react';
import { SEED_MENU } from '../data/seedMenu';
import type { MenuItem, MenuItemInput } from '../types';
import { parseStoredMenu } from '../utils/menuStorage';

const STORAGE_KEY = 'nala.menu.v3';

function loadMenu(): MenuItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed: unknown = JSON.parse(raw);
      const menu = parseStoredMenu(parsed);
      if (menu) return menu;
      console.warn('Saved menu data is invalid. The sample menu will be used instead.');
    }
  } catch (error) {
    console.warn('Unable to read the saved menu. The sample menu will be used instead.', error);
  }
  return SEED_MENU;
}

/** Keeps the menu in React state and persists changes to browser storage. */
export function useMenu() {
  const [items, setItems] = useState<MenuItem[]>(loadMenu);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.warn('Unable to save menu changes. They will only last for this session.', error);
    }
  }, [items]);

  const addItem = useCallback((input: MenuItemInput) => {
    const now = new Date().toISOString();
    const item: MenuItem = { ...input, id: crypto.randomUUID(), dateCreated: now, lastModified: now };
    setItems((prev) => [...prev, item]);
  }, []);

  const updateItem = useCallback((id: string, input: MenuItemInput) => {
    const now = new Date().toISOString();
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...input, lastModified: now } : i)));
  }, []);

  const deleteItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  /** Puts a previously deleted item back at its original position (used by Undo). */
  const restoreItem = useCallback((item: MenuItem, index: number) => {
    setItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      const next = [...prev];
      next.splice(Math.min(index, next.length), 0, item);
      return next;
    });
  }, []);

  const resetMenu = useCallback(() => setItems(SEED_MENU), []);

  return { items, addItem, updateItem, deleteItem, restoreItem, resetMenu };
}
