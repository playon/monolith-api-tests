/*
This file contains global types that are used throughout the application.
 */

/**
 * Type for a string that can be used as a key in a map.
 * Return false if the value is null or empty.
 * @param value
 */
export function isString(value: unknown): value is string {
  if (value === null) return false;
  if (value === '') return false;
  return typeof value === 'string';
}

export function isNumber(value: unknown): value is number {
  return typeof value === 'number';
}
