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

/**
 * Adds a specified number of days to the current date and returns the resulting date in ISO 8601 format.
 * @param days Number of days to add.
 * @returns A string representing the new date in ISO 8601 format.
 */
export function addDaysToDate(days: number): string {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + days);
  return currentDate.toISOString();
}

/**
 * Returns the current date in ISO 8601 format.
 * @returns A string representing the current date in ISO 8601 format.
 */
export function getCurrentDate(): string {
  return new Date().toISOString();
}

/* Example usage
  const newDate = addDaysToDate(10);
  console.log(`Current date plus 10 days: ${newDate}`);
  
  const currentDate = getCurrentDate();
  console.log(`Current date: ${currentDate}`);
  */
