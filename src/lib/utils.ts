import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merges Tailwind classes safely.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Removes duplicate items from an array based on a specific key.
 * @param items Array of items
 * @param key Key to check for uniqueness
 * @returns Array with unique items
 */
export function dedupeByKey<T extends Record<string, unknown>>(items: T[], key: keyof T): T[] {
  const map = new Map<string, T>();
  for (const item of items) {
    const k = String(item[key]);
    if (!map.has(k)) map.set(k, item);
  }
  return Array.from(map.values());
}
