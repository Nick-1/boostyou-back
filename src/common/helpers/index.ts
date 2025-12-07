export function extractUniqueIds<T, K extends keyof T>(
  items: T[],
  key: K,
): string[] {
  if (!Array.isArray(items)) return [];

  const set = new Set<string>();

  for (const item of items) {
    const value = item[key];

    if (typeof value === 'string') {
      set.add(value);
    }
  }

  return Array.from(set);
}
