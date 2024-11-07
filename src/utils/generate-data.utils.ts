function generateRandomString(prefix: string = 'AQA-'): string {
  const timestamp = Date.now().toString();

  const shortTimestamp = timestamp.slice(-4);

  const randomString = Math.random().toString(36).substring(2, 4);
  const insertionPoint = Math.floor(
    Math.random() * (shortTimestamp.length + 1),
  );
  const uniqueSuffix = [
    shortTimestamp.slice(0, insertionPoint),
    randomString,
    shortTimestamp.slice(insertionPoint),
  ].join('');

  // Return the team name with the "AQA-" prefix
  return `${prefix}${uniqueSuffix}`;
}

export function randomTeamName(): string {
  return generateRandomString('AQA-Team-');
}

/**
 * Filters out specified fields from an object.
 *
 * @param obj - The object to filter.
 * @param fieldsToExclude - An array of field names to exclude.
 * @returns A new object with the specified fields excluded.
 */
export function filterObject<T>(
  obj: T,
  fieldsToExclude: (keyof T)[],
): Partial<T> {
  const filtered: Partial<T> = {};

  for (const key in obj) {
    if (
      Object.prototype.hasOwnProperty.call(obj, key) &&
      !fieldsToExclude.includes(key as keyof T)
    ) {
      filtered[key as keyof T] = obj[key as keyof T];
    }
  }

  return filtered;
}
