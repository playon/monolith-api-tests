export function getCurrentYear() {
  return new Date().getFullYear();
}

/**
 * Checks if the given date is within the last hour from the current time.
 *
 * @param dateStr - The date string in ISO format.
 * @returns True if the date is within the last hour, otherwise false.
 */
export function isDateWithinLastHour(dateStr: string): boolean {
  const date = new Date(dateStr);
  const now = new Date();
  const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds

  return now.getTime() - date.getTime() <= oneHour;
}
